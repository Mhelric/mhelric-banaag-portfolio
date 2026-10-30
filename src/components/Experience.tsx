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
    period: 'Jan 2026 – Present',
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
    period: 'Jul 2025 – Aug 2025',
    type: 'Internship',
    highlights: [
      'Engineered and maintained backend services, relational database schemas, and authentication flows using Supabase and PostgreSQL.',
      'Collaborated in a hybrid engineering environment to connect backend data layers with frontend web interfaces.',
    ],
    tags: ['Supabase', 'PostgreSQL', 'Backend Development', 'Database Design', 'REST APIs'],
  },
  {
    id: 'meruri-art-freelance',
    role: 'Freelance Digital Artist',
    organization: 'MERURI_ART · Self-Employed',
    location: 'Philippines · Remote',
    period: 'Apr 2022 – Present',
    type: 'Freelance',
    current: true,
    highlights: [
      'Over 4.5+ years delivering commissioned character designs, reference sheets, D&D portraits, and promotional illustrations.',
      'Manage full client lifecycle including project scoping, pricing tiers, staged sketch/color approvals, and final asset delivery.',
    ],
    tags: ['Commissioned Art', 'Digital Art', 'Client Communication', 'Project Management'],
  },
  {
    id: 'cvsu-bscs',
    role: 'Bachelor of Science in Computer Science (BSCS)',
    organization: 'Cavite State University – Cavite City Campus',
    location: 'Cavite City, Philippines',
    period: 'Aug 2022 – Sep 2026',
    type: 'Education',
    highlights: [
      'Completed BSCS degree focusing on software engineering, relational databases, web application architecture, and algorithms.',
    ],
    tags: ['BS Computer Science', 'Software Engineering', 'Web Development', 'Data Structures'],
  },
  {
    id: 'mcdonalds-crew',
    role: 'Service Crew',
    organization: "McDonald's (087 Cavite City)",
    location: 'Cavite City · On-site',
    period: 'Feb 2025 – Present',
    type: 'Part-Time',
    current: true,
    highlights: [
      'Deliver fast, accurate customer service and team coordination in a high-pressure environment while balancing university studies and remote creative contracts.',
      'Previously served as Part-Time Service Crew at Chowking (Kawit, Cavite · Aug 2022 – Nov 2022), maintaining strict quality and operational standards during peak store hours.',
    ],
    tags: ['Customer Service', 'Team Collaboration', 'High-Pressure Operations', 'Time Management'],
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
      aria-labelledby="experience-heading"
    >
      {/* Section Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          03 // Experience &amp; Education
        </p>
        <h2
          id="experience-heading"
          className="mt-1.5 text-2xl font-semibold tracking-tight text-text sm:mt-2 sm:text-3xl"
        >
          Experience &amp; Academic Background
        </h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
          Combining a BSCS degree from Cavite State University and backend internship experience with an international studio contract and 4.5+ years of freelance art delivery.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="mt-8 border-l border-border pl-6 sm:mt-10 sm:pl-8">
        <div className="space-y-5 sm:space-y-6">
          {EXPERIENCE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="relative rounded-xl border border-border bg-surface/70 p-5 transition-colors hover:border-border/90 sm:p-6"
            >
              {/* Timeline Dot on the Left Line */}
              <span
                aria-hidden="true"
                className={`absolute top-6 -left-[29px] h-2.5 w-2.5 rounded-full border sm:-left-[37px] ${
                  item.current
                    ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]'
                    : 'border-accent bg-bg'
                }`}
              />

              {/* Top Meta Row: Organization + Location + Period Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono text-xs font-medium text-accent">
                    {item.organization}
                  </span>
                  <span className="text-muted">•</span>
                  <span className="font-mono text-xs text-text">
                    {item.type}
                  </span>
                  <span className="hidden text-muted sm:inline">•</span>
                  <span className="w-full font-mono text-[11px] text-muted sm:w-auto">
                    {item.location}
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
                    item.current
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-border bg-bg/60 text-muted'
                  }`}
                >
                  {item.current && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  )}
                  {item.period}
                </span>
              </div>

              {/* Role Title */}
              <h3 className="mt-2 text-base font-semibold text-text sm:text-lg">
                {item.role}
              </h3>

              {/* Bullet Highlights */}
              <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                {item.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Skill / Competency Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-bg px-2.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}