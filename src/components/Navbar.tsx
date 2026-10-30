import { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Art', href: '#art' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4"
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="font-mono text-sm font-medium tracking-wider text-text transition-colors hover:text-accent"
        >
          MHELRIC<span className="text-accent">.DEV</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
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
              className="rounded-lg border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent"
            >
              Hire / Collaborate
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-surface p-2 text-muted transition-colors hover:text-text md:hidden"
        >
          <span className="font-mono text-xs">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1 text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}