import { useRef, useState } from 'react'
import { PROJECTS, type Project } from '../../data/projects'
import { MobileBottomSheet } from './MobileBottomSheet'

const PROJECT_PREVIEWS: Record<string, string> = {
  'pass-vault': '/projects/pass-vault.webp',
  'meru-art-studio': '/projects/meru-art-studio.webp',
  'pokedex-lens': '/projects/pokedex-lens.webp',
  mirusync: '/projects/mirusync.webp',
}

const TECH_TAG_STYLES: Record<string, string> = {
  JavaScript: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300',
  HTML5: 'border-orange-500/40 bg-orange-500/10 text-orange-700 dark:border-orange-500/30 dark:text-orange-300',
  CSS3: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300',
  'PokéAPI': 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:text-rose-300',
  'SerpAPI (Google Lens)': 'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:text-violet-300',
  Vercel: 'border-zinc-500/35 bg-zinc-500/10 text-zinc-700 dark:border-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-200',
  TypeScript: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300',
  React: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300',
  Preact: 'border-purple-500/40 bg-purple-500/10 text-purple-700 dark:border-purple-400/30 dark:text-purple-300',
  'Tailwind CSS': 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:border-teal-400/30 dark:text-teal-300',
  Supabase: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300',
  PostgreSQL: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:border-blue-400/30 dark:text-blue-300',
  'Argon2id / AES-GCM': 'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:text-violet-300',
  Capacitor: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:text-sky-300',
  Android: 'border-lime-600/40 bg-lime-500/10 text-lime-700 dark:border-lime-400/30 dark:text-lime-300',
}

const DEFAULT_TAG_STYLE = 'border-border bg-bg text-muted'

function MobileProjectPreview({ project }: { project: Project }) {
  const screenshot = PROJECT_PREVIEWS[project.id]

  if (screenshot) {
    return (
      <img
        src={screenshot}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    )
  }

  if (project.id === 'lovey-games' && project.liveUrl) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-bg">
        <iframe
          src={project.liveUrl}
          title={`${project.title} live preview`}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-transparent"
        />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent/10 via-surface to-bg p-4 text-center">
      <span className="rounded-full border border-border bg-bg/80 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted">
        IN PROGRESS
      </span>
      <p className="mt-2 text-sm font-bold text-text">{project.title}</p>
      <p className="mt-1 text-[11px] text-muted">
        Registrar · Faculty · Student Portals
      </p>
    </div>
  )
}

export function MobileProjects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const cardWidth = el.clientWidth
    if (cardWidth <= 0) return
    const nextIdx = Math.round(el.scrollLeft / cardWidth)
    setActiveIdx(Math.max(0, Math.min(PROJECTS.length - 1, nextIdx)))
  }

  const scrollToCard = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section
      id="projects"
      aria-labelledby="mobile-projects-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-center px-4 pt-16 pb-6"
    >
      {/* Header Row */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
            Selected Work
          </p>
          <h2
            id="mobile-projects-heading"
            className="mt-0.5 text-xl font-bold tracking-tight text-text"
          >
            Featured Projects
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] text-muted">
            {activeIdx + 1} / {PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={() => scrollToCard(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            aria-label="Previous project"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-xs text-text disabled:opacity-35"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              scrollToCard(Math.min(PROJECTS.length - 1, activeIdx + 1))
            }
            disabled={activeIdx === PROJECTS.length - 1}
            aria-label="Next project"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-xs text-text disabled:opacity-35"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Swipeable Cards */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar mt-3 flex snap-x snap-mandatory overflow-x-auto"
      >
        {PROJECTS.map((project) => {
          const isShipped = project.status === 'shipped'
          const visibleTags = project.techStack.slice(0, 3)
          const extraTagCount = Math.max(0, project.techStack.length - 3)

          return (
            <article
              key={project.id}
              className="w-full shrink-0 snap-center px-0.5"
            >
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm dark:bg-[#111216]">
                {/* Lightweight 16:10 Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg">
                  <MobileProjectPreview project={project} />
                  <span
                    className={`absolute top-2.5 left-2.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium backdrop-blur-md ${
                      isShipped
                        ? 'border-emerald-500/40 bg-black/60 text-emerald-300'
                        : 'border-amber-500/40 bg-black/60 text-amber-300'
                    }`}
                  >
                    {isShipped ? 'Shipped' : 'In Progress'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-col p-3.5">
                  <p className="truncate text-[10px] font-medium uppercase tracking-wider text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-0.5 truncate text-base font-bold tracking-tight text-text">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  {/* Top 3 Tech Badges + Overflow */}
                  <ul className="mt-2.5 flex flex-wrap gap-1">
                    {visibleTags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                          TECH_TAG_STYLES[tag] ?? DEFAULT_TAG_STYLE
                        }`}
                      >
                        {tag}
                      </li>
                    ))}
                    {extraTagCount > 0 && (
                      <li className="rounded-md border border-border bg-bg px-2 py-0.5 text-[10px] font-medium text-muted">
                        +{extraTagCount}
                      </li>
                    )}
                  </ul>

                  {/* Action Row */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white"
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.apkUrl && (
                      <a
                        href={project.apkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-400/35 dark:text-emerald-300"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        APK
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-bg px-3 py-2 text-xs font-semibold text-text"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Swipe Hint Dots */}
      <div className="mt-2.5 flex justify-center gap-1.5">
        {PROJECTS.map((project, idx) => (
          <button
            key={project.id}
            type="button"
            onClick={() => scrollToCard(idx)}
            aria-label={`View ${project.title}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeIdx ? 'w-5 bg-accent' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Project Details & Case Study Bottom Sheet */}
      <MobileBottomSheet
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ''}
        subtitle={selectedProject?.category}
      >
        {selectedProject && (
          <div className="space-y-4 text-xs leading-relaxed">
            <p className="text-muted">{selectedProject.summary}</p>

            {/* Full Tech Stack */}
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                Tech Stack
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                      TECH_TAG_STYLES[tag] ?? DEFAULT_TAG_STYLE
                    }`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Study Breakdown */}
            {selectedProject.caseStudy && (
              <div className="space-y-3 border-t border-border pt-3">
                <div>
                  <h4 className="font-semibold text-text">The Problem</h4>
                  <p className="mt-0.5 text-muted">
                    {selectedProject.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text">My Role</h4>
                  <p className="mt-0.5 text-muted">
                    {selectedProject.caseStudy.role}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text">Key Challenges</h4>
                  <p className="mt-0.5 text-muted">
                    {selectedProject.caseStudy.challenges}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text">Outcome</h4>
                  <p className="mt-0.5 text-muted">
                    {selectedProject.caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            {/* Sheet Action Links */}
            <div className="flex flex-wrap gap-2 border-t border-border pt-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent px-3.5 py-2.5 text-xs font-semibold text-white"
                >
                  Open Live App ↗
                </a>
              )}
              {selectedProject.apkUrl && (
                <a
                  href={selectedProject.apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 dark:border-emerald-400/35 dark:text-emerald-300"
                >
                  Download Latest APK
                </a>
              )}
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-text"
                >
                  View Source on GitHub ↗
                </a>
              )}
            </div>
          </div>
        )}
      </MobileBottomSheet>
    </section>
  )
}
