import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { COMMIT_BASE, intro, note, releases } from '../content/changelog.js'

// CLONE_SPEC_PAGES 3. Shell B (light wide, 1152 col). No motion, no sticky elements.
export default function Changelog() {
  usePageTitle('Changelog — Terms')
  return (
    <div className="landing landing--wide">
      <Navbar shell="wide" />
      <main className="changelog-main landing-col pb-24 pt-12 text-ink">
        <header className="changelog-header flex flex-col items-center gap-6 py-24 text-center lt600:py-16">
          <h1 className="text-[36px] font-medium leading-[1.15] tracking-title text-black [text-wrap:balance]">Changelog</h1>
          <p className="max-w-[560px] text-[16px] font-normal leading-[24px] text-changelog-muted">{intro}</p>
        </header>
        <div className="changelog-releases mx-auto w-full max-w-[880px]">
          {releases.map((release) => (
            <section
              key={release.date}
              className="changelog-release grid grid-cols-[176px_minmax(0,1fr)] gap-12 border-t-[.75px] border-solid border-surface-border py-10 lt600:grid-cols-[minmax(0,1fr)] lt600:gap-6 lt600:py-8"
              aria-labelledby={`release-${release.date}`}
            >
              <h2 id={`release-${release.date}`} className="changelog-date text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-changelog-muted">
                <time dateTime={release.date}>{release.label}</time>
              </h2>
              <ul className="changelog-announcements m-0 flex list-none flex-col gap-7 p-0">
                {release.entries.map((entry, i) => (
                  <li key={i} className="changelog-announcement">
                    <p className="text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-changelog-muted">
                      <strong className="font-medium text-black">{entry.title}</strong> {entry.body}
                    </p>
                    <div className="changelog-commits mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {entry.commits.map((sha) => (
                        <a
                          key={sha}
                          href={COMMIT_BASE + sha}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View commit ${sha} for ${entry.title}`}
                          className="changelog-commit py-1 text-[12px] font-normal leading-[18px] text-changelog-muted no-underline"
                        >
                          <span aria-hidden="true">↗ </span>
                          {sha}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="changelog-note mt-2 text-[12px] font-normal leading-[18px] text-changelog-muted">{note}</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
