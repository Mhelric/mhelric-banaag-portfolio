import { Reveal } from './Reveal'

interface SkillGroup {
  index: string
  title: string
  subtitle: string
  description: string
  skills: { name: string; style: string }[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    index: '01',
    title: 'Core Web Fundamentals',
    subtitle: 'Proficient',
    description:
      'Building clean, semantic markup, responsive layouts, and interactive browser logic using core web standards.',
    skills: [
      { name: 'HTML5', style: 'border-orange-500/30 bg-orange-500/10 text-orange-300' },
      { name: 'CSS3 (Grid & Flexbox)', style: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
      { name: 'Vanilla JavaScript', style: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
      { name: 'DOM Manipulation', style: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
      { name: 'REST APIs', style: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
      { name: 'Responsive UI', style: 'border-teal-400/30 bg-teal-400/10 text-teal-300' },
    ],
  },
  {
    index: '02',
    title: 'AI-Assisted Development',
    subtitle: 'Core Workflow',
    description:
      'Leveraging modern AI coding tools to scaffold features, adapt to modern frameworks, debug faster, and ship complete web apps.',
    skills: [
      { name: 'AI Coding Assistants', style: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
      { name: 'Prompt Engineering', style: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300' },
      { name: 'Rapid Prototyping', style: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
      { name: 'AI-Guided Debugging', style: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300' },
      { name: 'UI Polish & Iteration', style: 'border-teal-400/30 bg-teal-400/10 text-teal-300' },
    ],
  },
  {
    index: '03',
    title: 'Tools & Stack Exposure',
    subtitle: 'Working Knowledge',
    description:
      'Hands-on experience deploying projects, managing repositories, working with relational databases during my internship, and building with AI support.',
    skills: [
      { name: 'Git & GitHub', style: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200' },
      { name: 'Vercel Deployment', style: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200' },
      { name: 'Supabase & PostgreSQL', style: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
      { name: 'React & Tailwind (AI-Assisted)', style: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300' },
      { name: 'Vite', style: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300' },
    ],
  },
  {
    index: '04',
    title: 'Design & Illustration',
    subtitle: '5+ Years Commercial Craft',
    description:
      'Bringing five years of studio and freelance art experience into web interfaces through visual hierarchy, color theory, and custom assets.',
    skills: [
      { name: 'Digital Illustration', style: 'border-pink-400/30 bg-pink-400/10 text-pink-300' },
      { name: 'Character & Concept Art', style: 'border-pink-400/30 bg-pink-400/10 text-pink-300' },
      { name: 'UI Visual Hierarchy', style: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
      { name: 'Color & Composition', style: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
      { name: 'WebP Optimization', style: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
    ],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-14 sm:py-20"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mt-1.5 text-2xl font-bold tracking-tight text-text sm:text-3xl"
          >
            Technical &amp; Creative Stack
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
            Grounded in core web fundamentals, AI-assisted development workflows, and five years of commercial illustration.
          </p>
        </div>
      </Reveal>

      {/* Modern 2x2 Bento Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
        {SKILL_GROUPS.map((group, idx) => (
          <Reveal key={group.index} delayMs={idx * 90}>
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/85 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface sm:p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-xs text-accent">
                      {group.index}
                    </span>
                    <h3 className="text-base font-bold text-text sm:text-lg">
                      {group.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-border bg-bg/70 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    {group.subtitle}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                  {group.description}
                </p>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-transform duration-200 hover:scale-[1.03] ${skill.style}`}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Clean Workflow Callout */}
      <Reveal delayMs={360}>
        <div className="mt-5 rounded-2xl border border-border bg-surface/50 p-4 sm:mt-6 sm:p-5">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <p className="text-xs font-semibold text-text sm:text-sm">
              How I Build &amp; Learn
            </p>
            <span className="text-xs font-medium text-accent">
              Core Fundamentals · AI Tools · Visual Polish
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
            I combine my foundation in HTML, CSS, JavaScript, and Computer Science with modern AI coding tools to build and ship projects in stacks like React, TypeScript, and Supabase—guiding the UI direction, testing every feature, and continuously learning along the way.
          </p>
        </div>
      </Reveal>
    </section>
  )
}