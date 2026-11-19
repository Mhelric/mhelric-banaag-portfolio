import { useEffect, type ReactNode } from 'react'

interface MobileBottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

export function MobileBottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
}: MobileBottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_0.18s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[86svh] w-full flex-col rounded-t-3xl border-t border-border bg-surface shadow-[0_-20px_50px_rgba(0,0,0,0.45)] dark:border-white/12 dark:bg-[#111216] animate-[sheetUp_0.26s_cubic-bezier(0.22,1,0.36,1)]"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <span
            aria-hidden="true"
            className="h-1 w-10 rounded-full bg-border dark:bg-white/20"
          />
        </div>

        {/* Sheet Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 pt-1.5 pb-3 dark:border-white/10">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {subtitle}
              </p>
            )}
            <h3 className="mt-0.5 truncate text-base font-bold tracking-tight text-text">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-muted transition-colors hover:text-text"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Sheet Body */}
        <div className="overflow-y-auto overscroll-contain px-5 pt-4 pb-2">
          {children}
        </div>
      </div>
    </div>
  )
}
