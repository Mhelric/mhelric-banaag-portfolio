interface MobileHeroProps {
  onExploreProjects: () => void
}

const HIGHLIGHTS = [
  { label: 'Education', value: 'BSCS · CvSU' },
  { label: 'Web & AI', value: 'HTML/CSS/JS + AI' },
  { label: 'Creative', value: 'TopDeck · 5y Art' },
]

export function MobileHero({ onExploreProjects }: MobileHeroProps) {
  return (
    <section
      id="hero"
      aria-labelledby="mobile-hero-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-between px-4 pt-14 pb-20"
    >
      {/* Editorial Portrait Area with soft radial glow & bottom fade */}
      <div className="relative flex flex-1 items-end justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(79,140,255,0.18)_0%,transparent_70%)]"
        />

        <img
          src="/mhelric-profile.webp"
          alt="Mhelric Banaag portrait"
          width={1215}
          height={1773}
          decoding="async"
          fetchPriority="high"
          className="relative z-10 hidden h-full max-h-[34svh] w-auto object-contain object-bottom dark:block"
        />
        <img
          src="/mhelric-profile-light.webp"
          alt="Mhelric Banaag portrait"
          width={1215}
          height={1773}
          decoding="async"
          className="relative z-10 block h-full max-h-[34svh] w-auto object-contain object-bottom dark:hidden"
        />

        {/* Soft bottom gradient fade into the editorial copy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-bg to-transparent"
        />
      </div>

      {/* Editorial Copy & CTAs */}
      <div className="relative z-20 -mt-2 flex flex-col">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          TopDeck Studio Illustrator · Open to Dev Roles
        </p>

        <h1
          id="mobile-hero-heading"
          className="mt-1.5 text-[clamp(1.45rem,6.5vw,1.95rem)] font-bold leading-[1.1] tracking-tight text-text"
        >
          Building modern web apps with{' '}
          <span className="text-accent">AI-assisted workflows</span> &amp; an
          artist&apos;s eye.
        </h1>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
          I&apos;m <strong className="font-semibold text-text">Mhelric Banaag</strong> — CS
          graduate crafting fast React &amp; TypeScript apps backed by 5 years of
          commercial illustration.
        </p>

        <div className="mt-3.5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExploreProjects}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(79,140,255,0.35)] transition-opacity active:opacity-90"
          >
            View Projects
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text transition-colors active:bg-surface/80"
          >
            Resume ↗
          </a>
        </div>

        {/* Compact 3-Column Architectural Metadata Strip */}
        <dl className="mt-3.5 grid grid-cols-3 gap-2 border-t border-border pt-2.5">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="truncate text-[10px] text-muted">{item.label}</dt>
              <dd className="mt-0.5 truncate text-[11px] font-medium text-text">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
