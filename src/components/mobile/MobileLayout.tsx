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
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    id: 'art',
    label: 'Art',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
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
