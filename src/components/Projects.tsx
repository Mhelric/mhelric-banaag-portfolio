import { useEffect, useRef, useState, type TouchEvent } from 'react'
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
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isSectionNear, setIsSectionNear] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const totalSlides = PROJECTS.length

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionNear(entry.isIntersecting)
      },
      { rootMargin: '250px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

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
      ref={sectionRef}
      id="projects"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-14 sm:py-20"
      aria-labelledby="projects-heading"
    >
      {/* Section Header */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Projects
        </p>
        <h2
          id="projects-heading"
          className="mt-1.5 text-2xl font-bold tracking-tight text-text sm:text-3xl"
        >
          Featured Projects
        </h2>
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
          {PROJECTS.map((project, slideIndex) => {
            const isShipped = project.status === 'shipped'
            const shouldMountIframe = isSectionNear && slideIndex === currentIndex
            const cleanDomain = project.liveUrl
              ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
              : 'In development'

            return (
              <article
                key={project.id}
                className="w-full shrink-0 p-4 sm:p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Left Column: Website Preview Box */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
                      <div className="flex items-center justify-between border-b border-border bg-surface/90 px-3.5 py-2">
                        <span className="truncate font-mono text-[11px] text-muted">
                          {cleanDomain}
                        </span>
                        {isShipped && (
                          <span className="text-[11px] font-medium text-emerald-400">
                            Live
                          </span>
                        )}
                      </div>

                      {isShipped && project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live preview of ${project.title}`}
                          className="group relative block aspect-[16/10] w-full overflow-hidden bg-bg"
                        >
                          {shouldMountIframe ? (
                            <iframe
                              src={project.liveUrl}
                              title={`${project.title} live preview`}
                              loading="lazy"
                              tabIndex={-1}
                              className="pointer-events-none h-[250%] w-[250%] origin-top-left scale-40 border-0 sm:h-[200%] sm:w-[200%] sm:scale-50"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-bg text-xs text-muted">
                              Loading live preview…
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                            <span className="rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-lg">
                              Visit Live Site
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-bg/80 p-6 text-center">
                          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
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
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-accent">
                          {project.category}
                        </span>

                        {isShipped ? (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            Live
                          </span>
                        ) : (
                          <span className="rounded-full border border-border bg-bg/60 px-2.5 py-0.5 text-xs text-muted">
                            In Development
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2.5 text-lg font-bold tracking-tight text-text sm:mt-3 sm:text-2xl">
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
                              className={`rounded-md border px-2.5 py-1 text-xs font-medium ${badgeStyle}`}
                            >
                              {tech}
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {isShipped && (
                      <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border pt-4 sm:mt-7 sm:gap-3 sm:pt-5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 whitespace-nowrap items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial"
                          >
                            Live Demo
                          </a>
                        )}

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 whitespace-nowrap items-center justify-center rounded-lg border border-border bg-bg px-4 py-2 text-xs font-medium text-text transition-colors hover:border-white/25 sm:flex-initial"
                          >
                            GitHub Repo
                          </a>
                        )}

                        {project.caseStudy && (
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex w-full whitespace-nowrap items-center justify-center rounded-lg border border-border bg-bg px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-white/25 hover:text-text sm:ml-auto sm:w-auto"
                          >
                            Read Case Study
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

      {/* Bottom Centered Controls: Prev + Slide Dots + Next */}
      <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous project"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-white/25 hover:text-text"
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
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

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next project"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-white/25 hover:text-text"
        >
          Next
        </button>
      </div>

      {/* Case Study Modal */}
      {selectedProject && selectedProject.caseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  Project Case Study
                </p>
                <h3
                  id="case-study-title"
                  className="mt-1 text-lg font-bold text-text sm:text-2xl"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="shrink-0 whitespace-nowrap rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-medium text-muted hover:text-text"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs leading-relaxed sm:mt-6 sm:space-y-5 sm:text-sm">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text">
                  The Problem
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text">
                  My Role
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.role}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Key Challenges Solved
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.challenges}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Outcome
                </h4>
                <p className="mt-1.5 text-muted">
                  {selectedProject.caseStudy.outcome}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Development Workflow
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
                  className="flex-1 whitespace-nowrap rounded-lg border border-border bg-bg px-4 py-2 text-center text-xs font-medium text-text hover:border-white/25 sm:flex-initial"
                >
                  View Source on GitHub
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-center text-xs font-medium text-white hover:opacity-90 sm:flex-initial"
                >
                  Open Live App
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
