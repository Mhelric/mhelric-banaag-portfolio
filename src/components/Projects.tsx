import { useEffect, useState, type TouchEvent } from 'react'
import { PROJECTS, type Project } from '../data/projects'

const TECH_TAG_STYLES: Record<string, string> = {
  JavaScript: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  HTML5: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
  CSS3: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  'PokéAPI': 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  'SerpAPI (Google Lens)': 'border-violet-400/30 bg-violet-400/10 text-violet-300',
  Vercel: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200',
  TypeScript: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  React: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  'Tailwind CSS': 'border-teal-400/30 bg-teal-400/10 text-teal-300',
  Supabase: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  Vite: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300',
  'Custom Illustration': 'border-pink-400/30 bg-pink-400/10 text-pink-300',
}

const DEFAULT_TAG_STYLE = 'border-border bg-bg text-muted'

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const totalSlides = PROJECTS.length

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Mobile touch-swipe support
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    setTouchStartX(null)
  }

  // Keyboard shortcuts: Escape closes modal, Left/Right arrows navigate carousel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      } else if (!selectedProject && event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
      } else if (!selectedProject && event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, totalSlides])

  return (
    <section
      id="projects"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
      aria-labelledby="projects-heading"
    >
      {/* Section Header + Carousel Controls */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            01 // Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-1.5 text-2xl font-semibold tracking-tight text-text sm:mt-2 sm:text-3xl"
          >
            Featured Projects
          </h2>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <span className="font-mono text-xs text-muted">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(totalSlides).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous project"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-sm text-muted transition-colors hover:border-accent/60 hover:text-text sm:h-9 sm:w-9"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next project"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-sm text-muted transition-colors hover:border-accent/60 hover:text-text sm:h-9 sm:w-9"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Carousel Viewport */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="mt-6 overflow-hidden rounded-xl border border-border bg-surface sm:mt-8"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROJECTS.map((project) => {
            const isShipped = project.status === 'shipped'
            const cleanDomain = project.liveUrl
              ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
              : 'preview-pending.local'

            return (
              <article
                key={project.id}
                className="w-full shrink-0 p-4 sm:p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Left Column: Larger Vercel-Style Live Site Preview Box */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
                      {/* Mini Browser / Vercel Frame Header */}
                      <div className="flex items-center justify-between border-b border-border bg-surface/90 px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-500/70"></span>
                          <span className="h-2 w-2 rounded-full bg-amber-400/70"></span>
                          <span className="h-2 w-2 rounded-full bg-emerald-400/70"></span>
                        </div>
                        <span className="truncate font-mono text-[10px] text-muted sm:text-[11px]">
                          {cleanDomain}
                        </span>
                        <span className="w-6"></span>
                      </div>

                      {/* 16:10 Preview Viewport */}
                      {isShipped && project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live preview of ${project.title}`}
                          className="group relative block aspect-[16/10] w-full overflow-hidden bg-bg"
                        >
                          <iframe
                            src={project.liveUrl}
                            title={`${project.title} live preview`}
                            loading="lazy"
                            tabIndex={-1}
                            className="pointer-events-none h-[250%] w-[250%] origin-top-left scale-40 border-0 sm:h-[200%] sm:w-[200%] sm:scale-50"
                          />
                          {/* Subtle Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                            <span className="rounded-lg bg-accent px-3.5 py-1.5 font-mono text-xs font-medium text-white shadow-lg">
                              Visit Live Site ↗
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-bg/80 p-6 text-center">
                          <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted">
                            In Development
                          </span>
                          <p className="max-w-[220px] text-xs text-muted">
                            Live deployment preview will appear here once shipped.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Details */}
                  <div className="flex flex-col justify-between lg:col-span-5">
                    <div>
                      {/* Top Meta Row: Category + Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-accent sm:text-xs">
                          {project.category}
                        </span>

                        {isShipped ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-border bg-bg/60 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                            In Development
                          </span>
                        )}
                      </div>

                      {/* Title & Summary */}
                      <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-text sm:mt-3 sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-2.5 sm:text-sm">
                        {project.summary}
                      </p>

                      {/* Colored Tech Stack Pills */}
                      <ul
                        aria-label="Technologies used"
                        className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2"
                      >
                        {project.techStack.map((tech) => {
                          const badgeStyle =
                            TECH_TAG_STYLES[tech] ?? DEFAULT_TAG_STYLE
                          return (
                            <li
                              key={tech}
                              className={`rounded-md border px-2 py-0.5 font-mono text-[11px] sm:px-2.5 sm:py-1 sm:text-xs ${badgeStyle}`}
                            >
                              {tech}
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Action Links (Responsive on mobile & desktop) */}
                    {isShipped && (
                      <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border pt-4 sm:mt-7 sm:gap-3 sm:pt-5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
                          >
                            Live Demo
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2 font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent sm:flex-initial"
                          >
                            GitHub Repo
                          </a>
                        )}

                        {project.caseStudy && (
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-text sm:ml-auto sm:w-auto"
                          >
                            Read Case Study →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Bottom Slide Indicator Dots */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5">
        {PROJECTS.map((project, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}: ${project.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-7 bg-accent' : 'w-2 bg-border hover:bg-muted'
              }`}
            />
          )
        })}
      </div>

      {/* Case Study Modal */}
      {selectedProject && selectedProject.caseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  Project Case Study
                </p>
                <h3
                  id="case-study-title"
                  className="mt-1 text-lg font-semibold text-text sm:text-2xl"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="shrink-0 rounded-lg border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted hover:text-text"
              >
                ESC ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs leading-relaxed sm:mt-6 sm:space-y-5 sm:text-sm">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                  The Problem
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                  My Role
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.role}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                  Key Challenges Solved
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.challenges}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
                  Outcome & Impact
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.outcome}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-bg/70 p-3.5 sm:p-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-text">
                  AI-Assisted Engineering Workflow
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {selectedProject.caseStudy.aiWorkflowNote}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5 border-t border-border pt-4 sm:gap-3">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-border bg-bg px-4 py-2 text-center font-mono text-xs text-text hover:border-accent/60 sm:flex-initial"
                >
                  View Source on GitHub
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-accent px-4 py-2 text-center text-xs font-medium text-white hover:opacity-90 sm:flex-initial"
                >
                  Open Live App ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}