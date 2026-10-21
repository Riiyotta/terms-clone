#!/usr/bin/env python3
"""One-shot verification for this design-repo. Prints PASS / WARN / FAIL per check;
exit 1 if any check FAILs (WARN never fails the run).

Checks
  json-parse            every *.json parses
  schema-draft7         pagespec.schema.json is valid Draft-07; every example (home + schema/examples/*) has 0 errors
  semantic-example      semantic validator: every example has 0 errors; one example per template
  allowlist-parity      allowlist ids <-> contract files (no phantom, no orphan); sections,
                        variants, node props, content fields, motion fields, templates, asset
                        roles and policies <-> schema <-> contracts <-> asset-roles.json
  allowlist-version     manifest.allowlistVersion == component-allowlist.json version (machine-checked)
  pagespec-version      manifest.pageSpecVersion == schema const == example (machine-checked)
  manifest-counts       manifest.counts recomputed from disk
  readme-counts         README.md counts block recomputed from disk
  entry-points          every entryPoint is a file INSIDE design-repo (no ../, no absolute path)
  no-absolute-paths     no absolute machine path anywhere in the repo
  evidence-ids          every evidence id used anywhere resolves in measured-values.json
  citations             every ref (../path:a-b + anchor) resolves against the source project:
                        file exists, range within file length, anchor inside the range;
                        file-exists refs exist. WARN (not fail) when no source tree is present.
  asset-roles           closed-enum closure + PINNED compliance-critical policies
  graph-validator       compatibility/graph.json rule ids and severities == semantic_validate.RULES
  template-contracts    template nodes agree with section contracts (variant tones, anchors, maxRepeat)
  route-coverage        route <-> template 1:1 across all routes; every template has a route;
                        routes.json == the <Route path> entries of ../src/App.jsx (WARN when the
                        source is absent)
  pending-build-routes  the pending-build mechanism: v1.1.0 has 0 pending routes; the list is
                        empty and identical in routes.json and the manifest, and no route is
                        unbound (any future pending route needs status pending-build, template
                        null, README mention)
  legal-operator-slots  PINNED: legal.intro requires every operator slot as a const binding token,
                        counsel review const, template.legal requiredProjectSlots and notice
  auth-mock             PINNED: auth.form-mock requires demoOnlyNote and const no-integration
                        behaviour; template.auth notice
  protected-content     no repo file contains terms.so long-form text (fingerprints)
  token-refs            catalog/policy/theme/semantic/component/layout/motion refs all resolve
  adversarial           schema/tests/adversarial_test.py exits 0

Usage: python3 extraction/verify_all.py [--source-root DIR] [--quick]
  --source-root  project root holding the cited evidence (default: env
                 DESIGN_REPO_SOURCE_ROOT, else the folder containing design-repo/)
  --quick        skip the adversarial suite (used by prove_drift.py)
Drift-proofing of these checks: extraction/prove_drift.py (it exists; run it).
"""
import json
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as sv  # noqa: E402

# Independent second copy of the compliance-critical asset policies: a membership-in-enum
# check cannot catch a swap to a different-but-valid policy (MASTER-GUIDE 3.23).
PINNED = {
    "brand.mark": "project-supplied-only",
    "social.og-image": "project-supplied-only",
    "demo.cursor": "generate-original",
    "font.ui-diatype": "licensed-font-required",
    "photo.studio-people": "never-reproduce-or-fabricate",
    "vendor.google-icon": "vendor-supplied-only",
}
# Independent copies of the legal / auth compliance contracts (same reasoning as PINNED).
OPERATOR_SLOTS = {"legalName": "{{operator.legalName}}", "postalAddress": "{{operator.postalAddress}}",
                  "country": "{{operator.country}}", "governingJurisdiction": "{{operator.governingJurisdiction}}"}
AUTH_BEHAVIOR = {"submit": "prevent-default", "network": "none", "credentialHandling": "none", "realIntegration": "project-supplied-only"}
# Built from fragments so this file does not match its own scan.
ABS_PATTERNS = ["/" + "Users/", "/" + "private/", "/" + "home/", "/" + "tmp/", "/" + "var/folders", "C:" + "\\", "file:" + "//"]

RESULTS = []


def res(name, status, detail=""):
    RESULTS.append((name, status, detail))
    print("%-21s %-4s %s" % (name, status, detail))


def J(rel):
    return sv.load_json(rel, REPO)


def all_files():
    for d, dirs, files in os.walk(REPO):
        dirs[:] = [x for x in dirs if x not in ("__pycache__", ".git")]
        for f in files:
            if f == ".DS_Store" or f.endswith(".pyc"):
                continue
            yield os.path.join(d, f)


def rel(p):
    return os.path.relpath(p, REPO)


def text(p):
    try:
        return open(p, encoding="utf-8").read()
    except UnicodeDecodeError:
        return None


def contract_files():
    out = {}
    for d in ("primitives", "components", "sections"):
        for f in sorted(os.listdir(os.path.join(REPO, d))):
            if f.endswith(".json"):
                out["%s/%s" % (d, f)] = J("%s/%s" % (d, f))
    return out


def schema_key(sec, var):
    return (sec + "__" + var).replace(".", "_").replace("-", "_")


# --------------------------------------------------------------------------
def c_json():
    bad = []
    for p in all_files():
        if p.endswith(".json"):
            try:
                json.load(open(p, encoding="utf-8"))
            except Exception as e:  # noqa: BLE001
                bad.append("%s: %s" % (rel(p), e))
    res("json-parse", "FAIL" if bad else "PASS", "; ".join(bad) or "all JSON parses")


def examples():
    return [(rel(f), json.load(open(f, encoding="utf-8"))) for f in sv.example_files(REPO)]


def c_schema():
    from jsonschema import Draft7Validator
    s = J("schema/pagespec.schema.json")
    try:
        Draft7Validator.check_schema(s)
    except Exception as e:  # noqa: BLE001
        return res("schema-draft7", "FAIL", "schema invalid: %s" % e)
    v = Draft7Validator(s)
    per = [(f, len(list(v.iter_errors(x)))) for f, x in examples()]
    bad = [p for p in per if p[1]]
    res("schema-draft7", "FAIL" if bad else "PASS", "%d example(s), %d Draft-07 error(s)%s" % (len(per), sum(n for _, n in per), (": " + str(bad)) if bad else ""))


def c_semantic():
    tpl = J("templates/templates.json")["templates"]
    probs, ne, nw, covered = [], 0, 0, set()
    for f, x in examples():
        errs, warns = sv.validate(x)
        ne += len(errs)
        nw += len(warns)
        covered.add(x.get("template"))
        if errs:
            probs.append("%s: %s" % (f, sorted({e["rule"] for e in errs})))
    missing = sorted(set(tpl) - covered)
    if missing:
        probs.append("templates without an example: %s" % missing)
    res("semantic-example", "FAIL" if probs else "PASS", "; ".join(probs) or "%d example(s) covering %d/%d templates: %d error(s), %d warning(s)" % (len(covered), len(covered & set(tpl)), len(tpl), ne, nw))


def c_allowlist():
    al = J("tokens/llm/component-allowlist.json")
    schema = J("schema/pagespec.schema.json")
    roles = J("assets/asset-roles.json")
    tpl = J("templates/templates.json")["templates"]
    d = schema["definitions"]
    probs = []
    files = contract_files()
    on_disk = {c["id"]: (f, c) for f, c in files.items()}
    listed = {e["id"]: e for e in al["entries"]}
    for i in sorted(set(listed) - set(on_disk)):
        probs.append("phantom allowlist entry %s (no contract file)" % i)
    for i in sorted(set(on_disk) - set(listed)):
        probs.append("orphan contract %s (%s) not in allowlist" % (i, on_disk[i][0]))
    for i, e in listed.items():
        if i not in on_disk:
            continue
        f, c = on_disk[i]
        if e["file"] != f or e["kind"] != c["kind"]:
            probs.append("%s: allowlist file/kind %s/%s != %s/%s" % (i, e["file"], e["kind"], f, c["kind"]))
        if e["instantiableInPageSpec"] != (c["kind"] == "section"):
            probs.append("%s: instantiableInPageSpec wrong" % i)
        if c["kind"] != "section":
            continue
        if sorted(e["settableNodeProperties"]) != sorted(d["node"]["properties"]):
            probs.append("%s: settableNodeProperties drift from schema node" % i)
        if sorted(e["variants"]) != sorted(c["variants"]):
            probs.append("%s: allowlist variants %s != contract %s" % (i, e["variants"], list(c["variants"])))
        for var, v in c["variants"].items():
            k = schema_key(i, var)
            sc = sorted(d.get("content_" + k, {}).get("properties", {}))
            if sorted(e["settableContentFieldsByVariant"].get(var, [])) != sc or sorted(v["content"]) != sc:
                probs.append("%s[%s]: content fields allowlist/contract/schema disagree" % (i, var))
            sm = sorted(d.get("motion_" + k, {}).get("properties", {}))
            if sorted(e["motionFieldsByVariant"].get(var, [])) != sm or sorted(v["motion"]) != sm:
                probs.append("%s[%s]: motion fields allowlist/contract/schema disagree" % (i, var))
            if d.get("motion_" + k, {}).get("additionalProperties") is not False:
                probs.append("%s[%s]: motion schema is not closed" % (i, var))
    if sorted(d["node"]["properties"]["section"]["enum"]) != sorted(i for i, e in listed.items() if e["kind"] == "section"):
        probs.append("schema section enum != allowlisted sections")
    if not (sorted(d["assetRole"]["enum"]) == sorted(al["assetRoles"]) == sorted(roles["roles"])):
        probs.append("assetRole enum drift: schema/allowlist/asset-roles disagree")
    if not (sorted(d["generationPolicy"]["enum"]) == sorted(al["generationPolicies"]) == sorted(roles["generationPolicies"])):
        probs.append("generationPolicy enum drift: schema/allowlist/asset-roles disagree")
    if sorted(al["pageSpecTopLevel"]) != sorted(schema["properties"]):
        probs.append("pageSpecTopLevel drift from schema")
    if not (sorted(al["templates"]) == sorted(schema["properties"]["template"]["enum"]) == sorted(tpl)):
        probs.append("template ids drift: allowlist/schema/templates.json disagree")
    res("allowlist-parity", "FAIL" if probs else "PASS", "; ".join(probs) or "%d entries <-> %d contract files; variants, fields, roles, policies in parity" % (len(listed), len(files)))


def c_versions():
    m = J("registry.manifest.json")
    al = J("tokens/llm/component-allowlist.json")
    res("allowlist-version", "PASS" if m["allowlistVersion"] == al["version"] else "FAIL", "manifest %s vs allowlist %s" % (m["allowlistVersion"], al["version"]))
    sc = J("schema/pagespec.schema.json")["properties"]["pageSpecVersion"]["const"]
    ex = J("schema/example.pagespec.json")["pageSpecVersion"]
    ok = m["pageSpecVersion"] == sc == ex
    exs = {f: x.get("pageSpecVersion") for f, x in examples()}
    ok = ok and set(exs.values()) == {sc}
    res("pagespec-version", "PASS" if ok else "FAIL", "manifest %s / schema const %s / %d examples %s" % (m["pageSpecVersion"], sc, len(exs), sorted(set(exs.values()))))


def count_leaves(o):
    if isinstance(o, dict):
        if "$value" in o:
            return 1
        return sum(count_leaves(v) for k, v in o.items() if not k.startswith("$"))
    return 0


def recount():
    t = 0
    for d in ("00-foundation", "10-semantic", "20-component", "30-layout"):
        for f in sorted(os.listdir(os.path.join(REPO, "tokens", d))):
            if f.endswith(".json"):
                t += count_leaves(J("tokens/%s/%s" % (d, f)))
    files = contract_files()
    kinds = [c["kind"] for c in files.values()]
    secs = [c for c in files.values() if c["kind"] == "section"]
    tpl = J("templates/templates.json")["templates"]
    routes = J("templates/routes.json")
    roles = J("assets/asset-roles.json")
    return {"tokens": t, "primitives": kinds.count("primitive"), "components": kinds.count("component"), "sections": len(secs),
            "sectionVariants": sum(len(c["variants"]) for c in secs), "templates": len(tpl), "routes": len(routes["routes"]),
            "pendingBuildRoutes": len(routes["pendingBuildRoutes"]), "assetRoles": len(roles["roles"]), "pinnedAssetRoles": len(roles["pinnedPolicies"]),
            "graphRules": len(J("compatibility/graph.json")["rules"]), "citations": len(J("extraction/measured-values.json")["citations"]),
            "copyFingerprints": len(J("schema/protected-content.json")["copyFingerprints"]["sha256"]),
            "themes": len([f for f in os.listdir(os.path.join(REPO, "tokens/themes")) if f.endswith(".json")]),
            "exampleSpecs": len(sv.example_files(REPO))}


def c_counts():
    m = J("registry.manifest.json")["counts"]
    real = recount()
    diff = ["%s: manifest %s != disk %s" % (k, m.get(k), v) for k, v in real.items() if m.get(k) != v]
    diff += ["%s: in manifest but not recomputed" % k for k in m if k not in real]
    res("manifest-counts", "FAIL" if diff else "PASS", "; ".join(diff) or json.dumps(real))


def c_readme_counts():
    txt = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    m = re.search(r"<!-- counts:start -->(.*?)<!-- counts:end -->", txt, re.S)
    if not m:
        return res("readme-counts", "FAIL", "README.md has no counts block")
    stated = {k: int(v) for k, v in re.findall(r"^\|\s*`?([A-Za-z]+)`?\s*\|\s*(\d+)\s*\|", m.group(1), re.M)}
    real = recount()
    diff = ["%s: README %s != disk %s" % (k, stated.get(k), v) for k, v in real.items() if stated.get(k) != v]
    res("readme-counts", "FAIL" if diff else "PASS", "; ".join(diff) or "README counts match disk")


def c_entry():
    m = J("registry.manifest.json")
    probs = []
    for name, p in m["entryPoints"].items():
        if p.startswith("/") or ".." in p.split("/") or re.match(r"^[A-Za-z]:", p):
            probs.append("%s -> %s points outside the package" % (name, p))
        elif not os.path.isfile(os.path.join(REPO, p)):
            probs.append("%s -> %s missing" % (name, p))
    res("entry-points", "FAIL" if probs else "PASS", "; ".join(probs) or "%d entry points, all files inside design-repo/" % len(m["entryPoints"]))


def c_paths():
    hits = []
    for p in all_files():
        txt = text(p)
        if txt is None:
            continue
        for pat in ABS_PATTERNS:
            if pat in txt:
                hits.append("%s contains %r" % (rel(p), pat))
    res("no-absolute-paths", "FAIL" if hits else "PASS", "; ".join(hits) or "no absolute machine paths in %d files" % len(list(all_files())))


EV_KEYS = ("evidence", "motionEvidence", "responsiveEvidence", "corroboratedBy", "between")


def _evidence_ids(o, out):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in EV_KEYS and isinstance(v, list):
                out.update(x for x in v if isinstance(x, str))
            else:
                _evidence_ids(v, out)
    elif isinstance(o, list):
        for v in o:
            _evidence_ids(v, out)


def c_evidence():
    mv = J("extraction/measured-values.json")
    known = set(mv["citations"]) | set(mv["qaCorrections"])
    used = set()
    for p in all_files():
        if p.endswith(".json"):
            _evidence_ids(json.load(open(p, encoding="utf-8")), used)
    missing = sorted(used - known)
    unused = sorted(set(mv["citations"]) - used)
    res("evidence-ids", "FAIL" if missing else "PASS", ("unresolved: %s" % missing[:10]) if missing else
        "%d evidence ids used, all resolve (%d citations not referenced elsewhere: %s)" % (len(used), len(unused), ", ".join(unused) or "none"))


def _resolve(ref, src_root):
    p = ref[3:] if ref.startswith("../") else ref
    return os.path.join(src_root, p)


def c_citations(src_root):
    cits = J("extraction/measured-values.json")["citations"]
    parsed = {}
    for cid, c in cits.items():
        if c.get("kind") == "file-exists":
            parsed[cid] = (c["ref"], None)
        else:
            m = re.match(r"^(.+):(\d+)-(\d+)$", c["ref"])
            parsed[cid] = (m.group(1), (int(m.group(2)), int(m.group(3)))) if m else (c["ref"], "bad")
    present = [cid for cid, (p, _) in parsed.items() if os.path.isfile(_resolve(p, src_root))]
    if not present:
        return res("citations", "WARN", "no source project at the source root: %d citations not resolvable here (standalone copy). Not a failure." % len(cits))
    probs, cache = [], {}
    for cid, (p, rng) in parsed.items():
        fp = _resolve(p, src_root)
        if rng == "bad":
            probs.append("%s: unparseable ref %r" % (cid, cits[cid]["ref"]))
            continue
        if not os.path.isfile(fp):
            probs.append("%s: %s missing" % (cid, p))
            continue
        if rng is None:
            continue
        if fp not in cache:
            ls = open(fp, encoding="utf-8").read().split("\n")
            cache[fp] = ls[:-1] if ls and ls[-1] == "" else ls
        ls = cache[fp]
        a, b = rng
        if a < 1 or b < a or b > len(ls):
            probs.append("%s: %s:%d-%d exceeds file length %d" % (cid, p, a, b, len(ls)))
        elif cits[cid]["anchor"] not in "\n".join(ls[a - 1:b]):
            probs.append("%s: anchor %r not inside %s:%d-%d (in-range but wrong lines, or the source drifted)" % (cid, cits[cid]["anchor"][:40], p, a, b))
    detail = "; ".join(probs[:8]) + (" (+%d more)" % (len(probs) - 8) if len(probs) > 8 else "")
    res("citations", "FAIL" if probs else "PASS", detail or "%d citations resolve (range + anchor, or file exists) against the source project" % len(cits))


def c_roles():
    roles = J("assets/asset-roles.json")
    schema = J("schema/pagespec.schema.json")
    probs = []
    pol = set(roles["generationPolicies"])
    for r, d in roles["roles"].items():
        if d["generationPolicy"] not in pol:
            probs.append("%s: policy %s not in the closed set" % (r, d["generationPolicy"]))
        if d["usableInPageSpec"] and d.get("reuseOfSourceFiles") != "forbidden":
            probs.append("%s: reuseOfSourceFiles must be 'forbidden' (real-company assets)" % r)
        if not d.get("sourceFiles"):
            probs.append("%s: no sourceFiles listed" % r)
    for r, want in PINNED.items():
        got = roles["roles"].get(r, {}).get("generationPolicy")
        if got != want:
            probs.append("PINNED %s must be %s, got %s" % (r, want, got))
    if roles.get("pinnedPolicies") != PINNED:
        probs.append("asset-roles.pinnedPolicies disagrees with verify_all PINNED")
    slot_roles = set()

    def walk(o):
        if isinstance(o, dict):
            if "allOf" in o and any(x.get("$ref") == "#/definitions/assetRole" for x in o["allOf"] if isinstance(x, dict)):
                for x in o["allOf"]:
                    slot_roles.update(x.get("enum", []))
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    walk(schema)
    usable = {r for r, d in roles["roles"].items() if d["usableInPageSpec"]}
    if slot_roles != usable:
        probs.append("roles usable in PageSpec %s != roles accepted by schema slots %s" % (sorted(usable), sorted(slot_roles)))
    for must in ("terms.so logo and brand marks must not be reproduced", "commercial licence for any public use", "real people", "long-form text", "third-party trademark"):
        if must not in json.dumps(roles, ensure_ascii=False):
            probs.append("asset-roles.json is missing the licensing statement %r" % must)
    res("asset-roles", "FAIL" if probs else "PASS", "; ".join(probs) or "%d roles closed across schema/allowlist/registry; %d pinned policies hold; %d roles reachable from schema slots" % (len(roles["roles"]), len(PINNED), len(slot_roles)))


def c_graph():
    g = {r["id"]: r["severity"] for r in J("compatibility/graph.json")["rules"]}
    v = {k: r["severity"] for k, r in sv.RULES.items()}
    probs = ["graph rule %s has no validator implementation" % x for x in sorted(set(g) - set(v))]
    probs += ["validator rule %s missing from graph" % x for x in sorted(set(v) - set(g))]
    probs += ["%s: graph severity %s != validator %s" % (k, g[k], v[k]) for k in sorted(set(g) & set(v)) if g[k] != v[k]]
    res("graph-validator", "FAIL" if probs else "PASS", "; ".join(probs) or "%d rules agree (ids + severities)" % len(g))


def c_templates():
    tpl = J("templates/templates.json")["templates"]
    secs = {c["id"]: c for c in contract_files().values() if c["kind"] == "section"}
    probs = []
    for tid, t in tpl.items():
        keys = [(n["section"], n["variant"]) for n in t["nodes"]]
        if len(keys) != len(set(keys)):
            probs.append("%s: duplicate (section, variant) node" % tid)
        for n in t["nodes"]:
            c = secs.get(n["section"])
            if not c or n["variant"] not in c["variants"]:
                probs.append("%s: no contract for %s[%s]" % (tid, n["section"], n["variant"]))
                continue
            cv = c["variants"][n["variant"]]
            if n["tone"] not in cv.get("tones", [c["tone"]]) or n["region"] != c["region"] or n["anchorId"] != cv["anchorId"]:
                probs.append("%s: %s[%s] tone/region/anchorId drift from contract" % (tid, n["section"], n["variant"]))
            if n.get("repeatable") and not isinstance(n.get("maxRepeat"), int):
                probs.append("%s: repeatable node %s[%s] has no maxRepeat" % (tid, n["section"], n["variant"]))
        firsts = [n for n in t["nodes"] if n.get("position") == "first"]
        lasts = [n for n in t["nodes"] if n.get("position") == "last"]
        if firsts and t["nodes"][0] is not firsts[0] or lasts and t["nodes"][-1] is not lasts[0]:
            probs.append("%s: position first/last nodes are not at the ends" % tid)
    res("template-contracts", "FAIL" if probs else "PASS", "; ".join(probs) or "%d templates agree with %d section contracts (variant tones, anchors, maxRepeat)" % (len(tpl), len(secs)))


def c_route_coverage(src_root):
    tpl = J("templates/templates.json")["templates"]
    routes = J("templates/routes.json")["routes"]
    probs = []
    paths = [r["path"] for r in routes]
    for p in sorted({p for p in paths if paths.count(p) > 1}):
        probs.append("route %s listed more than once in routes.json" % p)
    for r in routes:
        owners = [tid for tid, t in tpl.items() if r["path"] in t["routes"]]
        if r.get("template") not in tpl:
            probs.append("route %s bound to non-existent template %r" % (r["path"], r.get("template")))
        if len(owners) != 1 or r.get("template") not in owners:
            probs.append("route %s: templates.json owners %s, routes.json says %r" % (r["path"], owners, r.get("template")))
        if r.get("status") != "built":
            probs.append("route %s status %r != 'built'" % (r["path"], r.get("status")))
    for tid, t in tpl.items():
        if not t["routes"]:
            probs.append("template %s has no route" % tid)
        for p in t["routes"]:
            if p not in paths:
                probs.append("template %s route %s missing from routes.json" % (tid, p))
    app = os.path.join(src_root, "src/App.jsx")
    src_note = "source App.jsx absent: route list not cross-checked against the router (standalone copy)"
    status = "FAIL" if probs else "PASS"
    if os.path.isfile(app):
        mounted = re.findall(r'<Route\s+path="([^"]+)"', open(app, encoding="utf-8").read())
        if sorted(mounted) != sorted(paths):
            probs.append("routes.json %s != App.jsx <Route> paths %s" % (sorted(paths), sorted(mounted)))
            status = "FAIL"
        src_note = "routes.json == the %d <Route> paths in src/App.jsx" % len(mounted)
    elif not probs:
        status = "WARN"
    ia = os.path.join(src_root, "ia.json")
    if os.path.isfile(ia):
        it = json.load(open(ia, encoding="utf-8")).get("templates", [])
        it = it.values() if isinstance(it, dict) else it
        ia_map = {x.get("id"): sorted(x.get("routes", [])) for x in it}
        ours = {tid: sorted(t["routes"]) for tid, t in tpl.items()}
        if ia_map != ours:
            probs.append("templates/routes differ from ../ia.json: ia %s vs repo %s" % (ia_map, ours))
            status = "FAIL"
        else:
            src_note += "; template ids and routes == ../ia.json (%d templates)" % len(ia_map)
    res("route-coverage", status, "; ".join(probs) or "%d routes <-> %d templates, each route bound to exactly one template; %s" % (len(paths), len(tpl), src_note))


def c_pending():
    rj = J("templates/routes.json")
    tpl = J("templates/templates.json")["templates"]
    man = J("registry.manifest.json")
    readme = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    probs = []
    pend = rj["pendingBuildRoutes"]
    built = {r["path"] for r in rj["routes"]}
    bound = {p for t in tpl.values() for p in t["routes"]}
    for p in sorted(built - bound):
        probs.append("%s is listed as built but no template binds it (unbound route)" % p)
    if pend:
        probs.append("v1.1.0 expects 0 pending-build routes, found %d (%s): build and bind them, or update this release's scope" % (len(pend), " ".join(r["path"] for r in pend)))
    for r in pend:
        if r.get("status") != "pending-build":
            probs.append("%s: status %r != 'pending-build'" % (r["path"], r.get("status")))
        if r.get("template") is not None:
            probs.append("%s: pending-build route has a template binding %r" % (r["path"], r["template"]))
        if r["path"] in built:
            probs.append("%s: listed as both built and pending-build" % r["path"])
        if r["path"] in bound:
            probs.append("%s: pending-build route is bound by a template" % r["path"])
        if "`%s`" % r["path"] not in readme:
            probs.append("%s: not named in README's pending-build note" % r["path"])
    slim = lambda xs: [(x["path"], x["status"], x.get("template")) for x in xs]  # noqa: E731
    if slim(man.get("pendingBuildRoutes", [])) != slim(pend):
        probs.append("manifest.pendingBuildRoutes != routes.json pendingBuildRoutes")
    res("pending-build-routes", "FAIL" if probs else "PASS", "; ".join(probs) or
        "0 pending-build routes (routes.json and manifest agree); all %d built routes are bound, none unbound" % len(built))


def c_legal_slots():
    probs = []
    c = J("sections/legal-intro.json")
    v = c["variants"].get("title-updated-intro", {})
    op = v.get("content", {}).get("operator", {})
    fields = op.get("fields", {}) if op.get("type") == "object" else {}
    for k, tok in OPERATOR_SLOTS.items():
        f = fields.get(k)
        if not f or f.get("type") != "const" or f.get("value") != tok:
            probs.append("legal.intro operator.%s must be the const slot %r" % (k, tok))
    if sorted(fields) != sorted(OPERATOR_SLOTS):
        probs.append("legal.intro operator fields %s != pinned %s" % (sorted(fields), sorted(OPERATOR_SLOTS)))
    cr = v.get("content", {}).get("counselReview", {})
    if cr.get("value") != "required-before-publication":
        probs.append("legal.intro counselReview must be const 'required-before-publication'")
    sch = J("schema/pagespec.schema.json")["definitions"].get("content_legal_intro__title_updated_intro", {})
    sop = sch.get("properties", {}).get("operator", {})
    if sorted(sop.get("required", [])) != sorted(OPERATOR_SLOTS) or any(sop.get("properties", {}).get(k, {}).get("const") != tok for k, tok in OPERATOR_SLOTS.items()):
        probs.append("schema operator slots are not all required const tokens")
    if "operator" not in sch.get("required", []) or "counselReview" not in sch.get("required", []):
        probs.append("schema: legal.intro must require operator and counselReview")
    t = J("templates/templates.json")["templates"].get("template.legal", {})
    if sorted(t.get("requiredProjectSlots", [])) != sorted("operator." + k for k in OPERATOR_SLOTS):
        probs.append("template.legal requiredProjectSlots %s != pinned slots" % t.get("requiredProjectSlots"))
    for must in ("counsel-reviewed", "not legal advice", "never invent"):
        if must not in t.get("legalNotice", ""):
            probs.append("template.legal legalNotice lacks %r" % must)
    res("legal-operator-slots", "FAIL" if probs else "PASS", "; ".join(probs) or "%d required project-supplied operator slots pinned in contract, schema and template; counsel-review const and notice present" % len(OPERATOR_SLOTS))


def c_auth():
    probs = []
    c = J("sections/auth-form-mock.json")
    v = c["variants"].get("email-first", {})
    content = v.get("content", {})
    if content.get("demoOnlyNote", {}).get("type") != "text":
        probs.append("auth.form-mock has no demoOnlyNote field")
    beh = content.get("behavior", {}).get("fields", {})
    got = {k: f.get("value") for k, f in beh.items() if f.get("type") == "const"}
    if got != AUTH_BEHAVIOR:
        probs.append("auth.form-mock behaviour consts %s != pinned %s" % (got, AUTH_BEHAVIOR))
    sch = J("schema/pagespec.schema.json")["definitions"].get("content_auth_form_mock__email_first", {})
    if "demoOnlyNote" not in sch.get("required", []) or "behavior" not in sch.get("required", []):
        probs.append("schema: auth.form-mock must require demoOnlyNote and behavior")
    t = J("templates/templates.json")["templates"].get("template.auth", {})
    for must in ("Static, non-functional mock", "forbidden", "demo-only"):
        if must not in t.get("authNotice", ""):
            probs.append("template.auth authNotice lacks %r" % must)
    res("auth-mock", "FAIL" if probs else "PASS", "; ".join(probs) or "demoOnlyNote required; behaviour pinned %s; template notice present" % "/".join(AUTH_BEHAVIOR.values()))


def _strings(o, out):
    if isinstance(o, str):
        out.append(o)
    elif isinstance(o, dict):
        for v in o.values():
            _strings(v, out)
    elif isinstance(o, list):
        for v in o:
            _strings(v, out)


def c_protected():
    pc = J("schema/protected-content.json")
    fps = set(pc["copyFingerprints"]["sha256"])
    minw = pc["copyFingerprints"]["minWords"]
    hits = []
    for p in all_files():
        txt = text(p)
        if txt is None:
            continue
        cands = []
        if p.endswith(".json"):
            _strings(json.loads(txt), cands)
        cands += re.findall(r"[\"“']([^\"”'\n]{8,400})[\"”']", txt)
        cands += [x.strip(" -*>|`") for x in re.split(r"\n", txt)]
        more = []
        for s in cands:
            more += [x for x in re.split(r"(?<=[.;?!])\s+", s) if len(x.split()) >= minw]
        for s in cands + more:
            if len(s.split()) >= minw and sv.fingerprint(s) in fps:
                hits.append("%s: terms.so long-form text (sha256 %s..., %d words; text not echoed)" % (rel(p), sv.fingerprint(s)[:12], len(s.split())))
    res("protected-content", "FAIL" if hits else "PASS", "; ".join(sorted(set(hits))[:6]) or "no terms.so long-form text in the repo (%d fingerprints)" % len(fps))


def foundation_ids():
    flat = set()
    for f in sorted(os.listdir(os.path.join(REPO, "tokens/00-foundation"))):
        d = J("tokens/00-foundation/" + f)

        def walk(o, path):
            if isinstance(o, dict):
                if "$value" in o:
                    flat.add(path)
                    return
                for k, v in o.items():
                    if not k.startswith("$"):
                        walk(v, (path + "." + k) if path else k)
        walk(d, "")
    return flat


def c_tokens():
    probs = []
    flat = foundation_ids()
    cat = J("tokens/llm/token-catalog.json")
    pol = J("tokens/llm/token-policy.json")
    cat_ids = {i for ids in cat["categories"].values() for i in ids}
    if cat_ids != flat:
        probs.append("catalog ids != foundation tokens (%d missing, %d extra)" % (len(flat - cat_ids), len(cat_ids - flat)))
    if sorted(pol["rawValueRestrictions"]) != sorted(cat["categories"]):
        probs.append("token-policy categories != catalog keys")
    sem = J("tokens/10-semantic/semantic.json")["tone"]
    themes = [f[:-5] for f in os.listdir(os.path.join(REPO, "tokens/themes")) if f.endswith(".json")]
    for th in themes:
        rs = J("tokens/themes/%s.json" % th)["resolve"]
        if sorted(rs) != sorted(sem):
            probs.append("theme %s roles != semantic roles" % th)
        for role, ref in rs.items():
            if ref.strip("{}") not in flat:
                probs.append("theme %s %s -> %s unresolved" % (th, role, ref))
    man = J("registry.manifest.json")
    if sorted(themes) != sorted(man["themes"]) or man["defaultTheme"] not in themes or sorted(man["schemaValidatedThemes"]) != sorted(J("schema/pagespec.schema.json")["definitions"]["node"]["properties"]["tone"]["enum"]):
        probs.append("manifest themes / defaultTheme / schemaValidatedThemes drift from tokens/themes and the schema tone enum")
    nref = 0
    for d in ("00-foundation", "20-component", "30-layout"):
        for f in sorted(os.listdir(os.path.join(REPO, "tokens", d))):
            for r in re.findall(r"\{([a-zA-Z][a-zA-Z0-9.]*)\}", open(os.path.join(REPO, "tokens", d, f), encoding="utf-8").read()):
                nref += 1
                if r not in flat:
                    probs.append("%s/%s: ref {%s} unresolved" % (d, f, r))
    for c in contract_files().values():
        if c["kind"] != "section":
            continue
        for var, v in c["variants"].items():
            for k, val in v["motion"].items():
                if k.endswith("Token"):
                    nref += 1
                    if val not in flat:
                        probs.append("%s[%s].motion.%s -> %s unresolved" % (c["id"], var, k, val))
    res("token-refs", "FAIL" if probs else "PASS", "; ".join(probs[:6]) or "%d foundation tokens; %d refs (themes, component, layout, motion tokens, section motion) resolve; catalog/policy in parity" % (len(flat), nref))


def c_adversarial():
    r = subprocess.run([sys.executable, os.path.join(REPO, "schema/tests/adversarial_test.py")], capture_output=True, text=True)
    last = [l for l in r.stdout.splitlines() if l.startswith("SUMMARY")]
    res("adversarial", "PASS" if r.returncode == 0 else "FAIL", last[0] if last else r.stderr[-300:])


def main(argv):
    src_root = os.environ.get("DESIGN_REPO_SOURCE_ROOT") or os.path.dirname(REPO)
    if "--source-root" in argv:
        src_root = argv[argv.index("--source-root") + 1]
    print("design-repo: %s   source root: %s" % (os.path.basename(REPO), "(given)" if "--source-root" in argv else "(parent of design-repo)"))
    c_json(); c_schema(); c_semantic(); c_allowlist(); c_versions(); c_counts(); c_readme_counts(); c_entry(); c_paths()
    c_evidence(); c_citations(src_root); c_roles(); c_graph(); c_templates(); c_route_coverage(src_root); c_pending(); c_legal_slots(); c_auth(); c_protected(); c_tokens()
    if "--quick" not in argv:
        c_adversarial()
    f = [n for n, s, _ in RESULTS if s == "FAIL"]
    w = [n for n, s, _ in RESULTS if s == "WARN"]
    print("\nRESULT: %s  (%d checks, %d FAIL, %d WARN)" % ("FAIL" if f else "PASS", len(RESULTS), len(f), len(w)))
    return 1 if f else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
