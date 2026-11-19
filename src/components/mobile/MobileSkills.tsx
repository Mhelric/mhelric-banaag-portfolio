import { useState } from 'react'

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
      'Clean semantic markup, responsive layouts, and interactive browser logic using core web standards.',
    skills: [
      { name: 'HTML5', style: 'border-orange-500/40 bg-orange-500/10 text-orange-700 dark:border-orange-500/30 dark:text-orange-300' },
      { name: 'CSS3 (Grid & Flex)', style: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300' },
      { name: 'JavaScript', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'DOM Manipulation', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'REST APIs', style: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:text-rose-300' },
      { name: 'Responsive UI', style: 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:border-teal-400/30 dark:text-teal-300' },
    ],
  },
  {
    title: 'AI-Assisted Development',
    subtitle: 'Core Workflow',
    description:
      'Leveraging modern AI coding tools to scaffold features, debug faster, and ship complete web apps.',
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
      'Deploying projects, managing Git workflows, and building with Supabase, PostgreSQL, React, and Vite.',
    skills: [
      { name: 'Git & GitHub', style: 'border-zinc-500/35 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-200' },
      { name: 'Vercel Deployment', style: 'border-zinc-500/35 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-200' },
      { name: 'Supabase & PostgreSQL', style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300' },
      { name: 'React & Tailwind', style: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300' },
      { name: 'Vite', style: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:text-indigo-300' },
    ],
  },
  {
    title: 'Design & Illustration',
    subtitle: '5+ Years Craft',
    description:
      'Bringing five years of studio and freelance art experience into UI visual hierarchy, color, and assets.',
    skills: [
      { name: 'Digital Illustration', style: 'border-pink-500/40 bg-pink-500/10 text-pink-700 dark:border-pink-400/30 dark:text-pink-300' },
      { name: 'Character & Concept Art', style: 'border-pink-500/40 bg-pink-500/10 text-pink-700 dark:border-pink-400/30 dark:text-pink-300' },
      { name: 'UI Visual Hierarchy', style: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300' },
      { name: 'Color & Composition', style: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300' },
      { name: 'WebP Optimization', style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300' },
    ],
  },
]

export function MobileSkills() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      id="skills"
      aria-labelledby="mobile-skills-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-center px-4 pt-16 pb-6"
    >
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
          Capabilities
        </p>
        <h2
          id="mobile-skills-heading"
          className="mt-0.5 text-xl font-bold tracking-tight text-text"
        >
          Technical &amp; Creative Stack
        </h2>
        <p className="mt-1 text-xs text-muted">
          Tap any category to inspect tools and capabilities.
        </p>
      </div>

      {/* Compact Expandable Accordion Stack */}
      <div className="mt-3.5 space-y-2">
        {SKILL_GROUPS.map((group, idx) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={group.title}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen
                  ? 'border-accent/45 bg-surface shadow-sm dark:bg-[#111216]'
                  : 'border-border bg-surface/75 dark:bg-[#111216]/75'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-text">
                    {group.title}
                  </h3>
                  <p className="text-[10px] font-medium text-accent">
                    {group.subtitle}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-xs text-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-180 border-accent/40 text-accent' : ''
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border/70 px-3.5 pt-2.5 pb-3.5">
                  <p className="text-xs leading-relaxed text-muted">
                    {group.description}
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${skill.style}`}
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
