import { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Art', href: '#art' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-[1160px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={closeMenu}
          className="font-mono text-sm font-semibold tracking-wider text-text transition-colors hover:text-accent"
        >
          MHELRIC<span className="text-accent">.DEV</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-7 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-lg border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text transition-colors hover:border-white/25"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-text md:hidden"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile Overlay Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-surface/95 px-4 py-4 shadow-2xl backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-bg/60 hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block w-full rounded-lg bg-accent py-2.5 text-center text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}