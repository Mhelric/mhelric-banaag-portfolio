import { useState } from 'react'
import { ARTWORKS } from '../../data/artworks'
import { MobileBottomSheet } from './MobileBottomSheet'

const MERU_ART_STUDIO_URL = 'https://meru-art-studio.vercel.app/'
const ARTSTATION_URL = 'https://meru_art.artstation.com/projects'

const COMMISSION_TIERS = [
  { name: 'Bust / Headshot', price: '$10', idealFor: 'Avatars, icons & portraits' },
  { name: 'Half-Body Illustration', price: '$20', idealFor: 'D&D, VTuber & promo visuals' },
  { name: 'Full-Body Character', price: '$40', idealFor: 'OCs, concept sheets & full poses' },
  { name: 'Chibi Illustration', price: '$15', idealFor: 'Mascots, emotes & stickers' },
]

const WORKFLOW_STEPS = [
  { step: '01', title: 'Brief & References', desc: 'Share character details & pose ideas.' },
  { step: '02', title: 'Sketch & Revision', desc: 'Approve rough composition & adjustments.' },
  { step: '03', title: 'Lineart & Color Check', desc: 'Preview flat colors & lighting.' },
  { step: '04', title: 'High-Res Delivery', desc: 'Delivered in crisp PNG / WebP formats.' },
]

export function MobileArt() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [isCommissionsOpen, setIsCommissionsOpen] = useState(false)

  const activeArtwork = lightboxIdx !== null ? ARTWORKS[lightboxIdx] : null

  return (
    <section
      id="art"
      aria-labelledby="mobile-art-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-center px-4 pt-16 pb-6"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
            Illustration &amp; Character Art
          </p>
          <h2
            id="mobile-art-heading"
            className="mt-0.5 text-xl font-bold tracking-tight text-text"
          >
            Selected Artwork
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsCommissionsOpen(true)}
          className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold text-accent"
        >
          Commissions
        </button>
      </div>

      <p className="mt-1.5 text-xs text-muted">
        5 years of freelance commissions (<span className="text-text">meru_art</span>) &amp;
        contract illustrator at <span className="text-text">TopDeck Studio</span>.
      </p>

      {/* Horizontal Swipeable Artwork Deck with Next-Card Peek */}
      <div className="no-scrollbar -mx-4 mt-3.5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
        {ARTWORKS.map((art, idx) => (
          <button
            key={art.id}
            type="button"
            onClick={() => setLightboxIdx(idx)}
            className="group relative flex w-[76vw] max-w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm dark:bg-[#111216]"
          >
            <div className="aspect-[4/5] max-h-[44svh] w-full overflow-hidden bg-bg">
              <img
                src={art.thumbSrc}
                alt={art.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-active:scale-[1.02]"
              />
            </div>
            <div className="p-3">
              <p className="truncate text-[10px] font-medium uppercase tracking-wider text-accent">
                {art.category}
              </p>
              <p className="mt-0.5 truncate text-xs font-bold text-text">
                {art.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Quick External Links */}
      <div className="mt-3.5 flex items-center gap-2">
        <a
          href={ARTSTATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text"
        >
          ArtStation ↗
        </a>
        <a
          href={MERU_ART_STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text"
        >
          Meru Art Studio ↗
        </a>
      </div>

      {/* Full-Screen Touch Lightbox */}
      {activeArtwork && lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArtwork.title}
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-[110] flex flex-col justify-between bg-black/92 p-4 backdrop-blur-md"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          <div className="flex items-center justify-between text-white">
            <span className="font-mono text-xs text-zinc-400">
              {lightboxIdx + 1} / {ARTWORKS.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close artwork preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
            >
              ✕
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center justify-center overflow-hidden py-3"
          >
            <img
              src={activeArtwork.src}
              alt={activeArtwork.title}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
          </div>

          <div onClick={(e) => e.stopPropagation()} className="space-y-3 text-white">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                {activeArtwork.category}
              </p>
              <h3 className="text-sm font-bold">{activeArtwork.title}</h3>
              <p className="mt-0.5 text-xs text-zinc-300">
                {activeArtwork.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx(
                    lightboxIdx === 0 ? ARTWORKS.length - 1 : lightboxIdx - 1
                  )
                }
                className="flex-1 rounded-xl border border-white/15 bg-white/10 py-2.5 text-xs font-semibold text-white"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx(
                    lightboxIdx === ARTWORKS.length - 1 ? 0 : lightboxIdx + 1
                  )
                }
                className="flex-1 rounded-xl bg-accent py-2.5 text-xs font-semibold text-white"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Commissions Bottom Sheet */}
      <MobileBottomSheet
        open={isCommissionsOpen}
        onClose={() => setIsCommissionsOpen(false)}
        title="Commission Pricing & Workflow"
        subtitle="meru_art"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {COMMISSION_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl border border-border bg-bg p-3"
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-xs font-bold text-text">{tier.name}</span>
                  <span className="font-mono text-xs font-bold text-accent">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-muted">
                  {tier.idealFor}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-border pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              4-Step Process
            </p>
            {WORKFLOW_STEPS.map((item) => (
              <div key={item.step} className="flex items-start gap-2.5 text-xs">
                <span className="font-mono text-[11px] font-bold text-accent">
                  {item.step}
                </span>
                <div>
                  <span className="font-semibold text-text">{item.title}</span>
                  <span className="text-muted"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href={MERU_ART_STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-accent py-2.5 text-xs font-semibold text-white"
          >
            Open Meru Art Studio ↗
          </a>
        </div>
      </MobileBottomSheet>
    </section>
  )
}
