import PreviewFrame from './PreviewFrame.jsx'
import { usePreviewTimeline, typed } from '../hooks/usePreviewTimeline.js'
import { Thinking, DocumentToolbar, Paper, PaperTitle, DocumentSection, chatHeadingClass } from './PreviewParts.jsx'
import { ArrowUpIcon, CheckIcon, CommentIcon } from './Icons.jsx'

// CLONE_SPEC 6. D = 21000, reduced-motion frame 17000.
const COMMENT = 'Could we make this net 30? That matches our payment cycle.'
const REPLY = 'Of course. I’ve updated the payment terms to 30 days.'
const CLAUSE = 'The remaining balance is payable within 14 days of delivery.'

const cardClass =
  'pv-reveal overflow-hidden rounded-thread bg-white p-[var(--card-padding)] text-[14px] leading-[1.5] shadow-selection [--card-padding:20px] lt760:[--card-padding:16px]'

function CardRail() {
  return (
    <div
      className="home-composer-rail -mx-[var(--card-padding)] -mt-[var(--card-padding)] mb-[var(--card-padding)] border-b border-selection-rule bg-selection-bg"
      data-tone="selection"
    >
      <div className="flex h-[41px] items-center gap-2 pb-0 pl-[var(--card-padding)] pr-2 pt-px">
        <span className="flex-1 whitespace-nowrap text-[11px] font-medium uppercase leading-none tracking-[.04em] text-ink">Selected section · 2. Fees and payment</span>
      </div>
      <div className="pv-rail-body px-[var(--card-padding)] pb-3">
        <p className="text-[13px] font-normal leading-[1.4] text-grey-666">{CLAUSE}</p>
      </div>
    </div>
  )
}

function ThreadMeta({ name, org }) {
  return (
    <div className="thread-meta mb-2 flex items-baseline justify-between gap-2 text-[12px] leading-[1.5]">
      <strong className="font-medium text-black">
        {name} <span className="font-normal text-grey-999">{org}</span>
      </strong>
      <span className="font-normal text-grey-999">Just now</span>
    </div>
  )
}

export default function CommentsPreview() {
  const timeline = usePreviewTimeline(21000, 17000)
  const t = timeline.time
  const selected = t >= 2000
  const composing = t >= 2600 && t < 5200
  const commented = t >= 5200
  const replying = t >= 7600
  const updated = t >= 10400
  const resolvePressed = t >= 13000 && t < 13160
  const resolved = t >= 13160
  const phase = timeline.resetting
    ? 'resetting'
    : resolved
      ? 'resolved'
      : updated
        ? 'updated'
        : replying
          ? 'replying'
          : commented
            ? 'commented'
            : composing
              ? 'composing'
              : selected
                ? 'selected'
                : 'reading'

  return (
    <PreviewFrame
      id="comments"
      label="Comment on contracts"
      subtitle="Discuss a clause, agree on a change, and resolve it right in the contract."
      description="A clause is selected, Alex requests a change, Sam replies, the payment term changes from 14 to 30 days, and the comment is resolved."
      timeline={timeline}
      phase={phase}
    >
      <div className="grid min-h-[calc(600px+2*var(--preview-padding))] grid-cols-[minmax(0,1.25fr)_minmax(0,.9fr)] lt760:grid-cols-[minmax(0,1fr)]">
        {/* Document */}
        <div className="min-w-0 border-r border-rule bg-white lt760:border-b lt760:border-r-0">
          <DocumentToolbar>
            <span>Design services agreement</span>
            <span className="pv-reveal text-success lt760:text-[11px]" data-show={updated}>
              <CheckIcon />
              Changes saved
            </span>
          </DocumentToolbar>
          <Paper className="overflow-visible">
            <PaperTitle />
            <DocumentSection heading="1. Scope of work">
              The Designer will create a visual identity and website design, including two rounds of revisions.
            </DocumentSection>
            <div className="mt-5 [&_strong]:text-ink">
              <h4 className="m-0 mb-[6px] text-[14px] font-medium leading-[1.4] tracking-small text-ink">2. Fees and payment</h4>
              <p className="m-0">
                The total project fee is <strong>$12,000</strong>. A <strong>$6,000 deposit</strong> is due before work begins.
              </p>
              <div className="pv-clause relative mt-3" data-selected={selected} data-updated={updated}>
                <div className="pv-clause-highlight absolute -inset-[6px] rounded-chip bg-selection-bg" />
                <div className="relative">
                  The remaining balance is payable within{' '}
                  <span className="pv-changed-term inline-grid font-medium text-black">
                    <span data-show={!updated}>14 days</span>
                    <span data-show={updated}>30 days</span>
                  </span>{' '}
                  of delivery.
                </div>
                <span
                  className="pv-clause-marker pv-reveal absolute right-[-25px] top-0 grid h-6 w-6 place-items-center rounded-[50%] bg-selection-rule text-selection-marker lt1000:right-[-20px] lt760:right-[-16px] lt760:h-5 lt760:w-5"
                  data-show={selected}
                >
                  <span data-show={!resolved}>
                    <CommentIcon />
                  </span>
                  <span data-show={resolved}>
                    <CheckIcon />
                  </span>
                </span>
                <span className="pv-demo-cursor" data-show={t >= 800 && t < 3000} data-arrived={t >= 1600} aria-hidden="true" />
              </div>
            </div>
            <DocumentSection heading="3. Timeline">
              The project will be completed within <strong>six weeks</strong> of receiving the deposit and project materials.
            </DocumentSection>
            <DocumentSection heading="4. Ownership">
              Ownership of the final approved designs transfers to the Client when payment is complete.
            </DocumentSection>
          </Paper>
        </div>

        {/* Comments sidebar */}
        <div className="min-w-0 p-[var(--preview-padding)]">
          <div className={chatHeadingClass}>
            <span>Comments</span>
            <span className="pv-comment-count text-[12px] text-grey-999" data-show={commented && !resolved}>
              1 open
            </span>
          </div>
          <div className="mt-6 grid [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0 [&>*]:self-start">
            {/* 1. Empty state */}
            <div
              className="pv-reveal flex min-h-[360px] flex-col items-center justify-center gap-4 text-center text-[14px] font-normal leading-[1.5] text-grey-aaa lt760:min-h-[300px]"
              data-show={t < 2600}
            >
              <CommentIcon size={24} />
              <p className="m-0">
                Select a clause.
                <br />
                Keep the conversation right here.
              </p>
            </div>

            {/* 2. Compose card */}
            <div className={cardClass} data-show={composing} inert="">
              <CardRail />
              <textarea
                readOnly
                tabIndex={-1}
                aria-label="Example comment"
                value={typed(COMMENT, t, 3000, 27)}
                placeholder="Leave a comment…"
                className="inline-block min-h-[112px] w-full resize-none rounded-thread border border-hairline bg-grey-fa p-3 text-[16px] font-normal leading-[1.5] tracking-normal text-black shadow-none outline-none"
              />
              <div className="mt-4 flex items-center justify-between gap-2 text-[12px] text-grey-999">
                <span>Alex Acme</span>
                <button
                  type="button"
                  tabIndex={-1}
                  className="action-button action-button--primary action-button--compact"
                  data-pressed={t >= 5040 && t < 5200}
                >
                  Comment
                  <ArrowUpIcon />
                </button>
              </div>
            </div>

            {/* 3. Thread card */}
            <div className={`thread ${cardClass}`} data-show={commented} data-resolved={resolved}>
              <CardRail />
              <ThreadMeta name="Alex" org="Acme" />
              <div className="thread-body text-[14px] leading-[1.5] text-grey-444">{COMMENT}</div>
              <div className="pv-stack mt-5 items-stretch">
                <Thinking visible={t >= 6400 && !replying} label="Sam is replying…" />
                <div className="reply pv-reveal m-0 border-t border-hairline pt-4" data-show={replying}>
                  <ThreadMeta name="Sam" org="Studio North" />
                  <div className="pv-stack">
                    <div className="thread-body pv-measure text-[14px] leading-[1.5] text-grey-444">{REPLY}</div>
                    <div className="thread-body text-[14px] leading-[1.5] text-grey-444">{typed(REPLY, t, 7600, 24)}</div>
                  </div>
                </div>
              </div>
              <div className="pv-reveal mt-5 flex items-center gap-2 text-[12px] text-success [&_strong]:!text-inherit" data-show={updated}>
                <CheckIcon />
                <span>
                  Payment terms updated to <strong>30 days</strong>.
                </span>
              </div>
              <div className="pv-resolve-stack mt-5 grid min-h-[36px] items-center [&>*]:col-start-1 [&>*]:row-start-1" inert="">
                <div data-show={commented && !resolved}>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="action-button action-button--secondary action-button--compact"
                    data-pressed={resolvePressed}
                  >
                    <CheckIcon />
                    Resolve
                  </button>
                </div>
                <div className="flex items-center gap-[6px] text-[13px] font-medium text-success" data-show={resolved}>
                  <CheckIcon />
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  )
}
