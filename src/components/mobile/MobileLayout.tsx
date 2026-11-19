import { useCallback, useEffect, useRef, useState } from 'react'
import { MobileArt } from './MobileArt'
import { MobileContact } from './MobileContact'
import { MobileExperience } from './MobileExperience'
import { MobileHeader } from './MobileHeader'
import { MobileHero } from './MobileHero'
import { MobileProjects } from './MobileProjects'
import { MobileScrollRail, type MobileSlideMeta } from './MobileScrollRail'
import { MobileSkills } from './MobileSkills'

const SLIDES: MobileSlideMeta[] = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'art', label: 'Art' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function MobileLayout() {
  const deckRef = useRef<HTMLDivElement | null>(null)
  const hideTimerRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [railVisible, setRailVisible] = useState(false)

  const revealRailTemporarily = useCallback(() => {
    setRailVisible(true)
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = window.setTimeout(() => {
      setRailVisible(false)
      hideTimerRef.current = null
    }, 1450)
  }, [])

  const scrollToSlide = (index: number) => {
    const deck = deckRef.current
    if (!deck) return
    const target = deck.children[index] as HTMLElement | undefined
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return

    const slideElements = Array.from(deck.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = slideElements.indexOf(entry.target as HTMLElement)
            if (idx !== -1) {
              setActiveIndex(idx)
            }
          }
        }
      },
      {
        root: deck,
        threshold: [0.55],
      }
    )

    slideElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      <MobileHeader onLogoClick={() => scrollToSlide(0)} />

      <main
        ref={deckRef}
        onScroll={revealRailTemporarily}
        className="no-scrollbar h-[100svh] w-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth"
      >
        <MobileHero onExploreProjects={() => scrollToSlide(1)} />
        <MobileProjects />
        <MobileArt />
        <MobileExperience />
        <MobileSkills />
        <MobileContact />
      </main>

      <MobileScrollRail
        slides={SLIDES}
        activeIndex={activeIndex}
        visible={railVisible}
        onSelect={scrollToSlide}
        onInteract={revealRailTemporarily}
      />
    </div>
  )
}
