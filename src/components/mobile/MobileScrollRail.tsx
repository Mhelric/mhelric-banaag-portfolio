import type { ReactNode } from 'react'

export interface MobileSlideMeta {
  id: string
  label: string
  icon: ReactNode
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
      <div className="flex flex-col items-center gap-1 rounded-full border border-border bg-surface/90 p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.18)] backdrop-blur-md dark:border-white/12 dark:bg-[#111216]/90 dark:shadow-[0_14px_36px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
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
              aria-label={slide.label}
              title={slide.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-white shadow-[0_0_14px_rgba(79,140,255,0.55)] scale-105'
                  : 'text-muted hover:bg-black/5 hover:text-text dark:hover:bg-white/10 dark:hover:text-white'
              }`}
            >
              {slide.icon}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
