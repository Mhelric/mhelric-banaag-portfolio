import { useEffect, useState } from 'react'
import { ARTWORKS } from '../data/artworks'

const CARRD_URL = 'https://meru-art.carrd.co/'
const ARTSTATION_URL = 'https://meru_art.artstation.com/projects'

const COMMISSION_TIERS = [
  {
    name: 'Bust / Headshot',
    price: '$10',
    idealFor: 'Avatars, profile icons, & expressive portraits',
    includes: 'Clean lineart, full color & shading, simple or transparent background',
  },
  {
    name: 'Half-Body Illustration',
    price: '$20',
    idealFor: 'D&D campaign characters, VTuber/streamer art, & promotional visuals',
    includes: 'Waist-up pose, detailed outfit/props, stylized background accent',
  },
  {
    name: 'Full-Body Character Design',
    price: '$40',
    idealFor: 'Original characters (OCs), concept sheets, & full costume showcases',
    includes: 'Full silhouette pose, complex accessories/tails/weapons, high-res export',
  },
  {
    name: 'Chibi Illustration',
    price: '$15',
    idealFor: 'Mascots, emotes, stickers, & cute character collectibles',
    includes: 'Stylized chibi proportions, vibrant cel-shading, transparent PNG/WebP',
  },
]

const WORKFLOW_STEPS = [
  { step: '01', title: 'Brief & References', desc: 'Share your character description, pose ideas, and visual references.' },
  { step: '02', title: 'Sketch & Revision', desc: 'Receive a rough composition sketch to approve or request adjustments.' },
  { step: '03', title: 'Lineart & Color Check', desc: 'Preview flat colors and lighting direction before final rendering.' },
  { step: '04', title: 'Final High-Res Delivery', desc: 'Delivered in crisp high-resolution PNG/WebP formats.' },
]

export function ArtGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false)

  const totalArtworks = ARTWORKS.length
  const previewArtworks = ARTWORKS.slice(0, 4)
  const extraCount = Math.max(0, totalArtworks - 4)
  const activeArtwork = activeIndex !== null ? ARTWORKS[activeIndex] : null

  const showPrev = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : prev === 0 ? totalArtworks - 1 : prev - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : prev === totalArtworks - 1 ? 0 : prev + 1,
    )
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        setIsCommissionModalOpen(false)
      } else if (activeIndex !== null && event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? 0 : prev === 0 ? totalArtworks - 1 : prev - 1,
        )
      } else if (activeIndex !== null && event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? 0 : prev === totalArtworks - 1 ? 0 : prev + 1,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, totalArtworks])

  return (
    <section
      id="art"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-14 sm:py-20"
      aria-labelledby="art-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Illustration &amp; Character Art
          </p>
          <h2
            id="art-heading"
            className="mt-1.5 text-2xl font-bold tracking-tight text-text sm:text-3xl"
          >
            Selected Artwork
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Five years of freelance commissions (<span className="font-medium text-text">meru_art</span>) and currently contracted with{' '}
            <span className="font-medium text-text">TopDeck Studio</span>.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium text-text transition-colors hover:border-accent/60 hover:text-accent"
          >
            View All ({totalArtworks})
          </button>

          <a
            href={ARTSTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-accent/60 hover:text-text"
          >
            ArtStation ↗
          </a>
        </div>
      </div>

      {/* Compact 4-Column Preview Row */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
        {previewArtworks.map((art, index) => {
          const isLastPreviewWithMore = index === 3 && extraCount > 0

          return (
            <button
              key={art.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-all hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg">
                <img
                  src={art.thumbSrc}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {isLastPreviewWithMore && (
                  <div className="absolute top-2.5 right-2.5 rounded-md border border-white/15 bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    +{extraCount} more
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-lg">
                    View Piece
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-3.5">
                <p className="truncate text-[11px] text-muted">
                  {art.category}
                </p>
                <h3 className="mt-0.5 truncate text-xs font-semibold text-text sm:text-sm">
                  {art.title}
                </h3>
              </div>
            </button>
          )
        })}
      </div>

      {/* Clean Commission Strip */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-text">
            Looking to commission custom character art or illustrations?
          </p>
          <p className="mt-0.5 text-xs text-muted">
            Open for portraits, full-body character designs, and studio assets under <span className="text-text">meru_art</span>.
          </p>
        </div>

        <div className="flex w-full items-center gap-2.5 sm:w-auto">
          <button
            type="button"
            onClick={() => setIsCommissionModalOpen(true)}
            className="flex-1 whitespace-nowrap rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-text transition-colors hover:border-white/25 sm:flex-initial"
          >
            Pricing &amp; Info
          </button>

          <a
            href={CARRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-center text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
          >
            Commission Sheet ↗
          </a>
        </div>
      </div>

      {/* Modal 1: Fixed-Bounds Full-Screen Lightbox */}
      {activeArtwork && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar (No awkward line wrapping on phone) */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 whitespace-nowrap rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(totalArtworks).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3
                    id="lightbox-title"
                    className="truncate text-sm font-semibold text-text sm:text-base"
                  >
                    {activeArtwork.title}
                  </h3>
                  <p className="truncate text-xs text-muted">
                    {activeArtwork.clientType}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="shrink-0 whitespace-nowrap rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-text"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Image Stage (Strictly contained so image never overflows) */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-bg p-3 sm:p-6">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous artwork"
                className="absolute left-2.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/75 text-sm text-white backdrop-blur-sm transition-colors hover:border-accent sm:left-5 sm:h-10 sm:w-10"
              >
                ←
              </button>

              <img
                src={activeArtwork.src}
                alt={activeArtwork.title}
                decoding="async"
                className="max-h-[42svh] w-auto max-w-full rounded-lg object-contain sm:max-h-[54svh]"
              />

              <button
                type="button"
                onClick={showNext}
                aria-label="Next artwork"
                className="absolute right-2.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/75 text-sm text-white backdrop-blur-sm transition-colors hover:border-accent sm:right-5 sm:h-10 sm:w-10"
              >
                →
              </button>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 border-t border-border bg-surface px-4 py-3.5 sm:px-6">
              <p className="line-clamp-2 text-xs leading-relaxed text-muted sm:line-clamp-none sm:text-sm">
                {activeArtwork.description}
              </p>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {ARTWORKS.map((item, idx) => {
                    const isCurrent = idx === activeIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`View ${item.title}`}
                        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border transition-all ${
                          isCurrent
                            ? 'border-accent ring-2 ring-accent/40'
                            : 'border-border opacity-45 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={item.thumbSrc}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    )
                  })}
                </div>

                {/* External Portfolio Links (Never wrap arrows onto a new line) */}
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={ARTSTATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 whitespace-nowrap rounded-lg border border-border bg-bg px-3.5 py-2 text-center text-xs font-medium text-muted transition-colors hover:text-text sm:flex-initial"
                  >
                    ArtStation ↗
                  </a>
                  <a
                    href={CARRD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 whitespace-nowrap rounded-lg bg-accent px-3.5 py-2 text-center text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
                  >
                    Commission Rates ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Commission Details & Pricing Modal */}
      {isCommissionModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="commission-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setIsCommissionModalOpen(false)}
        >
          <div
            className="max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  meru_art · Commissions Open
                </p>
                <h3
                  id="commission-modal-title"
                  className="mt-1 text-lg font-bold text-text sm:text-2xl"
                >
                  Commission Guide &amp; Pricing
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCommissionModalOpen(false)}
                className="shrink-0 whitespace-nowrap rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-medium text-muted hover:text-text"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Formats &amp; Base Rates
                </h4>
                <span className="font-mono text-xs text-muted">USD</span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3">
                {COMMISSION_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg/70 p-4 sm:px-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text sm:text-base">
                        {tier.name}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-accent">
                        {tier.idealFor}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {tier.includes}
                      </p>
                    </div>

                    <div className="shrink-0 border-l border-border pl-4 text-right sm:pl-6">
                      <p className="font-mono text-2xl font-bold tracking-tight text-text sm:text-4xl">
                        {tier.price}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">
                        Base Price
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Process
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {WORKFLOW_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-border bg-bg/40 p-3.5"
                  >
                    <span className="font-mono text-xs text-accent">
                      {item.step}
                    </span>
                    <p className="mt-1 text-xs font-semibold text-text sm:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <a
                href={ARTSTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 whitespace-nowrap rounded-lg border border-border bg-bg px-4 py-2.5 text-center text-xs font-medium text-text transition-colors hover:border-white/25 sm:flex-initial"
              >
                ArtStation Portfolio ↗
              </a>

              <a
                href={CARRD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-center text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
              >
                Open Commission Sheet (Carrd) ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
