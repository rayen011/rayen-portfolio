import { motion } from 'framer-motion'

/**
 * Word-by-word mask reveal. Wrap a word in *asterisks* to render it with the
 * gold gradient. Animates when scrolled into view, or — when `animate` is
 * passed — whenever that flag becomes true (used by the hero after the
 * preloader lifts).
 */
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.05,
  animate,
  ...rest
}) {
  const words = String(text).split(' ')

  return (
    <Tag className={className} {...rest}>
      {words.map((raw, i) => {
        const highlighted = raw.includes('*')
        const word = raw.replace(/\*/g, '')
        const trigger =
          animate === undefined
            ? { whileInView: { y: 0, rotate: 0 }, viewport: { once: true, margin: '-10% 0px' } }
            : { animate: animate ? { y: 0, rotate: 0 } : { y: '110%', rotate: 4 } }
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.15em] -mb-[0.15em]"
          >
            <motion.span
              className={`inline-block origin-bottom-left ${highlighted ? 'text-gold-gradient' : ''}`}
              initial={{ y: '110%', rotate: 4 }}
              {...trigger}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
