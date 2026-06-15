import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AmbientBackground from '@/components/ui/AmbientBackground'
import PhoneMockup from '@/components/ui/PhoneMockup'

const ROLES = [
  'Flutter Developer',
  'UI/UX App Designer',
  'Mobile App Builder',
  'App Bug Fixer',
  'MENA App Maker',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (!isDeleting && displayText === current) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, isDeleting ? 50 : 80)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background */}
      <AmbientBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,35,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-24 lg:pt-0">
        {/* Left column — intro */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-text-secondary text-sm font-mono">Based in Tunisia · Open to remote</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight"
          >
            Hi, I'm{' '}
            <span className="text-gold-gradient">Rayen</span>
            <span className="text-gold">.</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="h-12 md:h-14 flex items-center justify-center lg:justify-start mb-6"
          >
            <span className="font-display text-2xl md:text-3xl text-text-secondary">
              {displayText}
              <span className="cursor-blink ml-0.5">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            I design, build, and fix mobile apps with Flutter — from clean UI/UX
            to production code that ships. Got an app idea or a broken one? I've got you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-lg bg-gold text-base font-display font-semibold text-sm tracking-wide hover:bg-gold-bright transition-all duration-200 hover:shadow-gold"
            >
              See my work
            </button>
            <a
              href="/cv.pdf"
              download
              className="px-8 py-3.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:border-gold hover:text-gold transition-all duration-200"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right column — animated app preview */}
        <div className="relative">
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-gold transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-gold to-transparent animate-pulse" />
      </motion.button>
    </section>
  )
}
