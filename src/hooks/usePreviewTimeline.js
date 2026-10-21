import { useCallback, useEffect, useRef, useState } from 'react'

// CLONE_SPEC 3b. Fixed 40ms ticks (not wall clock); state is a pure function of `time`.
const TICK = 40
const FADE_OUT = 680 // D - 680: fading-out (time frozen there)
const REWIND = 440 // D - 440: rewinding (time = 0, transitions disabled)
const FADE_IN = 320 // D - 320: fading-in (time = 0, transitions disabled)
const VISIBLE_RATIO = 0.12

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function typed(text, t, start, msPerChar) {
  return text.slice(0, Math.max(0, Math.floor((t - start) / msPerChar)))
}

export function usePreviewTimeline(duration, reducedMotionFrame) {
  const ref = useRef(null)
  const [reduced] = useState(prefersReducedMotion)
  const [rawTime, setRawTime] = useState(() => (reduced ? reducedMotionFrame : 0))
  const [inView, setInView] = useState(false)
  const [docVisible, setDocVisible] = useState(() => typeof document === 'undefined' || !document.hidden)
  const [userPaused, setUserPaused] = useState(null) // null = default (paused only under reduced motion)
  const paused = userPaused ?? reduced
  const running = inView && docVisible && !paused

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= VISIBLE_RATIO),
      { threshold: VISIBLE_RATIO },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setDocVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setRawTime((t) => (t + TICK) % duration), TICK)
    return () => window.clearInterval(id)
  }, [running, duration])

  // Pausing also freezes any CSS transition that is mid-flight inside the card.
  useEffect(() => {
    if (!paused) return
    const el = ref.current
    if (!el || typeof el.getAnimations !== 'function') return
    const inFlight = el
      .getAnimations({ subtree: true })
      .filter((a) => typeof CSSTransition !== 'undefined' && a instanceof CSSTransition && a.playState === 'running')
    inFlight.forEach((a) => a.pause())
    return () => inFlight.forEach((a) => a.playState === 'paused' && a.play())
  }, [paused])

  const fadeOutAt = duration - FADE_OUT
  const loopState =
    rawTime >= duration - FADE_IN
      ? 'fading-in'
      : rawTime >= duration - REWIND
        ? 'rewinding'
        : rawTime >= fadeOutAt
          ? 'fading-out'
          : 'playing'
  const time = loopState === 'playing' ? rawTime : loopState === 'fading-out' ? fadeOutAt : 0

  const togglePaused = useCallback(() => setUserPaused((p) => !(p ?? reduced)), [reduced])

  return { ref, time, running, loopState, resetting: loopState !== 'playing', paused, togglePaused }
}
