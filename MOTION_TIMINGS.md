# Motion timings — terms.so home

Numbers read from the saved production bundle (reference/Terms.so_files). These are behaviour
facts to re-implement in our own code — do NOT paste the site's JS/CSS. Live-measured values in
CLONE_SPEC.md take precedence if they disagree.

## Shared demo loop engine (all three preview cards)
- Clock ticks every 40ms; `t = (t + 40) % loopMs`.
- Runs only while the card is ≥12% in view (IntersectionObserver threshold 0.12) and the tab is visible.
- Pause button toggles running; on pause, in-flight CSS transitions inside the card are paused too.
- prefers-reduced-motion: clock is frozen at a "still" time (shows the finished state), no loop.
- End-of-loop states, measured back from loopMs:
  - `fading-out` from loopMs−680 (time frozen there), `rewinding` from loopMs−440 (time = 0),
    `fading-in` from loopMs−320 (time = 0). Otherwise `playing`.
  - The loop wrapper fades opacity over 320ms with ease-out `cubic-bezier(.23,1,.32,1)`.
- typed(text, t, start, msPerChar) = first floor((t−start)/msPerChar) chars.
- Streaming assistant answer: 1 char per 22ms from its start time.

## Draft with AI — loop 20000ms, still frame 16000ms
- 160: sample/recent agreements list visible
- 600 →: prompt typed at 32ms/char ("Draft a design agreement with Acme. $12,000, six weeks, 50% upfront.")
- 3400–3560: send button "sending"; 3560: launch view hides, workspace shows
- 3800: user message appears
- 4100–5200: thinking dots + "Putting your draft together…"
- 5000: draft pane header shows; 5200: answer streams (22ms/char)
- Draft blocks appear at 5600, 6600, 7800, 9200, 10400
- 11600: "Ready for your review" + "Your draft is ready / Review draft"
- phases: prompt → sending → opening → drafting(5200) → ready(11600)

## Ask your contracts — loop 16000ms, still frame 12000ms
- 600 →: question typed at 35ms/char ("When does our agreement with Acme renew?")
- 3000–3160 sending; 3160 composer clears, thinking ("Reading your agreement…") until 4560
- 4560: answer streams (22ms/char); 7800: citation card ("Consulting agreement · Acme · Section 4") shows
- phases: prompt → sending → thinking → answering(4560) → complete(7800)

## Comment on contracts — loop 21000ms, still frame 17000ms
- 800–3000 cursor visible; arrives at clause 1600; 2000 clause selected
- popover "Select a clause." shown until 2600
- 2600–5200 comment composer; comment typed from 3000 at 27ms/char
- 5040–5200 send button pressed; 5200 comment posted
- 6400 "Sam is replying…" until 7600; 7600 reply typed at 24ms/char
- 10400 term changes 14 days → 30 days + "Payment terms updated to 30 days."
- 13000–13160 Resolve pressed; 13160 resolved

## Hero headline (letter-by-letter, runs once on load via rAF)
Lines: "Start a draft with AI." / "Chat about any contract." / "Comment with counterparties." (these 3
use the muted brand colour) / "You’ll never open DocuSign again."
Some letters sit in a `kern` span (e.g. the "r" and "f" in "Start a draft", the "r" in "counterparties") for optical kerning.
- Per line {delay, duration}: L1 240/700, L2 220/760, L3 220/880, L4 460/1000 — delays are sequential
  (each line starts after the previous line's end + its delay).
- Reveal count = floor((t−start)/duration × len) + 1, clamped. Unrevealed tail still rendered (hidden) to hold layout.
- CTA chips (Sign up / Watch a demo) show 1200ms after the last line finishes.
- Reduced motion: everything shown immediately.

## Hero "poetry" (mono snippets typed into side grids)
- Two `<pre>` grids (left/right) of spaces, Geist Mono 11px, opacity 0.5, area height 800, top −72, bleed 80, gutter 48.
- Up to 12 phrases alive; new phrase every typing cycle alternates sides; typed at 35ms/char with a ▌ cursor;
  phrases split over 1–3 rows with random horizontal jog (≤32px); oldest erased (reverse order) once
  count reached or after 15000ms hold. Seeded PRNG (mulberry32) for placement.
- Initial fill pre-seeds a few phrases.
