import { motion } from 'framer-motion'
import RevealText from './RevealText'

export default function SectionHeading({ index, eyebrow, title, description, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline gap-4 mb-6"
      >
        {index && (
          <span className="font-display font-extrabold text-5xl md:text-6xl leading-none text-outline select-none">
            {index}
          </span>
        )}
        <span className="flex items-center gap-3">
          <span className="w-6 h-px bg-gold" />
          <span className="label-mono text-gold">{eyebrow}</span>
        </span>
      </motion.div>

      <RevealText
        as="h2"
        text={title}
        className="font-display font-extrabold display-lg mb-6"
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
