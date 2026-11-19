interface MobileHeroProps {
  onExploreProjects: () => void
}

const HIGHLIGHTS = [
  { label: 'Degree', value: 'BSCS · CvSU' },
  { label: 'Focus', value: 'Web & AI Dev' },
  { label: 'Studio', value: 'TopDeck · 5y Art' },
]

export function MobileHero({ onExploreProjects }: MobileHeroProps) {
  return (
    <section
      id="hero"
      aria-labelledby="mobile-hero-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-between px-4 pt-16 pb-5"
      style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      {/* Top Status Pill */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-1 text-[11px] font-medium text-text shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#111216]/85">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>TopDeck Illustrator · Open to Dev Roles</span>
        </span>
      </div>

      {/* Playful Architectural Portrait Stage */}
      <div className="relative mx-auto my-2 flex w-full max-w-[360px] flex-1 items-end justify-center overflow-hidden rounded-3xl border border-border/80 bg-surface/40 px-3 pt-2 dark:border-white/10 dark:bg-[#111216]/55">
        {/* Subtle Architectural Corner Ticks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-accent/60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-accent/60"
        />

        {/* Radial Electric Blue Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(79,140,255,0.22)_0%,transparent_70%)]"
        />

        {/* Playful Floating Micro-Badges */}
        <span className="pointer-events-none absolute top-7 left-3 z-20 rounded-xl border border-border bg-surface/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-text shadow-md backdrop-blur-md animate-[floatSlow_4.6s_ease-in-out_infinite] dark:border-white/12 dark:bg-[#161820]/90">
          React · TS · AI
        </span>

        <span className="pointer-events-none absolute right-3 bottom-12 z-20 rounded-xl border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent shadow-md backdrop-blur-md animate-[floatSlow_5.4s_ease-in-out_0.8s_infinite]">
          5+ yrs Art
        </span>

        <span className="pointer-events-none absolute bottom-4 left-3 z-20 rounded-xl border border-border bg-surface/90 px-2.5 py-1 font-mono text-[10px] font-medium text-muted shadow-md backdrop-blur-md animate-[floatSlow_5s_ease-in-out_0.4s_infinite] dark:border-white/12 dark:bg-[#161820]/90">
          Cavite, PH
        </span>

        {/* Portrait Cutout */}
        <img
          src="/mhelric-profile.webp"
          alt="Mhelric Banaag portrait"
          width={1215}
          height={1773}
          decoding="async"
          fetchPriority="high"
          className="relative z-10 hidden h-full max-h-[37svh] w-auto object-contain object-bottom dark:block"
        />
        <img
          src="/mhelric-profile-light.webp"
          alt="Mhelric Banaag portrait"
          width={1215}
          height={1773}
          decoding="async"
          className="relative z-10 block h-full max-h-[37svh] w-auto object-contain object-bottom dark:hidden"
        />

        {/* Bottom stage fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-surface/95 to-transparent dark:from-[#111216]/95"
        />
      </div>

      {/* Uncut Editorial Copy, CTAs & Metadata */}
      <div className="flex flex-col">
        <h1
          id="mobile-hero-heading"
          className="text-[clamp(1.4rem,6.2vw,1.9rem)] font-bold leading-[1.1] tracking-tight text-text"
        >
          Building modern web apps with{' '}
          <span className="text-accent">AI-assisted workflows</span> &amp; an
          artist&apos;s eye.
        </h1>

        <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
          Hi, I&apos;m <strong className="font-semibold text-text">Mhelric Banaag</strong> — a
          Computer Science graduate proficient in{' '}
          <span className="text-text">HTML, CSS, JavaScript, and modern AI dev tools</span>,
          backed by five years of commercial illustration and UI design.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-3.5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExploreProjects}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(79,140,255,0.38)] transition-transform active:scale-[0.98]"
          >
            View Projects
            <span aria-hidden="true">↓</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text transition-transform active:scale-[0.98] dark:border-white/12 dark:bg-[#111216]"
          >
            Resume ↗
          </a>
        </div>

        {/* Clean Non-Truncated 3-Column Metadata Strip */}
        <dl className="mt-3.5 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-surface/75 px-3 py-2.5 dark:border-white/10 dark:bg-[#111216]/75">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="text-center">
              <dt className="font-mono text-[9.5px] uppercase tracking-wider text-muted">
                {item.label}
              </dt>
              <dd className="mt-0.5 text-[11px] font-semibold text-text">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Subtle Swipe Cue */}
        <p className="mt-2.5 text-center font-mono text-[10px] tracking-widest text-muted/75 uppercase">
          Swipe up to explore
        </p>
      </div>
    </section>
  )
}
