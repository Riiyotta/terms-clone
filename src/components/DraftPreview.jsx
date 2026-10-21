import PreviewFrame from './PreviewFrame.jsx'
import { usePreviewTimeline, typed } from '../hooks/usePreviewTimeline.js'
import {
  Composer,
  Thinking,
  UserMessage,
  StreamingAnswer,
  Intro,
  SampleAgreements,
  DocumentToolbar,
  Paper,
  PaperTitle,
  DocumentSection,
  chatHeadingClass,
} from './PreviewParts.jsx'
import { AgreementIcon, CheckIcon } from './Icons.jsx'

// CLONE_SPEC 4. D = 20000, reduced-motion frame 16000.
const PROMPT = 'Draft a design agreement with Acme. $12,000, six weeks, 50% upfront.'
const ANSWER = [
  { text: 'I’ve drafted your agreement with a ' },
  { text: 'six-week timeline', strong: true },
  { text: ', a ' },
  { text: '$6,000 deposit', strong: true },
  { text: ', and a ' },
  { text: '$6,000 final payment', strong: true },
  { text: '. You can refine any section before sharing it.' },
]

const SECTIONS = [
  {
    at: 5600,
    heading: null,
    body: (
      <>
        This agreement is between <strong>Studio North</strong> (the Designer) and <strong>Acme</strong> (the Client).
      </>
    ),
  },
  {
    at: 6600,
    heading: '1. Scope of work',
    body: 'The Designer will create a visual identity and website design, including two rounds of revisions.',
  },
  {
    at: 7800,
    heading: '2. Fees and payment',
    body: (
      <>
        The total project fee is <strong>$12,000</strong>. A <strong>$6,000 deposit</strong> is due before work begins. The remaining{' '}
        <strong>$6,000</strong> is due on delivery.
      </>
    ),
  },
  {
    at: 9200,
    heading: '3. Timeline',
    body: (
      <>
        The project will be completed within <strong>six weeks</strong> of receiving the deposit and project materials.
      </>
    ),
  },
  {
    at: 10400,
    heading: '4. Ownership',
    body: 'Ownership of the final approved designs transfers to the Client when payment is complete.',
  },
]

export default function DraftPreview() {
  const timeline = usePreviewTimeline(20000, 16000)
  const t = timeline.time
  const sending = t >= 3400 && t < 3560
  const opened = t >= 3560
  const ready = t >= 11600
  const phase = timeline.resetting
    ? 'resetting'
    : ready
      ? 'ready'
      : t >= 5200
        ? 'drafting'
        : opened
          ? 'opening'
          : sending
            ? 'sending'
            : 'prompt'

  return (
    <PreviewFrame
      id="draft"
      label="Draft with AI"
      subtitle="Describe what you need. Turn a few details into a draft you can refine."
      description="A prompt becomes a design services agreement, with the conversation on the left and the draft on the right."
      timeline={timeline}
      phase={phase}
    >
      <div className="grid min-h-[calc(600px+2*var(--preview-padding))] lt760:min-h-[calc(940px+2*var(--preview-padding))] [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0">
        {/* Layer A: launch screen */}
        <div
          className="pv-launch m-auto flex w-full max-w-[calc(720px+2*var(--preview-padding))] flex-col justify-center gap-8 p-[var(--preview-padding)] lt760:my-10 lt760:self-start"
          data-show={!opened}
        >
          <Intro title="Start with what you need." body="A few details. A first draft." className="lt760:mb-2" />
          <Composer value={typed(PROMPT, t, 600, 32)} sending={sending} placeholder="Describe the agreement you need…" />
          <SampleAgreements visible={t >= 160} />
        </div>

        {/* Layer B: workspace */}
        <div className="pv-workspace grid grid-cols-[minmax(0,.9fr)_minmax(0,1.25fr)] lt760:grid-cols-[minmax(0,1fr)]" data-show={opened}>
          <div className="flex min-w-0 flex-col gap-6 p-[var(--preview-padding)] lt760:gap-5">
            <div className={chatHeadingClass}>Your conversation</div>
            <div className="flex flex-1 flex-col gap-6 lt760:gap-5">
              <UserMessage visible={t >= 3800} inDraft>
                {PROMPT}
              </UserMessage>
              <div className="pv-stack">
                <Thinking visible={t >= 4100 && t < 5200} label="Putting your draft together…" />
                <StreamingAnswer parts={ANSWER} time={t} start={5200} visible={t >= 5200} />
              </div>
              <div className="pv-reveal flex items-center gap-2 text-[13px] font-normal leading-[1.5] text-success" data-show={ready}>
                <CheckIcon />
                <span>Ready for your review</span>
              </div>
            </div>
            <Composer compact busy={!ready} placeholder="Make it yours. Ask for a change…" />
          </div>

          <div className="flex min-w-0 flex-col overflow-hidden border-l border-rule bg-white lt760:border-l-0 lt760:border-t">
            <DocumentToolbar>
              <span>
                <AgreementIcon />
                Your draft
              </span>
              <div className="pv-status-stack grid [&>span]:col-start-1 [&>span]:row-start-1 [&>span]:justify-self-end">
                <span data-show={!ready}>Drafting…</span>
                <span className="flex items-center gap-[6px] text-success" data-show={ready}>
                  <CheckIcon />
                  Saved
                </span>
              </div>
            </DocumentToolbar>
            <Paper>
              <PaperTitle className="pv-reveal" visible={t >= 5000} />
              {SECTIONS.map((s) => (
                <DocumentSection key={s.at} heading={s.heading} className="pv-reveal pv-document-section" visible={t >= s.at}>
                  {s.body}
                </DocumentSection>
              ))}
            </Paper>
            <div className="pv-reveal flex items-center justify-between gap-4 border-t border-hairline p-4 text-[12px] text-grey-888" data-show={ready}>
              <span>Your draft is ready.</span>
              <button type="button" tabIndex={-1} className="action-button action-button--secondary action-button--compact">
                Review draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  )
}
