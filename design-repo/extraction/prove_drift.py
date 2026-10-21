#!/usr/bin/env python3
"""Prove verify_all.py's drift checks actually catch drift (MASTER-GUIDE 3.2 / 3.4 / 3.16 / 3.23).

For each case: copy design-repo/ to a fresh folder under --scratch, inject ONE defect,
run verify_all.py --quick against the copy, and require (a) exit code 1 and (b) the
named check reporting FAIL. Then confirm the unmodified repo passes.

Required cases: a phantom allowlist entry, an out-of-range citation, a wrong manifest
count and an asset policy re-pinned to a different-but-valid value. Extra cases cover
the other drift checks.

Usage: python3 extraction/prove_drift.py --scratch DIR [--source-root DIR] [--live-html DIR]
  --scratch      working folder for the scratch copies (required; nothing is written
                 inside design-repo/)
  --source-root  project root with the cited evidence (default: parent of design-repo/);
                 citation cases need it, so the script stops if it is absent
  --live-html    optional folder of fetched live terms.so pages; the protected-content leak
                 case then injects a real live sub-page paragraph (read at run time, never stored)
                 instead of the home footer description
"""
import json
import os
import re
import shutil
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def jload(p):
    return json.load(open(p, encoding="utf-8"))


def jsave(p, o):
    with open(p, "w", encoding="utf-8") as f:
        json.dump(o, f, indent=2, ensure_ascii=False)
        f.write("\n")


def edit_json(relpath, fn):
    def f(root):
        p = os.path.join(root, relpath)
        o = jload(p)
        fn(o)
        jsave(p, o)
    return f


def append_text(relpath, txt):
    def f(root):
        with open(os.path.join(root, relpath), "a", encoding="utf-8") as fh:
            fh.write(txt)
    return f


def shift_citation(cid, by):
    def fn(o):
        m = re.match(r"^(.+):(\d+)-(\d+)$", o["citations"][cid]["ref"])
        o["citations"][cid]["ref"] = "%s:%d-%d" % (m.group(1), int(m.group(2)) + by, int(m.group(3)) + by)
    return fn


CASES = [
    # the four required by the 1.0.0 brief
    ("phantom allowlist entry", "allowlist-parity", edit_json("tokens/llm/component-allowlist.json", lambda o: o["entries"].append(
        {"id": "component.video-modal", "kind": "component", "file": "components/video-modal.json", "instantiableInPageSpec": False}))),
    ("out-of-range citation", "citations", edit_json("extraction/measured-values.json", lambda o: o["citations"]["spec.2.chips"].update(ref="../CLONE_SPEC.md:9990-9999"))),
    ("wrong manifest count (sections +1)", "manifest-counts", edit_json("registry.manifest.json", lambda o: o["counts"].update(sections=o["counts"]["sections"] + 1))),
    ("asset policy re-pinned to another VALID value (photo.studio-people -> generate-original)", "asset-roles",
     edit_json("assets/asset-roles.json", lambda o: o["roles"]["photo.studio-people"].update(generationPolicy="generate-original"))),
    # the rest of the drift-proofed checks
    ("orphan contract file (no allowlist entry)", "allowlist-parity", lambda r: jsave(os.path.join(r, "primitives/badge.json"), {"id": "primitive.badge", "kind": "primitive", "instantiableInPageSpec": False})),
    ("in-range citation at the wrong lines", "citations", edit_json("extraction/measured-values.json", shift_citation("spec.2.chips", 30))),
    ("README count drift", "readme-counts", lambda r: _sub(r, "README.md", r"\| sections \| (\d+) \|", lambda m: "| sections | %d |" % (int(m.group(1)) + 1))),
    ("allowlistVersion drift (manifest bumped, allowlist not)", "allowlist-version", edit_json("registry.manifest.json", lambda o: o.update(allowlistVersion="9.9.9"))),
    ("brand.mark re-pinned to another VALID value", "asset-roles", edit_json("assets/asset-roles.json", lambda o: o["roles"]["brand.mark"].update(generationPolicy="generate-original"))),
    ("graph rule with no validator implementation", "graph-validator", edit_json("compatibility/graph.json", lambda o: o["rules"].append(
        {"id": "ONE_VIDEO_PER_PAGE", "severity": "error", "description": "x", "enforcedBy": "schema/semantic_validate.py"}))),
    ("graph severity diverges from validator", "graph-validator", edit_json("compatibility/graph.json", lambda o: o["rules"][5].update(severity="error"))),
    ("entry point outside the package", "entry-points", edit_json("registry.manifest.json", lambda o: o["entryPoints"].update(spec="../CLONE_SPEC.md"))),
    ("absolute local path in README", "no-absolute-paths", append_text("README.md", "\nsee " + "/" + "Users/someone/terms\n")),
    ("pending-build route re-added for a route that is built and bound", "pending-build-routes", edit_json("templates/routes.json", lambda o: o["pendingBuildRoutes"].append(
        {"path": "/about", "status": "pending-build", "template": "template.about"}))),
    ("manifest pendingBuildRoutes disagrees with routes.json", "pending-build-routes", edit_json("registry.manifest.json", lambda o: o["pendingBuildRoutes"].append(
        {"path": "/blog", "status": "pending-build", "template": None}))),
    ("template node drifts from its section contract", "template-contracts", edit_json("templates/templates.json", lambda o: o["templates"]["template.home"]["nodes"][2].update(anchorId="demo"))),
    ("unresolved evidence id", "evidence-ids", edit_json("sections/shell-nav.json", lambda o: o["evidence"].append("spec.99.nonexistent"))),
    ("token policy category not in the catalog", "token-refs", edit_json("tokens/llm/token-policy.json", lambda o: o["rawValueRestrictions"].update(typography="reference-only"))),
    # v1.1.0 cases
    ("route bound to a non-existent template", "route-coverage", edit_json("templates/routes.json", lambda o: o["routes"][2].update(template="template.pricing-v2"))),
    ("route dropped from routes.json", "route-coverage", edit_json("templates/routes.json", lambda o: o["routes"].pop(3))),
    ("template route not in the source router / ia.json", "route-coverage", lambda r: (edit_json("templates/routes.json", lambda o: o["routes"].append(
        {"path": "/blog", "template": "template.docs", "status": "built", "evidence": []}))(r), edit_json("templates/templates.json", lambda o: o["templates"]["template.docs"]["routes"].append("/blog"))(r))),
    ("Google icon re-pinned to another VALID value (vendor.google-icon -> generate-original)", "asset-roles",
     edit_json("assets/asset-roles.json", lambda o: o["roles"]["vendor.google-icon"].update(generationPolicy="generate-original"))),
    ("legal template missing a required operator slot (template.legal)", "legal-operator-slots",
     edit_json("templates/templates.json", lambda o: o["templates"]["template.legal"]["requiredProjectSlots"].remove("operator.governingJurisdiction"))),
    ("legal contract missing a required operator slot (legal.intro)", "legal-operator-slots",
     edit_json("sections/legal-intro.json", lambda o: o["variants"]["title-updated-intro"]["content"]["operator"]["fields"].pop("postalAddress"))),
    ("auth contract demo-only note removed", "auth-mock", edit_json("sections/auth-form-mock.json", lambda o: o["variants"]["email-first"]["content"].pop("demoOnlyNote"))),
    ("protected-content leak: a live terms.so paragraph pasted into the README", "protected-content", lambda r: _leak(r, "README.md")),
    ("section contract gains a content field the schema and allowlist lack", "allowlist-parity", edit_json("sections/shell-footer.json", lambda o: o["variants"]["brand-two-groups-subpage"]["content"].update(extra={"type": "text"}))),
]

LIVE_HTML = None  # set from --live-html


def _live_paragraph(src_root):
    """A real live terms.so paragraph, read at RUN time and never stored in the repo: the home footer
    description from ../CLONE_SPEC.md (live-measured), or, with --live-html DIR, the first fingerprinted
    <p> of a fetched live sub-page."""
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    fps = set(jload(os.path.join(REPO, "schema/protected-content.json"))["copyFingerprints"]["sha256"])
    cands = []
    if LIVE_HTML:
        for f in sorted(os.listdir(LIVE_HTML)):
            if f.endswith(".html"):
                html = open(os.path.join(LIVE_HTML, f), encoding="utf-8", errors="replace").read()
                for m in re.findall(r"<p[^>]*>(.*?)</p>", html, re.S):
                    t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m)).strip()
                    cands.append(("live %s <p>" % f, t))
    spec = open(os.path.join(src_root, "CLONE_SPEC.md"), encoding="utf-8").read()
    m = re.search(r'\(`400 12px/1\.5 \(18px\); color:#989490`, 360 x 90\): "([^"]+)"', spec)
    if m:
        cands.append(("home footer description (CLONE_SPEC.md 7)", m.group(1)))
    for label, t in cands:
        if len(t.split()) >= 5 and sv.fingerprint(t) in fps:
            return label, t
    raise SystemExit("no fingerprinted live paragraph available for the leak case")


SRC_ROOT = None


def _leak(root, relpath):
    label, t = _live_paragraph(SRC_ROOT)
    print("        (leak case uses: %s, %d words; text not printed)" % (label, len(t.split())))
    with open(os.path.join(root, relpath), "a", encoding="utf-8") as fh:
        fh.write("\n" + t + "\n")


def _sub(root, relpath, pat, repl):
    p = os.path.join(root, relpath)
    txt = open(p, encoding="utf-8").read()
    new, n = re.subn(pat, repl, txt, count=1)
    assert n == 1, "pattern not found: %s" % pat
    open(p, "w", encoding="utf-8").write(new)


def run_verify(repo_copy, src_root):
    r = subprocess.run([sys.executable, os.path.join(repo_copy, "extraction/verify_all.py"), "--quick", "--source-root", src_root], capture_output=True, text=True)
    return r.returncode, r.stdout


def main(argv):
    if "--scratch" not in argv:
        print(__doc__)
        return 2
    scratch = os.path.abspath(argv[argv.index("--scratch") + 1])
    src_root = argv[argv.index("--source-root") + 1] if "--source-root" in argv else os.path.dirname(REPO)
    global SRC_ROOT, LIVE_HTML
    SRC_ROOT = src_root
    LIVE_HTML = os.path.abspath(argv[argv.index("--live-html") + 1]) if "--live-html" in argv else None
    if not os.path.isfile(os.path.join(src_root, "CLONE_SPEC.md")):
        print("source project not found at the source root; citation drift needs it. Pass --source-root.")
        return 2
    os.makedirs(scratch, exist_ok=True)
    fails = 0
    for i, (name, check, inject) in enumerate(CASES):
        dst = os.path.join(scratch, "drift-%02d" % i, "design-repo")
        if os.path.exists(os.path.dirname(dst)):
            shutil.rmtree(os.path.dirname(dst))
        shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns("__pycache__", ".DS_Store", "*.pyc"))
        inject(dst)
        code, out = run_verify(dst, src_root)
        line = next((l for l in out.splitlines() if l.startswith(check + " ")), "")
        caught = code == 1 and " FAIL " in (line + " ")
        fails += not caught
        print("%s  %-82s -> %s" % ("CAUGHT" if caught else "MISSED", name, re.sub(r"\s+", " ", line)[:140]))
    code, out = run_verify(REPO, src_root)
    print("%s  unmodified repo -> %s" % ("PASS  " if code == 0 else "FAIL  ", out.strip().splitlines()[-1]))
    fails += code != 0
    print("\nDRIFT PROOF: %s" % ("all %d injected defects caught, real repo passes" % len(CASES) if not fails else "%d problem(s)" % fails))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
