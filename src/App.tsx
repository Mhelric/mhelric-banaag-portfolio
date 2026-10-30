import { ArtGallery } from './components/ArtGallery'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1160px] px-4 pb-16 sm:px-6 lg:px-8">
        <Hero />
        <Projects />
        <ArtGallery />

        <section
          id="experience"
          className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            03 // Experience & Education
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Career Timeline
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">
            [Phase 6 Section Ready]
          </p>
        </section>

        <section
          id="skills"
          className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            04 // Technical & Creative Stack
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Skills & Tooling
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">
            [Phase 6 Section Ready]
          </p>
        </section>

        <section
          id="contact"
          className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center border-t border-border py-12 sm:py-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            05 // Get In Touch
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            About & Contact
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">
            [Phase 6 Section Ready]
          </p>
        </section>
      </main>
    </div>
  )
}

export default App