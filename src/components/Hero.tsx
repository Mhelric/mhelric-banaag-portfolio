const HIGHLIGHTS = [
  { label: 'Education', value: 'BS Computer Science' },
  { label: 'Core Stack', value: 'TS • React • Tailwind • Supabase' },
  { label: 'Creative Edge', value: '5+ Yrs Art • TopDeck Studio' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="py-20 md:py-28"
      aria-labelledby="hero-heading"
    >
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
        </span>
        <span className="font-mono text-xs text-muted">
          Contract Artist @ <span className="text-text">TopDeck Studio</span> • Open to Dev Roles
        </span>
      </div>

      {/* Main Positioning Headline */}
      <h1
        id="hero-heading"
        className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl md:leading-[1.1]"
      >
        Front-end & full-stack developer with an{' '}
        <span className="text-accent">artist&apos;s eye</span> for detail.
      </h1>

      {/* Short Bio / Value Proposition */}
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Hi, I&apos;m <strong className="font-medium text-text">Mhelric Banaag</strong>—a
        BSCS graduate who builds fast, responsive web applications using{' '}
        <span className="text-text">TypeScript, React, Vite, Tailwind, and Supabase</span>,
        backed by five years of commercial illustration and client design experience.
      </p>

      {/* Primary & Secondary CTAs */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View Selected Work
          <span aria-hidden="true">→</span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Contact Me
        </a>
      </div>

      {/* Quick Snapshot Strip */}
      <dl className="mt-14 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface/60 px-4 py-3.5"
          >
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-text">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}