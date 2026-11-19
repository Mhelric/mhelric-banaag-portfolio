export interface MobileSlideMeta {
  id: string
  label: string
}

interface MobileBottomPillProps {
  slides: MobileSlideMeta[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function MobileBottomPill({
  slides,
  activeIndex,
  onSelect,
}: MobileBottomPillProps) {
  const activeSlide = slides[activeIndex] ?? slides[0]

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-3"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-surface/90 px-3.5 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-md dark:border-white/12 dark:bg-[#111216]/88 dark:shadow-[0_14px_36px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
        <span className="min-w-[66px] font-mono text-[11px] font-semibold tracking-wider text-text uppercase">
          {activeSlide.label}
        </span>

        <span
          aria-hidden="true"
          className="h-3.5 w-px bg-border dark:bg-white/15"
        />

        <div className="flex items-center gap-1.5" role="tablist">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to ${slide.label}`}
                onClick={() => onSelect(idx)}
                className="flex h-6 items-center justify-center px-0.5 focus:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-5 bg-accent shadow-[0_0_10px_rgba(79,140,255,0.6)]'
                      : 'w-1.5 bg-muted/45 hover:bg-muted'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
