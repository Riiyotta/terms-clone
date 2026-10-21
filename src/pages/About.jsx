import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroHeadline from '../components/HeroHeadline.jsx'
import LandingIntro from '../components/LandingIntro.jsx'
import PhotoStack from '../components/PhotoStack.jsx'
import RichText from '../components/RichText.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { headline, intro, safety, tableHead, rows } from '../content/about.js'

const LINES = headline.map((text) => ({ brand: false, segments: [{ text }] }))

// CLONE_SPEC_PAGES 1. Shell A (dark hero). Mobile top padding is 64 (measured h1 y148 / main 321.5), not the 72 stated in the prose.
export default function About() {
  usePageTitle('About — Terms')
  return (
    <div className="landing landing--wide landing--home">
      <Navbar shell="dark" current="/about" />
      <main className="landing-hero landing-hero--about landing-col flex flex-col items-start gap-16 pb-20 pt-[150px] text-left lt600:gap-8 lt600:pb-14 lt600:pt-16">
        <HeroHeadline lines={LINES} />
        <LandingIntro lead={intro.lead} rest={intro.rest} />
      </main>
      <section className="landing-col">
        <PhotoStack />
      </section>
      <section className="landing-section landing-col flex flex-col items-start gap-12 pt-14">
        <p id="safety" className="landing-prose landing-safety max-w-[560px] self-center text-center">
          <strong className="font-medium text-ink">
            <RichText text={safety.lead} />
          </strong>{' '}
          <span className="landing-prose-muted font-normal text-prose-muted [&_a]:font-medium [&_a]:text-ink">
            <RichText text={safety.rest} />
          </span>
        </p>
        <table className="landing-table">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              {tableHead.map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>
                  <RichText text={row.body} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  )
}
