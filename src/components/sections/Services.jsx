import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { SERVICES } from '@/lib/data'

const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  browser: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <SpotlightCard color={`${service.color}99`} className="h-full group" innerClassName="p-7 md:p-8 flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center p-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}40` }}
          >
            {ICONS[service.icon]}
          </div>
          <span className="font-mono text-xs text-text-muted">{service.index}</span>
        </div>

        <h3 className="font-display font-bold text-xl md:text-2xl mb-3 tracking-tight">{service.title}</h3>
        <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed mb-7 flex-1">{service.description}</p>

        <ul className="space-y-2.5">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-7 pt-5 border-t border-border/70 flex items-center justify-between text-xs font-mono">
          <span className="text-text-muted">Let's talk about it</span>
          <span className="text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold">→</span>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-surface/40 relative">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="What I do"
          title="Four ways I help you *ship.*"
          description="Whether you're starting from an idea, polishing the experience, launching a SaaS, or rescuing an app that misbehaves — I've got it covered."
          className="mb-14"
        />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
