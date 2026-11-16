import { useCallback, useId, useState, type TouchEvent } from 'react'
import type { Certification } from '../data/certifications'

interface CertificationCoverflowProps {
  items: Certification[]
  onSelectCert: (cert: Certification) => void
}

export function CertificationCoverflow({
  items,
  onSelectCert,
}: CertificationCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const headingId = useId()

  const total = items.length
  const activeCert = items[activeIndex]

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }, [total])

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }, [total])

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (diff > 45) nextSlide()
    else if (diff < -45) prevSlide()
    setTouchStartX(null)
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
          nextSlide()
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevSlide()
        } else if (e.key === 'Home') {
          e.preventDefault()
          setActiveIndex(0)
        } else if (e.key === 'End') {
          e.preventDefault()
          setActiveIndex(total - 1)
        }
      }}
      className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/85 p-4 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-6 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
    >
      {/* Lightweight GPU-Composited Horizontal Carousel */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="overflow-hidden rounded-xl border border-border bg-bg/75"
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((cert) => (
            <div key={cert.id} className="w-full shrink-0 p-3 sm:p-5">
              <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-7">
                {/* Left: Certificate Image Preview */}
                <button
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  aria-label={`Inspect ${cert.title}`}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2 lg:col-span-5"
                >
                  <img
                    src={cert.thumbUrl}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="aspect-[16/10] w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow">
                      Inspect Full Size
                    </span>
                  </div>
                </button>

                {/* Right: Complete Certificate Details */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-accent">
                        {cert.issuer}
                        {cert.location ? ` · ${cert.location}` : ''}
                      </span>
                      <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        {cert.date}
                      </span>
                    </div>

                    <h4
                      id={cert.id === activeCert.id ? headingId : undefined}
                      className="mt-2 text-base font-bold text-text sm:text-xl"
                    >
                      {cert.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      {cert.description}
                    </p>

                    {cert.signatory && (
                      <p className="mt-2 text-[11px] text-muted">
                        Signed by <span className="text-text">{cert.signatory}</span>
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border/70 pt-3.5">
                    <button
                      type="button"
                      onClick={() => onSelectCert(cert)}
                      className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Preview Certificate
                    </button>
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-black/20 hover:text-text dark:hover:border-white/25"
                      >
                        Open PDF ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Slide Controls & Selector Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {items.map((cert, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View certificate ${index + 1}: ${cert.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-7 bg-accent' : 'w-2.5 bg-border hover:bg-muted'
                }`}
              />
            )
          })}
        </div>

        <div
          role="group"
          aria-label="Certificate carousel controls"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-bg/90 py-1 pr-1.5 pl-3 shadow-sm"
        >
          <span className="border-r border-border pr-2.5 font-mono text-[11px] tabular-nums text-muted">
            <span className="font-semibold text-text">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(total).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous certificate"
            disabled={total < 2}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-text transition-colors hover:bg-black/5 disabled:opacity-35 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next certificate"
            disabled={total < 2}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-text transition-colors hover:bg-black/5 disabled:opacity-35 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
