import { Link } from 'react-router-dom'
import { LogoMark } from './Icons.jsx'

// CLONE_SPEC_PAGES 5 "Shell D: app header". Static, transparent, centered logo, "Sign in" at the right.
export default function AppHeader() {
  return (
    <header className="app-header w-full py-3">
      <div className="app-header-row row relative flex min-h-[36px] max-w-none items-center justify-center gap-3 px-6">
        <div id="nav-left" className="row absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-3" />
        <Link to="/" className="app-header-logo flex" aria-label="Terms">
          <LogoMark width={19.34765625} height={26} />
        </Link>
        <div className="row absolute right-6 top-[7.5px] flex items-center gap-3">
          <div id="nav-right" className="row flex items-center gap-3" />
          <Link to="/sign-in" className="small text-[14px] font-normal leading-[21px]">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
