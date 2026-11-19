import { Reveal } from './Reveal'
import { ToolsMarquee } from './ToolsMarquee'

interface SkillGroup {
  title: string
  subtitle: string
  description: string
  skills: { name: string; style: string }[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Core Web Fundamentals',
    subtitle: 'Proficient',
    description:
      'Building clean, semantic markup, responsive layouts, and interactive browser logic using core web standards.',
    skills: [
      { name: 'HTML5', style: 'border-orange-500/40 bg-orange-500/10 text-orange-700 dark:border-orange-500/30 dark:text-orange-300' },
      { name: 'CSS3 (Grid & Flexbox)', style: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300' },
      { name: 'Vanilla JavaScript', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'DOM Manipulation', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'REST APIs', style: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:text-rose-300' },
      { name: 'Responsive UI', style: 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:border-teal-400/30 dark:text-teal-300' },
    ],
  },
  {
    title: 'AI-Assisted Development',
    subtitle: 'Core Workflow',
    description:
      'Leveraging modern AI coding tools to scaffold features, adapt to modern frameworks, debug faster, and ship complete web apps.',
    skills: [
      { name: 'AI Coding Assistants', style: 'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:text-violet-300' },
      { name: 'Prompt Engineering', style: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:text-indigo-300' },
      { name: 'Rapid Prototyping', style: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300' },
      { name: 'AI-Guided Debugging', style: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300' },
      { name: 'UI Polish & Iteration', style: 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:border-teal-400/30 dark:text-teal-300' },
    ],
  },
  {
    title: 'Tools & Stack Exposure',
    subtitle: 'Working Knowledge',
    description:
      'Deploying projects, managing Git workflows, working with relational databases from my internship, and building with AI support.',
    skills: [
      { name: 'Git & GitHub', style: 'border-zinc-500/35 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-200' },
      { name: 'Vercel Deployment', style: 'border-zinc-500/35 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-200' },
      { name: 'Supabase & PostgreSQL', style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300' },
      { name: 'React & Tailwind (AI-Assisted)', style: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300' },
      { name: 'Vite', style: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:text-indigo-300' },
    ],
  },
  {
    title: 'Design & Illustration',
    subtitle: '5+ Years Commercial Craft',
    description:
      'Bringing five years of studio and freelance art experience into web interfaces through visual hierarchy, color theory, and custom assets.',
    skills: [
      { name: 'Digital Illustration', style: 'border-pink-500/40 bg-pink-500/10 text-pink-700 dark:border-pink-400/30 dark:text-pink-300' },
      { name: 'Character & Concept Art', style: 'border-pink-500/40 bg-pink-500/10 text-pink-700 dark:border-pink-400/30 dark:text-pink-300' },
      { name: 'UI Visual Hierarchy', style: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300' },
      { name: 'Color & Composition', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'WebP Optimization', style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300' },
    ],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="flex min-h-[100svh] scroll-mt-0 flex-col justify-center border-t border-border pt-16 pb-3 sm:pt-[4.25rem] sm:pb-4"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mt-0.5 text-xl font-bold tracking-tight text-text sm:text-2xl lg:text-[1.75rem]"
          >
            Technical &amp; Creative Stack
          </h2>
          <p className="mt-0.5 max-w-2xl text-xs leading-snug text-muted sm:text-sm">
            Grounded in core web fundamentals, AI-assisted development workflows, and five years of commercial illustration.
          </p>
        </div>
      </Reveal>

      {/* Modern 2x2 Bento Grid */}
      <div className="mt-2.5 grid grid-cols-1 gap-2 sm:mt-3 sm:gap-2.5 md:grid-cols-2 lg:gap-3">
        {SKILL_GROUPS.map((group, idx) => (
          <Reveal key={group.title} delayMs={idx * 90}>
            <div className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface/85 p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface sm:p-3 xl:rounded-2xl xl:p-4 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-text sm:text-[15px] xl:text-base">
                    {group.title}
                  </h3>

                  <span className="shrink-0 rounded-full border border-border bg-bg/70 px-2 py-0.5 text-[10px] font-medium text-muted sm:px-2.5 sm:text-[11px]">
                    {group.subtitle}
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                  {group.description}
                </p>
              </div>

              <ul className="mt-2 flex flex-wrap gap-1 border-t border-border/70 pt-2 sm:gap-1.5 xl:mt-2.5 xl:pt-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-medium transition-transform duration-200 hover:scale-[1.03] sm:rounded-lg sm:text-[11px] xl:px-2.5 ${skill.style}`}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={320}>
        <ToolsMarquee />
      </Reveal>

      {/* Clean Workflow Callout */}
      <Reveal delayMs={360}>
        <div className="mt-2 rounded-xl border border-border bg-surface/75 p-2.5 shadow-sm sm:mt-2.5 sm:p-3 lg:mt-3 xl:rounded-2xl xl:p-3.5 dark:bg-surface/50 dark:shadow-none">
          <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-center">
            <p className="text-xs font-semibold text-text sm:text-sm">
              How I Build &amp; Learn
            </p>
            <span className="text-[11px] font-medium text-accent sm:text-xs">
              Core Fundamentals · AI Tools · Visual Polish
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
            I combine my foundation in HTML, CSS, JavaScript, and Computer Science with modern AI coding tools to build and ship projects in stacks like React, TypeScript, and Supabase—guiding the UI direction, testing every feature, and continuously learning along the way.
          </p>
        </div>
      </Reveal>
    </section>
  )
}