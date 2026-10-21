import { Fragment } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import RichText from '../components/RichText.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { header, sections } from '../content/docs.js'

// CLONE_SPEC_PAGES 4. Shell C (light narrow, 720 col). Single column; no sidebar/TOC/sticky/copy buttons.
const H2 = 'text-[24px] font-medium leading-[1.2] tracking-heading'
const H3 = 'text-[18.72px] font-medium leading-[1.2] tracking-heading'
const TEXT = 'text-[16px] leading-[24px] tracking-[-0.01em]'

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className={TEXT}><RichText text={block.text} /></p>
    case 'pre':
      return <pre>{block.text}</pre>
    case 'ol':
    case 'ul': {
      const List = block.type
      return (
        <List className={`flex flex-col gap-3 ${TEXT}`}>
          {block.items.map((item, i) => (
            <li key={i}><RichText text={item} /></li>
          ))}
        </List>
      )
    }
    case 'h3':
      return <h3 id={block.id} className={H3}>{block.text}</h3>
    case 'cards':
      return block.items.map((card) => (
        <div key={card.route} className="connector-card flex flex-col gap-3">
          <h3 className={H3}>{card.title}</h3>
          <code>{card.route}</code>
          <p className={TEXT}><RichText text={card.text} /></p>
        </div>
      ))
    case 'contractDemo':
      return (
        <article className="contract connector-card">
          <p>First line<br />Second line</p>
          <p>New paragraph.</p>
        </article>
      )
    default:
      return null
  }
}

export default function Docs() {
  usePageTitle('API reference — Terms')
  return (
    <div className="landing">
      <Navbar shell="narrow" />
      <main className="landing-col connector-guide my-16 flex flex-col gap-8 pb-24 pt-12 font-normal leading-[1.5] text-ink [overflow-wrap:anywhere]">
        <header className="flex flex-col gap-4">
          <h1 className="text-[32px] font-medium leading-[1.15] tracking-title">{header.title}</h1>
          <p className={TEXT}>{header.intro}</p>
          <p className={TEXT}>
            {header.links.map(([label, href], i) => (
              <Fragment key={href}>
                {i > 0 && ' · '}
                <SmartLink href={href}>{label}</SmartLink>
              </Fragment>
            ))}
          </p>
        </header>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="flex flex-col gap-4">
            <h2 className={H2}>{section.title}</h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
