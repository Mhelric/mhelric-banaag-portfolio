import { useEffect, useState } from 'react'
import { CERTIFICATIONS, type Certification } from '../data/certifications'
import { GitHubActivity } from './GitHubActivity'
import { Reveal } from './Reveal'

interface TimelineItem {
  id: string
  role: string
  organization: string
  location: string
  period: string
  type: string
  current?: boolean
  highlights: string[]
  tags: string[]
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    id: 'topdeck-studio',
    role: 'Illustrator',
    organization: 'TopDeck Studio',
    location: 'Limassol, Cyprus · Remote',
    period: 'Jan 2026 — Present',
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
    location: 'Kawit, Cavite · Hybrid',
    period: 'Jul 2025 — Aug 2025',
    type: 'Internship',
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
    location: 'Philippines · Remote',
    period: 'Apr 2022 — Present',
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
    location: 'Cavite City, Philippines',
    period: 'Aug 2022 — Sep 2026',
    type: 'Education',
    highlights: [
      'Completed Bachelor of Science in Computer Science focusing on software engineering, relational databases, web application architecture, and algorithms.',
    ],
    tags: ['Computer Science', 'Software Engineering', 'Web Development', 'Data Structures'],
  },
  {
    id: 'mcdonalds-crew',
    role: 'Service Crew',
    organization: "McDonald's (087 Cavite City)",
    location: 'Cavite City · On-site',
    period: 'Feb 2025 — Present',
    type: 'Part-Time',
    current: true,
    highlights: [
      'Deliver fast, accurate customer service and team coordination in a high-pressure environment while balancing university studies and remote creative contracts.',
      'Previously served as Part-Time Service Crew at Chowking (Kawit, Cavite · Aug 2022 – Nov 2022), maintaining strict quality and operational standards during peak hours.',
    ],
    tags: ['Customer Service', 'Team Collaboration', 'Operations', 'Time Management'],
  },
]

export function Experience() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  useEffect(() => {
    if (!selectedCert) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCert])

  return (
    <section
      id="experience"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-14 sm:py-20"
      aria-labelledby="experience-heading"
    >
      <Reveal>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Experience &amp; Education
          </p>
          <h2
            id="experience-heading"
            className="mt-1.5 text-2xl font-bold tracking-tight text-text sm:text-3xl"
          >
            Career &amp; Academic Background
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
            Combining a Computer Science degree and backend internship experience with an international studio contract and 4.5+ years of freelance art delivery.
          </p>
        </div>
      </Reveal>

      {/* Modern Gradient Timeline Track */}
      <div className="relative mt-8 pl-6 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:bg-gradient-to-b before:from-accent before:via-border before:to-transparent sm:mt-10 sm:pl-8">
        <div className="space-y-4 sm:space-y-5">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 80}>
              <article className="group relative rounded-2xl border border-border bg-surface/80 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-accent/40 hover:bg-surface sm:p-6">
                {/* Timeline Node */}
                <span
                  aria-hidden="true"
                  className={`absolute top-6 -left-[29px] h-2.5 w-2.5 rounded-full border transition-transform duration-300 group-hover:scale-125 sm:-left-[37px] ${
                    item.current
                      ? 'border-accent bg-accent shadow-[0_0_10px_rgba(79,140,255,0.6)]'
                      : 'border-muted bg-bg'
                  }`}
                />

                {/* Header Row */}
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-text sm:text-lg">
                        {item.role}
                      </h3>
                      <span className="rounded-md border border-border bg-bg/80 px-2 py-0.5 text-[11px] font-medium text-muted">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-accent sm:text-sm">
                      {item.organization}{' '}
                      <span className="font-normal text-muted">
                        · {item.location}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`self-start whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] ${
                      item.current
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-border bg-bg/60 text-muted'
                    }`}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="mt-3.5 space-y-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-bg/70 px-2.5 py-1 text-[11px] font-medium text-muted transition-colors group-hover:text-text/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certifications & Awards Subsection */}
      <Reveal delayMs={150}>
        <div className="mt-14 border-t border-border pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Credentials
              </p>
              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-text sm:text-2xl">
                Certifications &amp; Awards
              </h3>
            </div>
            <span className="text-xs text-muted">
              Click any certificate to inspect full size
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {CERTIFICATIONS.map((cert) => (
              <article
                key={cert.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/85 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-accent/40 sm:p-6 lg:col-span-8"
              >
                <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-12">
                  {/* Certificate Thumbnail Preview */}
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="group/img relative overflow-hidden rounded-xl border border-border bg-bg sm:col-span-5"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      loading="lazy"
                      className="aspect-[1.414/1] w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover/img:opacity-100">
                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow">
                        View Certificate
                      </span>
                    </div>
                  </button>

                  {/* Certificate Details */}
                  <div className="sm:col-span-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-accent">
                        {cert.issuer}
                      </span>
                      <span className="rounded-full border border-border bg-bg/70 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="mt-2 text-base font-bold text-text sm:text-lg">
                      {cert.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {cert.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-bg/70 px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border/70 pt-3.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                      >
                        Preview Award
                      </button>
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-border bg-bg px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-white/25 hover:text-text"
                        >
                          Open PDF ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Upcoming Certifications Slot */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 p-6 text-center lg:col-span-4">
              <span className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-muted">
                In Progress
              </span>
              <p className="mt-3 text-sm font-semibold text-text">
                More Certifications Coming Soon
              </p>
              <p className="mt-1.5 max-w-[240px] text-xs leading-relaxed text-muted">
                Currently completing additional web development and cloud certifications.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* GitHub Contributions Heatmap Card */}
      <Reveal delayMs={220}>
        <GitHubActivity />
      </Reveal>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-3.5">
              <div>
                <p className="text-xs font-medium text-accent">
                  {selectedCert.issuer} · {selectedCert.date}
                </p>
                <h3
                  id="cert-modal-title"
                  className="mt-0.5 text-base font-bold text-text sm:text-xl"
                >
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-medium text-muted hover:text-text"
              >
                Close
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-bg">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="mx-auto max-h-[65svh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">
                Signed by {selectedCert.signatory}
              </p>
              {selectedCert.pdfUrl && (
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                >
                  Open Original PDF ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}