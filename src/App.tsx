import { ArtGallery } from './components/ArtGallery'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Reveal } from './components/Reveal'
import { Skills } from './components/Skills'

function App() {
  return (
    <div className="relative z-10 min-h-screen">
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
  )
}

export default App