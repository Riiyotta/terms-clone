import { useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/usePreviewTimeline.js'

// CLONE_SPEC 2 "Hero motion 2". Decorative mono phrases typed/erased in two side grids.
const PARAMS = { count: 12, fontSize: 11, areaHeight: 800, gutter: 48, jog: 32, typeMs: 35, hold: 15000, cursor: true }
const MIN_ZONE = 120
const CARET = '▌'

const PHRASES = [
  'Write an NDA for a freelancer.',
  'Draft a design project contract.',
  'How many weeks is our agreement with Acme?',
  '$12,000, six weeks, 50% upfront.',
  'Make the payment terms net 30.',
  'Add two rounds of revisions.',
  'mutual confidentiality, two years',
  'ownership transfers on final payment',
  'terminate with 14 days’ written notice',
  'What did we agree with Studio North?',
  'Consulting agreement, hourly, capped.',
  'Send it to alex@acme.com to sign.',
  'effective on the date of the last signature',
  'Which contracts expire this quarter?',
  'a one-page letter of intent',
  'renews yearly unless either side opts out',
  'governed by the laws of Delaware',
  'Summarize the indemnity clause.',
  'Hire a contractor for the summer.',
  'deposit due before work begins',
]

function mulberry32(seed) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let x = state
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.cells = Array.from({ length: rows }, () => Array(cols).fill(' '))
  }
  // Block plus a 1-row / `colMargin`-col margin must be blank.
  isFree(row, col, width, height, colMargin) {
    for (let r = row - 1; r <= row + height; r++) {
      if (r < 0 || r >= this.rows) continue
      for (let c = col - colMargin; c < col + width + colMargin; c++) {
        if (c < 0 || c >= this.cols) continue
        if (this.cells[r][c] !== ' ') return false
      }
    }
    return true
  }
}

// Returns the list of cells for a phrase block, or null when no blank spot was found in 40 tries.
function placePhrase(side, grid, seed) {
  const rand = mulberry32(seed)
  const words = PHRASES[Math.floor(rand() * PHRASES.length)].split(' ')
  const lineCount = Math.min(words.length, 1 + Math.floor(3 * rand()))
  const lines = []
  let used = 0
  for (let i = 0; i < lineCount; i++) {
    const linesLeft = lineCount - i - 1
    const take =
      i === lineCount - 1 ? words.length - used : Math.max(1, Math.round((words.length - used - linesLeft) * (0.4 + 0.5 * rand())))
    lines.push(words.slice(used, used + take).join(' '))
    used += take
  }
  const cellWidth = 0.6 * PARAMS.fontSize
  const jogs = lines.map((_, i) => Math.round((i === 0 ? rand() * PARAMS.jog * 0.5 : rand() * PARAMS.jog) / cellWidth))
  const width = Math.max(...lines.map((l, i) => jogs[i] + [...l].length))
  const spread = Math.floor(0.7 * grid.cols)

  for (let attempt = 0; attempt < 40; attempt++) {
    const col = side === 'right' ? Math.floor(rand() * spread) : grid.cols - width - Math.floor(rand() * spread)
    const row = Math.floor(rand() * Math.max(1, grid.rows - lines.length))
    if (!grid.isFree(row, col, width, lines.length, 2)) continue
    const cells = []
    lines.forEach((line, li) =>
      [...line].forEach((char, ci) => {
        const c = col + jogs[li] + ci
        if (c >= 0 && c < grid.cols) cells.push({ row: row + li, col: c, char })
      }),
    )
    if (cells.length) return cells
  }
  return null
}

export default function HeroPoetry({ run = 0 }) {
  const rootRef = useRef(null)
  const rowRefs = useRef({ left: [], right: [] })
  const [size, setSize] = useState(null)

  // Measure the layer against its parent (re-seeds on resize).
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const width = el.clientWidth
      const zone = Math.max(0, (width - (el.parentElement?.clientWidth ?? 0)) / 2)
      setSize((prev) => (prev && prev.width === width && prev.zone === zone ? prev : { width, zone }))
    })
    ro.observe(el)
    if (el.parentElement) ro.observe(el.parentElement)
    return () => ro.disconnect()
  }, [])

  const geometry = useMemo(() => {
    if (!size || size.zone < MIN_ZONE) return null
    const usable = Math.max(0, size.zone - PARAMS.gutter)
    return {
      usable,
      cols: Math.floor(usable / (0.6 * PARAMS.fontSize)),
      rows: Math.floor(PARAMS.areaHeight / (1.4 * PARAMS.fontSize)),
    }
  }, [size])

  useEffect(() => {
    if (!geometry) return
    const grids = { left: new Grid(geometry.rows, geometry.cols), right: new Grid(geometry.rows, geometry.cols) }
    const alive = [] // phrases on screen, oldest first: { side, cells, born }
    let job = null
    let seed = 0xec4ba7 * run + 1
    let side = 'left'
    let caret = null
    let lastJobKind = 'erase'
    const minAlive = Math.min(PARAMS.count, Math.max(2, Math.ceil(PARAMS.count / 2)))

    const paintRow = (s, row) => {
      const node = rowRefs.current[s][row]
      if (!node) return
      const chars = [...grids[s].cells[row]]
      if (PARAMS.cursor && caret && caret.side === s && caret.row === row && caret.col < chars.length) chars[caret.col] = CARET
      node.textContent = chars.join('')
    }
    const paintAll = () => ['left', 'right'].forEach((s) => grids[s].cells.forEach((_, r) => paintRow(s, r)))
    const moveCaret = (next) => {
      const prev = caret
      caret = next
      if (prev) paintRow(prev.side, prev.row)
      if (next) paintRow(next.side, next.row)
    }

    const eraseOldest = () => {
      const phrase = alive.shift()
      return { kind: 'erase', side: phrase.side, cells: [...phrase.cells].reverse(), at: 0, phrase }
    }
    const writeNew = (now) => {
      for (let i = 0; i < 2; i++) {
        side = side === 'left' ? 'right' : 'left'
        const cells = placePhrase(side, grids[side], seed++)
        if (cells) return { kind: 'write', side, cells, at: 0, phrase: { side, cells, born: now } }
      }
      return null
    }
    const nextJob = (now) => {
      const oldest = alive[0]
      const full = alive.length >= PARAMS.count
      const stale = !!oldest && now - oldest.born > PARAMS.hold
      const aboveMin = alive.length > minAlive
      if (oldest && (full || (stale && aboveMin && lastJobKind === 'write'))) return eraseOldest()
      return writeNew(now) || (oldest && aboveMin ? eraseOldest() : null)
    }

    // Pre-place phrases instantly; stagger their birth times so they don't all expire together.
    const prefill = (n, now) => {
      for (let i = 0; i < n; i++) {
        const w = writeNew(now)
        if (!w) break
        w.cells.forEach((c) => (grids[w.side].cells[c.row][c.col] = c.char))
        w.phrase.born = now - PARAMS.hold * ((n - i) / (n + 1))
        alive.push(w.phrase)
      }
    }

    if (prefersReducedMotion()) {
      prefill(PARAMS.count, 0)
      caret = null
      paintAll()
      return
    }

    prefill(minAlive, 0)
    paintAll()
    const t0 = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now() - t0
      if (!job) {
        job = nextJob(now)
        if (!job) {
          moveCaret(null)
          return
        }
      }
      const cell = job.cells[job.at]
      grids[job.side].cells[cell.row][cell.col] = job.kind === 'write' ? cell.char : ' '
      moveCaret({ side: job.side, row: cell.row, col: job.kind === 'write' ? cell.col + 1 : cell.col })
      paintRow(job.side, cell.row)
      job.at++
      if (job.at >= job.cells.length) {
        if (job.kind === 'write') {
          job.phrase.born = now
          alive.push(job.phrase)
        }
        lastJobKind = job.kind
        job = null
      }
    }, Math.max(8, PARAMS.typeMs))
    return () => window.clearInterval(id)
  }, [geometry, run])

  return (
    <div ref={rootRef} className="landing-poetry" style={{ '--poetry-zone': geometry ? `${geometry.usable}px` : '0px' }} aria-hidden="true">
      {geometry &&
        ['left', 'right'].map((s) => (
          <pre key={`${s}-${run}-${geometry.cols}x${geometry.rows}`} className="landing-poetry-grid" data-side={s}>
            {Array.from({ length: geometry.rows }, (_, r) => (
              <span
                key={r}
                ref={(node) => {
                  rowRefs.current[s][r] = node
                }}
              >
                {' '.repeat(geometry.cols)}
              </span>
            ))}
          </pre>
        ))}
    </div>
  )
}
