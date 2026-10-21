import PreviewFrame from './PreviewFrame.jsx'
import { usePreviewTimeline, typed } from '../hooks/usePreviewTimeline.js'
import { Composer, Thinking, UserMessage, StreamingAnswer, Intro } from './PreviewParts.jsx'
import { AgreementIcon } from './Icons.jsx'

// CLONE_SPEC 5. D = 16000, reduced-motion frame 12000.
const QUESTION = 'When does our agreement with Acme renew?'
const ANSWER = [
  { text: 'Your agreement with Acme renews on ' },
  { text: 'December 1', strong: true },
  { text: '. It renews for ' },
  { text: 'another year', strong: true },
  { text: ' unless either party gives ' },
  { text: '30 days’ notice', strong: true },
  { text: '.' },
]

export default function QuestionsPreview() {
  const timeline = usePreviewTimeline(16000, 12000)
  const t = timeline.time
  const sending = t >= 3000 && t < 3160
  const sent = t >= 3160
  const answering = t >= 4560
  const complete = t >= 7800
  const phase = timeline.resetting
    ? 'resetting'
    : complete
      ? 'complete'
      : answering
        ? 'answering'
        : sent
          ? 'thinking'
          : sending
            ? 'sending'
            : 'prompt'

  return (
    <PreviewFrame
      id="questions"
      label="Ask your contracts"
      subtitle="Find dates, details, and answers in your agreements, with the source at hand."
      description="Terms answers a question about an existing agreement and shows the clause supporting its answer."
      timeline={timeline}
      phase={phase}
    >
      <div
        className="pv-question-workspace mx-auto flex min-h-[calc(600px+2*var(--preview-padding))] max-w-[calc(720px+2*var(--preview-padding))] flex-col p-[var(--preview-padding)]"
        data-sent={sent}
      >
        <div className="grid min-h-[290px] flex-1 items-center pb-8 lt760:min-h-[390px] [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0">
          <Intro
            className="pv-reveal"
            visible={t < 3000}
            title="Your agreements have answers."
            body="Ask a question. Get straight to the relevant clause."
          />
          <div className="flex flex-col gap-6 self-start">
            <UserMessage visible={sent}>{QUESTION}</UserMessage>
            <div className="pv-stack">
              <Thinking visible={sent && !answering} label="Reading your agreement…" />
              <StreamingAnswer parts={ANSWER} time={t} start={4560} visible={answering} />
            </div>
            <div
              className="pv-reveal flex aspect-square w-[min(248px,100%)] flex-col gap-5 self-start rounded-citation bg-white p-5 text-[13px] font-normal leading-[1.5] text-grey-555 shadow-card"
              data-show={complete}
            >
              <div className="flex items-start gap-3">
                <AgreementIcon size={20} className="flex-none text-grey-888" />
                <div>
                  <h4 className="m-0 text-[16px] font-medium leading-[1.35] text-black">Consulting agreement</h4>
                  <p className="mt-1 text-[12px] leading-[1.5] text-grey-888">Acme · Section 4</p>
                </div>
              </div>
              <blockquote className="m-0 mt-auto">
                “This agreement renews on <strong>December 1</strong> for successive one-year terms, unless either party gives{' '}
                <strong>30 days’ written notice</strong>.”
              </blockquote>
            </div>
          </div>
        </div>
        <div className="pv-question-composer flex-none">
          <Composer
            value={sent ? '' : typed(QUESTION, t, 600, 35)}
            sending={sending}
            busy={sent && !answering}
            placeholder="Ask about an agreement…"
          />
        </div>
      </div>
    </PreviewFrame>
  )
}
