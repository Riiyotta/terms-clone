# terms.so — design-repo (all nine routes)

An AI-ready, machine-validated design system measured from the terms.so clone (React 18, Vite 5, Tailwind v3, react-router-dom v6). It gives a generator three things:
- what it may use: tokens, section contracts and the allowlist;
- how sections may be combined: templates and the compatibility graph;
- how they must behave: motion, responsive rules and copy budgets.

Each of these is enforced by a schema and a validator.

**Status:** `design-review-pending`, `productionApproved: false`. The source is a real company, so read `docs/sensitivity-and-licensing.md` before using anything here.

## Scope (v1.1.0)

All nine live routes are built, pixel-audited and bound to exactly one template each. There are 7 templates, because a composition classifier run on the live and clone DOM dumps found 7 distinct page shapes. The template ids and routes are identical to the project's `ia.json`.

| template | routes | shell | nodes |
|---|---|---|---|
| `template.home` | `/` | A dark hero (960) | nav, typewriter hero, 3 demo cards, footer (5 Product links) |
| `template.about` | `/about` | A | nav (current), 2-line typewriter + intro, photo stack, #safety + table, footer (4) |
| `template.pricing` | `/pricing` | A | nav (current), 3-line typewriter + intro, 4 plan cards, footer (4) |
| `template.changelog` | `/changelog` | B light wide (1152) | light nav, header, dated releases, footer (4) |
| `template.docs` | `/docs` | C light narrow (720) | light nav (stacks at ≤600), header, 1-6 `docs.section` (#id each), footer (4) |
| `template.legal` | `/privacy`, `/terms` | D app shell (768) | app header, switcher, intro (operator slots + counsel review), contents card (not sticky), 1-21 `legal.section`, footer row |
| `template.auth` | `/sign-in`, `/sign-up` | E auth (420) | one static form mock (demo-only note required) |

- **Pending-build:** none. The mechanism is kept for future routes. `verify_all.py` check `pending-build-routes` asserts that the list is empty and identical in `templates/routes.json` and the manifest, and that no route is left unbound. If a route is added later without being built, it is listed there with `template: null` and linking to it raises the warning `PENDING_ROUTE_LINK`.
- **Shared templates:** `/privacy` and `/terms` share one shape (16 vs 21 sections), and so do `/sign-in` and `/sign-up` (only the strings differ). `/about` does **not** share home's shape.
- **Demo cards:** `feature.demo-card` is still one section type with three variants (`draft`, `questions`, `comments`). All three share one frame, one loop engine and one grid.
- **Repeatable nodes:** `docs.section` (max 6) and `legal.section` (max 21) are repeatable nodes. Each instance needs its own unique anchor slug.
- **Long-form is structure only.** The About paragraphs and table cells, changelog bodies, docs paragraphs and all legal text carry paragraph counts, `maxWords`, derived `maxChars` and link slots, never wording. The examples use short UI strings or original copy.

## Counts (recomputed from disk by `verify_all.py`; the check fails if they go stale)

<!-- counts:start -->
| count | value |
|---|---|
| tokens | 392 |
| primitives | 11 |
| components | 22 |
| sections | 19 |
| sectionVariants | 26 |
| templates | 7 |
| routes | 9 |
| pendingBuildRoutes | 0 |
| assetRoles | 8 |
| pinnedAssetRoles | 6 |
| graphRules | 33 |
| citations | 179 |
| copyFingerprints | 993 |
| themes | 4 |
| exampleSpecs | 7 |
<!-- counts:end -->

## Layout

```
registry.manifest.json            status, versions, counts, entry points, pending-build routes (none)
assets/asset-roles.json           closed assetRole enum, generation policies, pinned compliance roles
compatibility/graph.json          rules (ids + severities mirror semantic_validate.RULES), adjacency, tone model
components/ primitives/ sections/ contracts (sections carry per-variant content, motion, tones, responsive)
docs/                             generation guide, sensitivity and licensing
extraction/measured-values.json   citation ledger (../-relative refs + anchors), QA corrections, evidence conflicts
extraction/verify_all.py          all repo checks (run this)
extraction/prove_drift.py         proves the drift checks fail on injected defects
schema/pagespec.schema.json       Draft-07 PageSpec contract (closed everywhere, motion const-locked)
schema/example.pagespec.json      home: real short home copy under a fictional brand
schema/examples/                  one example per sub-route template (about, pricing, changelog, docs, legal, auth)
schema/semantic_validate.py       template cross-reference, budgets, timelines, assets, protection, route facts
schema/tests/adversarial_test.py  mutations that must be rejected + one control per template
schema/page-meta.contract.json    head metadata budgets
schema/protected-content.json     sha256 fingerprints of terms.so long-form text (text never stored)
templates/templates.json          7 templates (nodes: section, variant, required, position, tone, maxRepeat) + ia.json crosswalk
templates/routes.json             9 routes, all built; pendingBuildRoutes []
tokens/00-foundation/             breakpoint, color, elevation, gradient, motion, radius, spacing, typography
tokens/10-semantic/ themes/       tone roles; hero, surface, light and app themes
tokens/20-component/ 30-layout/   component references; shell and section geometry
tokens/llm/                       component-allowlist, token-catalog, token-policy
```

## Verify

```
python3 extraction/verify_all.py                      # every check; WARNs on source-dependent checks when the project is absent
python3 schema/semantic_validate.py [spec.json]       # schema + semantic rules (default: all seven examples)
python3 schema/tests/adversarial_test.py              # mutations rejected, controls pass
python3 extraction/prove_drift.py --scratch <dir>     # needs the source project beside the repo
```

It needs Python 3 and `jsonschema`. Run it with plain `python3`; `-I` hides a user-installed jsonschema. The scripts locate the repo from their own path, so the folder can be moved or unzipped anywhere.

## Evidence

Most authoritative first:
1. `CLONE_SPEC.md` (home, live-measured).
2. `CLONE_SPEC_PAGES.md` for the sub-routes. Its **section 10** holds the motion-audit corrections, which supersede sections 0, 1, 5 and 6.
3. `MOTION_TIMINGS.md`.
4. `src/index.css` (the token source of truth).
5. The components and pages.
6. `reference/ASSET_MANIFEST.md`.
7. `ia.json`, used only as a cross-check of template ids and routes.

Every citation lives in `extraction/measured-values.json` as a project-relative ref with an anchor string that must appear inside the range. `src/` and `CLONE_SPEC_PAGES.md` were edited concurrently by other agents, so their citations are marked `volatile`. They were re-located by anchor and re-verified at release.

Audit corrections are baked in; see `qaCorrections`:
- **Footer:** home shows 5 Product links (with Changelog); every sub-page shows 4.
- **Light-shell nav:** `#655c53` muted; `#161512` for the current page, Login and Sign up. The pill highlight is invisible. The resting pill is always "Sign up", and the current page is bright through `aria-current`.
- **/about:** mobile top padding is 64px, not 72px.
- **Table borders:** `.75px`.
- **Docs code:** generic `monospace` 16/24.
- **Pricing:** 4 plans with no toggle, feature list or badge. The `/ month` span carries the leading space.
- **Focus rings:**
  - landing links get a 1px #777 outline at 3px offset;
  - buttons and pills get the shadow ring;
  - the current nav link gets no ring;
  - keyboard focus puts the nav rail into instant mode.
- **Photo stack:** `.35s cubic-bezier(.2,.8,.2,1)`, `photo-toss` .45s, with registered custom properties.
- **Typewriter:** /about and /pricing reuse the home typewriter's default timings. The live /pricing timing corroborates them.
- **Auth:** a static mock. **Legal and changelog:** no motion.
- **Deliberate deviation (home):** under reduced motion, the demos show their finished still frame.

Evidence conflicts and how each was resolved are listed under `evidenceConflicts`.

## Versions

- `allowlistVersion` and `pageSpecVersion` (1.1.0) are machine-checked by `verify_all.py`.
- `repositoryVersion` (1.1.0) is documentation-only.
- Framework versions come from `package.json`: react ^18.3.1, react-router-dom ^6.30.6, vite ^5.4.10, tailwindcss ^3.4.14.
