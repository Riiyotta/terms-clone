#!/usr/bin/env python3
"""Adversarial suite: every rule must reject a mutated instance, and every control
must pass with zero errors (a validator that rejects everything is as broken as
one that rejects nothing).

Controls: one PageSpec synthesised generically per template route in templates.json
(built from the template's own node list with node bodies borrowed from any example,
so a new template is covered with no new code), every unmodified example (home +
schema/examples/*), and a required-nodes-only variation.

Each mutation asserts that a SPECIFIC rule code fires; "SCHEMA" = the Draft-07
layer. Usage: python3 schema/tests/adversarial_test.py   (exit 1 on any failure)
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as sv  # noqa: E402

EXAMPLE = sv.load_json("schema/example.pagespec.json")
EXAMPLES = {os.path.basename(f).split(".")[0]: json.load(open(f, encoding="utf-8")) for f in sv.example_files(REPO)}
EX_BY_TEMPLATE = {x["template"]: x for x in EXAMPLES.values()}
TEMPLATES = sv.load_json("templates/templates.json")["templates"]


def codes(spec, overrides=None):
    se = sv.schema_errors(spec)
    if se is None:
        print("FATAL: jsonschema is required for the adversarial suite (pip install jsonschema)")
        sys.exit(2)
    errs, warns = sv.validate(spec, overrides=overrides)
    return [e["rule"] for e in se + errs], [w["rule"] for w in warns]


def node(spec, section, variant=None):
    for n in spec["nodes"]:
        if n["section"] == section and (variant is None or n["variant"] == variant):
            return n
    raise KeyError((section, variant))


def mutate(fn, base=None):
    s = copy.deepcopy(EXAMPLES[base] if base else EXAMPLE)
    fn(s)
    return s


# ------------------------------------------------------------------ controls
def synth_control(tid, route=None):
    """Generic: built from the template's own node list, with node bodies borrowed from ANY example
    (so a new template is covered with no new code). Repeatable nodes get one instance and a fresh slug.
    Route-dependent fields (nav currentHref, auth switch link) follow the chosen route."""
    t = TEMPLATES[tid]
    bodies = {}
    for x in EXAMPLES.values():
        for n in x["nodes"]:
            bodies.setdefault((n["section"], n["variant"]), n)
    base = EX_BY_TEMPLATE.get(tid, EXAMPLE)
    s = copy.deepcopy(base)
    s["template"], s["route"] = tid, route or t["routes"][0]
    s["nodes"] = []
    for k, tn in enumerate(t["nodes"]):
        b = copy.deepcopy(bodies[(tn["section"], tn["variant"])])
        b.update(tone=tn["tone"], anchorId=("synth-%d" % k) if tn["anchorId"] == sv.PER_INSTANCE else tn["anchorId"])
        c = b["content"]
        if "currentHref" in c:
            c["currentHref"] = s["route"]
            for l in c["links"]:
                l["emphasis"] = "bright" if l["href"] == s["route"] or l["href"] in ("/sign-in", "/sign-up") else "muted"
        if tn["section"] == "auth.form-mock":
            c["switchLink"]["href"] = {"/sign-in": "/sign-up", "/sign-up": "/sign-in"}[s["route"]]
        s["nodes"].append(b)
    return s


def required_only():
    s = copy.deepcopy(EXAMPLE)
    req = {(n["section"], n["variant"]) for n in TEMPLATES["template.home"]["nodes"] if n["required"]}
    s["nodes"] = [n for n in s["nodes"] if (n["section"], n["variant"]) in req]
    return s


CONTROLS = [("synthesised control for %s %s" % (tid, r), synth_control(tid, r)) for tid in TEMPLATES for r in TEMPLATES[tid]["routes"]]
CONTROLS += [("unmodified example %s" % k, copy.deepcopy(x)) for k, x in EXAMPLES.items()]
CONTROLS += [("required nodes only (questions + comments omitted)", required_only())]


# ------------------------------------------------------------------ mutations
def _m_dup_draft(s):
    s["nodes"].insert(3, copy.deepcopy(node(s, "feature.demo-card", "draft")))


def _m_drop(section, variant=None):
    def f(s):
        s["nodes"] = [n for n in s["nodes"] if not (n["section"] == section and (variant is None or n["variant"] == variant))]
    return f


def _m_footer_before_demos(s):
    f = s["nodes"].pop()
    s["nodes"].insert(2, f)


def _m_swap_demos(s):
    s["nodes"][3], s["nodes"][4] = s["nodes"][4], s["nodes"][3]


def _stub_template_without_comments():
    t = copy.deepcopy(TEMPLATES)
    t["template.home"]["nodes"] = [n for n in t["template.home"]["nodes"] if n["variant"] != "comments"]
    return {"templates": t}


def _protected_with_example_footer():
    p = sv.load_json("schema/protected-content.json")
    p = copy.deepcopy(p)
    p["copyFingerprints"]["sha256"].append(sv.fingerprint(node(EXAMPLE, "shell.footer")["content"]["description"]))
    return {"protected": p}


MUTATIONS = [
    # --- schema layer
    ("schema: wrong enum (tone 'dark')", "SCHEMA", lambda s: node(s, "shell.nav").update(tone="dark"), None),
    ("schema: missing required field (node.anchorId)", "SCHEMA", lambda s: node(s, "hero.typewriter-home").pop("anchorId"), None),
    ("schema: missing required content field (draft composer.prompt)", "SCHEMA", lambda s: node(s, "feature.demo-card", "draft")["content"]["composer"].pop("prompt"), None),
    ("schema: invented section type 'hero.video-hero'", "SCHEMA", lambda s: node(s, "hero.typewriter-home").update(section="hero.video-hero"), None),
    ("schema: invented demo variant 'pricing'", "SCHEMA", lambda s: node(s, "feature.demo-card", "comments").update(variant="pricing"), None),
    ("schema: missing reducedMotionFallback", "SCHEMA", lambda s: node(s, "feature.demo-card", "questions")["motion"].pop("reducedMotionFallback"), None),
    ("semantic: missing reducedMotionFallback also caught by validator", "REDUCED_MOTION_REQUIRED", lambda s: node(s, "feature.demo-card", "questions")["motion"].pop("reducedMotionFallback"), None),
    ("schema: invented motion field 'parallax'", "SCHEMA", lambda s: node(s, "hero.typewriter-home")["motion"].update(parallax=True), None),
    ("semantic: invented motion field also caught by validator", "MOTION_MATCHES_CONTRACT", lambda s: node(s, "hero.typewriter-home")["motion"].update(parallax=True), None),
    ("schema: const-locked loop length changed (20000 -> 18000)", "SCHEMA", lambda s: node(s, "feature.demo-card", "draft")["motion"].update(loopMs=18000), None),
    ("schema: Watch a demo turned into a video link", "SCHEMA", lambda s: node(s, "hero.typewriter-home")["content"]["demoCta"].update(href="#video"), None),
    ("schema: headline line 4 tone changed to brand-muted", "SCHEMA", lambda s: node(s, "hero.typewriter-home")["content"]["headline"][3].update(tone="brand-muted"), None),
    ("schema: fourth recent-contract row added", "SCHEMA", lambda s: node(s, "feature.demo-card", "draft")["content"]["recents"]["items"].append(
        copy.deepcopy(node(s, "feature.demo-card", "draft")["content"]["recents"]["items"][0])), None),
    # --- structure
    ("structure: duplicate one-per-page (hero twice)", "NO_REPEAT", lambda s: s["nodes"].insert(2, copy.deepcopy(node(s, "hero.typewriter-home"))), None),
    ("structure: duplicate (section, variant) (draft demo twice)", "NO_REPEAT", _m_dup_draft, None),
    ("structure: removed mandatory section (footer)", "TEMPLATE_REQUIRED_NODES", _m_drop("shell.footer"), None),
    ("structure: removed mandatory variant (draft demo)", "TEMPLATE_REQUIRED_NODES", _m_drop("feature.demo-card", "draft"), None),
    ("structure: removed draft breaks the hero's #draft link", "ANCHOR_LINK_RESOLVES", _m_drop("feature.demo-card", "draft"), None),
    ("structure: reordered fixed position (footer moved before demos)", "POSITION_FIXED", _m_footer_before_demos, None),
    ("structure: reordered fixed position also breaks order", "TEMPLATE_NODE_ORDER", _m_footer_before_demos, None),
    ("structure: demo variants reordered (comments before questions)", "TEMPLATE_NODE_ORDER", _m_swap_demos, None),
    ("structure: template/node mismatch (declared template's real node list lacks the comments node)", "TEMPLATE_UNKNOWN_NODE", lambda s: None, _stub_template_without_comments),
    ("structure: template/node mismatch (unknown template id)", "ROUTE_MATCHES_TEMPLATE", lambda s: s.update(template="template.pricing"), None),
    ("structure: route not in the declared template", "ROUTE_MATCHES_TEMPLATE", lambda s: s.update(route="/pricing"), None),
    ("structure: anchorId does not match template", "ANCHOR_ID_MATCH", lambda s: node(s, "feature.demo-card", "questions").update(anchorId="ask"), None),
    ("structure: tone does not match template (nav on surface)", "TONE_MATCHES_TEMPLATE", lambda s: node(s, "shell.nav").update(tone="surface"), None),
    ("links: unknown internal route", "INTERNAL_LINK_KNOWN", lambda s: node(s, "shell.nav")["content"]["links"][0].update(href="/blog"), None),
    # --- content
    ("content: maxWords overflow (headline line 4, 6 short words)", "MAX_WORDS", lambda s: node(s, "hero.typewriter-home")["content"]["headline"][3].update(text="Do it now and be done."), None),
    ("content: maxWords overflow (demo subtitle)", "MAX_WORDS", lambda s: node(s, "feature.demo-card", "questions")["content"]["frame"].update(
        subtitle="Find any date or detail in your agreements fast, with the cited source always right at hand."), None),
    ("content: maxChars overflow (nav label)", "MAX_CHARS", lambda s: node(s, "shell.nav")["content"]["links"][0].update(label="Customers"), None),
    ("content: typed prompt cannot finish before 'sending'", "TYPED_TEXT_FITS_TIMELINE", lambda s: node(s, "feature.demo-card", "draft")["content"]["composer"].update(
        prompt="Draft a design agreement with Acme for twelve thousand dollars over six weeks, half upfront, rest on delivery."), None),
    ("content: terms.so long-form reused (fingerprint mechanism)", "PROTECTED_LONGFORM", lambda s: None, _protected_with_example_footer),
    ("content: source brand name", "BRAND_NOT_SOURCE", lambda s: s["brand"].update(name="Terms"), None),
    ("content: source domain in a link", "BRAND_NOT_SOURCE", lambda s: node(s, "shell.footer")["content"]["groups"][1]["links"][1].update(href="mailto:support@terms.so"), None),
    # --- assets
    ("assets: invented assetRole 'brand.wordmark'", "SCHEMA", lambda s: node(s, "shell.nav")["content"]["brandMark"].update(assetRole="brand.wordmark"), None),
    ("assets: valid role in the wrong slot (ui.icon as the brand mark)", "ASSET_ROLE_ALLOWED", lambda s: node(s, "shell.nav")["content"]["brandMark"].update(assetRole="ui.icon", generationPolicy="generate-original"), None),
    ("assets: re-pinned policy (brand.mark -> generate-original, a valid value)", "ASSET_POLICY_PINNED", lambda s: node(s, "shell.nav")["content"]["brandMark"].update(generationPolicy="generate-original"), None),
    ("assets: re-pinned policy (demo.cursor -> project-supplied-only, a valid value)", "ASSET_POLICY_PINNED", lambda s: node(s, "feature.demo-card", "comments")["content"]["cursor"].update(generationPolicy="project-supplied-only"), None),
    ("assets: source file reused (logo-mark.svg)", "ASSET_REF_NOT_SOURCE", lambda s: node(s, "shell.footer")["content"]["brandMark"].update(assetRef="icons/logo-mark.svg"), None),
]


# ------------------------------------------------------------------ v1.1.0 sub-route mutations
def drop(section):
    def f(s):
        s["nodes"] = [n for n in s["nodes"] if n["section"] != section]
    return f


def foreign_node(section, variant, src):
    """template/node mismatch: insert a valid node of another template."""
    def f(s):
        n = copy.deepcopy(node(EXAMPLES[src], section, variant))
        s["nodes"].insert(1, n)
    return f


def setp(section, path, value, variant=None):
    def f(s):
        o = node(s, section, variant)
        for k in path[:-1]:
            o = o[k]
        if value is DEL:
            o.pop(path[-1])
        else:
            o[path[-1]] = value
    return f


DEL = object()
LONG = lambda n: [{"text": " ".join(["word"] * n), "href": None, "mark": "none"}]
MEDIA = lambda role, pol: {"assetRole": role, "assetRef": "x/y.png", "generationPolicy": pol, "alt": ""}

SUB_MUTATIONS = [
    # template/node mismatch, one per new template (a valid node of ANOTHER template)
    ("about: template/node mismatch (plan cards on /about)", "TEMPLATE_UNKNOWN_NODE", "about", foreign_node("pricing.plan-cards", "four-plans", "pricing")),
    ("pricing: template/node mismatch (photo stack on /pricing)", "TEMPLATE_UNKNOWN_NODE", "pricing", foreign_node("media.photo-stack", "three-cards", "about")),
    ("changelog: template/node mismatch (docs section on /changelog)", "TEMPLATE_UNKNOWN_NODE", "changelog", foreign_node("docs.section", "prose-blocks", "docs")),
    ("docs: template/node mismatch (changelog releases on /docs)", "TEMPLATE_UNKNOWN_NODE", "docs", foreign_node("changelog.releases", "dated-list", "changelog")),
    ("legal: template/node mismatch (landing footer on /privacy)", "TEMPLATE_UNKNOWN_NODE", "legal-privacy", foreign_node("shell.footer", "brand-two-groups-subpage", "about")),
    ("auth: template/node mismatch (app header on /sign-in)", "TEMPLATE_UNKNOWN_NODE", "auth-sign-in", foreign_node("shell.app-header", "centered-logo", "legal-privacy")),
    ("about: wrong nav variant for the shell (home on-hero)", "TEMPLATE_UNKNOWN_NODE", "about", setp("shell.nav", ["variant"], "on-hero")),
    # missing required section, per new template
    ("about: missing required section (photo stack)", "TEMPLATE_REQUIRED_NODES", "about", drop("media.photo-stack")),
    ("pricing: missing required section (plan cards)", "TEMPLATE_REQUIRED_NODES", "pricing", drop("pricing.plan-cards")),
    ("changelog: missing required section (releases)", "TEMPLATE_REQUIRED_NODES", "changelog", drop("changelog.releases")),
    ("docs: missing required section (every docs.section)", "TEMPLATE_REQUIRED_NODES", "docs", drop("docs.section")),
    ("legal: missing required section (contents card)", "TEMPLATE_REQUIRED_NODES", "legal-privacy", drop("legal.contents")),
    ("legal: missing required section (legal.intro also loses the operator slots)", "LEGAL_OPERATOR_SLOTS", "legal-privacy", drop("legal.intro")),
    ("auth: missing required section (empty page)", "SCHEMA", "auth-sign-in", lambda s: s.update(nodes=[])),
    # maxWords overflow, per new section family
    ("about: maxWords overflow (intro lead 17 > 16)", "MAX_WORDS", "about", setp("hero.typewriter-intro", ["content", "intro", "lead"], LONG(17))),
    ("about: maxWords overflow (table row body 90 > 89)", "MAX_WORDS", "about", lambda s: node(s, "about.safety-table")["content"]["table"]["rows"][0].update(body=LONG(90))),
    ("pricing: maxWords overflow (tokens line 10 > 9)", "MAX_WORDS", "pricing", lambda s: node(s, "pricing.plan-cards")["content"]["plans"][0].update(tokens="one two three four five six seven eight nine ten")),
    ("changelog: maxWords overflow (entry body 35 > 34)", "MAX_WORDS", "changelog", lambda s: node(s, "changelog.releases")["content"]["releases"][0]["entries"][0].update(body=LONG(35))),
    ("docs: maxWords overflow (paragraph block 103 > 102)", "MAX_WORDS", "docs", lambda s: node(s, "docs.section")["content"]["blocks"][0].update(text=LONG(103))),
    ("legal: maxWords overflow (section paragraph 128 > 127)", "MAX_WORDS", "legal-privacy", lambda s: node(s, "legal.section")["content"]["blocks"][0].update(text=LONG(128))),
    ("auth: maxWords overflow (subtitle 10 > 9)", "MAX_WORDS", "auth-sign-in", setp("auth.form-mock", ["content", "subtitle"], "one two three four five six seven eight nine ten")),
    # invented asset role / wrong role / re-pinned policy
    ("about: invented assetRole on a photo slot", "SCHEMA", "about", lambda s: node(s, "media.photo-stack")["content"]["photos"][0].update(assetRole="photo.ai-team")),
    ("about: AI-generated stand-in for the real-people photo role (re-pinned policy)", "ASSET_POLICY_PINNED", "about", lambda s: node(s, "media.photo-stack")["content"]["photos"][0].update(generationPolicy="generate-original")),
    ("about: source photo file reused", "ASSET_REF_NOT_SOURCE", "about", lambda s: node(s, "media.photo-stack")["content"]["photos"][1].update(assetRef="about/studio-table.jpg")),
    ("auth: invented assetRole on the provider icon", "SCHEMA", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["social"][0].update(icon=MEDIA("vendor.apple-icon", "vendor-supplied-only"))),
    ("auth: Google icon re-pinned to generate-original (a valid value)", "ASSET_POLICY_PINNED", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["social"][0]["icon"].update(generationPolicy="generate-original")),
    ("auth: Google icon copied from the source site", "ASSET_REF_NOT_SOURCE", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["social"][0]["icon"].update(assetRef="auth/google.svg")),
    ("legal: wrong role in the app-header mark slot", "SCHEMA", "legal-privacy", lambda s: node(s, "shell.app-header")["content"].update(brandMark=MEDIA("ui.icon", "generate-original"))),
    # invented motion field, per new section family
    ("about: invented motion field on the photo stack (parallax)", "SCHEMA", "about", lambda s: node(s, "media.photo-stack")["motion"].update(parallax=True)),
    ("pricing: card hover turned on (const-locked)", "SCHEMA", "pricing", lambda s: node(s, "pricing.plan-cards")["motion"].update(cardHover=True)),
    ("changelog: invented motion field (scrollSpy)", "MOTION_MATCHES_CONTRACT", "changelog", lambda s: node(s, "changelog.releases")["motion"].update(scrollSpy=True)),
    ("legal: contents card made sticky", "SCHEMA", "legal-privacy", lambda s: node(s, "legal.contents")["motion"].update(sticky=True)),
    ("auth: page motion added", "SCHEMA", "auth-sign-in", lambda s: node(s, "auth.form-mock")["motion"].update(pageMotion=True)),
    ("pricing: typewriter reduced-motion fallback changed", "REDUCED_MOTION_REQUIRED", "pricing", lambda s: node(s, "hero.typewriter-intro")["motion"].update(reducedMotionFallback="fade-in")),
    # legal operator slots / counsel review
    ("legal: missing operator slot (governingJurisdiction)", "SCHEMA", "legal-privacy", lambda s: node(s, "legal.intro")["content"]["operator"].pop("governingJurisdiction")),
    ("legal: missing operator slot also caught by the validator", "LEGAL_OPERATOR_SLOTS", "legal-privacy", lambda s: node(s, "legal.intro")["content"]["operator"].pop("postalAddress")),
    ("legal: invented operator legal name", "LEGAL_OPERATOR_SLOTS", "legal-privacy", lambda s: node(s, "legal.intro")["content"]["operator"].update(legalName="Acme Holdings Ltd")),
    ("legal: unknown slot token in body text", "LEGAL_OPERATOR_SLOTS", "legal-privacy", lambda s: node(s, "legal.section")["content"]["blocks"][0]["text"].append({"text": " {{operator.vatNumber}}", "href": None, "mark": "none"})),
    ("legal: counsel review flag dropped", "LEGAL_REVIEW_NOTICE", "legal-privacy", lambda s: node(s, "legal.intro")["content"].update(counselReview="reviewed")),
    ("legal: switcher without the current route", "LEGAL_SWITCHER_CURRENT", "legal-privacy", lambda s: node(s, "legal.switcher")["content"]["links"][0].update(href="/about")),
    # auth
    ("auth: missing demo-only note", "SCHEMA", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"].pop("demoOnlyNote")),
    ("auth: missing demo-only note also caught by the validator", "AUTH_DEMO_NOTE_REQUIRED", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"].pop("demoOnlyNote")),
    ("auth: demo-only note reworded away", "AUTH_DEMO_NOTE_REQUIRED", "auth-sign-in", setp("auth.form-mock", ["content", "demoOnlyNote"], "Sign in securely below.")),
    ("auth: real credential integration (form posts to an endpoint)", "AUTH_NO_CREDENTIAL_INTEGRATION", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["behavior"].update(network="post", submit="https://auth.example/login")),
    ("auth: extra provider field smuggled into behaviour", "SCHEMA", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["behavior"].update(provider="clerk")),
    ("auth: switch link points at itself", "AUTH_SWITCH_LINK", "auth-sign-in", lambda s: node(s, "auth.form-mock")["content"]["switchLink"].update(href="/sign-in")),
    # nav / footer facts
    ("about: currentHref is not the route", "NAV_CURRENT_MATCHES_ROUTE", "about", setp("shell.nav", ["content", "currentHref"], "/pricing")),
    ("about: Changelog added to a sub-page footer", "FOOTER_PRODUCT_LINKS", "about", lambda s: node(s, "shell.footer")["content"]["groups"][0]["links"].__setitem__(3, {"label": "Changelog", "href": "/changelog"})),
    ("home: Changelog removed from the home footer", "FOOTER_PRODUCT_LINKS", None, lambda s: node(s, "shell.footer")["content"]["groups"][0]["links"].__setitem__(4, {"label": "Status", "href": "/docs"})),
    ("about: sub-page footer with 5 Product links", "SCHEMA", "about", lambda s: node(s, "shell.footer")["content"]["groups"][0]["links"].append({"label": "Changelog", "href": "/changelog"})),
    # structure of repeatable nodes / anchors / links
    ("docs: duplicate section anchor", "ANCHOR_UNIQUE", "docs", lambda s: [n for n in s["nodes"] if n["section"] == "docs.section"][1].update(anchorId="authentication")),
    ("docs: section without its own anchor slug", "ANCHOR_ID_MATCH", "docs", lambda s: node(s, "docs.section").update(anchorId=None)),
    ("docs: seven sections > maxRepeat 6", "NO_REPEAT", "docs", lambda s: [s["nodes"].insert(2, dict(copy.deepcopy(node(s, "docs.section")), anchorId="extra-%d" % i)) for i in range(5)]),
    ("about: intro lead with 3 links > maxLinks 2", "LINK_SLOTS", "about", lambda s: node(s, "hero.typewriter-intro")["content"]["intro"]["lead"].append({"text": " more", "href": "https://more.example", "mark": "none"})),
    ("about: link to the source operator's studio site", "BRAND_NOT_SOURCE", "about", lambda s: node(s, "hero.typewriter-intro")["content"]["intro"]["lead"][1].update(href="https://familyoffice.is")),
    ("legal: Back to top without the #top page anchor", "SCHEMA", "legal-privacy", lambda s: node(s, "legal.footer")["content"]["backToTop"].update(href="#start")),
    ("changelog: releases oldest first", "CHANGELOG_ORDER", "changelog", lambda s: node(s, "changelog.releases")["content"]["releases"].reverse()),
    ("changelog: invalid release date", "CHANGELOG_ORDER", "changelog", lambda s: node(s, "changelog.releases")["content"]["releases"][0].update(datetime="2026-02-30")),
    ("pricing: badge field added to a plan", "SCHEMA", "pricing", lambda s: node(s, "pricing.plan-cards")["content"]["plans"][1].update(badge="Popular")),
    ("pricing: period label without the leading space", "SCHEMA", "pricing", lambda s: node(s, "pricing.plan-cards")["content"]["plans"][1].update(periodLabel="/ month")),
    ("pricing: fifth plan", "SCHEMA", "pricing", lambda s: node(s, "pricing.plan-cards")["content"]["plans"].append(copy.deepcopy(node(s, "pricing.plan-cards")["content"]["plans"][0]))),
    ("docs: invented block kind (tabs)", "SCHEMA", "docs", lambda s: node(s, "docs.section")["content"]["blocks"].append({"kind": "tabs", "items": []})),
    ("legal: tone drift (app shell section on light)", "TONE_MATCHES_TEMPLATE", "legal-privacy", lambda s: node(s, "legal.section").update(tone="light")),
]


def main():
    fails = 0
    for name, spec in CONTROLS:
        c, w = codes(spec)
        ok = not c
        fails += not ok
        print("%s  control   %-70s errors=%d warnings=%d %s" % ("PASS" if ok else "FAIL", name, len(c), len(w), "" if ok else sorted(set(c))))
    allm = [(n, w, None, f, ov) for n, w, f, ov in MUTATIONS] + [(n, w, b, f, None) for n, w, b, f in SUB_MUTATIONS]
    for name, want, base, fn, ov in allm:
        s = mutate(fn, base)
        c, _ = codes(s, ov() if ov else None)
        ok = want in c
        fails += not ok
        print("%s  rejected  %-78s expect %-30s got %s" % ("PASS" if ok else "FAIL", name, want, sorted(set(c))))
    covered = {TEMPLATES and EXAMPLES[b]["template"] for _, _, b, _ in SUB_MUTATIONS if b}
    missing = sorted(set(TEMPLATES) - covered - {"template.home"})
    if missing:
        fails += 1
        print("FAIL  no sub-route mutation for %s" % missing)
    total = len(CONTROLS) + len(allm)
    print("\nSUMMARY: %d/%d passed (%d controls with 0 errors, %d mutations each rejected by the named rule)%s"
          % (total - fails, total, len(CONTROLS), len(allm), "" if not fails else "  -- %d FAILED" % fails))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
