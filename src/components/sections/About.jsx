import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCounter } from '@/hooks/useCounter'
import SectionLabel from '@/components/ui/SectionLabel'
import { STATS } from '@/lib/data'

// Your photo lives at /public/me.jpg. Until it's there (or if it fails to
// load) we fall back to the emoji placeholder so nothing looks broken.
const AVATAR_SRC = '/me.jpg'

function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-7xl">👨‍💻</span>
        <span className="text-text-muted text-xs font-mono">add your photo</span>
      </div>
    )
  }

  return (
    <img
      src={AVATAR_SRC}
      alt="Rayen"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  )
}

function StatCard({ value, suffix, label, start }) {
  const count = useCounter(value, 1500, start)
  return (
    <div className="flex flex-col items-center md:items-start gap-1">
      <span className="font-display font-bold text-4xl text-gold">
        {count}{suffix}
      </span>
      <span className="text-text-secondary text-sm">{label}</span>
    </div>
  )
}

export default function About() {
  const { ref, inView } = useScrollReveal()

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar + decorative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Gold ring frame */}
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-gold/40 p-1">
                <div className="w-full h-full rounded-full border border-gold/20 bg-surface overflow-hidden flex items-center justify-center">
                  <Avatar />
                </div>
              </div>
              {/* Floating tags */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono">
                Flutter + UI/UX
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-full bg-surface border border-border text-text-secondary text-xs font-mono">
                Tunisia 🇹🇳
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SectionLabel>About me</SectionLabel>

            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">
              I design and build apps that{' '}
              <span className="text-gold-gradient">people love to use.</span>
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed mb-10">
              <p>
                I'm a Flutter developer and UI/UX designer from Tunisia building
                production-quality mobile apps independently. My stack is Flutter + Firebase,
                clean architecture, and feature-first organization — apps that are ready to ship.
              </p>
              <p>
                I care just as much about how an app feels as how it's built. I design the
                interface in Figma, craft the flows, and turn them into pixel-perfect,
                smooth, motion-rich screens.
              </p>
              <p>
                And when an existing app is crashing, lagging, or just broken — I jump in,
                find the root cause, and fix it fast without breaking everything else.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} start={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
