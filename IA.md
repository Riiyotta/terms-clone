# https://terms.so/ (local clone at /Users/riyaghosh/V3/terms, React 18 + Vite + react-router-dom v6)

Source: https://terms.so/ (local clone at /Users/riyaghosh/V3/terms, React 18 + Vite + react-router-dom v6)
Status: **measured-from-live-site** · production approved: **false**
9 routes · 7 templates · 21 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Legal document, Auth, Home) account for 5 of 9 routes (56%). The remaining 4 routes span 4 templates.

| template | routes | share |
|---|---:|---:|
| Legal document | 2 | 22% |
| Auth | 2 | 22% |
| Home | 1 | 11% |
| About | 1 | 11% |
| Pricing | 1 | 11% |
| Changelog | 1 | 11% |
| API reference | 1 | 11% |

## Page chrome

**3 routes carry chrome = `landing-dark`** — Home, About, Pricing.

**1 routes carry chrome = `landing-light-wide`** — Changelog.

**1 routes carry chrome = `landing-light-narrow`** — API reference.

**2 routes carry chrome = `app-shell`** — Legal document.

**2 routes carry chrome = `none`** — Auth.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.landing-nav` | CHROME | 5 | 5 | `src/components/Navbar.jsx` | Present on the 5 landing-shell routes (home, about, pricing, changelog, docs). |
| `chrome.landing-footer` | CHROME | 5 | 5 | `src/components/Footer.jsx` | Present on the 5 landing-shell routes; the Changelog-link variant is home-only. |
| `hero.page-typewriter` | HERO | 2 | 2 | `src/components/HeroHeadline.jsx + src/components/LandingIntro.jsx` | Present on the 2 dark sub-pages (about, pricing). |
| `chrome.app-header` | CHROME | 1 | 2 | `src/components/AppHeader.jsx` | Present on the 2 legal routes (privacy, terms). |
| `legal.doc-switcher` | LEGAL | 1 | 2 | `src/components/LegalDocument.jsx` | Present on the 2 legal routes. |
| `legal.doc-header` | LEGAL | 1 | 2 | `src/components/LegalDocument.jsx` | Present on the 2 legal routes. |
| `legal.contents-card` | LEGAL | 1 | 2 | `src/components/LegalDocument.jsx` | Present on the 2 legal routes. |
| `legal.numbered-sections` | LEGAL | 1 | 2 | `src/components/LegalDocument.jsx (content from src/content/privacy.js, terms.js)` | Present on the 2 legal routes. |
| `legal.footer-row` | LEGAL | 1 | 2 | `src/components/LegalDocument.jsx` | Present on the 2 legal routes. |
| `auth.form-card` | AUTH | 1 | 2 | `src/components/AuthMock.jsx` | Present on the 2 auth routes (sign-in, sign-up). |
| `hero.home-typewriter` | HERO | 1 | 1 | `src/components/Hero.jsx > HeroHeadline, HeroPoetry` | Home route only (1 route). |
| `demo.draft-card` | DEMO | 1 | 1 | `src/components/DraftPreview.jsx` | Home route only (1 route). |
| `demo.questions-card` | DEMO | 1 | 1 | `src/components/QuestionsPreview.jsx` | Home route only (1 route). |
| `demo.comments-card` | DEMO | 1 | 1 | `src/components/CommentsPreview.jsx` | Home route only (1 route). |
| `content.photo-stack` | CONTENT | 1 | 1 | `src/components/PhotoStack.jsx` | About route only (1 route). |
| `content.trust-table` | CONTENT | 1 | 1 | `src/pages/About.jsx (content from src/content/about.js)` | About route only (1 route). |
| `commerce.plan-cards` | COMMERCE | 1 | 1 | `src/pages/Pricing.jsx (content from src/content/pricing.js)` | Pricing route only (1 route). |
| `content.changelog-header` | CONTENT | 1 | 1 | `src/pages/Changelog.jsx` | Changelog route only (1 route). |
| `content.changelog-releases` | CONTENT | 1 | 1 | `src/pages/Changelog.jsx (content from src/content/changelog.js)` | Changelog route only (1 route). |
| `content.docs-header` | CONTENT | 1 | 1 | `src/pages/Docs.jsx` | Docs route only (1 route). |
| `content.docs-sections` | CONTENT | 1 | 1 | `src/pages/Docs.jsx > Block (content from src/content/docs.js)` | Docs route only (1 route). |

**3 shared sections** appear in more than one template and belong in a component library.

**18 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **landing-dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.landing-nav` | shared ×5 |
| 2 | HERO | `hero.home-typewriter` | page-local |
| 3 | DEMO | `demo.draft-card` | page-local |
| 4 | DEMO | `demo.questions-card` | page-local |
| 5 | DEMO | `demo.comments-card` | page-local |
| 6 | CHROME | `chrome.landing-footer` | shared ×5 |

### About — `template.about`

1 route · `/about` · chrome: **landing-dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.landing-nav` | shared ×5 |
| 2 | HERO | `hero.page-typewriter` | shared ×2 |
| 3 | CONTENT | `content.photo-stack` | page-local |
| 4 | CONTENT | `content.trust-table` | page-local |
| 5 | CHROME | `chrome.landing-footer` | shared ×5 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **landing-dark**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.landing-nav` | shared ×5 |
| 2 | HERO | `hero.page-typewriter` | shared ×2 |
| 3 | COMMERCE | `commerce.plan-cards` | page-local |
| 4 | CHROME | `chrome.landing-footer` | shared ×5 |

### Changelog — `template.changelog`

1 route · `/changelog` · chrome: **landing-light-wide**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.landing-nav` | shared ×5 |
| 2 | CONTENT | `content.changelog-header` | page-local |
| 3 | CONTENT | `content.changelog-releases` | page-local |
| 4 | CHROME | `chrome.landing-footer` | shared ×5 |

### API reference — `template.docs`

1 route · `/docs` · chrome: **landing-light-narrow**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.landing-nav` | shared ×5 |
| 2 | CONTENT | `content.docs-header` | page-local |
| 3 | CONTENT | `content.docs-sections` | page-local |
| 4 | CHROME | `chrome.landing-footer` | shared ×5 |

### Legal document — `template.legal`

2 routes · `/privacy`, `/terms` · chrome: **app-shell**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.app-header` | page-local |
| 2 | LEGAL | `legal.doc-switcher` | page-local |
| 3 | LEGAL | `legal.doc-header` | page-local |
| 4 | LEGAL | `legal.contents-card` | page-local |
| 5 | LEGAL | `legal.numbered-sections` | page-local |
| 6 | LEGAL | `legal.footer-row` | page-local |

### Auth — `template.auth`

2 routes · `/sign-in`, `/sign-up` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | AUTH | `auth.form-card` | page-local |

## Section reference

### CHROME

_Page-level navigation and footer chrome; varies by page shell (dark landing, light landing, app shell, none)._

**`chrome.landing-nav`** — Marketing nav row: logo mark on the left, About / Pricing / Login / Sign up pill links on the right. Takes a shell prop: white-alpha links on the dark gradient, #655c53/#161512 links on the light shells; current page is highlighted, and on the narrow docs shell the row stacks into a column at 600px and below.

· Present on the 5 landing-shell routes (home, about, pricing, changelog, docs). · appears on 5 routes · implemented by `src/components/Navbar.jsx`

**`chrome.landing-footer`** — Three-column marketing footer: orange logo with a one-paragraph product description, then Product and Company link columns. The Changelog link appears in the Product column only on the home page (5 Product links there, 4 everywhere else).

· Present on the 5 landing-shell routes; the Changelog-link variant is home-only. · appears on 5 routes · implemented by `src/components/Footer.jsx`

**`chrome.app-header`** — Minimal 60px app-shell header: centred orange logo linking home and a small Sign in link on the right. No marketing nav links.

· Present on the 2 legal routes (privacy, terms). · appears on 2 routes · implemented by `src/components/AppHeader.jsx`

### HERO

_Page-opening headline block._

**`hero.home-typewriter`** — Home hero on the dark gradient: four-line one-time typewriter headline (three muted lines, one bright), Sign up and Watch a demo chips that fade in after typing, and the decorative monospace prompt-text layer typing and erasing in the side gutters above roughly 1040px wide.

· Home route only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > HeroHeadline, HeroPoetry`

**`hero.page-typewriter`** — Sub-page hero on the dark gradient: the same one-time typewriter headline component with the first N default line timings, followed by a short intro paragraph (bold lead sentence plus muted continuation). No chips and no prompt-text layer.

· Present on the 2 dark sub-pages (about, pricing). · appears on 2 routes · implemented by `src/components/HeroHeadline.jsx + src/components/LandingIntro.jsx`

### DEMO

_Looping animated product demo card on the home page, driven by the shared preview timeline engine._

**`demo.draft-card`** — Draft with AI demo card (#draft, the Watch a demo target): a typed prompt becomes a chat on the left and a streamed agreement document on the right; 20-second loop.

· Home route only (1 route). · appears on 1 routes · implemented by `src/components/DraftPreview.jsx`

**`demo.questions-card`** — Ask your contracts demo card: a typed question, a thinking state, a streamed answer and a cited clause card; 16-second loop.

· Home route only (1 route). · appears on 1 routes · implemented by `src/components/QuestionsPreview.jsx`

**`demo.comments-card`** — Comment on contracts demo card: a cursor selects a clause, a comment and reply are typed, a payment term changes from 14 to 30 days, and the thread resolves; 21-second loop.

· Home route only (1 route). · appears on 1 routes · implemented by `src/components/CommentsPreview.jsx`

### CONTENT

_The substantive body of an informational page (about, changelog, docs)._

**`content.photo-stack`** — Interactive stack of three tilted studio photos: hover lifts a card, clicking the front card sends it to the back, clicking another brings it to the front with a toss animation.

· About route only (1 route). · appears on 1 routes · implemented by `src/components/PhotoStack.jsx`

**`content.trust-table`** — Centred safety paragraph (id=safety) followed by a white two-column Area / What we do table of 7 rows describing how the product handles hosting, data, access, signing, AI drafting, email and payments.

· About route only (1 route). · appears on 1 routes · implemented by `src/pages/About.jsx (content from src/content/about.js)`

**`content.changelog-header`** — Centred Changelog page heading with a short intro line, on the flat white wide shell.

· Changelog route only (1 route). · appears on 1 routes · implemented by `src/pages/Changelog.jsx`

**`content.changelog-releases`** — 880px release list: per release a date column beside a list of entries (bold title, short body, links to commits), collapsing to one column on mobile, ending in a small muted note.

· Changelog route only (1 route). · appears on 1 routes · implemented by `src/pages/Changelog.jsx (content from src/content/changelog.js)`

**`content.docs-header`** — API reference page heading and intro on the narrow 720px white shell.

· Docs route only (1 route). · appears on 1 routes · implemented by `src/pages/Docs.jsx`

**`content.docs-sections`** — Single-column run of docs sections: h2/h3 headings, paragraphs, lists, grey monospace code blocks, bordered endpoint cards and a rendered contract example. No sidebar, table of contents, tabs or copy buttons.

· Docs route only (1 route). · appears on 1 routes · implemented by `src/pages/Docs.jsx > Block (content from src/content/docs.js)`

### COMMERCE

_Plans and prices._

**`commerce.plan-cards`** — Row of four equal plan cards (Free, Plus, Pro, Max) each with a monthly price, a token-allowance line and a full-width orange Try it out button to sign-up; stacks on mobile. No billing toggle, feature list or highlighted tier.

· Pricing route only (1 route). · appears on 1 routes · implemented by `src/pages/Pricing.jsx (content from src/content/pricing.js)`

### LEGAL

_Blocks of the shared legal-document layout used by the policy pages._

**`legal.doc-switcher`** — Inline Privacy Policy / Terms of Service switcher at the top of the 768px legal container; the current document is unlinked.

· Present on the 2 legal routes. · appears on 2 routes · implemented by `src/components/LegalDocument.jsx`

**`legal.doc-header`** — Legal document title (h1) with a small Last updated date line.

· Present on the 2 legal routes. · appears on 2 routes · implemented by `src/components/LegalDocument.jsx`

**`legal.contents-card`** — On this page card: a numbered, two-column list of in-page anchor links to every section. Not sticky.

· Present on the 2 legal routes. · appears on 2 routes · implemented by `src/components/LegalDocument.jsx`

**`legal.numbered-sections`** — The numbered policy sections themselves, each an h2 followed by paragraphs and bullet lists (16 sections on privacy, 21 on terms).

· Present on the 2 legal routes. · appears on 2 routes · implemented by `src/components/LegalDocument.jsx (content from src/content/privacy.js, terms.js)`

**`legal.footer-row`** — Simple bordered footer row closing a legal document: a support email prompt, Back to top and Terms home links. Replaces the marketing footer on these routes.

· Present on the 2 legal routes. · appears on 2 routes · implemented by `src/components/LegalDocument.jsx`

### AUTH

_Sign-in/sign-up form surface._

**`auth.form-card`** — Centred 420px sign-in/sign-up form on white with no nav or footer: logo, title and subtitle, a grey Google button, a divider, a 52px pill email input, an orange Continue button, a switch-flow prompt and a Secured by footer. In this clone it is a static, non-functional mock.

· Present on the 2 auth routes (sign-in, sign-up). · appears on 2 routes · implemented by `src/components/AuthMock.jsx`
