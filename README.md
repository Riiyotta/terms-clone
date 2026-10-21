# terms.so clone

A local React 18 + Vite 5 + Tailwind v3 replica of https://terms.so/ (9 routes), built from live measurements.

```bash
npm install
npm run dev        # http://127.0.0.1:5195/
```

## Information architecture

| File | Edit? | What it is |
|---|---|---|
| `ia.json` | **hand-edit this one only** | Templates, sections and routes as data. Each section is defined once and templates reference it by id. |
| `IA.md` | generated, don't edit | Readable IA: template table, chrome partition, section reuse, per-template sections, full section reference. |
| `matrix.csv` | generated, don't edit | Section × template matrix for a spreadsheet. |
| `validate.mjs`, `build.mjs` | generic scripts | Check `ia.json`'s invariants, then regenerate `IA.md` and `matrix.csv`. |

After changing routes or sections, edit `ia.json` and rerun:

```bash
node validate.mjs && node build.mjs
```

### What the data shows

- **9 routes, 7 templates, 21 sections.** Two templates cover two routes each (legal: `/privacy`, `/terms`; auth: `/sign-in`, `/sign-up`). The other five routes each have a template of their own.
- **Only 3 sections are shared across templates:** the landing nav and footer (5 routes each) and the sub-page typewriter hero (about, pricing). The other 18 are used by a single template and are reasonable to keep page-local. The legal and auth sections still serve 2 routes each through their shared template.
- **Chrome is not uniform.** 5 routes use the marketing nav and footer, in three shell variants (dark gradient for home/about/pricing, light wide for changelog, light narrow for docs). The 2 legal routes use a separate app-shell header and footer row, and the 2 auth routes have no chrome at all.
- **The home page holds most of the bespoke work:** its typewriter hero and three looping demo cards are 4 single-use sections built on the shared preview timeline engine (`src/hooks/usePreviewTimeline.js`).

## Content and licensing notes

- **Long-form text is placeholder.** The paragraphs on About, Changelog, Docs, Privacy and Terms are original placeholder text matching the original's structure and length, kept in `src/content/*.js` so it can be replaced without touching components. Headings, labels, prices, dates and changelog titles match the live site.
- **Placeholders to replace:**
  - The changelog's commit hashes, so its GitHub links will 404 until replaced.
  - The legal pages' bracketed operator details. Placeholder legal text is not legal advice.
- **Sign-in and sign-up are a static mock.** The form submits nowhere and makes no network requests.
- **Not for public use without permission or a licence:**
  - ABC Diatype (`public/fonts`) is a commercial font and needs a licence for any public use.
  - The terms.so logo, the brand and the About-page studio photos belong to terms.so.

## Other docs

- `CLONE_SPEC.md` and `CLONE_SPEC_PAGES.md`: live-site measurements (home, then sub-routes).
- `MOTION_TIMINGS.md`: demo, headline and prompt-text timeline constants.
- `design-repo/`: AI-ready design system (tokens, section contracts, templates, schema and validators). It has its own README.
