# Generation guide (for an LLM producing a PageSpec)

1. **Pick the template for the route.** Read the node list in `templates/templates.json`. Nodes must appear in that order: required nodes must be present, and position first/last is fixed.
   - `template.home` (`/`): `shell.nav[on-hero]`, `hero.typewriter-home`, `feature.demo-card[draft|questions|comments]`, `shell.footer[brand-two-groups]`. Questions and comments are optional; leaving one out triggers a warning.
   - `template.about` (`/about`): `shell.nav[on-hero-current]`, `hero.typewriter-intro[about]`, `media.photo-stack`, `about.safety-table` (anchor `safety`), `shell.footer[brand-two-groups-subpage]`.
   - `template.pricing` (`/pricing`): `shell.nav[on-hero-current]`, `hero.typewriter-intro[pricing]`, `pricing.plan-cards` (exactly 4), sub-page footer.
   - `template.changelog` (`/changelog`): `shell.nav[light-wide]`, `changelog.header`, `changelog.releases` (newest first), sub-page footer.
   - `template.docs` (`/docs`): `shell.nav[light-narrow]`, `docs.header`, 1-6 `docs.section` nodes (each with its own anchor slug), sub-page footer.
   - `template.legal` (`/privacy`, `/terms`): `shell.app-header`, `legal.switcher`, `legal.intro`, `legal.contents`, 1-21 `legal.section` nodes (own slug each), `legal.footer`.
   - `template.auth` (`/sign-in`, `/sign-up`): `auth.form-mock` only.

   Footer rules: the home footer has 5 Product links including `/changelog`, and the sub-page footer has exactly 4 without it. On `on-hero-current`, `currentHref` must equal the route.
2. **Fill content inside the budgets.** Each section contract (`sections/*.json`) gives `maxWords` and `maxChars` per field. Typed or streamed fields also carry a `timeline` window. The text must finish typing before the next scripted beat. For example, the draft prompt is at most `floor((3400-600)/32) = 87` characters.
3. **Copy the motion block exactly from the contract.** Motion is const-locked per `(section, variant)`, including `reducedMotionFallback`. You cannot add or change motion fields.
4. **Media.** Use only the roles a slot allows (`assets/asset-roles.json`). Set `generationPolicy` to that role's policy, and point `assetRef` at a project-supplied file, never a source file.
5. **Links.**
   - `#draft`, `#questions` and `#comments` must exist on the page. The hero's "Watch a demo" is always `#draft`, a smooth-scroll anchor. There is no video and no modal.
   - All nine routes are built. Internal links must target one of them, or a pending-build route if one is ever listed in `templates/routes.json` (that triggers a warning).
   - Prose fields are lists of runs `{text, href, mark}`. They hold at most `maxLinks` linked runs.
6. **Brand and protected text.** Use your own brand name and mark. Never reuse terms.so's long-form text: see `docs/sensitivity-and-licensing.md`.
7. **Long-form, legal and auth.**
   - Long-form fields (`prose`, `longForm: true`) are structure plus budgets. Write original text. Never use terms.so's wording: it is fingerprinted.
   - Legal pages: copy the `{{operator.*}}` slot tokens exactly, and use the same tokens in body text. Never invent a legal name, address, country or jurisdiction.
   - `counselReview` must be `required-before-publication`. Placeholder legal copy is not legal advice.
   - Auth: keep the `demoOnlyNote` (it must say the form is a demo and not functional) and the const `behavior` block. Never wire a real auth provider, form action or endpoint; a real integration is the project's own code.
   - Auth: the switch link goes to the other auth route.
8. **Tone.** `hero` is the gradient band (shell A nav, hero and photo stack). `surface` is the page tint below the band. `light` covers the flat white shells B, C and E. `app` is the legal shell D. Colours come only from tokens: `tokens/llm/token-catalog.json` lists what can be referenced, and `token-policy.json` bans raw values.
9. **Validate.** Run `python3 schema/semantic_validate.py your.pagespec.json`. It runs the Draft-07 schema and then the semantic rules. You need 0 errors. Warnings are allowed.

## Motion summary (tokens in `tokens/00-foundation/motion.json`)

- **Headline.**
  - Typed once on mount: about 31.7 ms per character, no caret, no loop.
  - Lines start at about 240, 1160, 2140 and 3480 ms.
  - The chips reveal at 5680 ms over .48 s with `cubic-bezier(.23,1,.32,1)` and an 8px rise.
- **Poetry.**
  - Geist Mono 11px at opacity .5, typing at 35 ms per character with a block caret.
  - It renders only when the viewport is wider than about 1040px.
- **Demos.**
  - A 40 ms fixed tick that starts when 12% of the card is in view.
  - At the end of each loop: fade-out at D-680 (.24s `cubic-bezier(.77,0,.175,1)`), rewind at D-440, fade-in at D-320 (.32s ease-out).
  - Loop lengths: draft 20000, questions 16000, comments 21000 ms.
- **Reduced motion.**
  - Headline complete at once; chips fade over .2s with no transform; poetry static.
  - Demos are paused on their finished still frame (16000 / 12000 / 17000). This is a deliberate deviation: the live original freezes on a near-empty first frame.
- **Hover.**
  - Nav links: .5 → .85 white over .25s.
  - Sign up chip: #fff → #f2f2f2.
  - Watch chip: .1 → .18 white.
  - Pause button: #f2f2f2 → #e7e7e7 over .15s.
  - Footer links: instant change to #989490.

## Sub-route motion

- **About / pricing headline.** The home typewriter with the default timings for the first 2 or 3 lines. No chips and no poetry. Under reduced motion, all lines show at once.
- **Photo stack.**
  - Hover: transform and shadow over .35s `cubic-bezier(.2,.8,.2,1)`.
  - The front card replays `photo-toss` (.45s).
  - Reduced motion: no transition and no animation.
- **Nav (every shell).**
  - Colour transition .25s `cubic-bezier(.77,0,.175,1)`.
  - Keyboard focus puts the rail into instant mode: background .15s only.
  - The resting pill is always "Sign up". The pill highlight is invisible on the light shells.
- **Changelog / docs / legal.** No motion. Commit links hover instantly. Legal anchors jump instantly with scroll-margin-top 32.
- **Auth.** Field transitions .2s and button transitions .1s (ease), colour and shadow only. No page motion.
