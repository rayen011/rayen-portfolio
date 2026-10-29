import { motion } from 'framer-motion'

/**
 * One project on the map.
 *
 * `weight` (0–1) drives size and brightness, so the scale of the work is
 * readable before you click anything. Each star drifts on its own sine phase —
 * `delay` is negative so the loops start mid-cycle and nothing pulses in unison.
 */
export default function ProjectStar({ project, star, index, labelled, open, onOpen }) {
  const size = 10 + star.weight * 20
  const drift = 5 + star.weight * 5

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project.id)}
      aria-label={`${project.title} — open case study`}
      className="star group"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        '--star': project.color,
        '--size': `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="star-body"
        animate={{ y: [0, -drift, 0, drift, 0], x: [0, drift * 0.6, 0, -drift * 0.6, 0] }}
        transition={{
          duration: 14 + index * 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: -index * 3.1,
        }}
      >
        <span className="star-halo" />
        <span className="star-core" />
        {project.live && <span className="star-pulse" />}

        <span className={`star-label ${labelled ? 'star-label--always' : ''}`}>
          {project.title}
        </span>
      </motion.span>

      {open && <span className="star-selected" />}
    </motion.button>
  )
}
