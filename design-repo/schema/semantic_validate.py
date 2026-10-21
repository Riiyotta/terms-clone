#!/usr/bin/env python3
"""Semantic validator for PageSpecs built against this design-repo (terms.so, all nine routes).

pagespec.schema.json (Draft-07) checks shape. This script checks what the schema
cannot express. Every check is a named rule that also appears, with the same
severity, in compatibility/graph.json ("error" fails, "warn" reports);
extraction/verify_all.py fails if the two drift apart.

It enforces:
  * the DECLARED template's real node list from templates/templates.json (not
    nodes[] in isolation): membership, order, required nodes, repeatability,
    fixed first/last positions, anchor ids and tones, all keyed on
    (section, variant) because feature.demo-card legitimately appears three
    times with different variants; repeatable nodes (docs.section,
    legal.section) up to maxRepeat, each with its own unique anchor slug
  * route belongs to the declared template; internal links point at a built or
    documented pending-build route; '#anchor' links resolve on the page (or to
    a template pageAnchor such as the legal #top)
  * route-specific facts: nav current link, footer Product links by route,
    prose link slots, changelog order, legal operator slots + counsel review,
    legal switcher, auth demo-only note / no credential integration / switch link
  * motion equals the section contract (and reducedMotionFallback is present)
  * per-instance copy budgets (maxWords, maxChars) read from the section
    contracts, and typed/streamed text that must finish inside its timeline
  * media: role allowed for the slot, generationPolicy pinned to the role's
    policy, assetRef never a source-site file
  * real-company protection: no terms.so long-form text (sha256 fingerprints;
    the repo never stores the text), no source brand name or domain

Usage:  python3 schema/semantic_validate.py [pagespec.json ...]
        (defaults to schema/example.pagespec.json + schema/examples/*). Runs the Draft-07 schema
        first when jsonschema is installed. Exit 1 on any error.
"""
import copy
import hashlib
import json
import os
import re
import sys
import unicodedata

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_QUOTES = {"‘": "'", "’": "'", "“": '"', "”": '"', " ": " "}


def normalize_copy(s):
    s = unicodedata.normalize("NFKC", s)
    for k, v in _QUOTES.items():
        s = s.replace(k, v)
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s.rstrip(".?!")


def fingerprint(s):
    return hashlib.sha256(normalize_copy(s).encode("utf-8")).hexdigest()


def word_count(s):
    return len(s.split())


def load_json(rel, repo=REPO):
    with open(os.path.join(repo, rel), encoding="utf-8") as f:
        return json.load(f)


# ------------------------------------------------------------------ registry
RULES = {}


def rule(rule_id, severity):
    def deco(fn):
        RULES[rule_id] = {"fn": fn, "severity": severity}
        return fn
    return deco


class Ctx:
    def __init__(self, repo=REPO, overrides=None):
        o = overrides or {}
        self.repo = repo
        self.graph = o.get("graph") or load_json("compatibility/graph.json", repo)
        self.severity = {r["id"]: r["severity"] for r in self.graph["rules"]}
        self.templates = o.get("templates") or load_json("templates/templates.json", repo)["templates"]
        self.routes = o.get("routes") or load_json("templates/routes.json", repo)
        self.roles = o.get("roles") or load_json("assets/asset-roles.json", repo)
        self.protected = o.get("protected") or load_json("schema/protected-content.json", repo)
        self.meta_contract = load_json("schema/page-meta.contract.json", repo)
        self.sections = {}
        sdir = os.path.join(repo, "sections")
        for fn in sorted(os.listdir(sdir)):
            if fn.endswith(".json"):
                c = load_json(os.path.join("sections", fn), repo)
                self.sections[c["id"]] = c
        self.errors, self.warnings = [], []

    def report(self, rule_id, where, msg):
        sev = self.severity.get(rule_id, RULES.get(rule_id, {}).get("severity", "error"))
        item = {"rule": rule_id, "severity": sev, "path": where, "message": msg}
        (self.errors if sev == "error" else self.warnings).append(item)


def _template(ctx, spec):
    return ctx.templates.get(spec.get("template"))


def _key(n):
    return (n.get("section"), n.get("variant"))


def _tindex(t):
    return {(n["section"], n["variant"]): i for i, n in enumerate(t["nodes"])}


def _nodes(spec):
    return [n for n in spec.get("nodes", []) if isinstance(n, dict)]


# ------------------------------------------------------------------ structure
@rule("ROUTE_MATCHES_TEMPLATE", "error")
def r_route(ctx, spec):
    t = _template(ctx, spec)
    if t is None:
        ctx.report("ROUTE_MATCHES_TEMPLATE", "template", "unknown template %r (known: %s)" % (spec.get("template"), sorted(ctx.templates)))
    elif spec.get("route") not in t["routes"]:
        ctx.report("ROUTE_MATCHES_TEMPLATE", "route", "route %r is not a route of %s (allowed %s)" % (spec.get("route"), t["id"], t["routes"]))


@rule("TEMPLATE_UNKNOWN_NODE", "error")
def r_unknown(ctx, spec):
    t = _template(ctx, spec)
    if not t:
        return
    idx = _tindex(t)
    for i, n in enumerate(_nodes(spec)):
        if _key(n) not in idx:
            ctx.report("TEMPLATE_UNKNOWN_NODE", "nodes[%d]" % i, "(section, variant) %r is not a node of the declared template %s" % (_key(n), t["id"]))


@rule("NO_REPEAT", "error")
def r_repeat(ctx, spec):
    t = _template(ctx, spec)
    if not t:
        return
    rep = {(n["section"], n["variant"]): (n["repeatable"], n.get("maxRepeat", 1)) for n in t["nodes"]}
    seen, count = {}, {}
    for i, n in enumerate(_nodes(spec)):
        k = _key(n)
        repeatable, mx = rep.get(k, (False, 1))
        count[k] = count.get(k, 0) + 1
        if k in seen and not repeatable:
            ctx.report("NO_REPEAT", "nodes[%d]" % i, "%r repeats nodes[%d]; the template marks it one-per-page" % (k, seen[k]))
        elif repeatable and count[k] == mx + 1:
            ctx.report("NO_REPEAT", "nodes[%d]" % i, "%r appears more than maxRepeat %d times" % (k, mx))
        seen.setdefault(k, i)


@rule("TEMPLATE_NODE_ORDER", "error")
def r_order(ctx, spec):
    t = _template(ctx, spec)
    if not t:
        return
    idx = _tindex(t)
    last = -1
    for i, n in enumerate(_nodes(spec)):
        j = idx.get(_key(n))
        if j is None:
            continue
        if j < last:
            ctx.report("TEMPLATE_NODE_ORDER", "nodes[%d]" % i, "%r is out of template order (template position %d after %d)" % (_key(n), j, last))
        last = max(last, j)


@rule("TEMPLATE_REQUIRED_NODES", "error")
def r_required(ctx, spec):
    t = _template(ctx, spec)
    if not t:
        return
    present = {_key(n) for n in _nodes(spec)}
    for tn in t["nodes"]:
        if tn["required"] and (tn["section"], tn["variant"]) not in present:
            ctx.report("TEMPLATE_REQUIRED_NODES", "nodes", "required node %r of %s is missing" % ((tn["section"], tn["variant"]), t["id"]))


@rule("OPTIONAL_NODE_OMITTED", "warn")
def r_optional(ctx, spec):
    t = _template(ctx, spec)
    if not t:
        return
    present = {_key(n) for n in _nodes(spec)}
    for tn in t["nodes"]:
        if not tn["required"] and (tn["section"], tn["variant"]) not in present:
            ctx.report("OPTIONAL_NODE_OMITTED", "nodes", "optional node %r omitted: valid, but the only measured composition contains it" % ((tn["section"], tn["variant"]),))


@rule("POSITION_FIXED", "error")
def r_position(ctx, spec):
    t = _template(ctx, spec)
    nodes = _nodes(spec)
    if not t or not nodes:
        return
    for tn in t["nodes"]:
        k = (tn["section"], tn["variant"])
        where = [i for i, n in enumerate(nodes) if _key(n) == k]
        if not where:
            continue
        if tn.get("position") == "first" and where[0] != 0:
            ctx.report("POSITION_FIXED", "nodes[%d]" % where[0], "%r must be nodes[0]" % (k,))
        if tn.get("position") == "last" and where[-1] != len(nodes) - 1:
            ctx.report("POSITION_FIXED", "nodes[%d]" % where[-1], "%r must be the last node" % (k,))


def _tnode(ctx, spec, n):
    t = _template(ctx, spec)
    if not t:
        return None
    for tn in t["nodes"]:
        if (tn["section"], tn["variant"]) == _key(n):
            return tn
    return None


PER_INSTANCE = "{slug}"


@rule("ANCHOR_ID_MATCH", "error")
def r_anchor(ctx, spec):
    for i, n in enumerate(_nodes(spec)):
        tn = _tnode(ctx, spec, n)
        if tn and tn["anchorId"] == PER_INSTANCE:
            if not (isinstance(n.get("anchorId"), str) and re.match(r"^[a-z][a-z0-9-]*$", n["anchorId"])):
                ctx.report("ANCHOR_ID_MATCH", "nodes[%d].anchorId" % i, "%r needs its own anchor slug (template anchorId '{slug}'), got %r" % (_key(n), n.get("anchorId")))
        elif tn and n.get("anchorId") != tn["anchorId"]:
            ctx.report("ANCHOR_ID_MATCH", "nodes[%d].anchorId" % i, "anchorId %r must be %r for %r" % (n.get("anchorId"), tn["anchorId"], _key(n)))


@rule("TONE_MATCHES_TEMPLATE", "error")
def r_tone(ctx, spec):
    for i, n in enumerate(_nodes(spec)):
        tn = _tnode(ctx, spec, n)
        if tn and n.get("tone") != tn["tone"]:
            ctx.report("TONE_MATCHES_TEMPLATE", "nodes[%d].tone" % i, "%r is tone %r in the template, got %r" % (_key(n), tn["tone"], n.get("tone")))


# ------------------------------------------------------------------ links
def _hrefs(o, path, out):
    if isinstance(o, dict):
        for k, v in o.items():
            if k == "href" and isinstance(v, str):
                out.append((path + "." + k, v))
            else:
                _hrefs(v, path + "." + k, out)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            _hrefs(v, "%s[%d]" % (path, i), out)


@rule("ANCHOR_LINK_RESOLVES", "error")
def r_anchor_links(ctx, spec):
    anchors = {n.get("anchorId") for n in _nodes(spec) if n.get("anchorId")}
    anchors |= set((_template(ctx, spec) or {}).get("pageAnchors", []))
    out = []
    _hrefs(spec.get("nodes", []), "nodes", out)
    for where, h in out:
        if h.startswith("#") and h[1:] not in anchors:
            ctx.report("ANCHOR_LINK_RESOLVES", where, "%r has no matching node anchorId on this page (present: %s)" % (h, sorted(anchors)))


@rule("INTERNAL_LINK_KNOWN", "error")
def r_internal(ctx, spec):
    built = {r["path"] for r in ctx.routes["routes"]}
    pending = {r["path"] for r in ctx.routes["pendingBuildRoutes"]}
    out = []
    _hrefs(spec.get("nodes", []), "nodes", out)
    for where, h in out:
        if h.startswith("/") and h.split("#")[0] not in built | pending:
            ctx.report("INTERNAL_LINK_KNOWN", where, "%r is neither a built nor a documented pending-build route" % h)


@rule("PENDING_ROUTE_LINK", "warn")
def r_pending(ctx, spec):
    pending = {r["path"] for r in ctx.routes["pendingBuildRoutes"]}
    out = []
    _hrefs(spec.get("nodes", []), "nodes", out)
    seen = set()
    for where, h in out:
        p = h.split("#")[0]
        if h.startswith("/") and p in pending and p not in seen:
            seen.add(p)
            ctx.report("PENDING_ROUTE_LINK", where, "%r is pending-build (not in this repo); the target project must supply it" % p)


# ------------------------------------------------------------------ motion
def _contract_variant(ctx, n):
    c = ctx.sections.get(n.get("section"))
    if not c:
        return None
    return c["variants"].get(n.get("variant"))


@rule("MOTION_MATCHES_CONTRACT", "error")
def r_motion(ctx, spec):
    for i, n in enumerate(_nodes(spec)):
        v = _contract_variant(ctx, n)
        if v and isinstance(n.get("motion"), dict):
            m = n["motion"]
            want = v["motion"]
            extra = sorted(set(m) - set(want))
            diff = sorted(k for k in want if k in m and m[k] != want[k])
            if extra or diff:
                ctx.report("MOTION_MATCHES_CONTRACT", "nodes[%d].motion" % i, "motion drifts from the %r contract (invented %s, changed %s)" % (_key(n), extra, diff))


@rule("REDUCED_MOTION_REQUIRED", "error")
def r_reduced(ctx, spec):
    for i, n in enumerate(_nodes(spec)):
        m = n.get("motion")
        v = _contract_variant(ctx, n)
        if not isinstance(m, dict) or "reducedMotionFallback" not in m:
            ctx.report("REDUCED_MOTION_REQUIRED", "nodes[%d].motion" % i, "reducedMotionFallback missing")
        elif v and m["reducedMotionFallback"] != v["motion"]["reducedMotionFallback"]:
            ctx.report("REDUCED_MOTION_REQUIRED", "nodes[%d].motion.reducedMotionFallback" % i,
                       "must be %r for %r" % (v["motion"]["reducedMotionFallback"], _key(n)))


# ------------------------------------------------------------------ content walker
def _text_of(field, value):
    if field["type"] in ("runs", "prose") and isinstance(value, list):
        return "".join(r.get("text", "") for r in value if isinstance(r, dict))
    return value if isinstance(value, str) else None


def _walk(model, value, path, visit):
    t = model.get("type")
    if t in ("text", "runs", "prose"):
        visit("text", model, value, path)
    elif t == "union" and isinstance(value, dict):
        opt = model["options"].get(value.get(model.get("discriminator", "kind")))
        if opt:
            _walk(opt, value, path, visit)
    elif t == "media":
        visit("media", model, value, path)
    elif t == "object" and isinstance(value, dict):
        for k, f in model["fields"].items():
            if k in value:
                _walk(f, value[k], path + "." + k, visit)
    elif t == "list" and isinstance(value, list):
        for i, v in enumerate(value):
            _walk(model["item"], v, "%s[%d]" % (path, i), visit)
    elif t == "tuple" and isinstance(value, list):
        for i, (f, v) in enumerate(zip(model["items"], value)):
            _walk(f, v, "%s[%d]" % (path, i), visit)


def _each_field(ctx, spec, visit):
    for i, n in enumerate(_nodes(spec)):
        v = _contract_variant(ctx, n)
        if v and isinstance(n.get("content"), dict):
            _walk({"type": "object", "fields": v["content"]}, n["content"], "nodes[%d].content" % i, visit)
    if isinstance(spec.get("meta"), dict):
        _walk({"type": "object", "fields": ctx.meta_contract["content"]}, spec["meta"], "meta", visit)


@rule("MAX_WORDS", "error")
def r_words(ctx, spec):
    def visit(kind, f, value, path):
        if kind == "text":
            s = _text_of(f, value)
            if s is not None and word_count(s) > f["maxWords"]:
                ctx.report("MAX_WORDS", path, "%d words > maxWords %d" % (word_count(s), f["maxWords"]))
    _each_field(ctx, spec, visit)


@rule("MAX_CHARS", "error")
def r_chars(ctx, spec):
    def visit(kind, f, value, path):
        if kind == "text":
            s = _text_of(f, value)
            if s is not None and len(s) > f["maxChars"]:
                ctx.report("MAX_CHARS", path, "%d chars > maxChars %d" % (len(s), f["maxChars"]))
    _each_field(ctx, spec, visit)


@rule("TYPED_TEXT_FITS_TIMELINE", "error")
def r_timeline(ctx, spec):
    def visit(kind, f, value, path):
        if kind == "text" and "timeline" in f:
            s = _text_of(f, value)
            tl = f["timeline"]
            limit = (tl["endMs"] - tl["startMs"]) // tl["msPerChar"]
            if s is not None and len(s) > limit:
                ctx.report("TYPED_TEXT_FITS_TIMELINE", path, "%d chars at %dms/char from t=%d would not finish before t=%d (max %d chars)"
                           % (len(s), tl["msPerChar"], tl["startMs"], tl["endMs"], limit))
    _each_field(ctx, spec, visit)


# ------------------------------------------------------------------ media
@rule("ASSET_ROLE_ALLOWED", "error")
def r_role(ctx, spec):
    def visit(kind, f, value, path):
        if kind == "media" and isinstance(value, dict) and value.get("assetRole") not in f["roles"]:
            ctx.report("ASSET_ROLE_ALLOWED", path + ".assetRole", "role %r not allowed here (allowed %s)" % (value.get("assetRole"), f["roles"]))
    _each_field(ctx, spec, visit)


@rule("ASSET_POLICY_PINNED", "error")
def r_policy(ctx, spec):
    roles = ctx.roles["roles"]

    def visit(kind, f, value, path):
        if kind == "media" and isinstance(value, dict):
            r = roles.get(value.get("assetRole"))
            if r and value.get("generationPolicy") != r["generationPolicy"]:
                ctx.report("ASSET_POLICY_PINNED", path + ".generationPolicy", "role %r is pinned to %r, got %r"
                           % (value.get("assetRole"), r["generationPolicy"], value.get("generationPolicy")))
    _each_field(ctx, spec, visit)


@rule("ASSET_REF_NOT_SOURCE", "error")
def r_ref(ctx, spec):
    src = {os.path.basename(p).lower() for r in ctx.roles["roles"].values() for p in r["sourceFiles"]}

    def visit(kind, f, value, path):
        if kind == "media" and isinstance(value, dict) and isinstance(value.get("assetRef"), str):
            if os.path.basename(value["assetRef"]).lower() in src:
                ctx.report("ASSET_REF_NOT_SOURCE", path + ".assetRef", "%r names a source-site file" % value["assetRef"])
    _each_field(ctx, spec, visit)


# ------------------------------------------------------------------ real-company protection
def _strings(o, path, out):
    if isinstance(o, str):
        out.append((path, o))
    elif isinstance(o, dict):
        for k, v in o.items():
            _strings(v, path + "." + k, out)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            _strings(v, "%s[%d]" % (path, i), out)


def _runs_joined(o, path, out):
    """Rich-text runs are also checked joined, so splitting a sentence across runs cannot hide it."""
    if isinstance(o, list) and o and all(isinstance(x, dict) and "text" in x and set(x) <= {"text", "strong", "href", "mark"} for x in o):
        out.append((path, "".join(x["text"] for x in o)))
    elif isinstance(o, dict):
        for k, v in o.items():
            _runs_joined(v, path + "." + k, out)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            _runs_joined(v, "%s[%d]" % (path, i), out)


@rule("PROTECTED_LONGFORM", "error")
def r_protected(ctx, spec):
    fps = set(ctx.protected["copyFingerprints"]["sha256"])
    minw = ctx.protected["copyFingerprints"]["minWords"]
    out = []
    _strings(spec, "", out)
    _runs_joined(spec, "", out)
    for where, s in out:
        cands = [s] + [x for x in re.split(r"(?<=[.;?!])\s+", s) if word_count(x) >= minw]
        if any(fingerprint(c) in fps for c in cands):
            ctx.report("PROTECTED_LONGFORM", where.lstrip("."), "matches terms.so proprietary long-form text; write original copy")


@rule("BRAND_NOT_SOURCE", "error")
def r_brand(ctx, spec):
    names = {normalize_copy(x) for x in ctx.protected["sourceBrandNames"]}
    b = spec.get("brand") or {}
    if isinstance(b.get("name"), str) and normalize_copy(b["name"]) in names:
        ctx.report("BRAND_NOT_SOURCE", "brand.name", "%r is the source brand; use the target project's brand" % b["name"])
    out = []
    _strings(spec, "", out)
    for where, s in out:
        for d in ctx.protected["sourceDomains"]:
            if re.search(r"(^|[^a-z0-9-])" + re.escape(d) + r"($|[^a-z0-9-])", s.lower()):
                ctx.report("BRAND_NOT_SOURCE", where.lstrip("."), "references the source domain %r" % d)


# ------------------------------------------------------------------ route-specific facts (v1.1.0)
def _by_section(spec, section, variant=None):
    return [(i, n) for i, n in enumerate(_nodes(spec)) if n.get("section") == section and (variant is None or n.get("variant") == variant)]


def _c(n):
    return n.get("content") if isinstance(n.get("content"), dict) else {}


@rule("NAV_CURRENT_MATCHES_ROUTE", "error")
def r_nav_current(ctx, spec):
    for i, n in _by_section(spec, "shell.nav", "on-hero-current"):
        cur = _c(n).get("currentHref")
        hrefs = [l.get("href") for l in _c(n).get("links", []) if isinstance(l, dict)]
        if cur != spec.get("route") or cur not in hrefs:
            ctx.report("NAV_CURRENT_MATCHES_ROUTE", "nodes[%d].content.currentHref" % i, "currentHref %r must equal the route %r and be one of the nav links %s" % (cur, spec.get("route"), hrefs))


@rule("FOOTER_PRODUCT_LINKS", "error")
def r_footer_links(ctx, spec):
    for i, n in _by_section(spec, "shell.footer"):
        groups = _c(n).get("groups") or []
        prod = groups[0].get("links", []) if groups and isinstance(groups[0], dict) else []
        hrefs = [l.get("href") for l in prod if isinstance(l, dict)]
        if n.get("variant") == "brand-two-groups" and (len(hrefs) != 5 or "/changelog" not in hrefs):
            ctx.report("FOOTER_PRODUCT_LINKS", "nodes[%d].content.groups[0]" % i, "home footer needs 5 Product links including /changelog, got %s" % hrefs)
        if n.get("variant") == "brand-two-groups-subpage" and (len(hrefs) != 4 or "/changelog" in hrefs):
            ctx.report("FOOTER_PRODUCT_LINKS", "nodes[%d].content.groups[0]" % i, "sub-page footer has exactly 4 Product links and no /changelog, got %s" % hrefs)


@rule("LINK_SLOTS", "error")
def r_link_slots(ctx, spec):
    def visit(kind, f, value, path):
        if kind == "text" and f["type"] == "prose" and isinstance(value, list):
            k = sum(1 for r in value if isinstance(r, dict) and r.get("href"))
            if k > f["maxLinks"]:
                ctx.report("LINK_SLOTS", path, "%d links > maxLinks %d" % (k, f["maxLinks"]))
    _each_field(ctx, spec, visit)


@rule("ANCHOR_UNIQUE", "error")
def r_anchor_unique(ctx, spec):
    seen = {}
    for i, n in enumerate(_nodes(spec)):
        a = n.get("anchorId")
        if a is None:
            continue
        if a in seen:
            ctx.report("ANCHOR_UNIQUE", "nodes[%d].anchorId" % i, "anchorId %r already used by nodes[%d]" % (a, seen[a]))
        seen.setdefault(a, i)


@rule("CHANGELOG_ORDER", "error")
def r_changelog(ctx, spec):
    import datetime
    for i, n in _by_section(spec, "changelog.releases"):
        prev = None
        for j, r in enumerate(_c(n).get("releases", [])):
            d = r.get("datetime") if isinstance(r, dict) else None
            try:
                dt = datetime.date.fromisoformat(d)
            except (TypeError, ValueError):
                ctx.report("CHANGELOG_ORDER", "nodes[%d].content.releases[%d].datetime" % (i, j), "%r is not a valid date" % d)
                continue
            if prev and dt >= prev:
                ctx.report("CHANGELOG_ORDER", "nodes[%d].content.releases[%d]" % (i, j), "%s is not older than the release above it (%s): newest first" % (dt, prev))
            prev = dt


OPERATOR_SLOTS = {"legalName": "{{operator.legalName}}", "postalAddress": "{{operator.postalAddress}}",
                  "country": "{{operator.country}}", "governingJurisdiction": "{{operator.governingJurisdiction}}"}


@rule("LEGAL_OPERATOR_SLOTS", "error")
def r_operator(ctx, spec):
    if spec.get("template") != "template.legal":
        return
    intro = _by_section(spec, "legal.intro")
    if not intro:
        ctx.report("LEGAL_OPERATOR_SLOTS", "nodes", "legal page without legal.intro: the operator slots are missing")
    for i, n in intro:
        op = _c(n).get("operator")
        op = op if isinstance(op, dict) else {}
        for k, tok in OPERATOR_SLOTS.items():
            if op.get(k) != tok:
                ctx.report("LEGAL_OPERATOR_SLOTS", "nodes[%d].content.operator.%s" % (i, k), "required project-supplied slot must be the binding %r, got %r (never invent operator details)" % (tok, op.get(k)))
    out = []
    _strings(spec.get("nodes", []), "nodes", out)
    for where, s_ in out:
        for tok in re.findall(r"\{\{[^}]*\}\}", s_):
            if tok not in OPERATOR_SLOTS.values():
                ctx.report("LEGAL_OPERATOR_SLOTS", where, "unknown slot token %r (allowed: %s)" % (tok, sorted(OPERATOR_SLOTS.values())))


@rule("LEGAL_REVIEW_NOTICE", "error")
def r_review(ctx, spec):
    for i, n in _by_section(spec, "legal.intro"):
        if _c(n).get("counselReview") != "required-before-publication":
            ctx.report("LEGAL_REVIEW_NOTICE", "nodes[%d].content.counselReview" % i, "legal text must be flagged 'required-before-publication': placeholder legal copy is not legal advice")


@rule("LEGAL_SWITCHER_CURRENT", "error")
def r_switcher(ctx, spec):
    t = _template(ctx, spec)
    for i, n in _by_section(spec, "legal.switcher"):
        hrefs = [l.get("href") for l in _c(n).get("links", []) if isinstance(l, dict)]
        legal = sorted(t["routes"]) if t else []
        if sorted(hrefs) != legal or spec.get("route") not in hrefs:
            ctx.report("LEGAL_SWITCHER_CURRENT", "nodes[%d].content.links" % i, "switcher must link exactly the legal routes %s and include the current route %r, got %s" % (legal, spec.get("route"), hrefs))


@rule("AUTH_DEMO_NOTE_REQUIRED", "error")
def r_demo_note(ctx, spec):
    for i, n in _by_section(spec, "auth.form-mock"):
        note = _c(n).get("demoOnlyNote")
        low = note.lower() if isinstance(note, str) else ""
        if "demo" not in low or "not functional" not in low:
            ctx.report("AUTH_DEMO_NOTE_REQUIRED", "nodes[%d].content.demoOnlyNote" % i, "required screen-reader note must say the form is a demo and not functional, got %r" % note)


AUTH_BEHAVIOR = {"submit": "prevent-default", "network": "none", "credentialHandling": "none", "realIntegration": "project-supplied-only"}


@rule("AUTH_NO_CREDENTIAL_INTEGRATION", "error")
def r_auth_integration(ctx, spec):
    for i, n in _by_section(spec, "auth.form-mock"):
        if _c(n).get("behavior") != AUTH_BEHAVIOR:
            ctx.report("AUTH_NO_CREDENTIAL_INTEGRATION", "nodes[%d].content.behavior" % i, "behaviour must stay %s (static mock; no real credential handling)" % AUTH_BEHAVIOR)
        hrefs = []
        _hrefs(_c(n), "nodes[%d].content" % i, hrefs)
        for where, h in hrefs:
            if not h.startswith("/"):
                ctx.report("AUTH_NO_CREDENTIAL_INTEGRATION", where, "auth mock links only to internal routes; %r looks like an endpoint or provider URL" % h)
        out = []
        _strings(_c(n), "nodes[%d].content" % i, out)
        for where, s_ in out:
            if re.search(r"(https?:|wss?:)//", s_):
                ctx.report("AUTH_NO_CREDENTIAL_INTEGRATION", where, "no endpoint URL may appear in the auth mock")


@rule("AUTH_SWITCH_LINK", "error")
def r_auth_switch(ctx, spec):
    pair = {"/sign-in": "/sign-up", "/sign-up": "/sign-in"}
    for i, n in _by_section(spec, "auth.form-mock"):
        h = (_c(n).get("switchLink") or {}).get("href")
        if pair.get(spec.get("route")) != h:
            ctx.report("AUTH_SWITCH_LINK", "nodes[%d].content.switchLink.href" % i, "on %r the switch link goes to %r, got %r" % (spec.get("route"), pair.get(spec.get("route")), h))


# ------------------------------------------------------------------ api
def validate(spec, repo=REPO, overrides=None):
    ctx = Ctx(repo, overrides)
    for rid, r in RULES.items():
        r["fn"](ctx, spec)
    return ctx.errors, ctx.warnings


def schema_errors(spec, repo=REPO):
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        return None
    s = load_json("schema/pagespec.schema.json", repo)
    return [{"rule": "SCHEMA", "severity": "error", "path": "/".join(str(p) for p in e.absolute_path), "message": e.message[:200]}
            for e in Draft7Validator(s).iter_errors(spec)]


def example_files(repo=REPO):
    ex = os.path.join(repo, "schema/examples")
    return [os.path.join(repo, "schema/example.pagespec.json")] + sorted(os.path.join(ex, f) for f in os.listdir(ex) if f.endswith(".pagespec.json"))


def main(argv):
    files = argv or example_files()
    bad = 0
    for f in files:
        spec = json.load(open(f, encoding="utf-8"))
        se = schema_errors(spec)
        errs, warns = validate(spec)
        name = os.path.relpath(f, REPO) if os.path.abspath(f).startswith(REPO) else os.path.basename(f)
        print("%s: schema %s, semantic %d error(s), %d warning(s)" % (name, "skipped (jsonschema missing)" if se is None else "%d error(s)" % len(se), len(errs), len(warns)))
        for e in (se or []) + errs + warns:
            print("  [%s] %-24s %s: %s" % (e["severity"], e["rule"], e["path"], e["message"]))
        bad += len(errs) + len(se or [])
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
