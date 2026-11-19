import { useState } from 'react'
import { CERTIFICATIONS, type Certification } from '../../data/certifications'
import { GitHubActivity } from '../GitHubActivity'

type ExpTab = 'career' | 'certs' | 'github'

const CAREER_ITEMS = [
  {
    id: 'topdeck-studio',
    role: 'Illustrator',
    organization: 'TopDeck Studio',
    period: 'Jan 2026 — Present',
    location: 'Limassol, Cyprus · Remote',
    current: true,
    highlight:
      'Illustrating commercial character and creature assets tailored to international studio production pipelines.',
  },
  {
    id: 'incub8-space-intern',
    role: 'Back End Developer Intern',
    organization: 'Incub8 Space',
    period: 'Jul 2025 — Aug 2025',
    location: 'Kawit, Cavite · Hybrid',
    current: false,
    highlight:
      'Engineered backend services, PostgreSQL schemas, and Supabase auth flows; awarded Internship Excellence.',
  },
  {
    id: 'meru-art-freelance',
    role: 'Freelance Digital Artist',
    organization: 'meru_art',
    period: 'Apr 2022 — Present',
    location: 'Philippines · Remote',
    current: true,
    highlight:
      '4.5+ years delivering commissioned character designs, reference sheets, D&D portraits, and promo visuals.',
  },
]

export function MobileExperience() {
  const [activeTab, setActiveTab] = useState<ExpTab>('career')
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <section
      id="experience"
      aria-labelledby="mobile-exp-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-center px-4 pt-16 pb-6"
    >
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
          Background
        </p>
        <h2
          id="mobile-exp-heading"
          className="mt-0.5 text-xl font-bold tracking-tight text-text"
        >
          Experience &amp; Credentials
        </h2>
      </div>

      {/* Segmented Switcher */}
      <div
        role="tablist"
        aria-label="Experience views"
        className="mt-3 grid grid-cols-3 rounded-xl border border-border bg-surface p-1 dark:bg-[#111216]"
      >
        {(
          [
            { id: 'career', label: 'Career' },
            { id: 'certs', label: `Certs (${CERTIFICATIONS.length})` },
            { id: 'github', label: 'GitHub' },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-accent text-white shadow-[0_2px_12px_rgba(79,140,255,0.4)]'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="mt-3.5 flex flex-1 flex-col justify-center overflow-hidden">
        {activeTab === 'career' && (
          <div className="space-y-2.5">
            {CAREER_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-surface p-3 shadow-sm dark:bg-[#111216]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-text">
                      {item.role}
                    </h3>
                    <p className="truncate text-[11px] font-medium text-accent">
                      {item.organization}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                      item.current
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-border bg-bg text-muted'
                    }`}
                  >
                    {item.period}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div>
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
              {CERTIFICATIONS.map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="flex w-[80vw] max-w-[310px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm dark:bg-[#111216]"
                >
                  <div className="aspect-[16/11] w-full overflow-hidden border-b border-border bg-bg">
                    <img
                      src={cert.thumbUrl}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {cert.issuer}
                    </p>
                    <h3 className="mt-0.5 line-clamp-1 text-xs font-bold text-text">
                      {cert.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] text-muted">
                      {cert.date} · Tap to view
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-center font-mono text-[10px] text-muted">
              Swipe certificates · Tap to inspect full resolution
            </p>
          </div>
        )}

        {activeTab === 'github' && (
          <div className="-mt-6">
            <GitHubActivity />
          </div>
        )}
      </div>

      {/* Full-Screen Certificate Lightbox */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[110] flex flex-col justify-between bg-black/92 p-4 backdrop-blur-md"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          <div className="flex items-center justify-between text-white">
            <span className="truncate pr-3 text-xs font-semibold">
              {selectedCert.issuer}
            </span>
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
            >
              ✕
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center justify-center overflow-hidden py-3"
          >
            <img
              src={selectedCert.imageUrl}
              alt={selectedCert.title}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
          </div>

          <div onClick={(e) => e.stopPropagation()} className="space-y-2.5 text-white">
            <div>
              <h3 className="text-sm font-bold">{selectedCert.title}</h3>
              <p className="mt-0.5 text-xs text-zinc-300">
                {selectedCert.description}
              </p>
            </div>
            {selectedCert.pdfUrl && (
              <a
                href={selectedCert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent py-2.5 text-xs font-semibold text-white"
              >
                Open Original PDF ↗
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
