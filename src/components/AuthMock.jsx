import { Link } from 'react-router-dom'

// CLONE_SPEC_PAGES 6. STATIC VISUAL MOCK of the Clerk sign-in / sign-up card (auth shell E).
// No Clerk script, no network calls: the form never submits, inputs are uncontrolled and never read,
// and the Google button does nothing.
const COPY = {
  'sign-in': {
    title: 'Sign in to Terms',
    subtitle: 'Welcome back! Please sign in to continue',
    prompt: 'Don’t have an account?',
    switchLabel: 'Sign up',
    switchHref: '/sign-up',
    inputName: undefined,
  },
  'sign-up': {
    title: 'Create your account',
    subtitle: 'Welcome! Please fill in the details to get started.',
    prompt: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: '/sign-in',
    inputName: 'emailAddress',
  },
}

const PILL = 'flex h-[52px] w-full items-center justify-center rounded-pill border-none px-3 py-[7px] text-[16px] font-medium leading-[22.1538px]'

export default function AuthMock({ mode }) {
  const c = COPY[mode]
  const inputId = `${mode}-email`
  return (
    <main className="auth flex min-h-[100dvh] items-center justify-center bg-white px-6 pb-[12vh] pt-12 font-sans text-ink lt600:items-start lt600:px-4 lt600:pb-12 lt600:pt-8">
      <div className="auth-root flex w-full max-w-[420px] flex-col">
        <div className="auth-card-box">
          <div className="auth-card -ml-px -mt-px flex w-full flex-col gap-6">
            <div className="auth-header flex flex-col items-start gap-4">
              <div className="flex h-[27px] justify-start">
                <Link to="/" className="flex" aria-label="Terms">
                  <img src="/icon.svg" width={27} height={27} alt="Terms" />
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-medium leading-[33.88px] tracking-heading text-ink">{c.title}</h1>
                <p className="text-[16px] font-normal leading-[22.15px] text-nav">{c.subtitle}</p>
              </div>
            </div>
            <form className="flex flex-col gap-8" noValidate onSubmit={(e) => e.preventDefault()}>
              <p className="sr-only">Demo only — sign-in is not functional.</p>
              <div className="flex flex-col gap-2">
                <label htmlFor={inputId} className="self-start text-[16px] font-medium leading-[22.15px] text-ink">
                  Email address
                </label>
                <input
                  id={inputId}
                  name={c.inputName}
                  type="email"
                  autoComplete="off"
                  placeholder="Enter your email address"
                  className="auth-input h-[52px] w-full rounded-pill border-none bg-grey-f2 px-[22px] text-[16px] font-normal text-ink"
                />
              </div>
              <button type="submit" className={`auth-primary ${PILL} bg-accent text-white`}>
                Continue
              </button>
            </form>
            <button type="button" className={`auth-social ${PILL} gap-3 bg-grey-f2 text-auth-social-text`} onClick={(e) => e.preventDefault()}>
              <img src="/auth/google.svg" width={16} height={16} alt="" />
              Continue with Google
            </button>
          </div>
          <div className="auth-footer flex flex-col items-center">
            <div className="auth-footer-action flex items-center justify-center gap-1 px-8 py-4 text-[16px] font-normal leading-[22.15px] text-nav">
              <span>{c.prompt}</span>
              <Link to={c.switchHref} className="font-medium text-accent no-underline">
                {c.switchLabel}
              </Link>
            </div>
            <div className="auth-footer-item flex w-full items-center justify-between border-t border-auth-footer-border px-8 py-4 text-[14.77px] font-medium leading-[19.69px] text-nav">
              {/* Live shows "Secured by" + a 48x14 Clerk wordmark (gap 4). The mock keeps the word as text in the same footprint. */}
              <span className="flex items-center gap-1">
                Secured by<span className="auth-wordmark">Clerk</span>
              </span>
              <span className="auth-footer-pages flex">
                <Link to="/privacy" className="no-underline">Privacy</Link>
                <Link to="/terms" className="no-underline">Terms</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
