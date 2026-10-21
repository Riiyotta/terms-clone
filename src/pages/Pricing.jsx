import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroHeadline from '../components/HeroHeadline.jsx'
import LandingIntro from '../components/LandingIntro.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { headline, intro, plans } from '../content/pricing.js'

// Line 1 "Pricing:" is the muted brand line; lines 2-3 are bright.
const LINES = headline.map((text, i) => ({ brand: i === 0, segments: [{ text }] }))

// CLONE_SPEC_PAGES 2. Shell A (dark hero). No toggle, no badges, no card hover.
export default function Pricing() {
  usePageTitle('Pricing — Terms')
  return (
    <div className="landing landing--wide landing--home">
      <Navbar shell="dark" current="/pricing" />
      <main className="landing-hero landing-col flex flex-col items-start gap-16 pb-20 pt-[150px] text-left lt600:gap-8 lt600:pb-14 lt600:pt-[72px]">
        <HeroHeadline lines={LINES} />
        <LandingIntro lead={intro.lead} rest={intro.rest} />
      </main>
      <section className="landing-plans landing-col relative z-[1] flex items-stretch gap-3 lt600:flex-col">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="landing-card landing-plan flex flex-[1_1_0] flex-col items-start gap-6 rounded-thread lt600:flex-[0_0_auto]"
          >
            <span className="landing-plan-name text-[16px] font-medium leading-[.96] tracking-[-0.01em] text-ink">{plan.name}</span>
            <span className="landing-plan-price block pt-2 text-[40px] font-medium leading-[.96] tracking-[-.04em] text-ink">
              {plan.price}
              <span className="landing-prose-muted text-[16px] font-medium tracking-[-0.01em] text-prose-muted"> / month</span>
            </span>
            <span className="landing-plan-tokens landing-prose-muted text-[16px] font-normal leading-[1.35] text-prose-muted">
              {plan.tokens}
            </span>
            <Link to="/sign-up" className="action-button action-button--brand mt-auto self-stretch no-underline">
              Try it out
            </Link>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  )
}
