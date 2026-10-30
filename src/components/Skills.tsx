interface SkillGroup {
  code: string
  title: string
  levelNote: string
  description: string
  skills: { name: string; badgeStyle: string }[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    code: '01',
    title: 'Core Web Fundamentals',
    levelNote: 'Strong Foundation',
    description:
      'Writing semantic, accessible markup, responsive layouts, and clean DOM/API logic without relying blindly on frameworks.',
    skills: [
      { name: 'HTML5 (Semantic)', badgeStyle: 'border-orange-500/30 bg-orange-500/10 text-orange-300' },
      { name: 'CSS3 (Grid & Flexbox)', badgeStyle: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
      { name: 'Vanilla JavaScript (ES6+)', badgeStyle: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
      { name: 'Async / REST APIs', badgeStyle: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
      { name: 'Responsive UI', badgeStyle: 'border-teal-400/30 bg-teal-400/10 text-teal-300' },
    ],
  },
  {
    code: '02',
    title: 'Modern Stack & Full-Stack',
    levelNote: 'Active Project Stack',
    description:
      'Building component-driven interfaces, type-safe data layers, and cloud-backed web apps with authentication and databases.',
    skills: [
      { name: 'TypeScript', badgeStyle: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
      { name: 'React', badgeStyle: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300' },
      { name: 'Tailwind CSS', badgeStyle: 'border-teal-400/30 bg-teal-400/10 text-teal-300' },
      { name: 'Vite', badgeStyle: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300' },
      { name: 'Supabase (Auth & DB)', badgeStyle: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
    ],
  },
  {
    code: '03',
    title: 'Workflow, Deployment & AI',
    levelNote: 'Modern Engineering',
    description:
      'Using version control, automated cloud deployments, and AI-assisted workflows while owning system design and debugging.',
    skills: [
      { name: 'Git & GitHub', badgeStyle: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200' },
      { name: 'Vercel CI/CD', badgeStyle: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200' },
      { name: 'AI-Assisted Workflows', badgeStyle: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
      { name: 'ESLint', badgeStyle: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300' },
      { name: 'PWA Setup', badgeStyle: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
    ],
  },
  {
    code: '04',
    title: 'Creative & Visual Engineering',
    levelNote: '5+ Years Commercial Edge',
    description:
      'Bridging the gap between design and engineering with custom digital illustration, color theory, and high-contrast UI polish.',
    skills: [
      { name: 'Digital Illustration', badgeStyle: 'border-pink-400/30 bg-pink-400/10 text-pink-300' },
      { name: 'Character & Concept Art', badgeStyle: 'border-pink-400/30 bg-pink-400/10 text-pink-300' },
      { name: 'UI Visual Hierarchy', badgeStyle: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
      { name: 'Color & Composition', badgeStyle: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
      { name: 'WebP Asset Optimization', badgeStyle: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
    ],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
      aria-labelledby="skills-heading"
    >
      {/* Section Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          04 // Technical &amp; Creative Stack
        </p>
        <h2
          id="skills-heading"
          className="mt-1.5 text-2xl font-semibold tracking-tight text-text sm:mt-2 sm:text-3xl"
        >
          Skills &amp; Capabilities
        </h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
          Grouped by core fundamentals, modern full-stack tooling, and commercial design craft.
        </p>
      </div>

      {/* 2x2 Skills Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.code}
            className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5 sm:p-6"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent">
                  {group.code} // {group.title}
                </span>
                <span className="rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[10px] text-muted sm:text-[11px]">
                  {group.levelNote}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                {group.description}
              </p>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={`rounded-md border px-2.5 py-1 font-mono text-xs ${skill.badgeStyle}`}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Transparent AI-Assisted Workflow Note */}
      <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-mono text-xs font-medium text-text">
            ⚡ Philosophy on AI-Assisted Development
          </p>
          <span className="font-mono text-[11px] text-accent">
            Architecture • Debugging • UI Craft
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
          I leverage modern AI coding assistants to accelerate boilerplate and explore новые patterns faster—while taking full ownership of component architecture, state flow, visual design, and line-by-line code comprehension.
        </p>
      </div>
    </section>
  )
}