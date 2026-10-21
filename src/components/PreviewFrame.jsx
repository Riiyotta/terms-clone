import Squircle from './Squircle.jsx'
import { PauseIcon, PlayIcon } from './Icons.jsx'

// Shared card frame for the three demos (CLONE_SPEC 3a).
export default function PreviewFrame({ id, label, subtitle, description, timeline, phase, children }) {
  const { ref, running, loopState, paused, togglePaused } = timeline
  return (
    <section
      ref={ref}
      id={id}
      className="pv-feature scroll-mt-0"
      aria-labelledby={`preview-${id}`}
      data-preview={id}
      data-phase={phase}
      data-running={running}
      data-paused={paused}
    >
      <Squircle radius={24} smoothing={0.6} className="min-w-0">
        <header
          className="relative z-[1] grid min-h-[144px] grid-cols-[minmax(0,1fr)_auto] content-center gap-x-6 gap-y-1 border-b border-hairline p-[calc(var(--preview-padding)+.75px)] lt760:gap-x-4"
        >
          <h3 id={`preview-${id}`} className="col-start-1 m-0 text-[18px] font-medium leading-[1.5] tracking-small text-ink">
            {label}
          </h3>
          <p className="col-start-1 m-0 max-w-[720px] text-[18px] font-normal leading-[1.5] text-grey-777">{subtitle}</p>
          <button
            type="button"
            className="action-button action-button--secondary action-button--compact row-span-2 row-start-1 col-start-2 h-9 w-9 self-start !p-0 lt760:h-11 lt760:min-h-[44px] lt760:w-11"
            onClick={togglePaused}
            aria-label={`${paused ? 'Resume' : 'Pause'} ${label} animation`}
            aria-controls={`preview-${id}-animation`}
            title={paused ? 'Resume animation' : 'Pause animation'}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </header>
        <p className="sr-only">{description} This is an animated example with sample agreements.</p>
        <div className="pv-preview min-w-0 overflow-hidden bg-white text-[16px] font-normal leading-[1.5] text-grey-444">
          <div id={`preview-${id}-animation`} className="pv-loop" data-loop-state={loopState} aria-hidden="true">
            {children}
          </div>
        </div>
      </Squircle>
    </section>
  )
}
