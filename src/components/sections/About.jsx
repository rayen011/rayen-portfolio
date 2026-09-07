import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'
import SectionHeading from '@/components/ui/SectionHeading'
import { STATS, MARKETS, PROFILE } from '@/lib/data'

const PARAGRAPHS = [
  "I'm a Flutter developer and product designer from Tunisia. For the last three years I've been building mobile apps end to end — the Figma flows, the Flutter front end, the Firebase or Supabase backend, the tests, and the store release.",
  "I care as much about how an app feels as how it's built. Clean Bloc/Cubit architecture so the code stays easy to scale and hand off, server-side rules for anything worth cheating, and motion that makes the interface feel alive.",
  "And when an existing app is crashing, lagging, or was left half-finished — I find the root cause, fix it fast, and leave it better than I found it.",
]

/** Each word brightens as it scrolls through the middle of the viewport. */
function HighlightParagraph({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {children}
    </motion.span>
  )
}

function Stat({ value, suffix, label, start, delay }) {
  const count = useCounter(value, 1600, start)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-1"
    >
      <span className="font-display font-extrabold text-4xl md:text-5xl text-gold-gradient tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-text-secondary text-sm">{label}</span>
    </motion.div>
  )
}

function OrbitBadge() {
  return (
    <div className="absolute -top-8 -left-8 w-28 h-28 md:w-32 md:h-32 animate-spin-slow" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="orbit" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-gold font-mono uppercase" style={{ fontSize: 9.4, letterSpacing: 2.2 }}>
          <textPath href="#orbit">open to work · open to work · open to work ·</textPath>
        </text>
      </svg>
    </div>
  )
}

export default function About() {
  const photoRef = useRef(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 2])

  return (
    <section id="about" className="section-padding relative">
      <div className="container-x grid lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        {/* Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky lg:top-32">
          <div ref={photoRef} className="relative mt-8">
            <motion.div
              style={{ rotate }}
              className="absolute inset-0 rounded-[2rem] border border-gold/40 translate-x-4 translate-y-4"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[430px] rounded-[2rem] overflow-hidden bg-surface border border-white/10 shadow-card group"
              data-cursor="Hi 👋"
            >
              <motion.img
                src="/me.jpg"
                alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
                style={{ y, scale: 1.15 }}
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-display font-bold text-lg leading-tight">{PROFILE.firstName} {PROFILE.lastName}</p>
                  <p className="font-mono text-[11px] text-text-secondary">{PROFILE.role}</p>
                </div>
              </div>
            </motion.div>

            <OrbitBadge />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -right-6 top-14 px-3.5 py-2 rounded-full glass border border-white/10 font-mono text-xs shadow-card"
            >
              <span className="text-gold">3+</span> yrs Flutter
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="absolute -left-6 bottom-16 px-3.5 py-2 rounded-full glass border border-white/10 font-mono text-xs shadow-card"
            >
              📍 {PROFILE.location} · remote
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7">
          <SectionHeading
            index="03"
            eyebrow="About me"
            title="I design and build apps people *open every day.*"
          />

          <div className="mt-10 space-y-6 text-lg md:text-[1.35rem] leading-relaxed font-medium text-text-primary">
            {PARAGRAPHS.map((p, i) => (
              <HighlightParagraph key={i} text={p} />
            ))}
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border">
            {STATS.map((stat, i) => (
              <Stat key={stat.label} {...stat} start={statsInView} delay={i * 0.1} />
            ))}
          </div>

          {/* Markets */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mr-2">Built for</span>
            {MARKETS.map((m) => (
              <span key={m.name} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-sm text-text-secondary hover:border-gold/50 hover:text-text-primary transition-colors">
                <span>{m.flag}</span> {m.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
