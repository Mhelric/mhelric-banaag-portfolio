export interface MobileSlideMeta {
  id: string
  label: string
}

interface MobileScrollRailProps {
  slides: MobileSlideMeta[]
  activeIndex: number
  visible: boolean
  onSelect: (index: number) => void
  onInteract: () => void
}

export function MobileScrollRail({
  slides,
  activeIndex,
  visible,
  onSelect,
  onInteract,
}: MobileScrollRailProps) {
  return (
    <nav
      aria-label="Section navigation"
      aria-hidden={!visible}
      className={`fixed top-1/2 right-2.5 z-50 -translate-y-1/2 transition-all duration-300 ease-out ${
        visible
          ? 'pointer-events-auto translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-6 opacity-0'
      }`}
    >
      <div className="flex flex-col items-end gap-1 rounded-2xl border border-border bg-surface/90 p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.18)] backdrop-blur-md dark:border-white/12 dark:bg-[#111216]/90 dark:shadow-[0_14px_36px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                onInteract()
                onSelect(idx)
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-right transition-all duration-200 ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              <span
                className={`font-mono text-[10px] tracking-wider uppercase ${
                  isActive ? 'font-bold text-accent' : 'font-medium'
                }`}
              >
                {slide.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-3.5 w-1.5 bg-accent shadow-[0_0_10px_rgba(79,140,255,0.7)]'
                    : 'h-1.5 w-1.5 bg-muted/40'
                }`}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
