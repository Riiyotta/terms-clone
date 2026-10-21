import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/usePreviewTimeline.js'

// CLONE_SPEC 2 "Hero motion 1". Segments flagged `kern` get span.landing-kern.
export const HOME_LINES = [
  { brand: true, segments: [{ text: 'Sta' }, { text: 'r', kern: true }, { text: 't a dra' }, { text: 'f', kern: true }, { text: 't with AI.' }] },
  { brand: true, segments: [{ text: 'Chat about any contract.' }] },
  { brand: true, segments: [{ text: 'Comment with counterpa' }, { text: 'r', kern: true }, { text: 'ties.' }] },
  { brand: false, segments: [{ text: 'You’ll never open DocuSign again.' }] },
]
const TIMING = [
  { delay: 240, duration: 700 },
  { delay: 220, duration: 760 },
  { delay: 220, duration: 880 },
  { delay: 460, duration: 1000 },
]
const COMPLETION_DELAY = 1200

const lineText = (line) => line.segments.map((s) => s.text).join('')
const lineLength = (line) => [...lineText(line)].length

// Absolute start/end of each line, each line starting `delay` after the previous one ended.
// Pages with fewer lines (about: 2, pricing: 3) use the first N entries of DEFAULT_TIMING (CLONE_SPEC_PAGES 0).
function schedule(lineCount) {
  return TIMING.slice(0, lineCount).reduce((acc, { delay, duration }) => {
    const start = (acc.length ? acc[acc.length - 1].end : 0) + delay
    acc.push({ start, end: start + duration, duration })
    return acc
  }, [])
}

function visibleCount(line, slot, t) {
  const { start, duration } = slot
  if (t < start) return 0
  const n = lineLength(line)
  return Math.min(n, Math.floor(((t - start) / duration) * n) + 1)
}

// Render chars [from, to) of a line, keeping kern spans in both typed and hidden parts.
function renderRange(line, from, to) {
  const out = []
  let offset = 0
  line.segments.forEach((seg, i) => {
    const chars = [...seg.text]
    const a = Math.max(from - offset, 0)
    const b = Math.min(to - offset, chars.length)
    if (b > a) {
      const text = chars.slice(a, b).join('')
      out.push(seg.kern ? <span key={i} className="landing-kern">{text}</span> : <span key={i}>{text}</span>)
    }
    offset += chars.length
  })
  return out
}

export default function HeroHeadline({ lines = HOME_LINES, onDone }) {
  const [plan] = useState(() => {
    const slots = schedule(lines.length)
    return { slots, doneAt: slots[slots.length - 1].end + COMPLETION_DELAY } // home: 5680
  })
  const [reduced] = useState(prefersReducedMotion)
  const [t, setT] = useState(reduced ? Infinity : 0)

  useEffect(() => {
    if (reduced) {
      onDone?.()
      return
    }
    const mount = performance.now()
    let raf
    const frame = (now) => {
      const elapsed = now - mount
      setT(elapsed)
      if (elapsed >= plan.doneAt) {
        onDone?.()
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <h1
      className="landing-headline m-0 whitespace-nowrap text-[56px] font-medium leading-[1] tracking-[-.05em] text-hero-text lt1000:text-[clamp(32px,5.4vw,56px)] lt600:whitespace-normal lt600:text-[clamp(28px,8.5vw,34px)]"
      aria-label={lines.map(lineText).join(' ')}
    >
      {lines.map((line, i) => {
        const n = lineLength(line)
        const shown = reduced ? n : visibleCount(line, plan.slots[i], t)
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`landing-headline-line ${line.brand ? 'landing-headline-brand text-hero-muted' : ''}`}
          >
            {renderRange(line, 0, shown)}
            {shown < n && (
              <span className="landing-headline-tail" style={{ visibility: 'hidden' }}>
                {renderRange(line, shown, n)}
              </span>
            )}
          </span>
        )
      })}
    </h1>
  )
}
