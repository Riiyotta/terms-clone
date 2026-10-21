# Sensitivity and licensing

The source is **terms.so**, a real, live company. This design-repo measures how its home page is built so an AI can generate new pages with the same structure and motion. It does **not** give anyone a licence to the company's brand, fonts, imagery or writing. Keep this repo private.

Every rule below is machine-checked: `assets/asset-roles.json` (closed role enum and pinned policies), `schema/protected-content.json` (fingerprints), `schema/semantic_validate.py` (rules `ASSET_ROLE_ALLOWED`, `ASSET_POLICY_PINNED`, `ASSET_REF_NOT_SOURCE`, `PROTECTED_LONGFORM`, `BRAND_NOT_SOURCE`) and `extraction/verify_all.py` (checks `asset-roles` and `protected-content`).

## 1. Logo and brand marks: never reproduce

- The terms.so logo and brand marks must not be reproduced in generated output: not in the nav, the footer, the favicon or the share image.
- Do not trace, redraw, recolour or approximate them either.
- Role `brand.mark` is pinned to `project-supplied-only`, and `social.og-image` is pinned the same way. A PageSpec media object must carry that exact policy. A swap to another valid policy (for example `generate-original`) is rejected.
- `brand.name` may not be the source brand, and no string may reference the `terms.so` domain. This includes `mailto:` links.

## 2. ABC Diatype: commercial licence required

- `fontFamily.sans` is ABC Diatype (Regular 400, Medium 500). It is a commercially licensed typeface.
- **ABC Diatype requires a commercial licence for any public use.** The font files in the clone's `public/fonts/` are not licensed for redistribution through this repo.
- Without a licence held by the deploying party, use an openly licensed sans-serif and keep the token metrics: size, leading and tracking.
- Role `font.ui-diatype` is pinned to `licensed-font-required`.
- Geist Mono (`font.mono-geist`, poetry layer only) has no licence recorded in the project's evidence. Its policy is `verify-licence-before-use`.

## 3. About-page studio photos: real people, never reproduce or fabricate

- The About page shows three studio photos: `public/about/studio-*.jpg`. The live desk photo even carries GPS EXIF data.
- They are **real people's workplace photos**. Never reproduce them, and never generate or fabricate look-alike team, office or studio photos. No AI-generated people.
- Role `photo.studio-people` is pinned to `never-reproduce-or-fabricate`. It is the only role accepted by the three `media.photo-stack` slots. A generated About page must reference the **target project's own real, consented photos** through a project-supplied `assetRef`.

## 3a. Google icon: third-party trademark

- The auth provider button's "G" is Google's trademark.
- Role `vendor.google-icon` is pinned to `vendor-supplied-only`. Use only Google's own official asset under its brand guidelines, and only if the project really offers Google sign-in. Otherwise leave the `social` list empty.
- Never draw, trace, recolour or generate the icon, and never copy `public/auth/google.svg`.
- The auth vendor's "Secured by" wordmark is not generated at all.

## 3b. Legal pages and the auth mock

- **Generated legal pages require real legal text reviewed by the operator's own counsel before publication.** Placeholder legal copy, both this repo's and the clone's, is not legal advice. `legal.intro.counselReview` is const `required-before-publication` (rule `LEGAL_REVIEW_NOTICE`).
- Operator details are **required, project-supplied slots**: `{{operator.legalName}}`, `{{operator.postalAddress}}`, `{{operator.country}}` and `{{operator.governingJurisdiction}}`.
  - The PageSpec carries only these tokens; the project resolves them.
  - A generator must never invent them (rule `LEGAL_OPERATOR_SLOTS`, plus verify_all `legal-operator-slots`).
- The auth page is a **static, non-functional mock**. Generated output may not contain any real credential-handling integration (auth SDK, form action, endpoint, OAuth wiring) unless the project supplies it itself.
  - The behaviour block is const-locked.
  - The screen-reader note "Demo only — sign-in is not functional." (or equivalent wording) is required.
  - Rules `AUTH_DEMO_NOTE_REQUIRED` and `AUTH_NO_CREDENTIAL_INTEGRATION`, plus verify_all `auth-mock`.

## 4. Proprietary long-form text: never reuse

- Generated pages must not reuse terms.so's proprietary long-form text: the footer product description, the meta description and the page title.
- The repo stores only sha256 fingerprints of them (whole text and each sentence of 5 or more words), never the text itself. `PROTECTED_LONGFORM` rejects a PageSpec that contains them, and `verify_all.py` fails if any repo file does.
- Sub-page long-form (legal text, docs, changelog bodies, About paragraphs and table cells) was never transcribed by recon. The clone's versions are original placeholder copy, and the section contracts carry only structure and budgets.
- v1.1.0 also fingerprints the live sub-pages: every long-form `<p>`/`<li>`/`<td>` block and sentence on /about, /pricing, /changelog, /docs, /privacy and /terms was hashed at build time. The text was never stored.
- Do not source sub-page text from the live site, and do not link to the operator's studio site, its founder's site or its repository (rule `BRAND_NOT_SOURCE`).

## 5. Short copy, third-party names and other assets

- The sub-route examples (`schema/examples/`) use only short UI strings (headings, labels, dates, entry titles) or original text, and all of their URLs are `.example` URLs.
- `schema/example.pagespec.json` uses the home page's real **short** copy (headings, labels, demo strings) as a reference instance, under a fictional brand (`Clausewell`).
- A page generated for another brand should write its own copy within the same budgets.
- The headline names a third-party product. That is the source's own comparative claim. Do not name competitors on a generated page without the target project's own sign-off.
- `ui.icon` and `demo.cursor` use `generate-original`. The source icon SVGs and the macOS cursor bitmap must not be reused.
- Every role forbids reusing source files. `ASSET_REF_NOT_SOURCE` rejects an `assetRef` whose file name matches a source file.

## 6. Pinned policies (independent copy in `extraction/verify_all.py`)

| role | pinned policy |
|---|---|
| `brand.mark` | `project-supplied-only` |
| `social.og-image` | `project-supplied-only` |
| `demo.cursor` | `generate-original` |
| `font.ui-diatype` | `licensed-font-required` |
| `photo.studio-people` | `never-reproduce-or-fabricate` |
| `vendor.google-icon` | `vendor-supplied-only` |

`extraction/prove_drift.py` proves this check works. It switches `photo.studio-people` to `generate-original` (a valid policy, but the wrong one), and does the same to `brand.mark` and `vendor.google-icon`. It then confirms that `verify_all` fails both times.
