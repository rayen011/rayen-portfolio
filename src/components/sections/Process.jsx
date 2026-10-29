import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { PROCESS } from '@/lib/data'
import { fromDepthSoft } from '@/lib/motion'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="process" className="section-padding relative overflow-hidden">

      <div className="container-x relative">
        <SectionHeading
          index="04"
          eyebrow="How I work"
          title="From scope call to *store release.*"
          description="A simple loop with weekly builds on your phone and no surprises at the end."
          className="mb-16"
        />

        <div ref={ref} className="relative">
          {/* Desktop: the four steps are waypoints along a launch arc that
              draws itself as you scroll. */}
          <svg
            className="trajectory hidden md:block"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ height: '44px', top: 0, bottom: 'auto' }}
          >
            <defs>
              <linearGradient id="trajectory-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C47D0E" />
                <stop offset="50%" stopColor="#FFD166" />
                <stop offset="100%" stopColor="#F5A623" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 9 C 22 9, 26 2, 50 2 C 74 2, 78 7, 100 1"
              style={{ pathLength: line }}
            />
          </svg>

          {/* Mobile: the same arc, straightened into a vertical line. */}
          <div className="md:hidden absolute left-[21px] top-0 bottom-0 w-px bg-white/10" aria-hidden="true">
            <motion.div style={{ scaleY: line }} className="w-full h-full origin-top bg-gradient-to-b from-gold via-gold-bright to-gold" />
          </div>

          <ol className="grid md:grid-cols-4 gap-10 md:gap-6">
            {PROCESS.map((step, i) => (
              <motion.li key={step.step} {...fromDepthSoft(i * 0.12)} className="relative pl-16 md:pl-0">
                <div className="absolute left-0 md:relative md:left-auto w-11 h-11 rounded-full border border-gold/50 glass flex items-center justify-center font-mono text-xs text-gold md:mb-7">
                  {step.step}
                  {i === 0 && <span className="absolute inset-0 rounded-full border border-gold/50 animate-ping [animation-duration:2.4s]" />}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">{step.description}</p>
                <span className="chip">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {step.deliverable}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
