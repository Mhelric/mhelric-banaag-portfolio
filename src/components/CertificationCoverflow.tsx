import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import type { Certification } from '../data/certifications'

interface CertificationCoverflowProps {
  items: Certification[]
  onSelectCert: (cert: Certification) => void
}

const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length

export function CertificationCoverflow({
  items,
  onSelectCert,
}: CertificationCoverflowProps) {
  const [virtualIndex, setVirtualIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [stageWidth, setStageWidth] = useState(960)

  const stageRef = useRef<HTMLDivElement | null>(null)
  const pointerRef = useRef<{
    x: number
    y: number
    time: number
    horizontal: boolean
  } | null>(null)
  const suppressClickUntilRef = useRef(0)
  const headingId = useId()

  const total = items.length
  const activeIndex = total > 0 ? wrapIndex(virtualIndex, total) : 0
  const activeCert = items[activeIndex]

  const cardWidth = Math.min(360, Math.max(230, stageWidth * 0.48))
  const stepX = cardWidth * 0.72
  const leftVisible = Math.min(2, Math.floor((total - 1) / 2))
  const rightVisible = Math.min(2, Math.ceil((total - 1) / 2))

  const visibleSlots =
    total > 1
      ? Array.from(
          { length: leftVisible + rightVisible + 3 },
          (_, i) => virtualIndex + i - leftVisible - 1,
        )
      : [virtualIndex]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setStageWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (
      !isPlaying ||
      prefersReducedMotion ||
      isDragging ||
      isHovered ||
      isFocused ||
      total < 2
    ) {
      return
    }

    const timer = window.setTimeout(() => {
      setVirtualIndex((prev) => prev + 1)
    }, 4500)
    return () => window.clearTimeout(timer)
  }, [isPlaying, prefersReducedMotion, isDragging, isHovered, isFocused, total, virtualIndex])

  const goToVirtual = useCallback((next: number) => {
    setVirtualIndex(next)
    setDragOffset(0)
  }, [])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return
    pointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      horizontal: false,
    }
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current
    if (!p) return
    const dx = e.clientX - p.x
    const dy = e.clientY - p.y

    if (!p.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
      pointerRef.current = null
      return
    }

    if (!p.horizontal && Math.abs(dx) > 8) {
      p.horizontal = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
    }

    if (p.horizontal) {
      setDragOffset(Math.max(-1.2, Math.min(1.2, dx / stepX)))
    }
  }

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const p = pointerRef.current
    pointerRef.current = null

    if (p?.horizontal) {
      const dx = e.clientX - p.x
      const speed = Math.abs(dx) / Math.max(1, performance.now() - p.time)
      if (
        !cancelled &&
        (Math.abs(dx) > Math.min(55, cardWidth * 0.18) ||
          (Math.abs(dx) > 14 && speed > 0.35))
      ) {
        setVirtualIndex((prev) => prev + (dx < 0 ? 1 : -1))
      }
      suppressClickUntilRef.current = performance.now() + 260
    }

    setDragOffset(0)
    setIsDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  if (!activeCert) return null

  return (
    <div
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToVirtual(virtualIndex + 1)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToVirtual(virtualIndex - 1)
        } else if (e.key === 'Home') {
          e.preventDefault()
          goToVirtual(virtualIndex - activeIndex)
        } else if (e.key === 'End') {
          e.preventDefault()
          goToVirtual(virtualIndex - activeIndex + total - 1)
        }
      }}
      className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-surface/65 px-4 pt-6 pb-6 shadow-sm backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-6 sm:pt-8 sm:pb-7 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    >
      {/* Subtle Ambient Spotlight Behind Coverflow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,rgba(37,99,235,0.12),transparent_68%)] dark:bg-[radial-gradient(ellipse_at_50%_38%,rgba(79,140,255,0.14),transparent_68%)]"
      />

      {/* 3D Coverflow Stage */}
      <div
        ref={stageRef}
        data-dragging={isDragging || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => handlePointerUp(e)}
        onPointerCancel={(e) => handlePointerUp(e, true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsFocused(false)
          }
        }}
        className={`relative flex h-[270px] touch-pan-y select-none items-center justify-center [perspective:1100px] [transform-style:preserve-3d] sm:h-[320px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Floor Contact Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-1/2 h-8 w-[min(520px,78%)] -translate-x-1/2 rounded-full bg-black/25 blur-xl dark:bg-black/60"
        />

        {visibleSlots.map((slot) => {
          const item = items[wrapIndex(slot, total)]
          const rel = slot - virtualIndex
          const eff = rel + dragOffset
          const absEff = Math.abs(eff)
          const tx = eff * stepX
          const tz = -Math.min(absEff, 3) * 130
          const ry = -Math.max(-42, Math.min(42, eff * 30))
          const sc = 1 - Math.min(absEff, 3) * 0.08
          const isActive = slot === virtualIndex
          const isHidden = rel < -leftVisible || rel > rightVisible

          return (
            <button
              key={slot}
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-label={
                isActive ? `Inspect ${item.title}` : `Select ${item.title}`
              }
              aria-current={isActive ? 'true' : undefined}
              aria-hidden={isHidden || undefined}
              onClick={() => {
                if (performance.now() < suppressClickUntilRef.current) return
                if (isActive) {
                  onSelectCert(item)
                } else {
                  goToVirtual(virtualIndex + rel)
                }
              }}
              style={{
                width: `${cardWidth}px`,
                transform: `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg) scale(${sc})`,
                opacity: isHidden ? 0 : 1,
                zIndex: 10 - Math.abs(rel),
                pointerEvents: isHidden ? 'none' : undefined,
              }}
              className={`group absolute flex flex-col overflow-hidden rounded-2xl border bg-surface/95 p-2 text-left [backface-visibility:hidden] will-change-transform ${
                isDragging || prefersReducedMotion
                  ? ''
                  : 'transition-[transform,opacity,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
              } ${
                isActive
                  ? 'border-accent/45 shadow-[0_22px_42px_rgba(15,23,42,0.18)] dark:border-white/20 dark:shadow-[0_24px_48px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.14)]'
                  : 'border-border shadow-[0_14px_28px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]'
              }`}
            >
              {/* Glass Top Browser / Credential Strip */}
              <div className="flex items-center justify-between gap-2 px-1.5 pt-0.5 pb-1.5 text-[10px] text-muted">
                <span className="truncate font-medium text-accent">
                  {item.issuer}
                </span>
                <span className="shrink-0 font-mono text-[10px]">
                  {item.date}
                </span>
              </div>

              {/* Certificate Preview Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/70 bg-bg/85 p-1">
                <img
                  src={item.thumbUrl}
                  alt={item.title}
                  draggable={false}
                  loading={Math.abs(rel) < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full rounded-lg object-contain"
                />

                {/* Dimming overlay on recessed side cards */}
                {!isActive && (
                  <span
                    aria-hidden="true"
                    style={{ opacity: Math.min(absEff, 2) * 0.22 }}
                    className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-300"
                  />
                )}

                {isActive && (
                  <span className="pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full border border-border bg-surface/90 px-2.5 py-1 text-[10px] font-semibold text-text opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                    Inspect Full Size
                  </span>
                )}
              </div>

              {/* Card Title Row */}
              <div className="flex items-center justify-between gap-2 px-1.5 pt-2 pb-1">
                <span className="truncate text-xs font-semibold text-text sm:text-[13px]">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xs font-medium text-accent"
                >
                  ↗
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Certificate Details + Glassy Transport Dock */}
      <div className="relative z-10 mt-3 flex flex-col items-center text-center">
        <span className="text-[11px] font-medium text-accent">
          {activeCert.issuer} · {activeCert.date}
          {activeCert.location ? ` · ${activeCert.location}` : ''}
        </span>

        <h4 id={headingId} className="mt-1 text-base font-bold text-text sm:text-xl">
          {activeCert.title}
        </h4>

        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted">
          {activeCert.description}
        </p>

        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          {activeCert.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-bg/70 px-2 py-0.5 text-[11px] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions + Glassy Dock Row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onSelectCert(activeCert)}
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Preview Certificate
          </button>

          {activeCert.pdfUrl && (
            <a
              href={activeCert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-bg/80 px-4 py-2 text-xs font-medium text-text transition-colors hover:border-black/20 dark:hover:border-white/25"
            >
              Open PDF ↗
            </a>
          )}

          {/* Frosted Glass Transport Pill */}
          <div
            role="group"
            aria-label="Certificate carousel controls"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 py-1 pr-1.5 pl-3.5 shadow-sm backdrop-blur-xl dark:bg-[#111216]/85 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
          >
            <span className="border-r border-border pr-2.5 font-mono text-[11px] tabular-nums text-muted">
              <span className="font-semibold text-text">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>{' '}
              / {String(total).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => goToVirtual(virtualIndex - 1)}
              aria-label="Previous certificate"
              disabled={total < 2}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text transition-colors hover:bg-black/5 disabled:opacity-35 dark:hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause carousel' : 'Auto-play carousel'}
              aria-pressed={isPlaying}
              disabled={prefersReducedMotion || total < 2}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-text transition-colors hover:bg-black/10 disabled:opacity-35 dark:bg-white/10 dark:hover:bg-white/15"
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => goToVirtual(virtualIndex + 1)}
              aria-label="Next certificate"
              disabled={total < 2}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text transition-colors hover:bg-black/5 disabled:opacity-35 dark:hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-2.5 text-[11px] text-muted">
          Drag sideways, click a card, or use arrows to browse
        </p>
      </div>
    </div>
  )
}
