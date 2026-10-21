import RichText from './RichText.jsx'

// `p.landing-prose.landing-intro` on the dark hero (CLONE_SPEC_PAGES 1 + 2 typography).
export default function LandingIntro({ lead, rest }) {
  return (
    <p className="landing-prose landing-intro -mt-4 max-w-[560px] text-[16px]">
      <strong className="font-medium text-hero-text">
        <RichText text={lead} />
      </strong>{' '}
      <span className="landing-prose-muted font-normal text-hero-prose-muted">
        <RichText text={rest} />
      </span>
    </p>
  )
}
