Source: https://terms.so/

# Terms.so sub-pages: clone spec

Measured live on 2026-10-20 with Playwright (Chromium) at 1440x900, 1280x900 and 390x844. Values are computed styles, `getBoundingClientRect` readings, or the live CSS rules. Shared tokens, fonts, `.action-button`, nav and footer are in `CLONE_SPEC.md`. This file only covers what differs or is new.

Copyright note: long prose (legal text, docs body, changelog bodies, About paragraphs) is NOT transcribed. Each block gets a word count and a one-line topic, so write original placeholder copy of the same length. Short UI strings (headings, labels, buttons, prices, dates) are verbatim.

---

## 0. Page shells (three variants)

**/privacy and /terms do NOT use any landing shell** (they use the app shell, D, see §5). /sign-in and /sign-up use the auth shell, see §6. Every other route uses the same `.landing` wrapper (`width:100%; padding:0 24px; display:flex; flex-direction:column; align-items:center; flex:1`), the same nav markup (`header.landing-nav.landing-col`) and the same footer markup (`footer.landing-footer.landing-col`). Only the wrapper modifier classes change:

| Shell | Wrapper classes | Used by | `--content-width` | Page bg | Nav padding (desktop / <=600) | Nav colors |
|---|---|---|---|---|---|---|
| **A. Dark hero** | `.landing.landing--wide.landing--home` | `/` (home), `/about`, `/pricing` | 960px | hero gradient `100% 840px` no-repeat over `#fefcfb` (identical to home) | `24px 0` (98.4 tall) / `20px 0` row, gap 12 (84 tall) | home values: muted `rgba(255,255,255,.5)`, active `.85`; logo `#fefcfb` |
| **B. Light wide** | `.landing.landing--wide` | `/changelog` | 1152px | `#fff` (flat) | `32px 0`, gap 16 (114.4 tall) / `20px 0` row, gap 12 (84 tall) | muted `#655c53` (`--nav-link-muted`), active `#161512` (`--nav-link`); logo `#e53d00` |
| **C. Light narrow** | `.landing` (no modifier) | `/docs` | 720px | `#fff` | `96px 0`, no gap (242.4 tall) / **column**: `flex-direction:column; align-items:flex-start; gap:32px; padding:48px 0` (199 tall) | same as B |

Shared nav facts on all shells:
- Links: About `/about`, Pricing `/pricing`, Login `/sign-in`, Sign up `/sign-up`; same sizes as home (15px/14.4px, -0.15px; at 390: 14px/13.44px, -0.14px, `padding:14px 10px`, 44px tall).
- Color rule: `.action-button` in `.landing-actions` uses `--nav-link-muted`; links matching `[href="/sign-in"], [href="/sign-up"], [aria-current="page"], [data-pill-active]` use `--nav-link`. Hover (fine pointer) also sets `--nav-link`. Transition `color .25s cubic-bezier(.77,0,.175,1), background .15s, box-shadow .15s`.
- The pill highlight (`.pill-navigation-highlight`) has `data-active` and is visible on light pages, but its background is transparent and its shadow is none. Hover-tested on /changelog: background `rgba(0,0,0,0)`, shadow `none`. So it is invisible on every shell, and the only hover effect is the color change.
- The current page link gets `[data-pill-active]`. On /about, About is active (`.85` white); on /pricing, Pricing is active. On light pages, hovering About made About `#161512` while Pricing stayed `#655c53`.
- On shell A, `--nav-link`/`--nav-link-muted` are the white alphas from the home spec.
- Light-shell CSS vars (on `.landing`): `--ink:#161512; --nav:#655c53; --nav-link:#161512; --nav-link-muted:#655c53; --prose-muted:#989490; --hairline:#eee; --landing-surface-border:#e5e5e5; --focus-outline:1px solid #777; --segmented-selected-background:#fff; --segmented-item-height:44px; --segmented-gap:4px; --segmented-radius:999px`.

Footer: same component everywhere, with columns set by `minmax(0,1.6fr) minmax(0,1fr) minmax(0,1fr)` in the current content width:
- 960 → 384 / 240 / 240 (home, about, pricing)
- 1152 → 469.33 / 293.33 / 293.33 (changelog)
- 720 → 277.33 / 173.34 / 173.34 (docs). The brand description wraps to 108px tall here.
- At 390 it is always `1fr 1fr` (159/159) with the brand spanning both columns, `padding:56px 0`, 426.8 tall.

The footer logo is always `#e53d00`.
**Footer links differ by route (verified live 2026-10-21):** home has Product = Sign up, Login, Pricing, API docs, **Changelog** (5). Every sub-page with a landing footer (/about, /pricing, /changelog, /docs) has only 4 (no Changelog). Company is the same everywhere: About, Contact (mailto:support@terms.so), Privacy Policy, Terms of Service. Make the Changelog item a prop, shown on home only. The Product column is 105.6 tall with 4 links (y offsets 0/28.9/57.8/86.7, gap 10).

Headline typewriter: `/about` and `/pricing` reuse the home `HeroHeadline` component with `DEFAULT_TIMING` (no timing prop is passed in the RSC payload). Line i uses the home table's line i timing: L1 delay 240 / dur 700, L2 220 / 760, L3 220 / 880. `completionDelay` is 1200. There are no chips, so completion has no visible effect. Measured on /about: first char ~350ms after load, line 1 complete ~1078ms, line 2 starts ~1320ms, all done ~2050ms. Use the same `typed + <span class="landing-headline-tail" style="visibility:hidden">rest</span>` markup so layout never shifts. Shell A pages have no poetry background (only home has `.landing-poetry`).

---

## 1. /about ("About — Terms")

Shell A (dark hero). Doc height: 2508 at 1440/1280, 3230 at 390.

### Structure (1440; 1280 is identical, shifted x by -80)
```
header.landing-nav                          960 x 98.4 @ y0
main.landing-hero.landing-hero--about       960 x 466 @ y98.4   flex column, align-items:flex-start, text-align:left, gap 64, padding 150px 0 80px
  h1.landing-headline                        349 x 112 @ y248.4  2 lines
  p.landing-prose.landing-intro              560 x 76  @ y408.4  margin-top:-16px, max-width 560
section.landing-col                         960 x 484 @ y564.4
  div.photo-stack                            960 x 468, margin 8px 0
section.landing-section.landing-col         960 x 1129.9 @ y1048.4   flex column, align-items:flex-start, gap 48, padding-top 56
  p#safety.landing-prose.landing-safety      560 x 76, align-self:center, text-align:center (x=440)
  table.landing-table                        960 x 949.9 @ y1228.4
footer                                       @ y2178.3, 329.8 tall
```
390: main `padding:72px 0 56px; gap:32px` (the `.landing--home .landing-hero` mobile rule wins). Measured: main y84, 321.5 tall; h1 @ y148, 206.6 x 66.3; intro @ y230.3, 342 x 119.2. Photo section @ y405.5 (316 tall); stack 342 x 300. Safety section @ y721.5; safety p 342 x 140.8; table @ y966.2, 342 x 1836.8. Footer @ y2803.1.

### Typography
| Role | Spec |
|---|---|
| h1 lines (`span.landing-headline-line`, display:block) | 500 56px/56px (line-height 1), letter-spacing -2.8px (-.05em), color `rgba(255,255,255,.9)`, `white-space:nowrap`. ≤1000: `clamp(32px,5.4vw,56px)`. ≤600: `white-space:normal; clamp(28px,8.5vw,34px)` = 33.15px/33.15px, -1.6575px at 390 |
| Intro `strong` (lead sentence) | 500 16px/21.6px (1.35), -0.16px, `rgba(255,255,255,.9)` |
| Intro links in strong (2: "Family Office" → https://familyoffice.is, "Diego Segura" → https://diegosegura.me; `target=_blank rel=noreferrer`) | inherit, `text-decoration:underline; text-underline-position:from-font`, decoration color = text color |
| Intro muted span `.landing-prose-muted` | 400 16px/21.6px, `rgba(255,255,255,.62)` |
| Safety `strong` | 500 16px/21.6px, `#161512` |
| Safety muted span | 400 16px/21.6px, `#989490`; its link ("investigate the source code" → https://github.com/diego-segura/terms2) is 500, `#161512`, underlined |
| Table head th ("Area", "What we do") | 500 16px/21.6px, `#989490` |
| Table row th (labels) | 500 16px/21.6px, `#161512` |
| Table td | 400 16px/21.6px, `#989490`; inline links 500 `#161512` underline from-font |

`.landing-prose`: `text-box: cap alphabetic; margin:0; font-weight:500; line-height:1.35`.

### Content shape (write original copy)
- h1: "Built by a studio" / "that signs a lot." (2 lines, `aria-label` = full sentence)
- Intro p: one bold sentence (~16 words, introduces the project as an independent open-source project by a design firm, with 2 links) + a muted continuation (~27 words, the studio's motivation: frequent contract exchange with clients). 43 words in total.
- Safety p (`id="safety"`): bold sentence (~15 words: the project is independent and has not been audited) + muted continuation (~41 words: invites readers to inspect the source, introduces the table below; 1 inline link). 56 words in total.
- Table: 2 columns (`col:first-child{width:33.333%}`), header row "Area" | "What we do", and 7 body rows. The row labels are verbatim; the right cell is placeholder prose with the given word count:
  1. Hosting (17w, mentions host, 1 link "Vercel")
  2. Database (29w, 1 link "Neon")
  3. Access (68w, 1 link "Clerk")
  4. Signing (39w)
  5. AI drafting (89w, 3 links: "Anthropic", "Privacy Policy" → /privacy, "API reference" → /docs)
  6. Email (32w, 1 link "Resend")
  7. Payments (16w, 1 link "Stripe")

### Table styling
`.landing-table{table-layout:fixed; border-collapse:collapse; width:100%; background:#fff; border-radius:0; line-height:1.35; box-shadow:var(--landing-surface-shadow)}`, where the shadow is `0 2px 4px #00000003, 0 5px 10px #00000004, 0 10px 20px #00000005, 0 20px 40px #00000006, 0 40px 80px #00000008`.
Cells: `border:.75px solid #e5e5e5` (computes to 0.5px in Chromium at DPR 1); `text-align:left; vertical-align:top; padding:24px` (16px at ≤600).
Row heights at 1440: thead 70.1, then 91.7, 113.3, 156.5, 113.3, 199.7, 113.3, 91.7. Column widths 319.8 / 639.7 (at 390: 113.8 / 227.7).

### Photo stack (interactive)
- `.photo-stack{--card-w:300px; --spread:190px; height:calc(var(--card-w)*1.4 + 48px) /*468*/; margin:8px 0; position:relative}`. At ≤600: `--card-w:180px; --spread:70px` (height 300).
- 3 `<button type=button class=photo-stack-card>`, each containing a Next `<img>` (`sizes="(max-width: 600px) 60vw, 300px"`, blur placeholder, `draggable=false`). `role=group aria-label="Photos of the studio"` on the wrapper.
- Fixed per-index slot vars (they do not change on click):

| i | img | --dx | --dy | --rot | --w | --aspect | alt |
|---|---|---|---|---|---|---|---|
| 0 | studio-review.jpg | -0.9 | 0.15 | -8deg | 0.92 | 3 / 4 | "The team gathered around a screen reviewing work" |
| 1 | studio-table.jpg | 0.05 | -0.1 | 2deg | 1 | 4 / 5 | "Red chairs around a black round table with books and microphones" |
| 2 | studio-desk.jpg | 0.95 | 0.2 | 7deg | 1.08 | 5 / 4 | "A desk with an iMac in front of a wall of bookshelves" |

- Card CSS: `position:absolute; top:50%; left:50%; width:calc(var(--card-w)*var(--w,1)); height:auto; padding:0; border:none; border-radius:16px (12px ≤600); overflow:hidden; background:#f4f2ee; cursor:pointer; will-change:transform; --lift:0px; --grow:1; --tilt:var(--rot);`
  `transform: translate(calc(-50% + var(--dx)*var(--spread)), calc(-50% + var(--dy)*var(--spread)*.4 + var(--depth)*-4px + var(--lift))) perspective(1500px) rotateY(calc(var(--tilt)/10)) rotateZ(var(--tilt)) scale(var(--grow));`
  `box-shadow: 0 12.5px 100px -10px rgba(50,50,73,.4), 0 10px 10px -10px rgba(50,50,73,.3); transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s;`
  img: `width:100%; height:auto; aspect-ratio:var(--aspect); object-fit:cover; display:block`.
  The card's own bg is set explicitly so the global `button` rule (black pill, 52px tall) must not leak in.
- Hover (fine pointer) and `:active`: `--lift:-6px; --grow:1.015; --tilt:calc(var(--rot)*.6); box-shadow: 0 20px 110px -10px rgba(50,50,73,.45), 0 14px 14px -10px rgba(50,50,73,.3)`.
  Since `--lift/--grow/--tilt` are plain custom properties, they are not interpolated. The motion comes from the `transform` transition.
- Front card (`[data-front]`, last in order): `animation: photo-toss .45s cubic-bezier(.2,.8,.2,1)` with `@keyframes photo-toss{0%{--grow:1.06; --lift:-14px} 100%{--grow:1; --lift:0px}}`. It replays whenever a card becomes front.
- Focus-visible: `outline:1px solid #777; outline-offset:4px`. Reduced motion: no transition, no animation.
- State: `order` = array of indices, initially `[0,1,2]`. Per card: `zIndex = order.indexOf(i)+1`, `--depth = order.indexOf(i)`, front = last.
  - Click on the front card → `[last, ...rest]`: front goes to the back. aria-label "Show the next photo".
  - Click on another card → `[...others, i]`: it comes to the front. aria-label "Bring this photo to the front".
  - Verified live: click front (desk) → table becomes front, desk z1. Then click review → review front.
- Rendered card boxes at 1440 (bounding rects include rotation): review 324.5x402.8, table 312.9x385.2, desk 353.1x296.7. Layout widths are 276 / 300 / 324 (img heights 368 / 375 / 259).
- At 390, cards overflow the viewport (leftmost at x=-73). This is clipped by `.landing{overflow-x:clip}`.

---

## 2. /pricing ("Pricing — Terms")

Shell A. Doc height: 1225 at 1440/1280, 1944 at 390. There is **no monthly/annual toggle, no feature list, and no "popular" badge**.

### Structure (1440)
```
main.landing-hero.landing-col     960 x 522 @ y98.4   padding 150px 0 80px, gap 64 (no --about modifier)
  h1.landing-headline              280.6 x 168 @ y248.4  3 lines
  p.landing-prose.landing-intro    560 x 76 @ y464.4 (margin-top -16)
section.landing-plans.landing-col  960 x 275 @ y620.4   display:flex; align-items:stretch; gap:12px; position:relative; z-index:1
  4 x div.landing-card.landing-plan   231 x 275 each, x = 240 / 483 / 726 / 969
footer @ y895.3
```
The plans straddle the gradient end (gradient is 840px tall, plans end at 895).
390: main padding 72/56, gap 32 (main y84, 384.2 tall); h1 @ y156, 166.1 x 99.4; intro 342 x 140.8. Plans become a column (`flex-direction:column`, cards `flex:0 0 auto`), each 342 x 253.4, gap 12, starting y468.2. Footer @ y1517.6.

### Headline
- Line 1 "Pricing:" uses `.landing-headline-line.landing-headline-brand`: `rgba(255,255,255,.26)` with `mix-blend-mode:plus-lighter`.
- Lines 2 and 3 are "Sign for free." / "Pay for AI." at `rgba(255,255,255,.9)`.
- 56px/56px, -2.8px, same responsive rules as About.

### Intro
- Bold sentence: 9 words, says contracts/signing/comments are free.
- Muted continuation: 43 words, says paid plans raise the AI allowance.
- Same styles as the About intro.

### Plan card
- `.landing-card`: `border:1px solid #eee; background:#fff; padding:24px; overflow:hidden; box-shadow: 0 .5px 1.3px #00000003, 0 1.2px 3.1px #00000003, 0 2.3px 5.8px #00000003, 0 4px 10.5px #00000005, 0 7.5px 19px #00000005, 0 18px 47px #00000008`.
- `.landing-card.landing-plan{border-radius:16px}`, which stays 16 at 390 because it outranks the `≤600 .landing-card{border-radius:24px}` rule.
- `.landing-plan{display:flex; flex-direction:column; flex:1 1 0; align-items:flex-start; gap:24px}`.
- Children, in order:
  1. `span.landing-plan-name`: 500 16px, line-height .96, -0.16px, `#161512`, `text-box:cap alphabetic` (box 11.2 tall).
  2. `span.landing-plan-price`: `display:block; padding-top:8px; font-size:40px; line-height:.96; letter-spacing:-.04em (-1.6px); font-weight:500; color #161512; text-box:cap alphabetic` (box 36 tall). Contains the number, then a space and `span.landing-prose-muted` "/ month" (500 16px, -0.01em, `#989490`).
  3. `span.landing-plan-tokens.landing-prose-muted`: 400 16px/21.6px, `#989490`, cap-trimmed, 181 x 54.4 at desktop (3 lines).
  4. `a.action-button.action-button--brand` "Try it out" → `/sign-up`, `align-self:stretch; margin-top:auto`. 181 x 51.4 at desktop (292 wide at 390). `#e53d00`, hover `#cc3600`, white text, 16px/15.36px, padding 18px 24px, radius 999.

Child y offsets in the card at 1440: name 25, price 60.2, tokens 120.2, button 198.6.

| Name | Price | Tokens line (verbatim) |
|---|---|---|
| Free | $0 / month | 200,000 AI tokens a month, 100,000 every two weeks |
| Plus | $10 / month | 750,000 AI tokens a month, 375,000 every two weeks |
| Pro | $20 / month | 1,500,000 AI tokens a month, 750,000 every two weeks |
| Max | $50 / month | 3,500,000 AI tokens a month, 1,750,000 every two weeks |

Motion: only the headline typewriter. The cards have no hover state.

---

## 3. /changelog ("Changelog — Terms")

Shell B (light wide, `#fff`, 1152 col). Doc height: 8766 at 1440/1280, 12010 at 390.

### Structure (1440; col x=144..1296; at 1280 x=64..1216)
```
header.landing-nav                       1152 x 114.4 (padding 32px 0)
main.landing-col.changelog-module__main  @ y114.4, padding 48px 0 96px, color #161512
  header.[changelog]header                1152 x 281.4 @ y162.4  flex column, align-items:center, text-align:center, gap 24, padding 96px 0 (64px 0 at ≤600)
    h1 "Changelog"                         165.8 x 41.4 centered
    p                                      480.6 x 24, max-width 560
  div.[changelog]releases                 width 100%, max-width 880, margin 0 auto (x=280..1160 at 1440; 200..1080 at 1280)
    section.[changelog]release  x15       display:grid; grid-template-columns:176px minmax(0,1fr) (=176 / 656); gap:48px; padding:40px 0; border-top:.75px solid #e5e5e5
      h2#release-YYYY-MM-DD.[changelog]date > time[datetime=YYYY-MM-DD]
      ul.[changelog]announcements          flex column, gap 28, list-style none, padding 0
        li.[changelog]announcement
          p > strong(title) + " " + body text
          div.[changelog]commits           flex, wrap, gap 4px 16px, margin-top 8px
            a (per commit) → https://github.com/diego-segura/terms2/commit/<sha>, target=_blank rel=noreferrer, aria-label "View commit <sha> for <title>"
              <span aria-hidden="true">↗ </span><sha>
  p.[changelog]note                        after releases, margin-top 8px (y 8322.9 at 1440)
footer (1152 col)
```
The last release has no bottom border; only the border-top separators appear. There are no images, tags or badges in entries.
At ≤600: release `grid-template-columns:minmax(0,1fr); gap:24px; padding:32px 0` (date sits above the list). At 390: header 241.4 tall @ y132; h1 centered @ y196; intro p 342 x 48 (2 lines).

### Typography
| Role | Spec |
|---|---|
| h1 | 500 36px/41.4px (1.15), letter-spacing -1.08px (-.03em), `#000`, `text-wrap:balance` |
| Intro p | 400 16px/24px, `#73706d` (rgb 115,112,109), max-width 560 |
| Date (`h2 > time`) | 400 14px/21px (1.5), -0.14px, `#73706d` |
| Entry p | 400 16px/25.6px (1.6), -0.16px, `#73706d` |
| Entry title `strong` | 500, `#000`, inline at the start of the p |
| Commit link | 400 12px/18px, `#73706d`, no underline, `padding-block:4px` (26 tall). Hover (fine pointer) and active: `color:#000; text-decoration:underline; text-underline-offset:3px` (instant, no transition) |
| Note p | 400 12px/18px, `#73706d`. One sentence, 15 words, says dates are merge dates and each item links to its commits |

### Content shape
- Intro: 11 words, three short sentences about new features and improvements.
- Releases: 15 releases, 61 entries, 80 commit links. Each entry is a title (3–10 words, verbatim allowed) and a body of 10–34 words (median ~21).
- In the table, "commits" is the number of links per entry, in entry order.

| Date (verbatim) | datetime | entries | commits per entry |
|---|---|---|---|
| October 5, 2026 | 2026-10-05 | 1 | 1 |
| October 4, 2026 | 2026-10-04 | 5 | 1,1,1,1,1 |
| October 1, 2026 | 2026-10-01 | 8 | 2,1,1,1,1,1,1,2 |
| September 30, 2026 | 2026-09-30 | 7 | 3,3,1,1,1,1,1 |
| September 27, 2026 | 2026-09-27 | 4 | 2,1,2,1 |
| September 25, 2026 | 2026-09-25 | 2 | 1,1 |
| September 23, 2026 | 2026-09-23 | 3 | 1,1,1 |
| September 15, 2026 | 2026-09-15 | 2 | 2,1 |
| September 14, 2026 | 2026-09-14 | 3 | 1,1,1 |
| September 10, 2026 | 2026-09-10 | 4 | 1,1,1,1 |
| September 9, 2026 | 2026-09-09 | 4 | 1,1,3,1 |
| September 8, 2026 | 2026-09-08 | 5 | 1,1,1,1,2 |
| September 7, 2026 | 2026-09-07 | 5 | 1,1,2,1,2 |
| September 3, 2026 | 2026-09-03 | 3 | 2,1,2 |
| September 2, 2026 | 2026-09-02 | 5 | 2,2,1,1,2 |

Entry titles, in page order (verbatim short headings; bodies are not transcribed): The homepage previews match the app. / A chat prompt that shows what it is working with. / Edit or cancel a queued change. / Terms feels more at home on your phone. / A tidier editor chat. / Attached files stay with their message. / Simplified templates experience. / Improved Q&A with the AI contract editor. / See Terms in action on the homepage. / Claude usage in Analytics. / Edit contract titles right in the preview. / Simpler comment replies. / Void a contract without sending an email. / Less waiting around the app. / Bring your existing agreements into Terms. / Ask questions with the source at hand. / Pick up a conversation where you left off. / More control over reference documents. / A smoother experience on your phone. / More natural conversations about your contracts. / A tidier workspace. / Let your agents work on drafts. / Download a PDF before anyone signs. / Update signers without rewriting the agreement. / Better recovery when an AI request stops. / Connect your agent to Terms. / Clearer privacy and terms pages. / Simplified templates experience. / Drop files straight into chat. / Keep removed contracts out of the way. / Pricing that fits on your phone. / A clearer view of how Terms is used. / Update signer details through chat. / Drafts that know today's date. / Clearer contract status and completed records. / Set up a contract through conversation. / More room to work on mobile. / Undo a deleted comment. / Give the AI the whole conversation. / One editor for drafts and sent contracts. / Turn feedback into changes with AI. / Easier signing and commenting on mobile. / One acknowledgement, less interruption. / Start with a conversation. / Turn a PDF into an editable contract. / Search and ask across your contracts. / Work with Terms over email. / Review before you send. / Sign in with the email on the contract. / Know when it is time to sign. / Send updates with a clear record of changes. / Add the company behind a signature. / Meet the people behind Terms. / Your contracts, in your account. / Give the assistant a reference PDF. / See your AI allowance. / The first version of Terms. / Write and preview in one place. / Discuss the details on the contract. / Sign and keep a record. / Draft with AI beside you.

Motion: none. No headline typing (plain h1), no scroll spy, no sticky elements, no filters.

---

## 4. /docs ("API reference — Terms")

Shell C (light narrow: 720 col, `#fff`). Doc height: 6629 at 1440/1280, 10188 at 390. Layout is a **single column: no sidebar, no TOC, no sticky elements, no tabs, no copy buttons, no syntax highlighting.** Section ids exist for anchor links only.

### Structure (1440: col x=360..1080; 1280: x=280..1000)
```
header.landing-nav                 720 x 242.4 (padding 96px 0; at 390: column layout, 199 tall)
main.landing-col.connector-guide.stack.gap-32   @ y306.4: margin 64px auto; padding 48px 0 96px; flex column gap 32; font-weight 400; line-height 1.5; overflow-wrap:anywhere
  header.stack.gap-16              h1, p, p(links)
  section#authentication.stack.gap-16
  section#quickstart.stack.gap-16
  section#endpoints.stack.gap-16
  section#drafts.stack.gap-16      (contains h3#signers)
  section#line-breaks.stack.gap-16
  section#errors.stack.gap-16
footer (720 col) @ y6281.9
```
Utility classes: `.stack{display:flex; flex-direction:column; gap:16px}`, `.gap-0/4/8/12/16/20/24/28/32{gap:Npx}`.

### Typography (all `#161512`)
| Role | Spec |
|---|---|
| h1 | 500 32px/36.8px (1.15), -0.96px (-.03em) |
| h2 | 500 24px/28.8px (1.2), -0.48px (-.02em) |
| h3 (card titles, #signers) | 500 18.72px/22.464px (UA 1.17em, line-height 1.2), -0.3744px |
| p, li | 400 16px/24px, -0.16px |
| Links (`.connector-guide a:not(.action-button)`) | 400, inherit color, `text-decoration:underline; text-underline-offset:3px`. No hover change |
| Inline `code` | family **`monospace` (generic only, no stack)**, 16px/24px, no background, no padding (unstyled) |
| `pre` | generic `monospace`, 16px/24px; `background:#f7f7f7; border-radius:20px; padding:24px; white-space:pre-wrap; overflow-wrap:anywhere` (no inner `<code>`) |
| `ol`/`ul` | `.stack.gap-12`: flex column, gap 12, `padding-left:40px`; markers decimal/disc in `#161512` |

### Endpoint card (`div.connector-card.stack.gap-12`)
`border:1px solid #e5e5e5; border-radius:20px; padding:24px; min-width:0`, flex column, gap 12. Content: h3 title, then `<code>METHOD␠path</code>` as a block row (24 tall, no pill or badge, same monospace), then a p.

### Content shape
`p` = paragraph with its word count. Verbatim headings are given; bodies are placeholders. Topics are neutral.

- **header**: h1 "Terms API reference"; p (24w, says the reference is public and readable by agents); a links p with 3 links separated by " · ": "OpenAPI 3.1.1 specification" → /connect/openapi.json, "Plain-text agent entry point" → /llms.txt, "Muse setup guide" → /connect/muse.
- **#authentication**, h2 "Base URL and authentication":
  - p20 (base URL, with 3 inline code spans)
  - pre (1 line, an Authorization header)
  - p36 (about sending the key)
  - ol with 3 items (27/28/18w; key-creation steps, 1 link "Connectors" → /account/connectors)
  - p27 (key expiry and revocation)
- **#quickstart**, h2 "First request":
  - p13 (1 code span)
  - pre (2 lines, a curl command)
  - p25 (response shape and pagination, 2 code spans)
  - p25 (1 link "public product information" → /api/connectors/v1/product)
- **#endpoints**, h2 "Endpoints": p17, then 6 cards. Titles and method/paths are verbatim:
  1. "Create a personal contract draft" / `POST /api/connectors/v1/drafts` / p94
  2. "Read a personal draft and its revision before editing" / `GET /api/connectors/v1/drafts/{id}` / p50
  3. "Save a requested edit to a personal draft" / `PATCH /api/connectors/v1/drafts/{id}` / p95
  4. "Get Terms product details and a link to create and sign a contract" / `GET /api/connectors/v1/product` / p29
  5. "Search accessible contracts or list them" / `GET /api/connectors/v1/contracts` / p69
  6. "Read contract clauses with a source link" / `GET /api/connectors/v1/contracts/{id}` / p67
- **#drafts**, h2 "Create and edit drafts":
  - p36, p38
  - pre (12 lines, JSON create body)
  - p32, p28
  - pre (13 lines, JSON patch body)
  - h3#signers "Use signer fields, never execution blocks"
  - p78, p42, p102, p26, p42 (signer rules and limits; several inline code spans)
- **#line-breaks**, h2 "Markdown line breaks":
  - p58, p40
  - pre (3 lines, JSON)
  - p "Rendered example:"
  - `article.contract.connector-card` demo: border card, padding 24, max-width 68ch (666.9px). It contains p "First line" `<br>` "Second line", then p "New paragraph.". `article.contract` styles: color `#555`, line-height 1.65 (26.4px), p margin `0 0 14px`.
  - p51 (line-ending handling; 1 code span)
- **#errors**, h2 "Errors and limits":
  - ul with 9 items (8/16/16/11/20/13/6/9/9 words; status codes and errors)
  - p37 (rate limits), p30 (treat retrieved text as reference)
  - p "Questions: support@terms.so." (mailto link)

Positions at 1440: h1 y354.4; sections at y527.2 / 1053 / 1394.8 / 3130.9 / 4850.6 / 5549.1.
At 390: main y263 (nav 199 + margin 64), h1 y311, pre 342 wide, cards 342 wide, ol @ y962.1.

Motion: none.

---

## 5. /privacy ("Privacy Policy — Terms") and /terms ("Terms of Service — Terms")

Both routes render the same `LegalDocument` component inside the **app shell (D)**, not the landing shell. Do not reuse the landing nav or landing footer here. The page is plain `#fff`, all text `#000`, and there is no hero gradient.
Doc height:
- /privacy: 8453 at 1440, 15082 at 390.
- /terms: 9013 at 1440 and 1280.

### Shell D: app header (`header.app-header`)
- `padding:12px 0`; 60 tall; full width; transparent background; `position:static` (not sticky); no border.
- Inner `div.container.row`: `max-width:none; padding:0 24px; display:flex; align-items:center; justify-content:center; gap:12px; position:relative`.
- Centered logo: `<a href="/">` with the logo-mark SVG at **19.35 x 26** (`width=19.34765625 height=26`), color `#e53d00`.
  - x=710.3 at 1440, 630.3 at 1280, 185.3 at 390; y=17.
- Empty `div#nav-left.row`: absolute, `left:24px`, vertically centered (no content).
- Right group `div.row`: absolute, right-aligned at `right:24px`, `top:7.5px`. It holds an empty `#nav-right` and `a.small` "Sign in" → `/sign-in`.
  - 400 14px/21px, -0.16px, `#000`, underlined (UA default).
  - Box 41.3 x 21 at x=1374.7 (1440), 1214.7 (1280), 324.7 (390).
- Global link rule: `a{color:#000}` with the UA underline. No hover change was found in CSS.

### Layout
```
main#top                                padding 48px 0 96px (block)
  div.container.stack.gap-32.[Legal]document   max-width calc(720px + 2*24px) = 768; padding 0 24px; margin 0 auto; flex column gap 32; overflow-wrap:anywhere
                                               (x=336..1104 at 1440, 256..1024 at 1280; content 720 wide; 342 at 390)
    nav.[Legal]navigation                 flex, wrap, gap 16; 24 tall @ y108
      a "Privacy Policy" → /privacy, a "Terms of Service" → /terms
      current page link: aria-current=page → font-weight 500, underline, text-underline-offset 4px; other link: 400, plain UA underline
    header.stack.gap-16                   @ y164
      div.stack.gap-8
        h1                                 500 32px/36.8px, -0.96px, #000
        p.small.muted "Last updated <time>25 September 2026</time>"   400 14px/21px, #666
      p                                    intro, 400 16px/24px, #000
    nav.callout.stack.gap-16.[Legal]contents   TOC card: bg #fff, border-radius 16, padding 24, box-shadow var(--shadow-card) = 0 0 0 1px #0000000d, 0 .6px 1.1px #00000006, 0 1.7px 3.4px #00000008, 0 4.1px 8.2px #0000000a, 0 13px 27px #0000000e; flex column gap 16; NOT sticky
      h2 "On this page"                    500 24px/28.8px, -0.48px, margin 0
      ol                                   columns:2; column-gap:32px; padding-left 24px; decimal markers (1 column at <=600)
        li (break-inside:avoid; padding-bottom:8px) > a href="#<id>"   16px/24px, 400, #000, underlined
    article.stack.gap-32
      section#<id>.[Legal]section  (flex column gap 16; scroll-margin-top 32px; h2/h3/p/ul/ol margin 0)
        h2#<id>-heading  "N. Title"         500 24px/28.8px, -0.48px  (markup: `{n}. {title}`)
        p / ul (padding-left 24; li + li margin-top 8px; some li start with <strong> lead-in, 500)
    footer.small.muted.[Legal]footer      border-top 1px solid #eee; padding-top 24; flex, wrap, gap 16; 14px/21px #666
      p "Questions? <a mailto:support@terms.so>support@terms.so</a>"   margin 0 auto 0 0 (pushes the rest right)
      a "Back to top" → #top
      a "Terms home" → /
```
Positions at 1440 (privacy): nav y108, h1 y164, intro y245.8 (720 x 48), TOC card y325.8 (372.8 tall; ol 672 wide, 2 columns at x=408 and 748), article y730.6, footer y8311.3 (46 tall).
At 390: h1 y164; TOC card y373.8, 724.8 tall, single column; h2s wrap to 2 lines (57.6); the footer wraps to 83 tall.
- No scroll spy, no smooth scrolling (`html{scroll-behavior:auto}` here), no motion.
- Print CSS hides the nav, TOC and footer.

### /privacy content shape
- Intro: 26w (what information is collected and how it is used).
- TOC: 16 entries, which are the section titles verbatim below.

| # | id | h2 title (verbatim) | blocks (p = paragraph with word count; ul[...] = item word counts, B = item starts with a bold lead-in) | topic |
|---|---|---|---|---|
| 1 | scope | Who we are and what this policy covers | p58 (has 1 bold company name), p81, p28 (links to /terms, mailto) | operator identity, controller role, scope |
| 2 | information-collected | Information we collect and its sources | ul[B47,B31,B28,B37,B31,B43,B42,B45], p50, p38 | categories of data collected |
| 3 | uses | How we use information | ul[9,17,16,16,11,15,19], p25 | purposes of processing |
| 4 | ai | AI processing and uploaded files | p70, p56, p62, p53 | AI subprocessor handling |
| 5 | sharing | Who receives information | p16, ul[B20,B15,B9,B10,B17,B7], p38, p49, p64 | recipients and subprocessors |
| 6 | email-and-links | Signing links, notifications, and the email agent | p39, p67, p32 | signing links and email |
| 7 | integrations | Services you connect or authorize | p49, p97, p127, p51 | third-party connections |
| 8 | cookies | Cookies, browser storage, and analytics | p56, p76, p67 | cookies and analytics |
| 9 | retention | Retention, deletion, and document records | p60, ul[B50,B50,B38,B30,B35], p48 | retention periods |
| 10 | security | Security | p41, p35 | safeguards |
| 11 | international | International processing and legal bases | p68, p72, p47 | transfers and legal bases |
| 12 | rights | Your choices and privacy requests | p41, p61, p72, p67 | data subject rights |
| 13 | us-privacy | Additional information for US residents | p64, p60, p54 | US state law disclosures |
| 14 | children | Children | p70 (mailto) | minors |
| 15 | changes | Changes to this policy | p65 | policy updates |
| 16 | contact | Contact us | p32 (mailto) | contact details |

### /terms content shape
- Same component. h1 "Terms of Service", "Last updated 25 September 2026", intro p 25w.
- The TOC has 21 entries and is 468.8 tall at 1440. Article starts at y826.6; footer at y8871.3.
- Five `<strong>` spans appear inside paragraphs: agreement 9w, legal-advice 34w, subscriptions 13w, disclaimers 42w, liability 2w. These are bold legal emphasis inline, not lead-ins.

| # | id | h2 title (verbatim) | blocks | topic |
|---|---|---|---|---|
| 1 | agreement | Your agreement with Terms | p65, p53, p53 | acceptance of terms |
| 2 | service | What the Service provides | p42, p52 | service description |
| 3 | accounts | Accounts, access, and authority | p42, p58, p39 | account responsibilities |
| 4 | legal-advice | No legal or professional advice | p34, p46, p42 | no-advice disclaimer |
| 5 | ai | AI features and your review responsibilities | p48, p52, p57 | AI output review |
| 6 | electronic-signatures | Electronic signatures and records | p56, p49, p51, p50, p80, p31 | e-sign consent and records |
| 7 | document-workflow | Sending, revisions, and withdrawal | p55, p42, p51 | document lifecycle |
| 8 | content | Your content and the permission to process it | p56, p76, p57 | content license |
| 9 | acceptable-use | Acceptable use | p7, ul[21,15,20,24,29,21], p41 | prohibited conduct |
| 10 | subscriptions | Plans, billing, renewal, and cancellation | p60, p75, p57, p53, p53 | billing |
| 11 | third-parties | Email agents, integrations, and third parties | p38, p78, p43 | third-party services |
| 12 | our-property | Our intellectual property and feedback | p52, p43 | IP and feedback |
| 13 | availability | Availability and changes to the Service | p49, p50 | uptime and changes |
| 14 | termination | Suspension, termination, and account closure | p36, p58, p62 | termination |
| 15 | disclaimers | Disclaimers | p42, p54, p23 | warranty disclaimer |
| 16 | liability | Limitation of liability | p48, p68, p46 | liability caps |
| 17 | business-indemnity | Responsibility for third-party claims | p85, p68 | indemnity |
| 18 | disputes | Governing law and disputes | p64, p51, p34 | governing law |
| 19 | changes | Changes to these Terms and notices | p59, p61, p54 | amendments |
| 20 | general | General provisions | p50, p64, p41 | boilerplate |
| 21 | contact | Contact | p25 | contact |

---

## 6. /sign-in and /sign-up (Clerk), document title "Terms"

The **auth shell (E)** has no nav, no header, no footer and no gradient. `body` (`#fff`) contains only `main.auth`, which holds the Clerk root. The doc height equals the viewport (900 / 844), so nothing scrolls. Both routes have an identical layout; only the strings differ.
- `main.auth{display:flex; justify-content:center; align-items:center; min-height:100dvh; padding:48px 24px 12vh}` (12vh = 108px at 900 tall).
- At ≤600: `align-items:flex-start; padding:32px 16px 48px`.
- Clerk mounts client-side about 1s after load. Wait for `.cl-card input`.

### What actually renders vs the SSR appearance config
The SSR config sets `rootBox{maxWidth:420}`, `cardBox{boxShadow:var(--shadow-card); borderRadius:24}`, `card{padding:32; gap:24}`, plus inputs and buttons with `boxShadow:none`. **The rendered DOM does not apply the card styles.** Measured:
- `.cl-cardBox`: transparent background, radius 0, shadow none.
- `.cl-card`: padding 0, transparent background, `gap:24px`, `margin:-1px -1px 0`.

The form floats directly on white with no visible card (confirmed by screenshot). Clerk's default shadows also stay on the inputs and buttons (values below). **Build to the rendered values**: no card chrome. If you want the "intended" look, the config values are listed above.

Applied Clerk variables: `colorPrimary #e53d00, colorPrimaryForeground #fff, colorForeground #161512, colorMutedForeground #655c53, colorBackground #fff, colorInput #f2f2f2, colorInputForeground #161512, colorBorder #eee, colorRing rgba(0,0,0,.2), colorDanger #161512, fontSize 16px, borderRadius 16px`. Font: diatype, weights 400/500 (bold maps to 500).
Options: logo inside (`/icon.svg`, links to `/`), social buttons at the **bottom**, blockButton variant, terms `/terms`, privacy `/privacy`, `shimmer:false`.

### Layout at 1440 (root 420 wide, centered: x=510..930, y=182.5..657.5; card content x=509)
| Element | Box | Style |
|---|---|---|
| Logo (`img.cl-logoImage`, `/icon.svg`) | 27x27 @ y181.5, left-aligned | logoBox height 27, `justify-content:flex-start` |
| Header text group | gap 16 below logo, inner gap 4 | |
| h1 `.cl-headerTitle` | @ y224.5, 33.9 tall | 500 24px / 33.88px, letter-spacing -0.48px, `#161512` |
| p `.cl-headerSubtitle` | @ y262.4 | 400 16px / 22.15px, `#655c53` |
| Field label | @ y308.5 | 500 16px / 22.15px, `#161512`; label-to-input gap 8 |
| Input `.cl-formFieldInput` | 420 x 52 @ y338.7 | `bg #f2f2f2; border-radius:999px; padding:0 22px; border:none`; 400 16px `#161512`; box-shadow `0 0 0 1px rgba(238,238,238,.11), 0 0 1px rgba(238,238,238,.07)`. **Focus**: adds `0 0 0 4px rgba(0,0,0,.2)` ring (1px ring alpha rises to .28); transition `.2s` on all props |
| Primary button `.cl-formButtonPrimary` "Continue" | 420 x 52 @ y422.7 (form gap 32 after field) | `bg #e53d00`, **hover `#cc3600`**, radius 999, padding 7px 12px, 500 16px white; shadow `0 0 0 1px #e53d00, inset 0 1px 1px rgba(255,255,255,.07), 0 2px 3px rgba(34,42,53,.2), 0 1px 1px rgba(0,0,0,.24)`; transition `.1s` |
| Google button `.cl-socialButtonsBlockButton` "Continue with Google" | 420 x 52 @ y498.7 (24 below the form) | `bg #f2f2f2`, **hover `#e7e7e7`**, radius 999, padding 7px 12px; content centered, gap 12; 16x16 Google icon; text 500 16px `rgba(0,0,0,.62)`; shadow `0 0 0 1px rgba(238,238,238,.07), 0 2px 3px -1px rgba(0,0,0,.08), 0 1px 0 rgba(0,0,0,.02)` |
| "or" divider | not rendered (`display:none` because social buttons sit at the bottom) | |
| Footer action row | 287 x 54.1 centered @ y550.7, padding 16px 32px, gap 4 | text 400 16px `#655c53`; link 500 16px `#e53d00`, no underline |
| Footer item ("Secured by [clerk logo]" left, "Privacy" "Terms" right, gap 12) | 420 x 52.7 @ y604.8, padding 16px 32px, border-top 1px `rgba(238,238,238,.07)` (practically invisible) | 500 14.77px / 19.69px, `#655c53`; Clerk wordmark SVG 48x14 |

Strings:
- /sign-in: "Sign in to Terms" / "Welcome back! Please sign in to continue" / label "Email address" / placeholder "Enter your email address" / "Continue" / "Continue with Google" / "Don’t have an account?" + "Sign up" (→ /sign-up).
  - A hidden password row exists (opacity 0, height 0) with label "Password" and a show-password eye button 32x46. It only appears in later steps.
- /sign-up: "Create your account" / "Welcome! Please fill in the details to get started" / "Email address" (input `name=emailAddress`, same placeholder) / "Continue" / "Continue with Google" / "Already have an account?" + "Sign in". The footer is the same.

At 390: `main.auth` padding 32px 16px 48px, top-aligned. Root x=16, 358 wide (the card measures x=15, 350 wide). h1 @ y74, input @ y188.2, Continue @ y272.2, Google @ y348.2, footer action @ y400.2, footer item @ y454.3.
- Motion: Clerk defaults only (0.2s field transitions, 0.1s button transitions, a 0.45s field-feedback height animation). There is no page-level motion.
- Implementation note for the clone: a static mock of this form is enough. Do not load Clerk. The OTP, password and SSO steps are behind Clerk and cannot be reached without an account, so they were **not measured**.

---

## 7. Assets (new for these routes)

Downloaded to `/Users/riyaghosh/V3/terms/reference/assets-pages/`:

| File | Source URL | Format / size | Used on |
|---|---|---|---|
| `studio-review.0x-qr3l0valhi.jpg` | https://terms.so/_next/static/immutable/media/studio-review.0x-qr3l0valhi.jpg | JPEG 795x1200, 241 KB | /about photo stack card 0 (displayed 3/4 crop) |
| `studio-table.2_irzbleh7or0.jpg` | …/media/studio-table.2_irzbleh7or0.jpg | JPEG 900x1200, 354 KB | card 1 (4/5 crop) |
| `studio-desk.1coqjkr1znwat.jpg` | …/media/studio-desk.1coqjkr1znwat.jpg | JPEG 899x1200, 257 KB (**original contains GPS EXIF; strip metadata before shipping**) | card 2 (5/4 landscape crop of a portrait photo, `object-fit:cover`) |
| `clerk-google.svg` | https://img.clerk.com/static/google.svg | SVG | Google icon in the auth social button (16x16) |
| `icon.svg` | https://terms.so/icon.svg | SVG (byte-identical to `public/icon.svg`) | Clerk logo 27x27 on the auth pages |

Live, the photos are served through `/_next/image?…&w=384&q=75` (and w=640/750 for 2x). `public/about/studio-*.jpg` already exists in the project with smaller files; either set works.
Inline SVGs reused: the logo mark (`reference/svgs/logo-mark.svg`), drawn at 20.09x27 on landing shells and 19.35x26 in the app header. No other new icons; the changelog arrow is the text glyph "↗".
Fonts: the same Diatype 400/500 as home. The docs `code`/`pre` use the generic `monospace` keyword (no webfont). Changelog, docs, legal and auth load no images at all.

---

## 8. Reuse map

| Component | home | about | pricing | changelog | docs | privacy/terms | auth |
|---|---|---|---|---|---|---|---|
| Landing nav (pill rail) | dark | dark | dark | light, 1152, pad 32 | light, 720, pad 96 / column on mobile | – (app header) | – |
| Landing footer | 960 | 960 | 960 | 1152 | 720 | – (legal footer row) | – |
| Hero gradient bg | yes | yes | yes | – | – | – | – |
| HeroHeadline typewriter | yes | yes (2 lines) | yes (3 lines, line 1 muted) | – | – | – | – |
| `.landing-prose` intro | yes | yes | yes | – | – | – | – |
| `.action-button--brand` | yes | – | yes (plan CTAs) | – | – | – | – |

---

## 9. Uncertainties / not measured
- Footer Changelog link: resolved. Home shows it and sub-pages do not (see §0).
- Clerk: the rendered card has no shadow, radius or padding, despite the SSR appearance config. I recorded the rendered values. Multi-step auth screens (OTP code entry, password, errors) were not reachable.
- Docs `code` uses the generic `monospace`. Its rendered face depends on the browser's default fixed-width font (Chromium/macOS default). The computed size is 16px (not the UA 13px).
- About headline timing comes from the `DEFAULT_TIMING` source plus a 120ms-sampled live log. The pricing typewriter was not separately logged, but it uses the same component and defaults.
- `.landing-table` borders are `.75px`; Chromium at DPR 1 computes 0.5px. Keep `.75px`.
- /about photo-card hover states and focus outlines come from the CSS rules; I live-tested only the click reordering. At 1280 I measured only the key containers on about, pricing, docs, changelog and legal. They match 1440 shifted by 80px, with identical heights.
- Legal and changelog body prose is intentionally not transcribed. Paragraph word counts were computed by whitespace split (±1 word).

---

## 10. Corrections from the motion audit (2026-10-21, measured live)

These supersede the sections cited.

- **§0 nav pill:** the resting `data-pill-active` link is always "Sign up", on /about and /pricing too. The current page stays bright through `aria-current`, not the pill. The "About is active" note in §0 is wrong.
- **§0 nav focus:** keyboard focus on a rail link sets `data-instant` on `.pill-navigation-rail`. Every rail link then transitions `background .15s` only, so color and ring switch instantly. Pointer entry clears it. The focused nav link has `outline-offset: 0`.
- **§1 photo stack:** `--grow <number>` (initial 1), `--lift <length>` (initial 0) and `--tilt <angle>` (initial 0deg) ARE registered with `@property` (`inherits:false`). So `photo-toss` interpolates smoothly rather than snapping.
- **§6 auth transitions:** the transition property list is `background-color, background, border-color, color, fill, stroke, opacity, box-shadow, transform`, `ease`. Durations: inputs .2s, buttons .1s. Buttons switch to .2s on `:focus`.
- **/pricing typewriter (timed live):**
  - Line 1: 8 chars over 600ms.
  - Line 2: 14 chars, starts at +917ms, lasts 700ms.
  - Line 3: 11 chars, starts at +1900ms, lasts 800ms.
  - Done at +2700ms. Nothing reveals afterwards.
- **§5 legal anchors:** the jump is instant (`scroll-behavior:auto`), and the target lands 32px from the top (`scroll-margin-top:32px`).
