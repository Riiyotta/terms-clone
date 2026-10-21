import { Link } from 'react-router-dom'
import { LogoMark } from './Icons.jsx'
import SmartLink from './SmartLink.jsx'

// CLONE_SPEC 7 + CLONE_SPEC_PAGES 0/8: the Changelog link only appears on the home footer.
const GROUPS = [
  {
    label: 'Product',
    links: [
      ['Sign up', '/sign-up'],
      ['Login', '/sign-in'],
      ['Pricing', '/pricing'],
      ['API docs', '/docs'],
      ['Changelog', '/changelog'],
    ],
  },
  {
    label: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', 'mailto:support@terms.so'],
      ['Privacy Policy', '/privacy'],
      ['Terms of Service', '/terms'],
    ],
  },
]

export default function Footer({ showChangelog = false }) {
  return (
    <footer className="landing-footer landing-col grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] items-start gap-12 py-24 lt600:grid-cols-[1fr_1fr] lt600:gap-x-6 lt600:gap-y-10 lt600:py-14">
      <div className="landing-footer-brand flex max-w-[360px] flex-col items-start gap-5 lt600:col-span-full">
        <Link to="/" className="flex text-accent" aria-label="Terms">
          <LogoMark />
        </Link>
        <p className="landing-footer-description text-[12px] font-normal leading-[1.5] text-prose-muted">
          Terms is a minimal document signing tool. Contracts are markdown you write and edit in the browser; counterparties open a secure link,
          highlight text to comment inline, and sign with a typed e-signature. When the last signer signs, the document locks and a certificate of
          completion records the audit trail.
        </p>
      </div>
      {GROUPS.map((group) => (
        <nav key={group.label} className="landing-footer-group flex flex-col gap-4" aria-label={group.label}>
          <h2 className="text-[12px] font-medium leading-[1.35] tracking-[-.01em] text-prose-muted">{group.label}</h2>
          <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
            {group.links.filter(([label]) => showChangelog || label !== 'Changelog').map(([label, href]) => (
              <li key={label}>
                <SmartLink href={href} className="footer-link inline-block text-[14px] font-medium leading-[1.35] text-ink no-underline">
                  {label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </footer>
  )
}
