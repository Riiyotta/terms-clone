import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroHeadline from './HeroHeadline.jsx'
import HeroPoetry from './HeroPoetry.jsx'

// CLONE_SPEC 2.
export default function Hero() {
  const [chipsShown, setChipsShown] = useState(false)
  return (
    <main className="landing-hero landing-hero--home landing-col relative flex min-h-0 flex-col items-start gap-16 pb-20 pt-[150px] text-left lt600:min-h-[clamp(320px,68svh-100px,440px)] lt600:gap-8 lt600:py-12 [&>:not(.landing-poetry)]:relative [&>:not(.landing-poetry)]:z-[1]">
      <HeroPoetry />
      <HeroHeadline onDone={() => setChipsShown(true)} />
      <div className="landing-cta landing-chips flex items-center gap-[6px]" data-show={chipsShown}>
        <Link
          to="/sign-up"
          className="landing-chip landing-chip--primary gap-1 whitespace-nowrap rounded-chip bg-white px-[10px] pb-[11px] pt-[10px] text-[15px] font-medium leading-none tracking-[-0.01em] text-ink no-underline hover:bg-grey-f2"
        >
          Sign up
        </Link>
        <a
          href="#draft"
          className="landing-chip inline-flex items-center gap-1 whitespace-nowrap rounded-chip bg-hero-chip pb-[9px] pl-2 pr-[10px] pt-2 text-[15px] font-medium leading-none tracking-[-0.01em] text-hero-chip-text no-underline hover:bg-hero-chip-hover"
        >
          <img src="/assets/play.svg" width={18} height={18} alt="" />
          Watch a demo
        </a>
      </div>
    </main>
  )
}
