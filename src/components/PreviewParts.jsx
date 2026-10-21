// Shared sub-components for the demo cards (CLONE_SPEC 3c / 3d).
import { useRef } from 'react'
import { AttachIcon, SendArrowIcon } from './Icons.jsx'

/* Composer ----------------------------------------------------------- */
export function Composer({ value = '', sending = false, busy = false, compact = false, placeholder }) {
  const canSend = value.length > 0 && !busy
  const fileInput = useRef(null)
  return (
    <div className="pv-composer min-w-0" data-sending={sending}>
      <form className="home-composer w-full overflow-hidden rounded-composer bg-white shadow-composer" onSubmit={(e) => e.preventDefault()}>
        <textarea
          readOnly
          tabIndex={-1}
          rows={compact ? 2 : undefined}
          value={value}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`block h-[80px] min-h-[60px] w-full resize-none border-0 bg-transparent text-[16px] leading-[1.25] tracking-normal text-black outline-none ${
            compact ? 'p-[18px] font-normal lt480:p-5' : 'px-6 pb-[18px] pt-[22px] font-medium lt480:p-5'
          }`}
        />
        <div className="flex items-center justify-between gap-3 p-3">
          <input ref={fileInput} type="file" tabIndex={-1} hidden />
          <button type="button" tabIndex={-1} disabled={busy} onClick={() => fileInput.current?.click()} className="action-button action-button--secondary action-button--compact">
            <AttachIcon />
            <span>Attach a file</span>
          </button>
          <button
            type="submit"
            tabIndex={-1}
            disabled={!canSend}
            className={`action-button action-button--compact home-send-button ${canSend ? 'action-button--primary' : 'action-button--secondary'}`}
          >
            <span>Enter</span>
            <SendArrowIcon />
          </button>
        </div>
      </form>
    </div>
  )
}

/* Thinking indicator --------------------------------------------------- */
const DOT_DELAYS = [0, 90, 180, 90, 180, 270, 180, 270, 360] // (row + col) * 90ms

export function DotGrid() {
  return (
    <span className="home-opening-dots grid grid-cols-[repeat(3,4px)] gap-[3px] py-1" aria-hidden="true">
      {DOT_DELAYS.map((d, i) => (
        <span key={i} style={{ '--dot-delay': `${d}ms` }} />
      ))}
    </span>
  )
}

export function Thinking({ visible, label }) {
  return (
    <div className="pv-thinking pv-reveal flex items-center gap-[10px] text-[13px] font-normal leading-[1.5] text-grey-888" data-show={visible}>
      <DotGrid />
      {label && <span>{label}</span>}
    </div>
  )
}

/* Messages -------------------------------------------------------------- */
const chatText = 'home-chat-text flex flex-col gap-[.6em] text-[15px] font-normal leading-[1.6] text-grey-666 [&_p]:whitespace-pre-wrap'

export function UserMessage({ visible, children, inDraft = false }) {
  return (
    <div
      className={`home-message home-message--user pv-question self-end rounded-composer bg-white shadow-composer ${
        inDraft ? 'max-w-full p-4' : 'max-w-[calc(95%-8px)] px-4 pb-[14px] pt-3'
      }`}
      data-show={visible}
    >
      <div className={chatText}>
        <p>
          <strong>{children}</strong>
        </p>
      </div>
    </div>
  )
}

export function RichText({ parts, characters = Infinity }) {
  let used = 0
  return parts.map((part, i) => {
    const text = part.text.slice(0, Math.max(0, characters - used))
    used += part.text.length
    return part.strong ? <strong key={i}>{text}</strong> : <span key={i}>{text}</span>
  })
}

// Two stacked copies: hidden full text reserves final height; visible copy streams at 22ms/char.
export function StreamingAnswer({ parts, time, start, visible }) {
  return (
    <div className="home-message home-message--assistant py-1 pl-0 pr-1">
      <div className="pv-stack pv-reveal" data-show={visible}>
        <div className={`${chatText} pv-measure`}>
          <p>
            <RichText parts={parts} />
          </p>
        </div>
        <div className={chatText}>
          <p>
            <RichText parts={parts} characters={Math.max(0, Math.floor((time - start) / 22))} />
          </p>
        </div>
      </div>
    </div>
  )
}

/* Intro ------------------------------------------------------------------ */
export function Intro({ title, body, className = '', visible }) {
  return (
    <div className={`text-center ${className}`} data-show={visible}>
      <h3 className="m-0 text-[clamp(24px,3vw,32px)] font-medium leading-[1.15] tracking-title text-black">{title}</h3>
      <p className="mt-4 text-[15px] font-normal leading-[1.5] text-grey-444">{body}</p>
    </div>
  )
}

/* Sample agreements -------------------------------------------------------- */
const AGREEMENTS = [
  { title: 'Acme — Consulting agreement', date: 'September 24, 2026', status: 'Signed', tone: 'bg-status-signed-bg text-status-signed' },
  { title: 'Studio North — Design services', date: 'September 22, 2026', status: 'Awaiting counterparty', tone: 'bg-status-waiting-bg text-status-waiting' },
  { title: 'Mutual non-disclosure agreement', date: 'September 18, 2026', status: 'Draft', tone: 'bg-status-draft-bg text-status-draft' },
]

export function SampleAgreements({ visible }) {
  return (
    <section className="dashboard-recents pv-recents m-0 flex flex-col gap-6 p-0" data-show={visible}>
      <h3 className="m-0 text-[13px] font-normal leading-[1.35] tracking-small text-grey-999">Recent contracts:</h3>
      <div className="dashboard-contracts flex flex-col gap-6">
        {AGREEMENTS.map((a) => (
          <div key={a.title} className="dashboard-contract pv-agreement flex items-start gap-3 lt760:flex-wrap lt760:items-center lt480:gap-[10px]">
            <div className="dashboard-contract-copy flex min-w-0 flex-1 flex-col gap-2 lt760:basis-full">
              <span className="text-[16px] font-medium leading-[1.15] text-black-60 lt800:text-[15px]">{a.title}</span>
              <span className="text-[13px] font-normal leading-[1.35] text-black-30">{a.date}</span>
            </div>
            <span className={`inline-flex h-9 flex-none items-center rounded-pill px-4 text-[13px] font-medium leading-[1.2] ${a.tone}`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Document pieces ------------------------------------------------------------ */
export const chatHeadingClass = 'flex items-center justify-between gap-3 text-[13px] font-normal leading-[1.4] text-grey-888'

export function DocumentToolbar({ children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline p-4 text-[12px] font-normal leading-[1.5] text-grey-888 lt760:p-3 [&>span]:flex [&>span]:items-center [&>span]:gap-[6px]">
      {children}
    </div>
  )
}

export function Paper({ className = '', children }) {
  return (
    <article
      className={`contract max-w-[68ch] flex-1 p-8 text-[14px] font-normal leading-[1.55] text-grey-555 lt1000:p-6 lt760:p-5 ${className}`}
    >
      {children}
    </article>
  )
}

export function PaperTitle({ className = '', visible }) {
  return (
    <div className={`mb-7 ${className}`} data-show={visible}>
      <h3 className="m-0 text-[24px] font-medium leading-[1.2] tracking-heading text-black lt760:text-[22px]">Design services agreement</h3>
      <p className="mt-2 text-[12px] text-grey-999">Studio North &amp; Acme</p>
    </div>
  )
}

export function DocumentSection({ heading, className = '', visible, children }) {
  return (
    <div className={`mt-5 [&_strong]:text-ink ${className}`} data-show={visible}>
      {heading && <h4 className="m-0 mb-[6px] text-[14px] font-medium leading-[1.4] tracking-small text-ink">{heading}</h4>}
      <p className="m-0">{children}</p>
    </div>
  )
}
