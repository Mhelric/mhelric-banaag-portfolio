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
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center py-8 sm:py-12 lg:py-14"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Text & CTAs */}
        <div className="pb-2 lg:col-span-7 lg:pb-12">
          <p className="text-xs font-medium tracking-wide text-accent sm:text-sm">
            Illustrator at TopDeck Studio · Open to Developer Roles
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-text sm:mt-5 sm:text-5xl lg:text-[52px] lg:leading-[1.08]"
          >
            Building modern web apps with{' '}
            <span className="text-accent">AI-assisted workflows</span> and an artist&apos;s eye.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base lg:text-lg">
            Hi, I&apos;m <strong className="font-semibold text-text">Mhelric Banaag</strong>—a
            Computer Science graduate proficient in{' '}
            <span className="text-text">HTML, CSS, JavaScript, and modern AI development tools</span>,
            backed by five years of commercial digital illustration and UI design experience.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
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
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-xs font-medium text-text transition-colors hover:border-white/25 sm:flex-initial sm:text-sm"
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Minimalist Binary Portrait */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <BinaryPortrait />
        </div>
      </div>

      {/* Architectural Metadata Strip */}
      <dl className="grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3 sm:gap-8 sm:pt-8">
        {HIGHLIGHTS.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium text-text">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}