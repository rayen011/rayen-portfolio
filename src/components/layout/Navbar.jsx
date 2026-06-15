import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          className="font-display font-bold text-xl tracking-tight"
        >
          <span className="text-gold">R</span>
          <span className="text-text-primary">ayen</span>
          <span className="text-gold">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Scroll progress + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div
            className="flex items-center gap-2"
            title={`${Math.round(progress * 100)}% scrolled`}
            aria-hidden="true"
          >
            <div className="relative w-16 h-1 rounded-full bg-border overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dim to-gold-bright transition-[width] duration-150"
                style={{ width: `${Math.max(progress * 100, 3)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-text-muted tabular-nums w-7">
              {Math.round(progress * 100)}%
            </span>
          </div>

          <a
            href="mailto:rayen@example.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-base transition-all duration-200"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-text-secondary hover:text-gold text-sm text-left transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:rayen@example.com"
            className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-base transition-all duration-200"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}
