import { ArtGallery } from './components/ArtGallery'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Experience } from './components/Experience'
import { GridBackground } from './components/GridBackground'
import { Hero } from './components/Hero'
import { IntroSplash } from './components/IntroSplash'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Reveal } from './components/Reveal'
import { Skills } from './components/Skills'

function App() {
  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <IntroSplash />
      <GridBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Hero />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Reveal>
            <ArtGallery />
          </Reveal>
          <Experience />
          <Skills />
          <Reveal>
            <Contact />
          </Reveal>
        </main>
      </div>
    </div>
  )
}

export default App