import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { PROCESS } from '@/lib/data'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="process" className="section-padding bg-surface/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] pointer-events-none" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          index="04"
          eyebrow="How I work"
          title="From scope call to *store release.*"
          description="A simple loop with weekly builds on your phone and no surprises at the end."
          className="mb-16"
        />

        <div ref={ref} className="relative">
          {/* desktop connector */}
          <div className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-border" aria-hidden="true">
            <motion.div style={{ scaleX: line }} className="h-full origin-left bg-gradient-to-r from-gold via-gold-bright to-gold" />
          </div>
          {/* mobile connector */}
          <div className="md:hidden absolute left-[21px] top-0 bottom-0 w-px bg-border" aria-hidden="true">
            <motion.div style={{ scaleY: line }} className="w-full h-full origin-top bg-gradient-to-b from-gold via-gold-bright to-gold" />
          </div>

          <ol className="grid md:grid-cols-4 gap-10 md:gap-6">
            {PROCESS.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 md:pl-0"
              >
                <div className="absolute left-0 md:relative md:left-auto w-11 h-11 rounded-full border border-gold/50 bg-base flex items-center justify-center font-mono text-xs text-gold md:mb-7">
                  {step.step}
                  {i === 0 && <span className="absolute inset-0 rounded-full border border-gold/50 animate-ping [animation-duration:2.4s]" />}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">{step.description}</p>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface font-mono text-[11px] text-text-secondary">
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
