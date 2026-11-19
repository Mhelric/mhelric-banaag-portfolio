import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { BrandLogo } from '../BrandLogo'

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

interface MobileHeaderProps {
  onLogoClick: () => void
}

export function MobileHeader({ onLogoClick }: MobileHeaderProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
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
            duration: 550,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
        await clipAnim.finished
      } catch {
        // Ignore aborted animations
      } finally {
        document.documentElement.classList.remove('theme-switching')
      }
    })()
  }

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-3 pb-2"
      style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
    >
      <button
        type="button"
        onClick={onLogoClick}
        aria-label="Back to Home"
        className="pointer-events-auto inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface/85 px-3.5 text-text shadow-[0_8px_24px_rgba(15,23,42,0.1)] backdrop-blur-md transition-transform active:scale-95 dark:border-white/12 dark:bg-[#111216]/80 dark:shadow-[0_10px_28px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      >
        <BrandLogo className="h-[15px] w-auto" strokeWidth={3.2} />
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/85 text-text shadow-[0_8px_24px_rgba(15,23,42,0.1)] backdrop-blur-md transition-transform active:scale-95 dark:border-white/12 dark:bg-[#111216]/80 dark:shadow-[0_10px_28px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
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
