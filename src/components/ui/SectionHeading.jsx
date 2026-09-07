import { motion } from 'framer-motion'
import RevealText from './RevealText'

export default function SectionHeading({ index, eyebrow, title, description, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="w-8 h-px bg-gold" />
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-gold">
          {index && <span className="text-text-muted mr-2">{index}</span>}
          {eyebrow}
        </span>
      </motion.div>

      <RevealText
        as="h2"
        text={title}
        className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tight mb-5"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
