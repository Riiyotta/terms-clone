import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from './Icons.jsx'
import SmartLink from './SmartLink.jsx'

// CLONE_SPEC 1 + CLONE_SPEC_PAGES 0. Colors come from the shell's --nav-link / --nav-link-muted / --nav-logo
// (index.css: .landing, .landing--home). Login / Sign up and the [data-pill-active] link use --nav-link.
const LINKS = [
  { label: 'About', href: '/about', bright: false },
  { label: 'Pricing', href: '/pricing', bright: false },
  { label: 'Login', href: '/sign-in', bright: true },
  { label: 'Sign up', href: '/sign-up', bright: true },
]
const SIGN_UP = 3

// Header padding/gap per shell (CLONE_SPEC_PAGES 0 table).
const SHELL_CLASSES = {
  dark: 'gap-4 py-6 lt600:gap-3 lt600:py-5', // A: 98.4 / 84 tall
  wide: 'gap-4 py-8 lt600:gap-3 lt600:py-5', // B: 114.4 / 84 tall
  narrow: 'gap-0 py-24 lt600:flex-col lt600:items-start lt600:gap-8 lt600:py-12', // C: 242.4 / 199 tall
}

export default function Navbar({ shell = 'dark', current }) {
  // Resting [data-pill-active] link is always "Sign up" (live, measured on /about and /pricing too); the
  // current page link stays bright through aria-current, even while the pill sits on another link.
  const currentIndex = LINKS.findIndex((l) => l.href === current)
  const restingActive = SIGN_UP
  const [active, setActive] = useState(restingActive)
  // Live sets [data-instant] on the rail when a link gets keyboard focus, dropping the links' color/box-shadow
  // transitions (only `background .15s` remains) until the pointer enters a link again.
  const [instant, setInstant] = useState(false)
  const linksRef = useRef(null)
  // On pointer leave the pill returns to the focused link if there is one (live), else to the resting link.
  const settle = () => {
    const links = [...(linksRef.current?.children ?? [])]
    const focused = links.indexOf(document.activeElement)
    setActive(focused >= 0 ? focused : restingActive)
  }
  return (
    <header className={`landing-nav landing-col flex items-center justify-between ${SHELL_CLASSES[shell]}`}>
      <Link to="/" className="landing-mark flex text-nav-logo" aria-label="Terms">
        <LogoMark />
      </Link>
      <nav className="landing-links flex gap-5 lt600:gap-2" aria-label="Main">
        <div className="pill-navigation landing-actions">
          <div
            className="pill-navigation-rail relative"
            data-clip="off"
            data-instant={instant ? 'true' : undefined}
            onPointerLeave={settle}
          >
            <div ref={linksRef} className="pill-navigation-links flex gap-1">
              {LINKS.map((link, i) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  aria-current={i === currentIndex ? 'page' : undefined}
                  data-pill-active={active === i ? '' : undefined}
                  onPointerEnter={() => {
                    setActive(i)
                    setInstant(false)
                  }}
                  onFocus={(e) => {
                    setActive(i)
                    if (e.currentTarget.matches(':focus-visible')) setInstant(true)
                  }}
                  onBlur={() => setActive(restingActive)}
                  className={`nav-link inline-flex items-center whitespace-nowrap rounded-pill bg-transparent px-2 py-[18px] text-[15px] font-medium leading-[.96] tracking-[-0.01em] no-underline lt600:min-h-[44px] lt600:px-[clamp(2px,12.5vw-38px,10px)] lt600:py-[14px] lt600:text-[14px] ${
                    link.bright || i === currentIndex || active === i ? 'text-nav-link' : 'text-nav-link-muted'
                  }`}
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
