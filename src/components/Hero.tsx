import { BinaryPortrait } from './BinaryPortrait'

const HIGHLIGHTS = [
  { label: 'Education', value: 'BS Computer Science · CvSU' },
  { label: 'Core Web & Workflow', value: 'HTML, CSS, JavaScript & AI Tools' },
  { label: 'Creative Background', value: 'TopDeck Studio & 5 Years Freelance Art' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[100svh] scroll-mt-0 flex-col justify-between pt-16 pb-4 sm:pt-[4.5rem] sm:pb-5 lg:pb-6"
      aria-labelledby="hero-heading"
    >
      <div className="mt-auto grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Text & CTAs */}
        <div className="self-center pb-2 lg:col-span-7 lg:pb-8">
          <p className="text-xs font-medium tracking-wide text-accent sm:text-sm">
            Illustrator at TopDeck Studio · Open to Developer Roles
          </p>

          <h1
            id="hero-heading"
            className="mt-2.5 text-[clamp(1.65rem,min(4.5vw,5.6svh),3.25rem)] font-bold leading-[1.08] tracking-tight text-text sm:mt-4"
          >
            Building modern web apps with{' '}
            <span className="text-accent">AI-assisted workflows</span> and an artist&apos;s eye.
          </h1>

          <p className="mt-2.5 max-w-2xl text-xs leading-relaxed text-muted sm:mt-4 sm:text-[clamp(0.875rem,1.9svh,1.125rem)]">
            Hi, I&apos;m <strong className="font-semibold text-text">Mhelric Banaag</strong>—a
            Computer Science graduate proficient in{' '}
            <span className="text-text">HTML, CSS, JavaScript, and modern AI development tools</span>,
            backed by five years of commercial digital illustration and UI design experience.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial sm:text-sm"
            >
              View Projects
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-xs font-medium text-text transition-colors hover:border-black/20 dark:hover:border-white/25 sm:flex-initial sm:text-sm"
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* Right Column: Portrait resting flush on the metadata divider */}
        <div className="flex justify-center lg:col-span-5">
          <BinaryPortrait />
        </div>
      </div>

      {/* Architectural Metadata Strip */}
      <dl className="grid grid-cols-1 gap-2.5 border-t border-border pt-3 sm:grid-cols-3 sm:gap-6 sm:pt-4 lg:gap-8 lg:pt-5">
        {HIGHLIGHTS.map((item) => (
          <div key={item.label}>
            <dt className="text-[11px] text-muted sm:text-xs">{item.label}</dt>
            <dd className="mt-0.5 text-xs font-medium text-text sm:mt-1 sm:text-sm">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
