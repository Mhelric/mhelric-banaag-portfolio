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
    type: 'Contract',
    current: true,
    highlights: [
      'Design and illustrate commercial character and creature assets tailored to international studio briefs and production pipelines.',
      'Collaborate remotely across time zones, delivering high-resolution artwork on schedule through structured review milestones.',
    ],
    tags: ['Character & Creature Design', 'Digital Art', 'Studio Pipeline', 'Remote Collaboration'],
  },
  {
    id: 'incub8-space-intern',
    role: 'Back End Developer Intern',
    organization: 'Incub8 Space',
    period: 'Jul 2025 — Aug 2025',
    location: 'Kawit, Cavite · Hybrid',
    type: 'Internship',
    current: false,
    highlights: [
      'Engineered and maintained backend services, relational database schemas, and authentication flows using Supabase and PostgreSQL.',
      'Collaborated in a hybrid engineering environment to connect backend data layers with frontend web interfaces.',
    ],
    tags: ['Supabase', 'PostgreSQL', 'Backend Development', 'Database Design', 'REST APIs'],
  },
  {
    id: 'meru-art-freelance',
    role: 'Freelance Digital Artist',
    organization: 'meru_art',
    period: 'Apr 2022 — Present',
    location: 'Philippines · Remote',
    type: 'Self-Employed',
    current: true,
    highlights: [
      'Over 4.5 years delivering commissioned character designs, reference sheets, D&D portraits, and promotional illustrations.',
      'Manage full client lifecycle including project scoping, pricing tiers, staged sketch/color approvals, and final asset delivery.',
    ],
    tags: ['Commissioned Art', 'Digital Art', 'Client Communication', 'Project Management'],
  },
  {
    id: 'cvsu-bscs',
    role: 'BS in Computer Science',
    organization: 'Cavite State University – Cavite City Campus',
    period: 'Aug 2022 — Sep 2026',
    location: 'Cavite City, Philippines',
    type: 'Education',
    current: false,
    highlights: [
      'Completed Bachelor of Science in Computer Science focusing on software engineering, relational databases, web application architecture, and algorithms.',
    ],
    tags: ['Computer Science', 'Software Engineering', 'Web Development', 'Data Structures'],
  },
  {
    id: 'mcdonalds-crew',
    role: 'Service Crew',
    organization: "McDonald's (087 Cavite City)",
    period: 'Feb 2025 — Present',
    location: 'Cavite City · On-site',
    type: 'Part-Time',
    current: true,
    highlights: [
      'Deliver fast, accurate customer service and team coordination in a high-pressure environment while balancing university studies and remote creative contracts.',
      'Previously served as Part-Time Service Crew at Chowking (Kawit, Cavite · Aug 2022 – Nov 2022), maintaining strict quality and operational standards during peak hours.',
    ],
    tags: ['Customer Service', 'Team Collaboration', 'Operations', 'Time Management'],
  },
]

export function MobileExperience() {
  const [activeTab, setActiveTab] = useState<ExpTab>('career')
  const [openCareerIdx, setOpenCareerIdx] = useState<number>(0)
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
          <div className="no-scrollbar max-h-full space-y-2 overflow-y-auto pr-0.5">
            {CAREER_ITEMS.map((item, idx) => {
              const isOpen = openCareerIdx === idx
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    isOpen
                      ? 'border-accent/45 bg-surface shadow-sm dark:bg-[#111216]'
                      : 'border-border bg-surface/80 dark:bg-[#111216]/80'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenCareerIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-2 p-3 text-left transition-colors active:bg-black/5 dark:active:bg-white/5"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-text sm:text-sm">
                        {item.role}
                      </h3>
                      <p className="truncate text-[11px] font-medium text-accent">
                        {item.organization}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[9.5px] ${
                          item.current
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'border-border bg-bg text-muted'
                        }`}
                      >
                        {item.period}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg text-[10px] text-muted transition-all duration-300 ease-out ${
                          isOpen ? 'rotate-180 border-accent/40 bg-accent/10 text-accent' : ''
                        }`}
                      >
                        ▾
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-2 border-t border-border/70 px-3 pt-2 pb-3">
                        <p className="font-mono text-[10px] text-muted">
                          {item.type} · {item.location}
                        </p>
                        <ul className="space-y-1.5 text-[11px] leading-relaxed text-muted">
                          {item.highlights.map((hl) => (
                            <li key={hl} className="flex items-start gap-1.5">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="flex flex-wrap gap-1 pt-0.5">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md border border-border bg-bg px-2 py-0.5 text-[10px] font-medium text-muted"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
