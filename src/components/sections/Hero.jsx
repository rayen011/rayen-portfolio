import { useEffect, useState } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { PROFILE, HERO_ROLES, TICKER, SOCIAL_LINKS, LATEST_RELEASE } from '@/lib/data'
import { scrollToTarget } from '@/components/ui/SmoothScroll'
import PhoneMockup from '@/components/ui/PhoneMockup'
import RevealText from '@/components/ui/RevealText'
import Magnetic from '@/components/ui/Magnetic'
import Marquee from '@/components/ui/Marquee'

function useTypewriter(words, { type = 70, erase = 40, hold = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]
    let t
    if (!deleting && text === current) t = setTimeout(() => setDeleting(true), hold)
    else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      t = setTimeout(
        () => setText((prev) => (deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1))),
        deleting ? erase : type
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, type, erase, hold])

  return text
}

export default function Hero({ ready }) {
  const role = useTypewriter(HERO_ROLES)

  // cursor spotlight
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${mx}% ${my}%, rgba(245,166,35,0.09), transparent 60%)`
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  const fade = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* background layers, back to front: aurora, two grids, spotlight, vignette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="aurora -top-56 -left-44 w-[640px] h-[640px] bg-gold/[0.13] animate-drift" />
        <div className="aurora -bottom-56 -right-32 w-[680px] h-[680px] bg-[#8B5CF6]/[0.11] animate-drift [animation-delay:-11s]" />
        <div className="aurora top-1/3 left-1/2 w-[420px] h-[420px] bg-[#3B82F6]/[0.07] animate-drift [animation-delay:-5s]" />
      </div>
      <div className="absolute inset-0 bg-grid-fine [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black_15%,transparent_78%)] pointer-events-none" aria-hidden="true" />
      <motion.div style={{ background: spotlight }} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,#070708_100%)]" aria-hidden="true" />

      {/* content */}
      <div className="relative z-10 flex-1 container-x grid lg:grid-cols-12 gap-12 lg:gap-6 items-center pt-28 pb-14 lg:pt-24 lg:pb-10">
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* availability + the newest thing that shipped */}
          <motion.div {...fade(0.1)} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 glass">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-text-secondary text-xs sm:text-sm font-mono">{PROFILE.availabilityLabel}</span>
            </span>
            <a
              href={LATEST_RELEASE.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/[0.08] text-xs sm:text-sm font-mono text-gold hover:border-gold/60 hover:bg-gold/[0.14] transition-colors"
            >
              {LATEST_RELEASE.label}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </motion.div>

          {/* name + typewriter */}
          <motion.p {...fade(0.2)} className="font-mono text-sm text-text-secondary mb-5 h-6">
            <span className="text-text-primary">{PROFILE.firstName} {PROFILE.lastName}</span>
            <span className="text-text-muted"> — </span>
            <span className="text-gold">{role}</span>
            <span className="caret text-gold">|</span>
          </motion.p>

          {/* headline */}
          <RevealText
            as="h1"
            text="Mobile apps that feel as good as they *work.*"
            animate={ready}
            delay={0.3}
            stagger={0.06}
            className="font-display font-extrabold display-xl mb-7"
          />

          {/* description */}
          <motion.p {...fade(0.9)} className="text-text-secondary text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            I take apps from idea to store — design, Flutter front end, Firebase backend,
            tests and launch. No handoffs, no half-finished MVPs.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(1.05)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToTarget('#work')}
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-gold text-base font-display font-bold text-sm tracking-wide hover:bg-gold-bright hover:shadow-gold transition-all duration-300"
              >
                See my work
                <span className="w-9 h-9 rounded-full bg-base/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToTarget('#contact')}
                className="inline-flex items-center gap-2 px-7 py-[1.05rem] rounded-full border border-white/15 text-text-secondary text-sm font-medium hover:border-gold hover:text-gold transition-all duration-300"
              >
                Start a project ↗
              </button>
            </Magnetic>
          </motion.div>

          {/* proof row */}
          <motion.div {...fade(1.2)} className="mt-12 flex items-center justify-center lg:justify-start gap-5 text-xs font-mono text-text-muted">
            <span>Recent builds</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-text-secondary">Life Tycoon · RESTOCK · Stockfy · StudySwap</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <PhoneMockup ready={ready} />
        </div>
      </div>

      {/* ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 border-t border-white/5 glass"
      >
        <Marquee
          items={TICKER}
          speed={38}
          className="py-4"
          render={(item) => (
            <span className="flex items-center gap-6 px-6 font-mono text-xs sm:text-sm tracking-widest uppercase text-text-secondary whitespace-nowrap">
              {item}
              <span className="text-gold">✦</span>
            </span>
          )}
        />
      </motion.div>

      {/* side social rail */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={ready ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="hidden xl:flex absolute left-8 bottom-28 flex-col items-center gap-5"
      >
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="font-mono text-[11px] tracking-[0.3em] uppercase text-text-muted hover:text-gold transition-colors [writing-mode:vertical-rl]">GitHub</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[11px] tracking-[0.3em] uppercase text-text-muted hover:text-gold transition-colors [writing-mode:vertical-rl]">LinkedIn</a>
        <span className="w-px h-16 bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  )
}
