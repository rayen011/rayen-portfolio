import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICES } from '@/lib/data'

function ServiceCard({ service, index }) {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      data-cursor
      className="group relative rounded-2xl border border-border bg-card p-7 overflow-hidden card-hover"
    >
      {/* top accent */}
      <div
        className="h-1 w-12 rounded-full mb-6"
        style={{ background: service.color }}
      />

      {/* glow on hover */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `${service.color}30` }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
      >
        {service.icon}
      </div>

      <h3 className="font-display font-bold text-xl mb-3">{service.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      <ul className="space-y-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-sm text-text-secondary">
            <span
              className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
              style={{ background: `${service.color}20`, color: service.color }}
            >
              ✓
            </span>
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  const { ref, inView } = useScrollReveal()

  return (
    <section id="services" className="section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <SectionLabel>What I do</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3 leading-tight">
            Three ways I help you{' '}
            <span className="text-gold-gradient">ship great apps</span>.
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Whether you're starting from an idea, polishing the experience, or
            rescuing an app that's misbehaving — I've got it covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
