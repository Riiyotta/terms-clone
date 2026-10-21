Source: https://terms.so/

# Terms.so home page: clone spec

Measured live on 2026-10-20 with Playwright (Chromium) at 1440x900, 1280x900 and 390x844. All values are computed styles or `getBoundingClientRect` readings, not estimates. The live chunk hashes match `reference/Terms.so_files/*` exactly, so those CSS/JS files are current. The demo timelines below were read from the source (`3xpi-yrg21g6s.js`, `1masvzo9zvv_i.js`) and checked against a live MutationObserver log over 36 s; observed timings matched source to within ±20 ms (one 40 ms tick).

Class names in brackets, e.g. [LP_launch], refer to the original CSS-module class `LandingPreview-module__aN7EWG__launch`. "LP_" is short for `LandingPreview-module__aN7EWG__`.

---

## 0. Global tokens

### Fonts
| Role | Stack | Files |
|---|---|---|
| UI / all text | `'diatype', 'diatype Fallback', -apple-system, system-ui, Helvetica, Arial, sans-serif` | `public/fonts/ABCDiatype-Regular.otf` (400), `ABCDiatype-Medium.otf` (500). `font-display: swap` |
| Hero "poetry" background only | `'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace`, weight 400 | `public/fonts/GeistMono.woff2` is the **latin** subset (byte-identical to live `64c5f24155ea0bd5…woff2`). The caret glyph `▌` (U+258C) lives in a **separate** subset: `reference/assets/122b9f2e4f8e51a4.25fzyfulsmhsq.woff2` (unicode-range `U+2000-2001,U+2004-2008,U+200A,U+23B8-23BD,U+2500-259F`). Add a second `@font-face` with that range, or the caret falls back to Menlo. |

Fallback metric override used live (optional): `@font-face{font-family:'diatype Fallback';src:local(Arial);ascent-override:97.44%;descent-override:36.04%;line-gap-override:0%;size-adjust:99.34%}`

body: `font-size:16px; line-height:1.5; letter-spacing:-0.01em (-0.16px); color:#000; background:#fff; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; display:flex; flex-direction:column; min-height:100dvh`. `* {box-sizing:border-box; margin:0}`. `h1-h6, strong, b {font-weight:500}`.

### CSS variables (from :root and `.landing--home`)
```
--accent:#e53d00; --accent-hover:#cc3600;
--ease-out: cubic-bezier(.23,1,.32,1);
--ease-in-out: cubic-bezier(.77,0,.175,1);
--type-tracking-title:-.03em; --type-tracking-heading:-.02em; --type-tracking-small:-.01em;
--ring-hairline: 0 0 0 1px #0000000d;
--shadow-card: var(--ring-hairline), 0 .6px 1.1px #00000006, 0 1.7px 3.4px #00000008, 0 4.1px 8.2px #0000000a, 0 13px 27px #0000000e;
--focus-shadow: 0 0 0 1px #00000059, var(--shadow-card);
--page-gutter:24px; --pill-button-gap:4px;
/* .landing */
--ink:#161512; --nav:#655c53; --brand-muted:#c9cdc1; --prose-muted:#989490; --hairline:#eee;
--landing-surface-border:#e5e5e5;
--landing-surface-shadow: 0 2px 4px #00000003, 0 5px 10px #00000004, 0 10px 20px #00000005, 0 20px 40px #00000006, 0 40px 80px #00000008;
/* .landing--home */
--content-width:960px; --page-tint:#fefcfb; --hero-height:840px (720px at <=600px);
--hero-text: #ffffffe6 (rgba(255,255,255,.9)); --hero-text-muted:#ffffff42 (rgba(255,255,255,.26));
--hero-link:#ffffffd9 (.85); --hero-link-muted:#ffffff80 (.5);
--hero-chip:#ffffff1a (.1); --hero-chip-hover:#ffffff2e (.18); --hero-chip-text:#ffffffeb (.92);
--home-card-border: #e5e5e5;
/* preview cards (dashboard shadow, used by composer and user bubble) */
--dashboard-shadow: var(--shadow-card)   /* set on LP_preview */
```

### Page background (on `.landing.landing--wide.landing--home`, full width, `overflow-x:clip`)
```
background: var(--hero-gradient) no-repeat 0 0 / 100% 840px, #fefcfb;
--hero-gradient: linear-gradient(180deg, #3a0303 0%, #3b0303 3.2258%, #3b0303 6.4516%, #3c0403 9.6774%, #3d0403 12.903%, #3f0503 16.129%, #400503 19.355%, #420603 22.581%, #440603 25.806%, #470703 29.032%, #4a0803 32.258%, #4d0903 35.484%, #510b03 38.71%, #550c03 41.935%, #5a0e02 45.161%, #601002 48.387%, #661202 51.613%, #6e1502 54.839%, #771802 58.065%, #821b02 61.29%, #902001 64.516%, #a12601 67.742%, #b72e01 70.968%, #d63800 74.194%, #e95a26 77.419%, #ef8863 80.645%, #f3ab91 83.871%, #f7c4b2 87.097%, #f9d7cb 90.323%, #fbe6df 93.548%, #fcf2ee 96.774%, #fefcfb 100%);
```
`.landing`: `width:100%; padding:0 24px; display:flex; flex-direction:column; align-items:center; flex:1; color:#161512; font-size:16px; font-weight:500; line-height:.96; letter-spacing:-.01em; overflow-wrap:anywhere`.
Every top-level block (`header`, `main`, previews wrapper, `footer`) is `.landing-col`: `width:100%; max-width:960px` (centered by the parent's align-items). At 1440 the column runs x=240..1200; at 1280, x=160..1120; at 390, x=24..366 (342 wide).

### Breakpoints used
- `max-width:1000px`: hero h1 `font-size:clamp(32px,5.4vw,56px)`; demo `--preview-padding:32px`; paper padding 24px; clause marker `right:-20px`.
- `max-width:760px`: previews gap 64px; `--preview-padding:24px`; demo grids collapse to one column (see per-demo notes).
- `max-width:600px`: nav/hero/footer mobile rules (see sections).
- `max-width:540/480px`: minor (composer textarea padding 20px at <=480; dashboard rows wrap).

### Buttons (`.action-button`), shared
Base: `display:inline-flex; align-items:center; justify-content:center; border:none; border-radius:999px; min-height:48px; padding:18px 24px; font:500 16px/.96 diatype; letter-spacing:-.01em; white-space:nowrap; background:var(--button-background); color:var(--button-color); transition:background .15s; cursor:pointer; user-select:none`. With icon child: `gap:8px`.
Hover (only `(hover:hover) and (pointer:fine)`) and `:active`: `background:var(--button-hover)`.
Focus-visible: `box-shadow:var(--focus-shadow); outline:none`.

| Variant | bg | hover | color |
|---|---|---|---|
| --brand | #e53d00 | #cc3600 | #fff |
| --primary | #000 | #222 | #fff |
| --secondary | #f2f2f2 | #e7e7e7 | #000 |
| --ghost | transparent | #f0f0f0 | #666 |

`--compact`: `height:36px; min-height:36px; padding:0 16px; gap:8px; font-size:13px; font-weight:500; line-height:1` (letter-spacing computes to -0.13px).
Icons: 16x16 (`viewBox 0 0 24 24`, `fill:currentColor`), class `terms-icon {display:inline-block; flex:none; vertical-align:-.125em}`.

---

## 1. Nav (`header.landing-nav.landing-col`)

### Layout
| | 1440 / 1280 | 390 |
|---|---|---|
| box | 960 x 98.4, `display:flex; justify-content:space-between; align-items:center; gap:16px; padding:24px 0` | 342 x 84, `padding:20px 0; gap:12px`, still a row |
| logo (`a.landing-mark`) | 20.09 x 27 at (col-left, y=35.7) | 20.09 x 27 at (24, 29) |
| links rail | 249.5 x 50.4, right-aligned (x=950.5 at 1440, 870 at 1280) | 253.9 x 44 at x=112 |

Logo: inline SVG `reference/svgs/logo-mark.svg` (`width=20.091796875 height=27 viewBox="0 0 381 512"`, `fill=currentColor`). In the nav its color is `#fefcfb`; in the footer it is `#e53d00`. `display:flex`.

Links: `nav.landing-links > div.pill-navigation.landing-actions > div.pill-navigation-rail[data-clip=off] > div.pill-navigation-links` holding 4 `<a>`: About `/about`, Pricing `/pricing`, Login `/sign-in`, Sign up `/sign-up`. Flex, `gap:4px`.
Each link (1440/1280): 50.4px tall, `padding:18px 8px`, `font:500 15px/14.4px` (line-height .96), letter-spacing -0.15px, `border-radius:999px`, transparent background (the brand "Sign up" is overridden to transparent too, so it looks the same as the other links). Widths: About 56.64, Pricing 62.23, Login 52.83, Sign up 65.80.
At 390: `min-height:44px; padding:14px 10px` (`clamp(2px,12.5vw - 38px,10px)` = 10px); font 14px/13.44px, letter-spacing -0.14px; widths About 57.9, Sign up 66.5; rail gap 4px; nav-links gap 8px.

### Color
- About, Pricing: `rgba(255,255,255,.5)` at rest.
- Login, Sign up, and whichever link is `[data-pill-active]`: `rgba(255,255,255,.85)`.
- Transition on links: `color .25s cubic-bezier(.77,0,.175,1), background .15s, box-shadow .15s`.

### Hover (pill-rail "followHover")
A `div.pill-navigation-highlight` (absolute, `top:0;bottom:0;left:0; width:var(--nav-width); transform:translateX(var(--nav-left)); border-radius:999px; transition: transform .25s ease-in-out, width .25s ease-in-out`) follows the hovered link. Its background and shadow are **transparent/none** on this page, so it is invisible. The only visible effect: the hovered link becomes `[data-pill-active]` and its color animates to `.85` white (.25s, ease-in-out). On pointer-leave, the active state returns to "Sign up". Measured: hovering About sets `--nav-left:0; --nav-width:56.64px`. A simple implementation is enough: `color: rgba(255,255,255,.5)` → hover `.85`, `transition: color .25s cubic-bezier(.77,0,.175,1)`. Focus-visible: `outline:1px solid #777; outline-offset:0`.

---

## 2. Hero (`main.landing-hero.landing-hero--home.landing-col`)

### Layout
| | 1440 / 1280 | 390 |
|---|---|---|
| main | `position:relative; display:flex; flex-direction:column; align-items:flex-start; text-align:left; gap:64px; padding:150px 0 80px; min-height:0`. Box: y=98.4, h=554 | `gap:32px; padding:48px 0; min-height:clamp(320px, 68svh - 100px, 440px)` (=440 at 844 tall). y=84, h=440 |
| h1 | y=248.4, 750.5 x 224 (4 lines x 56) | y=132, 342 x 198.9 (wraps to 6 lines) |
| CTA chips | y=536.4, 210.5 x 36 | y=363 |
| first demo card top | y=652.4 | y=524 |

Every hero child except the poetry layer gets `position:relative; z-index:1`.

### Headline typography (`h1.landing-headline`)
- 4 block spans `.landing-headline-line`; lines 1-3 also have `.landing-headline-brand`.
- Text: "Start a draft with AI." / "Chat about any contract." / "Comment with counterparties." / "You’ll never open DocuSign again." (curly apostrophe U+2019). `aria-label` holds all four joined with spaces.
- `font-size:56px; line-height:1 (56px); font-weight:500; letter-spacing:-.05em (-2.8px); white-space:nowrap; margin:0`. Color `rgba(255,255,255,.9)`.
- Brand lines: `color: rgba(255,255,255,.26); mix-blend-mode: plus-lighter`. They render as a warm translucent tan against the gradient. Line 4 is the bright one.
- Kerning tweaks: the letters in `Sta[r]t`, `dra[f]t` and `counterpa[r]ties` are wrapped in `span.landing-kern { letter-spacing: calc(.3px - .035em) }` (= -1.66px at 56px).
- At <=1000px: `font-size: clamp(32px, 5.4vw, 56px)`. At <=600px: `white-space:normal; font-size: clamp(28px, 8.5vw, 34px)` (33.15px at 390, letter-spacing -1.6575px, line-height 33.15px).

### CTA chips (`div.landing-cta.landing-chips`, `display:flex; align-items:center; gap:6px`)
1. **Sign up** `a.landing-chip.landing-chip--primary` → `/sign-up`: 69.8 x 36, `padding:10px 10px 11px`, `border-radius:6px`, `font:500 15px/1`, letter-spacing -0.15px, bg `#fff`, hover `#f2f2f2`, color `#161512`, `transition:background .15s`.
2. **Watch a demo** `a.landing-chip` → `href="#draft"`: 134.7 x 35, `padding:8px 10px 9px 8px`, `gap:4px`, bg `rgba(255,255,255,.1)`, hover `rgba(255,255,255,.18)`, color `rgba(255,255,255,.92)`, radius 6px. Leading `<img src="/landing/play.svg" width=18 height=18>` (white triangle at 0.92 opacity; file `public/assets/play.svg` = `reference/svgs/landing-play-chip.svg`).
   **Behavior:** there is no modal and no video. It is a plain in-page anchor to `#draft` (the first demo section). `html:has(.landing--home){scroll-behavior:smooth}` under `prefers-reduced-motion:no-preference`; `#draft` has `scroll-margin-top:0`, so the card's top lands at the viewport top.

### Hero motion 1: typewriter headline (runs once on mount; does not loop)
Source `HeroHeadline`, driven by requestAnimationFrame from `performance.now()` at mount. Each line has a `delay` (counted from the end of the previous line) and a `duration`. Within a line, the visible char count is `min(n, floor((t - start)/duration * n) + 1)`. Characters appear instantly: no fade, no caret.

| line | chars | delay | duration | start → end (ms from mount) | ms/char |
|---|---|---|---|---|---|
| 1 "Start a draft with AI." | 22 | 240 | 700 | 240 → 940 | 31.8 |
| 2 "Chat about any contract." | 24 | 220 | 760 | 1160 → 1920 | 31.7 |
| 3 "Comment with counterparties." | 28 | 220 | 880 | 2140 → 3020 | 31.4 |
| 4 "You’ll never open DocuSign again." | 33 | 460 | 1000 | 3480 → 4480 | 30.3 |
| `completionDelay` | | 1200 | | done at **5680** | |

Layout must not shift. Live, each line renders `typedPart` + `<span class="landing-headline-tail" style="visibility:hidden">rest</span>`, so the full text always reserves space. Kern spans stay applied in both parts.
At done: `.landing-chips[data-show]` flips from false to true. Chip transition: `opacity 0 → 1, transform translateY(8px) → none, .48s var(--ease-out)` (opacity and transform both). Reduced motion: all text shown at once, chips use `.2s` and no transform.
Live log (rAF quantized at ~33ms): L1 1→22 over t=660..1328, L2 1578..2295, L3 2560..3394, L4 3897..4862, chips at 6078 (all offset by ~400ms of hydration).

### Hero motion 2: "poetry" typing background (`div.landing-poetry`, aria-hidden)
A decorative layer of faint monospace prompt fragments that types and erases itself continuously on both sides of the content column.

Geometry: `position:absolute; z-index:0; contain:strict; pointer-events:none; overflow:hidden; top:-72px` (relative to main, so page y=26.4); `left/right: calc(50% - 50vw - 80px)` (it bleeds 80px past both viewport edges: 1600 wide at 1440, x=-80); `height:800px`. Font: Geist Mono 400, 11px, line-height 1.4 (15.4px), letter-spacing 0, color #fff.
Two `<pre class="landing-poetry-grid" data-side="left|right">`: `position:absolute; top:0; height:100%; width:var(--poetry-zone); white-space:pre; opacity:.5; margin:0`. Left has `left:0`, right has `right:0`. Each grid has `rows` child `<span style="display:block;height:1.4em">` with exactly `cols` characters (spaces by default).
- zone = (poetryWidth − columnWidth)/2 = (vw+160−960)/2. If zone < 120 the layer renders nothing (so **no poetry at 390**, nor anywhere with vw ≤ ~1040). usable = zone − 48 (gutter).
- cols = floor(usable / (0.6*11)) = floor(usable/6.6); rows = floor(800 / 15.4) = 51.
- 1440: zone 320, usable 272 → 41 cols. 1280: usable 192 → 29 cols.

Params: `count:12, fontSize:11, opacity:.5, areaHeight:800, top:-72, bleed:80, gutter:48, jog:32, typeMs:35, hold:15000, cursor:true`.
Phrase pool (20):
```
"Write an NDA for a freelancer.","Draft a design project contract.","How many weeks is our agreement with Acme?","$12,000, six weeks, 50% upfront.","Make the payment terms net 30.","Add two rounds of revisions.","mutual confidentiality, two years","ownership transfers on final payment","terminate with 14 days’ written notice","What did we agree with Studio North?","Consulting agreement, hourly, capped.","Send it to alex@acme.com to sign.","effective on the date of the last signature","Which contracts expire this quarter?","a one-page letter of intent","renews yearly unless either side opts out","governed by the laws of Delaware","Summarize the indemnity clause.","Hire a contractor for the summer.","deposit due before work begins"
```
Algorithm (port this directly; it is self-contained):
- Seeded PRNG (mulberry32): `seed = 0xec4ba7*run + 1`, incremented per phrase. `r=()=>{let e=n=n+0x6d2b79f5>>>0; e=Math.imul(e^e>>>15,1|e); e^=e+Math.imul(e^e>>>7,61|e); return ((e^e>>>14)>>>0)/4294967296}`.
- Placing a phrase: alternate side (left/right). Pick a random phrase and split its words into 1–3 lines (`lines = min(words, 1+floor(3r))`; each line except the last takes `max(1, round((remaining − linesLeft)*(.4+.5r)))` words). Per-line horizontal jog in cells is `round((i==0 ? r*32*.5 : r*32)/6.6)`. Block width = max(jog+len). Column: on the right side `floor(r*0.7*cols)`; on the left side `cols − width − floor(r*0.7*cols)`, so text hugs the outer edges on the left and the inner edge on the right. Row: `floor(r*max(1, rows−lines))`. Up to 40 tries to find a spot where the block plus a 1-row/2-col margin is blank.
- Start state: pre-place `m = min(12, max(2, ceil(12/2))) = 6` phrases instantly.
- Then a `setInterval(…, 35ms)` processes one character per tick. A "write" job sets one cell to its char. An "erase" job blanks cells in reverse order. The caret `▌` is drawn at the cell after the last written char (write) or at the erased cell (erase). Only the changed row's span `textContent` is rewritten.
- Next-job rule after each job finishes: if the oldest phrase exists and (there are ≥12 phrases, or (it is older than 15000ms and there are >6 phrases and the last job was a write)), erase the oldest. Otherwise try to write a new phrase. If no spot is found and there are >6 phrases, erase. When nothing is to be done the caret hides.
- Reduced motion: place 12 phrases statically, no caret, no interval.
- The layer is re-seeded on resize (ResizeObserver on itself and its parent).

---

## 3. Feature demos wrapper (`div.landing-col.LP_previews`)
`display:grid; gap:96px (64px at <=760); padding-bottom:32px`. 1440: y=652.4, h=2733.5. Each section is 836.5 tall at desktop. Section tops at 1440: #draft 652.4, #questions 1584.9, #comments 2517.4. 390: #draft 524 (h 1307.2), #questions 1895 (h 832.5), #comments 2792 (h 1198.4).

### 3a. Shared card frame (same for all three)
```
section#{draft|questions|comments}.LP_feature[data-preview][data-phase][data-running][data-paused]   --preview-padding:44px (32 <=1000, 24 <=760)
  div.squircle.LP_card  (position:relative; --squircle-radius:24px)
    div.squircle-shadow (absolute inset 0, filter: drop-shadow(0 5.25px 7px #00000005) drop-shadow(0 9.4px 12.5px #00000008) drop-shadow(0 17.54px 23.39px #0000000a))
      div.squircle-shadow-shape (100%x100%, background #fff, clip-path: var(--squircle-path))
    div.squircle-body (position:relative; border-radius:24px; overflow:hidden)
      header.LP_featureHeader
      p.sr-only (description)
      div.landing-card.LP_preview > div#preview-{id}-animation.LP_loop[data-loop-state]  → demo stage
    svg.squircle-border (absolute inset 0; 100%x100%; clip-path: var(--squircle-path); fill:none; stroke:#e5e5e5; stroke-width:2px; overflow:visible)  <path d=SAME squircle path>
```
Squircle: Figma-style smoothed corners, radius 24, smoothing 0.6, recomputed with a ResizeObserver. For 960 x 836.5 the path is:
`M 921.6 0 c 13.4413 0 20.1619 0 25.2958 2.6158 a 24 24 0 0 1 10.4884 10.4884 c 2.6158 5.1339 2.6158 11.8545 2.6158 25.2958 L 960 798.1 c 0 13.4413 0 20.1619 -2.6158 25.2958 a 24 24 0 0 1 -10.4884 10.4884 c -5.1339 2.6158 -11.8545 2.6158 -25.2958 2.6158 L 38.4 836.5 c -13.4413 0 -20.1619 0 -25.2958 -2.6158 a 24 24 0 0 1 -10.4884 -10.4884 c -2.6158 -5.1339 -2.6158 -11.8545 -2.6158 -25.2958 L 0 38.4 c 0 -13.4413 0 -20.1619 2.6158 -25.2958 a 24 24 0 0 1 10.4884 -10.4884 c 5.1339 -2.6158 11.8545 -2.6158 25.2958 -2.6158 Z`
(each corner uses p = 38.4 = 1.6 x 24; the generator is the `figma-squircle` algorithm with `preserveSmoothing:true`). A simpler build can use `border-radius:24px` plus a 1px #e5e5e5 border and the same drop-shadows; the visual difference is subtle. The stroke is 2px but clipped to the inside, so it reads as 1px.

**Header** [LP_featureHeader]: `display:grid; grid-template-columns: minmax(0,1fr) auto; gap:4px 24px (16px column-gap <=760); align-content:center; min-height:144px; padding: calc(var(--preview-padding) + .75px)` (= 44.75px desktop, 24.75px mobile); `border-bottom:1px solid #eee`; `z-index:1; position:relative`. Height 148.5 at desktop, 162.5 at 390 (subtitle wraps to 3 lines).
- h3 [LP_featureHeading]: `font:500 18px/27px; letter-spacing:-0.18px; color:#161512; grid-column:1`.
- p subtitle: `font:400 18px/27px; letter-spacing:-0.16px; color:#777; max-width:720px; grid-column:1`.
- Playback button `.action-button--secondary.--compact` [LP_playbackButton]: `grid-area:1/2/span 2; align-self:start; 36x36 (44x44 <=760); padding:0`, bg #f2f2f2 (hover #e7e7e7), icon 16px black. Icon is `icon-pause.svg` while playing and `icon-play-resume.svg` while paused. aria-label `Pause|Resume {label} animation`, title `Pause animation|Resume animation`.
- (The dashed `svg.LP_featureBorder` exists in markup but is `display:none` on the home page.)

Header copy:
| id | heading | subtitle |
|---|---|---|
| draft | Draft with AI | Describe what you need. Turn a few details into a draft you can refine. |
| questions | Ask your contracts | Find dates, details, and answers in your agreements, with the source at hand. |
| comments | Comment on contracts | Discuss a clause, agree on a change, and resolve it right in the contract. |

**Preview area** `.landing-card.LP_preview`: `padding:0; border:0; border-radius:0; box-shadow:none; background:#fff; color:#444; font:400 16px/1.5; overflow:hidden`. `strong` inside it is `color:#000; font-weight:500`. Height 688 at desktop (= 600 + 2x44).

### 3b. Timeline engine (shared, `usePreviewTimeline(D, reducedMotionFrame)`)
- **Clock:** `setInterval(() => time = (time + 40) % D, 40)`. Each tick adds a fixed 40ms (it does not use wall-clock time). All demo state is a pure function of `time`.
- **Start/stop:** an `IntersectionObserver` with `{threshold: 0.12}` on the section. The clock runs only while `isIntersecting && intersectionRatio >= 0.12`, `!document.hidden`, and not paused. Leaving view **pauses** the clock and keeps `time`; returning resumes from the same point (no reset). `data-running` reflects this. On load at 1440x900 only #draft is running.
- **Looping:** every demo loops forever. With D = duration:
  - `t < D-680`: `loopState="playing"`, rendered time = t.
  - `D-680 ≤ t < D-440`: `"fading-out"`, rendered time frozen at D-680; `.LP_loop{opacity:0; transition: opacity .24s cubic-bezier(.77,0,.175,1)}`.
  - `D-440 ≤ t < D-320`: `"rewinding"`, rendered time = 0; `opacity:0; transition:none`, and **all** descendant transitions/animations are disabled (`transition:none!important; animation:none!important` on `*`, `:before`, `:after`) so every element snaps to its t=0 state.
  - `D-320 ≤ t < D`: `"fading-in"`, rendered time 0, still with descendant transitions disabled; `.LP_loop` returns to `opacity:1` with `transition: opacity .32s var(--ease-out)`.
  - `data-phase="resetting"` for all non-playing states.
- **Pause button:** toggles `paused`. While paused the interval stops, and every running `CSSTransition` inside `[data-loop-state]` is paused via `getAnimations({subtree:true})` (resumed on unpause). Thinking-dots animation is paused via `.LP_feature[data-running=false] .home-opening-dots>span{animation-play-state:paused}`.
- **prefers-reduced-motion:** paused by default and frozen at the reduced-motion frame (draft 16000, questions 12000, comments 17000). Transitions limited to opacity/color/bg at .2s, transforms removed, demo cursor hidden.
- **Typing helper:** `typed(text, t, start, msPerChar) = text.slice(0, max(0, floor((t-start)/msPerChar)))`.
- **Streaming answer:** two stacked copies in one grid cell (`display:grid` with `grid-area:1/1` on both children). Copy 1 `.LP_measure` holds the full text with `visibility:hidden`, which reserves the final height. Copy 2 shows the first `floor((t-start)/22)` chars (22 ms/char), keeping `<strong>` runs bold as they stream.

### 3c. Shared reveal transitions (exact CSS)
```
.reveal, .question, .launch, .draftWorkspace, .recents, .recents .agreement, .statusStack>span, .resolveStack>*, .commentCount
  { opacity:1; transform:none; transition: opacity .24s var(--ease-out), transform .24s var(--ease-out) }
[data-show=false] on .reveal / .recents (+ its .agreement rows) / .statusStack>span / .resolveStack>* / .commentCount
  { opacity:0; pointer-events:none; transform: translateY(8px) }
.question (user chat bubble): transform-origin:100% 100%; [data-show=false] { opacity:0; transform: translateY(64px) scale(.97) }
.recents[data-show=true] .agreement:nth-child(2){transition-delay:50ms}  :nth-child(3){transition-delay:100ms}
.launch[data-show=false] { opacity:0; transform: translateY(-12px) scale(.98) }
.draftWorkspace { transition-duration:.4s }  [data-show=false] { opacity:0; transform: translateY(16px) scale(.98) }
.documentSection { transition-duration:.3s }
.composer textarea { transition: opacity .16s var(--ease-out), transform .16s var(--ease-out) }
.composer[data-sending=true] textarea { opacity:0; transform: translateY(-8px) }
.composer .home-send-button, .preview button[data-pressed] { transition: transform .16s var(--ease-out), background-color .16s ease, color .16s ease }
.composer[data-sending=true] .home-send-button, .preview button[data-pressed=true] { transform: scale(.97) }
```
Thinking indicator [LP_thinking]: `display:flex; align-items:center; gap:10px; font:400 13px/19.5px; color:#888`. It contains a dot grid `span.home-opening-dots` (`display:grid; grid-template-columns:repeat(3,4px); gap:3px; padding-block:4px`, 18x26) of 9 dots (4x4, `border-radius:50%; background:currentColor; opacity:.2; animation: home-opening-dot .72s ease-in-out var(--dot-delay) infinite`) with `--dot-delay = (row+col)*90ms` → `0,90,180,90,180,270,180,270,360`ms, which produces a diagonal wave. `@keyframes home-opening-dot{0%,100%{opacity:.2} 45%{opacity:1}}`. Paused when the thinking row has `data-show=false`.

### 3d. Shared sub-components (computed at 1440)
- **Composer** `form.home-composer`: `width:100%; background:#fff; border-radius:20px; overflow:hidden; box-shadow: 0 0 0 1px #eee, var(--shadow-card)`. Height 140 (textarea 80 + actions 60).
  - textarea: `height:80px (field-sizing:fixed); min-height:60px; padding:22px 24px 18px; font:500 16px/1.25 (20px); letter-spacing:normal; color:#000; background:transparent; border:0; resize:none`. Placeholder: `color:#161512; opacity:.5`. Compact variant (`.home-composer--compact`): `padding:18px; font-weight:400`.
  - actions row: `display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px`.
  - "Attach a file" button: secondary compact (123.56 x 36) with `icon-attach.svg`.
  - Send button `.home-send-button`: compact, content `<span>Enter</span>` + `icon-send-arrow.svg` (a chevron), 86.75 x 36. **Primary (black/white) when it has a value and is not busy; otherwise secondary and disabled**, with the label and icon at `opacity:.4` (the button bg stays at full opacity). Attach is also disabled while busy.
- **User bubble** `.home-message--user`: `background:#fff; border-radius:20px; box-shadow:0 0 0 1px #eee, var(--shadow-card); padding:12px 16px 14px (16px all sides in draft chat); max-width:calc(95% - 8px) (100% in draft chat); align-self:flex-end`. Text `font:400 15px/24px (1.6); color:#666`, content inside `<p><strong>` which renders #000 500.
- **Assistant text** `.home-message--assistant`: `padding:4px 4px 4px 0`; `.home-chat-text` is a flex column with `gap:.6em`; `p{white-space:pre-wrap}` at 15px/24px #666, strong #000 500.
- **Intro block** [LP_intro]: centered. h3 `font:500 clamp(24px,3vw,32px)/1.15; letter-spacing:-.03em (-0.96px at 32px); color:#000` (24px/27.6px at 390). p `margin-top:16px; font:400 15px/22.5px; color:#444`.
- **Document toolbar** [LP_documentToolbar]: `display:flex; justify-content:space-between; align-items:center; gap:8px; padding:16px (12px <=760); border-bottom:1px solid #eee; font:400 12px/18px; color:#888`; height 51. Spans are `display:flex; gap:6px; align-items:center`. "Saved" variant color `#3b7050`.
- **Paper** `article.contract.LP_paper`: `padding:32px (24 <=1000, 20 <=760); font:400 14px/1.55 (21.7px); color:#555; max-width:68ch; flex:1`.
  - Title block: `margin-bottom:28px`. h3 `500 24px/1.2 (28.8px), letter-spacing:-.02em (-0.48px), color:#000` (22px at <=760). p `margin-top:8px; 12px/18.6px; color:#999`.
  - Section [LP_documentSection]: `margin-top:20px`. h4 `500 14px/1.4 (19.6px); letter-spacing:-0.14px; color:#161512; margin:0 0 6px`. p `margin:0`. strong `#161512` 500.
- **Chat heading** [LP_chatHeading]: `display:flex; justify-content:space-between; align-items:center; gap:12px; font:400 13px/1.4 (18.2px); color:#888`.
- Success green everywhere: `#3b7050`. Tone "selection": bg `#f0f5ff`, rule/ring `#ccd6ff`, marker `#2b45ab`. "Updated" green bg `#edf6ed`.

---

## 4. Demo 1: "Draft with AI" (`#draft`, D = 20000ms, reduced-motion frame 16000)

### Structure / layout (desktop)
`.LP_draftStage`: `display:grid; min-height: calc(600px + 2*var(--preview-padding))` = 688 (at <=760: `calc(940px + 2*pp)` = 988). Two layers share `grid-area:1/1`:

**Layer A, launch screen** [LP_launch]: `display:flex; flex-direction:column; justify-content:center; gap:32px; width:100%; max-width:calc(720px + 2*pp) (808); padding:44px; margin:auto`. At <=760: `align-self:start; margin:40px auto`, and intro `margin-bottom:8px`.
1. Intro: h3 "Start with what you need." / p "A few details. A first draft." (h3 36.8 tall, p 22.5 tall, total 75.3).
2. Composer (720 x 140), placeholder "Describe the agreement you need…", value typed.
3. Recents `section.dashboard-recents.LP_recents` (`display:flex; flex-direction:column; gap:24px; padding:0; margin:0`). Heading h3 "Recent contracts:" (`400 13px/1.35; color:#999; letter-spacing:-0.13px`). List `gap:24px`, three rows `.dashboard-contract` (`display:flex; align-items:flex-start; gap:12px`, height 43.9):
   - copy column (`flex:1; gap:8px`): title `500 16px/1.15; color:rgba(0,0,0,.6)` and date `400 13px/1.35; color:rgba(0,0,0,.3)`.
   - status pill (`height:36px; padding:0 16px; border-radius:999px; 500 13px/1.2`):
     | title | date | status | pill bg / text |
     |---|---|---|---|
     | Acme — Consulting agreement | September 24, 2026 | Signed | #d6f1ff / #005eeb |
     | Studio North — Design services | September 22, 2026 | Awaiting counterparty | #fff1d6 / #ff6200 |
     | Mutual non-disclosure agreement | September 18, 2026 | Draft | #ddffd6 / #116600 |
   - At <=760 (and <=480) rows wrap: copy takes 100% width, pill below, `gap:10px`; title 15px at <=800.

**Layer B, workspace** [LP_draftWorkspace]: `display:grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.25fr)` = 401.86 / 558.13 at 960. At <=760: a single column (chat above, doc below; doc gets `border-top` instead of `border-left`).
- Left chat [LP_draftChat]: `display:flex; flex-direction:column; gap:24px (20 <=760); padding:44px`.
  - "Your conversation" chat heading (18.2 tall).
  - Messages [LP_draftMessages]: `flex:1; flex-direction:column; gap:24px`.
    - User bubble (313.86 x 80): "**Draft a design agreement with Acme. $12,000, six weeks, 50% upfront.**"
    - Response stack (grid, one cell): thinking "Putting your draft together…" and the assistant streaming answer: "I’ve drafted your agreement with a **six-week timeline**, a **$6,000 deposit**, and a **$6,000 final payment**. You can refine any section before sharing it." (4 lines, 96px tall).
    - Ready row [LP_draftReady]: `display:flex; gap:8px; 400 13px/19.5px; color:#3b7050`, check icon + "Ready for your review".
  - Compact composer (placeholder "Make it yours. Ask for a change…", empty; `rows=2`) at the bottom (y offset 404 within chat).
- Right document [LP_documentShell]: `display:flex; flex-direction:column; border-left:1px solid #eaeaea; background:#fff; overflow:hidden`.
  - Toolbar: left `icon-agreement.svg` + "Your draft". Right status stack (grid, one cell, `justify-self:end`): "Drafting…" ↔ check icon + "Saved" (#3b7050).
  - Paper: title "Design services agreement" / "Studio North & Acme", then 5 sections:
    1. "This agreement is between **Studio North** (the Designer) and **Acme** (the Client)."
    2. h4 "1. Scope of work" / "The Designer will create a visual identity and website design, including two rounds of revisions."
    3. h4 "2. Fees and payment" / "The total project fee is **$12,000**. A **$6,000 deposit** is due before work begins. The remaining **$6,000** is due on delivery."
    4. h4 "3. Timeline" / "The project will be completed within **six weeks** of receiving the deposit and project materials."
    5. h4 "4. Ownership" / "Ownership of the final approved designs transfers to the Client when payment is complete."
  - Footer [LP_documentFooter]: `display:flex; justify-content:space-between; align-items:center; gap:16px; padding:16px; border-top:1px solid #eee; 12px; color:#888`, height 69: "Your draft is ready." + secondary compact button "Review draft" (103.6 x 36).

### Timeline (t = demo clock ms)
| t | event | visual |
|---|---|---|
| 0 | phase `prompt`. Launch visible, workspace hidden, recents hidden, composer empty (placeholder) | |
| 160 | recents `data-show=true` | heading+list fade up 8px (.24s ease-out); rows staggered 0 / 50 / 100ms |
| 600 → 2776 | composer value typed at **32 ms/char** (68 chars) | send button turns primary (black) once value is non-empty |
| 3400 → 3560 | phase `sending`, composer `data-sending=true` | textarea fades and moves up 8px (.16s); send button scales to .97 |
| 3560 | phase `opening`. Launch `data-show=false`; workspace `data-show=true` | launch: opacity 0, translateY(-12px) scale(.98), .24s. Workspace: from translateY(16px) scale(.98) to none, **.4s** ease-out |
| 3800 | user bubble shows | rises from translateY(64px) scale(.97), origin bottom-right, .24s |
| 4100 → 5200 | thinking row visible ("Putting your draft together…" + dot wave) | |
| 5000 | paper title reveals | fade up 8px .24s |
| 5200 | phase `drafting`. Thinking hides; answer stack shows, streaming at **22 ms/char** (145 chars → ends ≈ 8390) | |
| 5600 / 6600 / 7800 / 9200 / 10400 | document sections 1–5 reveal | fade up 8px, **.3s** ease-out |
| 11600 | phase `ready`. "Ready for your review" row; toolbar "Drafting…" → "Saved"; doc footer reveals | each .24s fade up |
| 19320 | fading-out (.24s ease-in-out) | |
| 19560 | rewinding (snap to t=0) | |
| 19680 → 20000 | fading-in (.32s) | then loop |

---

## 5. Demo 2: "Ask your contracts" (`#questions`, D = 16000ms, reduced-motion frame 12000)

### Layout
[LP_questionWorkspace] `data-sent`: `display:flex; flex-direction:column; min-height:688 (calc(600+2pp)); max-width:808 (calc(720+2pp)); margin:0 auto; padding:44px`. At 1440: x=316, 808 wide.
- Stage [LP_questionStage]: `flex:1; display:grid; align-items:center; min-height:290px (390 <=760); padding-bottom:32px`; children share `grid-area:1/1`. Height 460.
  - Intro (centered): h3 "Your agreements have answers." / p "Ask a question. Get straight to the relevant clause."
  - Messages [LP_messages] (`align-self:start; flex-direction:column; gap:24px`):
    - User bubble "**When does our agreement with Acme renew?**" (right-aligned, max-width calc(95%-8px)).
    - Response stack: thinking "Reading your agreement…" / streaming answer "Your agreement with Acme renews on **December 1**. It renews for **another year** unless either party gives **30 days’ notice**."
    - Citation card [LP_citation]: `width:min(248px,100%); aspect-ratio:1 (248x248); padding:20px; gap:20px; flex-direction:column; border-radius:12px; background:#fff; box-shadow:var(--shadow-card); font:400 13px/1.5; color:#555; align-self:flex-start`.
      - Heading row (`display:flex; gap:12px; align-items:flex-start`): `icon-agreement.svg` at **20px**, color #888, plus h4 "Consulting agreement" (`500 16px/21.6px #000`) and p "Acme · Section 4" (`12px/18px #888; margin-top:4px`).
      - blockquote (`margin:auto 0 0`, sits at the bottom): "“This agreement renews on **December 1** for successive one-year terms, unless either party gives **30 days’ written notice**.”"
- Composer wrapper [LP_questionComposer]: `flex:none; transform:translateY(-144px); transition: transform .4s cubic-bezier(.77,0,.175,1)`. When `data-sent=true`: `transform:none`. Before sending, the composer sits 144px higher (visually just under the intro); after sending it slides down to the bottom. Composer placeholder "Ask about an agreement…".

### Timeline
| t | event |
|---|---|
| 0 | phase `prompt`. Intro shown, composer raised (-144px), empty |
| 600 → 2000 | question typed at **35 ms/char** (40 chars) |
| 3000 | phase `sending` (to 3160). Intro hides (fade, translateY 8px). Composer `data-sending` (textarea fade/up, send scale .97) |
| 3160 | phase `thinking`. `data-sent=true`: composer slides down (.4s ease-in-out) and its value clears to empty. User bubble rises in (64px, scale .97). Thinking row shows. Composer busy (send/attach disabled) until 4560 |
| 4560 | phase `answering`. Thinking hides; answer streams at **22 ms/char** (116 chars → ≈ 7112) |
| 7800 | phase `complete`. Citation card fades up (8px, .24s) |
| 15320 / 15560 / 15680 | fading-out / rewinding / fading-in; loop at 16000 |

---

## 6. Demo 3: "Comment on contracts" (`#comments`, D = 21000ms, reduced-motion frame 17000)

### Layout
[LP_commentWorkspace]: `display:grid; grid-template-columns: minmax(0,1.25fr) minmax(0,.9fr)` (558.13 / 401.86); `min-height:688`. At <=760: one column (document on top with a bottom border, comments below).
- Left [LP_commentDocument]: `background:#fff; border-right:1px solid #eaeaea`.
  - Toolbar: "Design services agreement" (left) and a revealable check icon + "Changes saved" (#3b7050, 11px at <=760) on the right.
  - Paper (`overflow:visible`), 495.3 tall: title "Design services agreement" / "Studio North & Acme"; sections:
    - h4 "1. Scope of work" / p "The Designer will create a visual identity and website design, including two rounds of revisions."
    - h4 "2. Fees and payment" / p "The total project fee is **$12,000**. A **$6,000 deposit** is due before work begins." followed by the **clause** [LP_clause] (`margin-top:12px; position:relative`, 493 x 21.7):
      - [LP_clauseHighlight] `position:absolute; inset:-6px; border-radius:6px; background:#f0f5ff; clip-path:inset(0 100% 0 0); transition: clip-path .3s cubic-bezier(.77,0,.175,1), background-color .2s ease`. `[data-selected=true]` sets `clip-path:inset(0)`, a left-to-right wipe. `[data-updated=true]` sets `background:#edf6ed`.
      - [LP_clauseText] (relative): "The remaining balance is payable within <changedTerm> of delivery." The changed term [LP_changedTerm] is `display:inline-grid; color:#000; font-weight:500` with two stacked spans "14 days" / "30 days" (`grid-area:1/1; transition: opacity .24s, transform .24s ease-out`; hidden one is `opacity:0; transform:translateY(4px)`).
      - [LP_clauseMarker] `position:absolute; top:0; right:-25px (-20 <=1000, -16 <=760); 24x24 (20x20 <=760); border-radius:50%; display:grid; place-items:center; background:#ccd6ff; color:#2b45ab`, plus reveal classes. Transition includes `background-color .2s, color .2s`. It holds two stacked icons: the comment bubble (16px) and a check (`opacity/scale(.9)` swap, .2s). Updated state: `background:#edf6ed; color:#3b7050`.
      - Demo cursor [LP_demoCursor] (inside clause): `position:absolute; top:65%; left:55%; 28x40; opacity:0; transform:translate(72px,64px); transition: transform .5s cubic-bezier(.77,0,.175,1), opacity .2s var(--ease-out)`. `:before` uses `url(/cursors/macos-arrow@2x.png) center/contain no-repeat` offset `translate(-5px,-5px)`. `[data-show=true]` sets `opacity:1`; `[data-arrived=true]` sets `transform:translate(0)`. Asset: `reference/assets/macos-arrow@2x.png` (56x80 PNG, displayed at 28x40). **Not yet in public/: copy to `public/cursors/macos-arrow@2x.png`.**
    - h4 "3. Timeline" / "The project will be completed within **six weeks** of receiving the deposit and project materials."
    - h4 "4. Ownership" / "Ownership of the final approved designs transfers to the Client when payment is complete."
- Right [LP_commentSidebar]: `padding:44px`.
  - Chat heading: "Comments" + right-aligned count [LP_commentCount] "1 open" (`12px; color:#999`, reveal).
  - Thread stage [LP_threadStage] (`margin-top:24px; display:grid`; children share `grid-area:1/1; align-self:start`):
    1. Empty state [LP_commentEmpty]: `min-height:360px (300 <=760); flex-column centered; gap:16px; 14px/21px; color:#aaa; text-align:center`: 24px `icon-comment-bubble.svg` + "Select a clause.<br>Keep the conversation right here."
    2. Compose card [LP_commentCompose] (`inert`): card style `--card-padding:20px (16 <=760); padding:20px; background:#fff; border-radius:16px; overflow:hidden; box-shadow: 0 0 0 1px #ccd6ff, var(--shadow-card); 14px/1.5`. 300.9 tall.
       - Rail (negative margin `-20px -20px 20px` so it bleeds to the card edges): content `background:#f0f5ff; border-bottom:1px solid #ccd6ff`; head `height:41px; padding:1px 8px 0 20px` with label "SELECTED SECTION · 2. FEES AND PAYMENT" (source text "Selected section · 2. Fees and payment", `text-transform:uppercase; 500 11px/1; letter-spacing:.04em (0.44px); color:#161512`); body `padding:0 20px 12px`, p "The remaining balance is payable within 14 days of delivery." (`13px/1.4; color:#666; 2-line clamp`).
       - textarea (readonly, placeholder "Leave a comment…"): `width:100%; min-height:112px; padding:12px; 400 16px/1.5; background:#fafafa; border:1px solid #eee; border-radius:16px; resize:none; color:#000`.
       - Send row [LP_commentSend]: `margin-top:16px; flex; justify-content:space-between; 12px; color:#999`: "Alex Acme" + primary compact button "Comment" + `icon-arrow-up.svg` (112.5 x 36).
    3. Thread card `.thread.LP_thread` (same card style), 397.4 tall:
       - same rail as above;
       - `.thread-meta` (`display:flex; justify-content:space-between; align-items:baseline; gap:8px; margin-bottom:8px; 12px/18px`): strong "Alex " (#000 500) + span "Acme" (#999 400), then "Just now" (#999);
       - `.thread-body` (14px/21px #444): "Could we make this net 30? That matches our payment cycle."
       - Reply stage (`margin-top:20px`, grid, one cell): thinking "Sam is replying…" / `.reply` (`border-top:1px solid #eee; padding-top:16px; margin:0`) containing meta "Sam" + "Studio North" / "Just now" and the typed body "Of course. I’ve updated the payment terms to 30 days." (height reserved by a hidden measure copy).
       - Change note [LP_changeNote]: `margin-top:20px; flex; gap:8px; 12px; color:#3b7050`: check + "Payment terms updated to **30 days**." (strong inherits the green).
       - Resolve stack (`margin-top:20px; min-height:36px; display:grid`, one cell): secondary compact button (check icon + "Resolve", 101 x 36) ↔ [LP_resolved] (`flex; gap:6px; 500 13px; color:#3b7050`, check + "Resolved").

### Timeline
| t | event |
|---|---|
| 0 | phase `reading`. Empty state visible |
| 800 | cursor appears (opacity .2s) at its offset start (+72px, +64px) |
| 1600 | cursor `data-arrived`: glides to the clause (.5s ease-in-out) |
| 2000 | phase `selected`. Clause highlight wipes in left to right (.3s ease-in-out); marker (comment icon) fades up |
| 2600 | phase `composing`. Empty state fades out; compose card fades up |
| 3000 | cursor hides. Comment textarea types at **27 ms/char** (58 chars → ≈ 4566) |
| 5040 → 5200 | "Comment" button `data-pressed` (scale .97, .16s) |
| 5200 | phase `commented`. Compose card hides; thread card shows; "1 open" shows; Resolve button shows |
| 6400 → 7600 | "Sam is replying…" thinking row |
| 7600 | phase `replying`. Reply block fades up; body types at **24 ms/char** (53 chars → ≈ 8872) |
| 10400 | phase `updated`. "14 days" → "30 days" (cross-fade, 4px), highlight bg → #edf6ed (.2s), marker turns green, toolbar "Changes saved", change note |
| 13000 → 13160 | Resolve button pressed (scale .97) |
| 13160 | phase `resolved`. "1 open" hides; marker icon swaps comment → check (opacity + scale .9, .2s); Resolve button → "Resolved" label. (`data-resolved=true` on the thread has no CSS effect) |
| 20320 / 20560 / 20680 | fading-out / rewinding / fading-in; loop at 21000 |

---

## 7. Footer (`footer.landing-footer.landing-col`)

### Layout
| | 1440 / 1280 | 390 |
|---|---|---|
| grid | `grid-template-columns: minmax(0,1.6fr) minmax(0,1fr) minmax(0,1fr)` = 384 / 240 / 240; `gap:48px; align-items:start; padding:96px 0`. Height 358.7 (1440: y=3385.9, page ends 3744.6) | `grid-template-columns:1fr 1fr` (159/159); `gap:40px 24px; padding:56px 0`; brand spans `1/-1`. Height 455.7, page height 4478 |

- Brand (`flex-column; gap:20px; max-width:360px`): logo mark (20.09 x 27, color #e53d00) and p.landing-footer-description (`400 12px/1.5 (18px); color:#989490`, 360 x 90): "Terms is a minimal document signing tool. Contracts are markdown you write and edit in the browser; counterparties open a secure link, highlight text to comment inline, and sign with a typed e-signature. When the last signer signs, the document locks and a certificate of completion records the audit trail."
- Groups (`nav.landing-footer-group`, `flex-column; gap:16px`): h2 label (`500 12px/1.35; letter-spacing:-.01em; color:#989490`), then ul (`flex-column; gap:10px; list-style:none; padding:0`).
  - **Product**: Sign up `/sign-up`, Login `/sign-in`, Pricing `/pricing`, API docs `/docs`, Changelog `/changelog`.
  - **Company**: About `/about`, Contact `mailto:support@terms.so`, Privacy Policy `/privacy`, Terms of Service `/terms`.
  - Link: `display:inline-block; 500 14px/1.35 (18.9px); color:#161512; text-decoration:none`. **Hover: `color:#989490`, with no transition (instant).** Focus-visible: `outline:1px solid #777; outline-offset:3px`.
- Footer sits on `#fefcfb` (the gradient ends at y=840).

---

## 8. Assets

See `/Users/riyaghosh/V3/terms/reference/ASSET_MANIFEST.md` for the full list. Summary:
- Network-loaded on the home page: the 2 Diatype OTFs, 2 Geist Mono woff2 subsets, `/landing/play.svg`, `/cursors/macos-arrow@2x.png`. No raster images, no video, no canvas. A Google Fonts Geist Mono CSS request is also made, but it is for an internal dev "dialkit" panel and is not needed.
- Inline SVGs saved to `/Users/riyaghosh/V3/terms/reference/svgs/`: `logo-mark.svg`, `icon-pause.svg`, `icon-play-resume.svg`, `icon-attach.svg`, `icon-send-arrow.svg`, `icon-check.svg`, `icon-agreement.svg`, `icon-comment-bubble.svg`, `icon-arrow-up.svg`, `landing-play-chip.svg`.
- Head: title "Terms.so: Never touch DocuSign again.", meta description "Terms is a minimal document signing tool. Contracts are markdown you write and edit in the browser; counterparties open a link, comment inline, and sign with a typed e-signature.", theme-color #ffffff, favicon.ico 32x32, icon.svg, apple-icon.png 180x180 (all already in public/).

## 9. Scroll behavior / other motion
- There are no scroll-linked effects (no parallax, no scroll listeners). Scroll only matters through the 0.12-threshold IntersectionObservers that start and pause each demo.
- Smooth anchor scrolling is on (`scroll-behavior:smooth`) unless reduced motion is set.
- No page-load fade-ins other than the headline typing and the chips reveal.

## 10. Uncertainties / not measured
- Hover was tested with a real mouse on nav (About) only. Other hover values (chips, playback/secondary buttons, footer links) come from the live CSS rules, which are the same chunk files.
- At 390 the draft and comments demos were measured mid-animation (rects of transformed elements include their transform). Use the computed width/padding values above rather than those rects.
- The hero height at a 3800px-tall test viewport read 609px instead of 554px, which looks like a viewport-height-dependent artifact of the test viewport. All real-viewport readings (1440x900, 1280x900) give 554px.
