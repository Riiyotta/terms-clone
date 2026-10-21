# Changelog

## 1.1.0 — 2026-10-21 — all nine routes

An additive extension of 1.0.0: every 1.0.0 check, contract, adversarial case and drift case still runs.

- **Routes and templates.**
  - The 8 sub-routes moved from `pending-build` to built.
  - There are now 7 templates: `home`, `about`, `pricing`, `changelog`, `docs`, `legal` (`/privacy` + `/terms`) and `auth` (`/sign-in` + `/sign-up`). The granularity comes from a composition classifier run on the live and clone DOM dumps. It found 7 shapes for 9 routes, with live and clone agreeing on every route. The template ids and routes match `ia.json`. `templates.json` records a section crosswalk to ia's 21 sections.
  - `pendingBuildRoutes` is now `[]`. The `pending-build-routes` check is kept, and now asserts 0 pending and no unbound route.
  - New check `route-coverage`: route ↔ template 1:1, plus `routes.json` == the `src/App.jsx` `<Route>` paths == the `ia.json` templates/routes.
- **Sections.**
  - 15 new section types: `hero.typewriter-intro` (about, pricing), `media.photo-stack`, `about.safety-table`, `pricing.plan-cards`, `changelog.header`, `changelog.releases`, `docs.header`, `docs.section`, `shell.app-header`, `legal.switcher`, `legal.intro`, `legal.contents`, `legal.section`, `legal.footer`, `auth.form-mock`.
  - New variants: `shell.nav[on-hero-current | light-wide | light-narrow]` and `shell.footer[brand-two-groups-subpage]`. The home footer is now exactly 5 Product links including Changelog; sub-pages have exactly 4 without it.
  - Every contract has `maxWords` budgets, closed const-locked motion with a pinned `reducedMotionFallback`, structured responsive fields cited to real CSS, and per-variant `tones`.
  - Long-form fields (`prose`) carry structure and budgets only.
- **Primitives and components:** 4 new primitives and 11 new components (AppHeader, AuthMock, LandingIntro, LegalDocument, PhotoStack, RichText, SmartLink, plan card, landing table, release entry, endpoint card).
- **Tokens.**
  - New tokens from the real sub-page `:root` vars: `--hero-prose-muted`, `--photo-card-bg`, `--changelog-muted`, `--code-bg`, `--auth-*`, the landing-card and photo shadows, and the auth shadows.
  - Light-shell nav component tokens and a focus token group.
  - Two new themes: `light` (shells B, C, E) and `app` (shell D).
- **Compliance.**
  - `photo.studio-people` is now wired into the photo-stack slots and accepts only the project's own real photos (still pinned `never-reproduce-or-fabricate`).
  - New role `vendor.google-icon`, pinned to the new policy `vendor-supplied-only`.
  - Legal: a required `{{operator.*}}` slot for legal name, postal address, country and governing jurisdiction, plus `counselReview: required-before-publication`. New check `legal-operator-slots`.
  - Auth: `demoOnlyNote` is required and the no-integration behaviour is const-locked. New check `auth-mock`.
  - `protected-content.json` grew from 8 to the count below. It adds sha256 fingerprints of every long-form block and sentence on the live /about, /pricing, /changelog, /docs, /privacy and /terms, hashed at build time; the text is never stored.
  - Source domains now include the operator's studio site, its founder's site and its repository.
- **Validator.** 11 new rules: `NAV_CURRENT_MATCHES_ROUTE`, `FOOTER_PRODUCT_LINKS`, `LINK_SLOTS`, `ANCHOR_UNIQUE`, `CHANGELOG_ORDER`, `LEGAL_OPERATOR_SLOTS`, `LEGAL_REVIEW_NOTICE`, `LEGAL_SWITCHER_CURRENT`, `AUTH_DEMO_NOTE_REQUIRED`, `AUTH_NO_CREDENTIAL_INTEGRATION`, `AUTH_SWITCH_LINK`. `NO_REPEAT` now honours `maxRepeat`; `ANCHOR_ID_MATCH` handles per-instance slugs.
- **Examples:** one per new template in `schema/examples/`. All have 0 errors and use short UI strings or original copy only.
- **Citations:**
  - The five drifted `src/index.css` anchors were re-anchored: `src.css.chips`, `src.css.dots-keyframes`, `src.css.footer-link`, `src.css.hero-height-mobile`, `src.css.nav-link`.
  - The motion-audit corrections (CLONE_SPEC_PAGES §10) are cited, and the Navbar and index.css anchors were re-located after that audit.
- **Versions:** `allowlistVersion` and `pageSpecVersion` are now 1.1.0 (machine-checked); `repositoryVersion` is 1.1.0 (documentation-only).
- Counts at this release:

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

## 1.0.0 — 2026-10-21 — initial build

- Built from scratch for the terms.so home route `/`. The layout follows the sibling charterlabs design-repo.
- Contents:
  - Tokens: foundation, semantic, component, layout, plus the `hero` and `surface` themes.
  - Primitives, components and section contracts. `feature.demo-card` is one type with three variants.
  - `template.home`, the compatibility graph, the Draft-07 PageSpec schema and the example.
  - The semantic validator and the adversarial suite.
  - The asset-role registry with pinned compliance policies, and protected-content fingerprints.
  - `verify_all.py` and `prove_drift.py`.
- The eight live sub-routes were recorded as `pending-build`, a documented exclusion with no template binding.
- Under reduced motion, the demos show the finished still frame. This deviates from the original on purpose.
- Counts at that release: 265 tokens, 7 primitives, 11 components, 4 sections, 6 section variants, 1 template, 1 route, 8 pending-build routes, 7 asset roles (5 pinned), 22 graph rules, 96 citations, 8 copy fingerprints, 2 themes.
