const HIGHLIGHTS = [
  { label: 'Education', value: 'BS Computer Science' },
  { label: 'Core Stack', value: 'TS • React • Tailwind • Supabase' },
  { label: 'Creative Edge', value: '5+ Yrs Art • TopDeck Studio' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center py-8 sm:py-12 lg:py-14"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Text & CTAs */}
        <div className="pb-2 lg:col-span-7 lg:pb-12">
          {/* Status Badge */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 sm:gap-2.5 sm:px-3.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="truncate font-mono text-[11px] text-muted sm:text-xs">
              Contract Artist @ <span className="text-text">TopDeck Studio</span> • Open to Dev Roles
            </span>
          </div>

          {/* Main Positioning Headline */}
          <h1
            id="hero-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-text sm:mt-6 sm:text-5xl lg:text-[52px] lg:leading-[1.1]"
          >
            Front-end & full-stack developer with an{' '}
            <span className="text-accent">artist&apos;s eye</span> for detail.
          </h1>

          {/* Short Bio / Value Proposition */}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base lg:text-lg">
            Hi, I&apos;m <strong className="font-medium text-text">Mhelric Banaag</strong>—a
            BSCS graduate who builds fast, responsive web applications using{' '}
            <span className="text-text">TypeScript, React, Vite, Tailwind, and Supabase</span>,
            backed by five years of commercial illustration and client design experience.
          </p>

          {/* Primary & Secondary CTAs (Full-width pair on phone, inline on tablet/desktop) */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial sm:px-5 sm:text-sm"
            >
              View Selected Work
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#contact"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-medium text-text transition-colors hover:border-accent/60 hover:text-accent sm:flex-initial sm:px-5 sm:text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Column: Transparent Portrait Anchored Flush to the Divider Line */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <img
            src="/mhelric-profile.webp"
            alt="Mhelric Banaag"
            className="block h-auto w-full max-w-[230px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] sm:max-w-[290px] lg:max-w-[380px] xl:max-w-[420px]"
          />
        </div>
      </div>

      {/* Quick Snapshot Strip (border-t sits flush against the bottom of the portrait) */}
      <dl className="grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-3 sm:gap-4 sm:pt-7">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface/60 px-4 py-3"
          >
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted sm:text-[11px]">
              {item.label}
            </dt>
            <dd className="mt-0.5 text-xs font-medium text-text sm:mt-1 sm:text-sm">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}