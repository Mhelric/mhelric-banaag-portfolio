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

  // Keyboard support inside modals (Esc, Left, Right)
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
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
      aria-labelledby="art-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            02 // Art & Illustration
          </p>
          <h2
            id="art-heading"
            className="mt-1.5 text-2xl font-semibold tracking-tight text-text sm:mt-2 sm:text-3xl"
          >
            Commercial Art & Character Design
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
            Five years of freelance commission work (<span className="font-mono text-text">MERURI_ART</span>) and currently contracted with{' '}
            <span className="font-medium text-text">TopDeck Studio</span>—translating client briefs into polished visual assets.
          </p>
        </div>

        {/* Header Actions: Lightbox + ArtStation */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="rounded-lg border border-border bg-surface px-3.5 py-2 font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent"
          >
            Open Lightbox ({totalArtworks})
          </button>

          <a
            href={ARTSTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-text"
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
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-all hover:-translate-y-1 hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {/* Thumbnail Aspect Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg">
                <img
                  src={art.src}
                  alt={art.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {isLastPreviewWithMore && (
                  <div className="absolute top-2.5 right-2.5 rounded-md border border-border bg-bg/85 px-2 py-0.5 font-mono text-[11px] font-medium text-accent backdrop-blur-sm">
                    +{extraCount} More
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                  <span className="rounded-lg bg-accent px-3 py-1.5 font-mono text-[11px] font-medium text-white shadow-lg">
                    Inspect Artwork ↗
                  </span>
                </div>
              </div>

              {/* Compact Card Footer */}
              <div className="p-3 sm:p-3.5">
                <p className="truncate font-mono text-[10px] text-accent sm:text-[11px]">
                  {art.category}
                </p>
                <h3 className="mt-0.5 truncate text-xs font-medium text-text sm:text-sm">
                  {art.title}
                </h3>
              </div>
            </button>
          )
        })}
      </div>

      {/* Commission Callout Strip */}
      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-xl border border-accent/30 bg-surface px-4 py-4 sm:mt-6 lg:flex-row lg:items-center sm:px-6">
        <div className="flex items-start gap-3 sm:items-center">
          <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 sm:mt-0"></span>
          <div>
            <p className="text-xs font-medium text-text sm:text-sm">
              Want to commission custom art? Click here to see pricing, rates &amp; terms.
            </p>
            <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
              5+ years delivering character portraits, full-body designs, and studio assets under <span className="font-mono text-text">MERURI_ART</span>.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2.5 lg:w-auto">
          <button
            type="button"
            onClick={() => setIsCommissionModalOpen(true)}
            className="flex-1 rounded-lg border border-border bg-bg px-3.5 py-2 text-center font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent sm:flex-initial"
          >
            Quick Overview
          </button>

          <a
            href={CARRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-accent px-4 py-2 text-center font-mono text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
          >
            Commission Sheet (Carrd) ↗
          </a>
        </div>
      </div>

      {/* Modal 1: Full-Screen Artwork Lightbox */}
      {activeArtwork && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(totalArtworks).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    id="lightbox-title"
                    className="text-sm font-semibold text-text sm:text-base"
                  >
                    {activeArtwork.title}
                  </h3>
                  <p className="font-mono text-[11px] text-muted">
                    {activeArtwork.clientType}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-lg border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-text"
              >
                ESC ✕
              </button>
            </div>

            {/* Modal Main Body: Image + Prev/Next Controls */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-bg/90 p-4 sm:p-6">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous artwork"
                className="absolute left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/90 font-mono text-sm text-text shadow-lg transition-colors hover:border-accent sm:left-5 sm:h-10 sm:w-10"
              >
                ←
              </button>

              <img
                src={activeArtwork.src}
                alt={activeArtwork.title}
                className="max-h-[54svh] w-auto max-w-full rounded-lg object-contain shadow-xl"
              />

              <button
                type="button"
                onClick={showNext}
                aria-label="Next artwork"
                className="absolute right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/90 font-mono text-sm text-text shadow-lg transition-colors hover:border-accent sm:right-5 sm:h-10 sm:w-10"
              >
                →
              </button>
            </div>

            {/* Modal Footer: Description + Thumbnail Strip + External Links */}
            <div className="border-t border-border bg-surface px-4 py-3.5 sm:px-6">
              <p className="text-xs leading-relaxed text-muted sm:text-sm">
                {activeArtwork.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                {/* Mini Filmstrip Thumbnails */}
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
                            : 'border-border opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt=""
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    )
                  })}
                </div>

                {/* External Portfolio Links inside Lightbox */}
                <div className="flex items-center gap-2">
                  <a
                    href={ARTSTATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border bg-bg px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-text"
                  >
                    More on ArtStation ↗
                  </a>
                  <a
                    href={CARRD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-accent px-3 py-1.5 font-mono text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Commission Rates ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Commission Details & Workflow Modal */}
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
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  MERURI_ART // Commissions Open
                </p>
                <h3
                  id="commission-modal-title"
                  className="mt-1 text-lg font-semibold text-text sm:text-2xl"
                >
                  Commission Guide & Workflow
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCommissionModalOpen(false)}
                className="shrink-0 rounded-lg border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted hover:text-text"
              >
                ESC ✕
              </button>
            </div>

                        {/* Commission Offerings */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                  Available Formats &amp; Base Pricing
                </h4>
                <span className="font-mono text-[11px] text-muted">
                  USD • Base Price
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3">
                {COMMISSION_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg/70 p-4 transition-colors hover:border-accent/40 sm:px-5"
                  >
                    {/* Left Side: Tier Details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text sm:text-base">
                        {tier.name}
                      </p>
                      <p className="mt-0.5 text-xs text-accent">
                        {tier.idealFor}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {tier.includes}
                      </p>
                    </div>

                    {/* Right Side: Huge Highlighted Base Price */}
                    <div className="shrink-0 border-l border-border pl-4 text-right sm:pl-6">
                      <p className="font-mono text-2xl font-bold tracking-tight text-accent sm:text-4xl">
                        {tier.price}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Base Price
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="mt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                How We Work Together
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {WORKFLOW_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-border bg-bg/40 p-3.5"
                  >
                    <span className="font-mono text-xs text-accent">
                      Step {item.step}
                    </span>
                    <p className="mt-1 text-xs font-medium text-text sm:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTAs: ArtStation + Carrd */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <a
                href={ARTSTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-center font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent sm:flex-initial"
              >
                Full ArtStation Portfolio ↗
              </a>

              <a
                href={CARRD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-accent px-5 py-2.5 text-center font-mono text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
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