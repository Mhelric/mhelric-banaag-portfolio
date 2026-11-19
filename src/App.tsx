import { ArtGallery } from './components/ArtGallery'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { IntroSplash } from './components/IntroSplash'
import { MobileLayout } from './components/mobile/MobileLayout'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Reveal } from './components/Reveal'
import { Skills } from './components/Skills'
import { useIsMobile } from './hooks/useIsMobile'

function App() {
  const isMobile = useIsMobile()

  return (
    <div className="relative min-h-screen">
      {!isMobile && <CustomCursor />}
      <IntroSplash />
      {isMobile ? (
        <div className="relative z-10">
          <MobileLayout />
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default App