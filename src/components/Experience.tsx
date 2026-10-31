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

                {/* Header Row: Role + Organization on Left, Date Pill on Right */}
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

                {/* Clean Skill Pills */}
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
    </section>
  )
}