import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data'
import { scrollToTarget } from '@/components/ui/SmoothScroll'
import Magnetic from '@/components/ui/Magnetic'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 160 && !menuOpen)
  })

  // Track the section in view for the sliding indicator
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const go = (href) => {
    setMenuOpen(false)
    setTimeout(() => scrollToTarget(href), menuOpen ? 250 : 0)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-gold-dim via-gold to-gold-bright"
        />

        <nav
          className={`transition-all duration-500 ${
            scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
          }`}
        >
          <div className="container-x h-[68px] flex items-center justify-between relative">
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); go(0) }}
              className="font-display font-extrabold text-xl tracking-tight relative z-10"
              aria-label="Back to top"
            >
              Rayen<span className="text-gold">.</span>
            </a>

            {/* Desktop pill nav */}
            <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1 rounded-full border border-white/10 glass">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href
                return (
                  <li key={link.href} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <button
                      onClick={() => go(link.href)}
                      className={`relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* CTA */}
            <div className="hidden md:block">
              <Magnetic strength={0.3}>
                <button
                  onClick={() => go('#contact')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-base text-sm font-semibold hover:bg-gold transition-colors duration-300"
                >
                  Let's talk
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </button>
              </Magnetic>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden relative z-[70] flex flex-col justify-center gap-1.5 w-10 h-10"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-px w-6 bg-text-primary mx-auto transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`block h-px w-6 bg-text-primary mx-auto transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 34px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 34px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 34px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.button
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => go(link.href)}
                    className="font-display font-extrabold text-5xl tracking-tight text-text-primary hover:text-gold transition-colors flex items-baseline gap-3"
                  >
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gold text-lg font-medium">
                {SOCIAL_LINKS.email}
              </a>
              <div className="flex gap-6 text-sm text-text-secondary">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
