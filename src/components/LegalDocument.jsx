import { Link, useLocation } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import RichText from './RichText.jsx'

// CLONE_SPEC_PAGES 5. Shared by /privacy and /terms (app shell D, no landing nav/footer, no motion).
const H2 = 'm-0 text-[24px] font-medium leading-[1.2] tracking-heading'
const TEXT = 'text-[16px] font-normal leading-[24px]'
const NAV = [
  ['Privacy Policy', '/privacy'],
  ['Terms of Service', '/terms'],
]

function Block({ block }) {
  if (block.type === 'ul') {
    return (
      <ul className={TEXT}>
        {block.items.map((item, i) => (
          <li key={i}><RichText text={item} /></li>
        ))}
      </ul>
    )
  }
  return <p className={TEXT}><RichText text={block.text} /></p>
}

export default function LegalDocument({ doc }) {
  const { pathname } = useLocation()
  return (
    <div className="app-shell flex flex-1 flex-col bg-white text-black">
      <AppHeader />
      <main id="top" className="pb-24 pt-12">
        <div className="legal-document mx-auto flex max-w-[768px] flex-col gap-8 px-6 [overflow-wrap:anywhere]">
          <nav className="legal-nav flex flex-wrap gap-4 text-[16px] leading-[24px]" aria-label="Legal">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="font-normal"
              >
                {label}
              </Link>
            ))}
          </nav>
          <header className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-medium leading-[1.15] tracking-title">{doc.title}</h1>
              <p className="small muted text-[14px] font-normal leading-[21px] text-grey-666">
                Last updated <time dateTime={doc.updated.iso}>{doc.updated.label}</time>
              </p>
            </div>
            <p className={TEXT}>{doc.intro}</p>
          </header>
          <nav className="callout legal-toc flex flex-col gap-4 rounded-thread bg-white p-6" aria-labelledby="contents-heading">
            <h2 id="contents-heading" className={H2}>On this page</h2>
            <ol className={TEXT}>
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="flex flex-col gap-8">
            {doc.sections.map((s, n) => (
              <section key={s.id} id={s.id} className="legal-section flex flex-col gap-4" aria-labelledby={`${s.id}-heading`}>
                <h2 id={`${s.id}-heading`} className={H2}>{`${n + 1}. ${s.title}`}</h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}
          </article>
          <footer className="small muted legal-footer flex flex-wrap gap-4 border-t border-hairline pt-6 text-[14px] font-normal leading-[21px] text-grey-666">
            <p className="mr-auto">
              Questions? <a href="mailto:support@terms.so">support@terms.so</a>
            </p>
            <a href="#top">Back to top</a>
            <Link to="/">Terms home</Link>
          </footer>
        </div>
      </main>
    </div>
  )
}
