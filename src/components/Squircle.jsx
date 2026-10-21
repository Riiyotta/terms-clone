import { useLayoutEffect, useRef, useState } from 'react'

// Figma-style smoothed corners (CLONE_SPEC 3a). Uniform radius, preserveSmoothing = true.
// For r=24, smoothing=.6 this yields p=38.4, a=13.4413, b=6.7206, c=5.1339, d=2.6158, arc=10.4884,
// matching the measured path for the 960x836.5 card.
const rad = (deg) => (deg * Math.PI) / 180
const f = (n) => Number(n.toFixed(4))

function cornerParams(radius, smoothing, budget) {
  let p = (1 + smoothing) * radius
  const arcMeasure = 90 * (1 - smoothing)
  const arc = Math.sin(rad(arcMeasure / 2)) * radius * Math.SQRT2
  const alpha = (90 - arcMeasure) / 2
  const p3ToP4 = radius * Math.tan(rad(alpha / 2))
  const beta = 45 * smoothing
  const c = p3ToP4 * Math.cos(rad(beta))
  const d = c * Math.tan(rad(beta))
  let b = (p - arc - c - d) / 3
  let a = 2 * b
  if (p > budget) {
    const maxDistance = budget - d - arc - c
    const minA = maxDistance / 6
    b = Math.min(b, maxDistance - minA)
    a = maxDistance - b
    p = Math.min(p, budget)
  }
  return { a: f(a), b: f(b), c: f(c), d: f(d), p: f(p), arc: f(arc), r: radius }
}

export function squirclePath(w, h, radius, smoothing) {
  const budget = Math.min(w, h) / 2
  const r = Math.min(radius, budget)
  const { a, b, c, d, p, arc } = cornerParams(r, smoothing, budget)
  const ab = f(a + b)
  const abc = f(a + b + c)
  const bc = f(b + c)
  const W = f(w)
  const H = f(h)
  return [
    `M ${f(w - p)} 0`,
    `c ${a} 0 ${ab} 0 ${abc} ${d}`,
    `a ${r} ${r} 0 0 1 ${arc} ${arc}`,
    `c ${d} ${c} ${d} ${bc} ${d} ${abc}`,
    `L ${W} ${f(h - p)}`,
    `c 0 ${a} 0 ${ab} ${-d} ${abc}`,
    `a ${r} ${r} 0 0 1 ${-arc} ${arc}`,
    `c ${-c} ${d} ${-bc} ${d} ${-abc} ${d}`,
    `L ${p} ${H}`,
    `c ${-a} 0 ${-ab} 0 ${-abc} ${-d}`,
    `a ${r} ${r} 0 0 1 ${-arc} ${-arc}`,
    `c ${-d} ${-c} ${-d} ${-bc} ${-d} ${-abc}`,
    `L 0 ${p}`,
    `c 0 ${-a} 0 ${-ab} ${d} ${-abc}`,
    `a ${r} ${r} 0 0 1 ${arc} ${-arc}`,
    `c ${c} ${-d} ${bc} ${-d} ${abc} ${-d}`,
    'Z',
  ].join(' ')
}

export default function Squircle({ radius = 24, smoothing = 0.6, className = '', children }) {
  const ref = useRef(null)
  const [path, setPath] = useState(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width > 0 && height > 0) setPath(squirclePath(width, height, radius, smoothing))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [radius, smoothing])

  const style = { '--squircle-radius': `${radius}px`, ...(path ? { '--squircle-path': `path("${path}")` } : {}) }

  return (
    <div ref={ref} className={`squircle ${className}`} style={style}>
      <div className="squircle-shadow" aria-hidden="true">
        <div className="squircle-shadow-shape" />
      </div>
      <div className="squircle-body">{children}</div>
      <svg className="squircle-border" aria-hidden="true" focusable="false">
        {path && <path d={path} />}
      </svg>
    </div>
  )
}
