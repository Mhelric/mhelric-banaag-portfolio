import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { BrandLogo } from './BrandLogo'

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

interface NavItem {
  id: string
  label: string
  href: string
  icon: ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    href: '#hero',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '#projects',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
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
    href: '#art',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
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
    href: '#experience',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    href: '#skills',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export function Navbar() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark'
    }
    return 'dark'
  })

  const applyThemeClass = (nextTheme: 'dark' | 'light') => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(nextTheme)
  }

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      // Ignore storage failures in private browsing
    }

    const doc = document as ViewTransitionDocument
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme)
      applyThemeClass(nextTheme)
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    document.documentElement.classList.add('theme-switching')

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
      applyThemeClass(nextTheme)
    })

    void (async () => {
      try {
        await transition.ready
        const clipAnim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
        await clipAnim.finished
      } catch {
        // Ignore aborted animations if toggled rapidly
      } finally {
        document.documentElement.classList.remove('theme-switching')
      }
    })()
  }

  useEffect(() => {
    let rafId = 0

    const updateActiveSection = () => {
      rafId = 0
      const triggerLine = window.innerHeight * 0.38
      let currentSection = 'hero'

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4

      if (atBottom) {
        currentSection = 'contact'
      } else {
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (rect.top <= triggerLine) {
            currentSection = item.id
          }
        }
      }

      setActiveId((prev) => (prev === currentSection ? prev : currentSection))
    }

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex items-center justify-center gap-2 px-3 sm:top-4 sm:gap-2.5">
        <nav
          aria-label="Main navigation"
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/85 p-1.5 shadow-[0_14px_34px_rgba(15,23,42,0.1)] backdrop-blur-md sm:gap-1.5 sm:px-2.5 dark:border-white/12 dark:bg-[#111216]/80 dark:shadow-[0_14px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
        >
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={() => setActiveId('hero')}
            aria-label="Mhelric Banaag — Home"
            className="inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-text transition-colors hover:text-accent"
          >
            <BrandLogo className="h-[15px] w-auto shrink-0" strokeWidth={3.2} />
            <span className="hidden sm:inline">MHELRIC</span>
          </a>

          <span
            aria-hidden="true"
            className="h-4 w-px bg-border dark:bg-white/10"
          />

          {/* Interactive Icon-to-Label Section Pills */}
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id
              const isHovered = hoveredId === item.id
              const isExpanded = isActive || isHovered

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setActiveId(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative flex items-center rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 ease-out ${
                      isActive
                        ? 'bg-accent text-white shadow-[0_0_16px_rgba(79,140,255,0.45)]'
                        : 'text-muted hover:bg-black/5 hover:text-text dark:hover:bg-white/8 dark:hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span
                      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                        isExpanded
                          ? 'ml-1.5 max-w-[84px] opacity-100'
                          : 'ml-0 max-w-0 opacity-0'
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Standalone Theme Toggle Button outside the navbar */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="pointer-events-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface/85 text-text shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur-md transition-all duration-200 outline-none hover:scale-105 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 dark:border-white/12 dark:bg-[#111216]/80 dark:shadow-[0_14px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
        >
          {theme === 'dark' ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </header>
  )
}
