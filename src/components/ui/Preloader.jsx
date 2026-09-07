import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLenis } from './SmoothScroll'

const LETTERS = ['R', 'A', 'Y', 'E', 'N']

/**
 * Intro curtain: the name rises letter by letter while a counter runs to 100,
 * then the whole panel slides away. `onReveal` fires the moment the curtain
 * starts lifting (so the hero can animate in underneath), `onDone` once it has
 * fully left the screen.
 */
export default function Preloader({ onReveal, onDone }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const lock = setTimeout(() => getLenis()?.stop(), 0)

    const duration = 1500
    const start = performance.now()
    let raf
    let doneTimer
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else doneTimer = setTimeout(() => setShow(false), 250)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(lock)
      clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = ''
      getLenis()?.start()
      onReveal?.()
    }
  }, [show, onReveal])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] bg-base flex items-center justify-center"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden font-display font-extrabold text-6xl md:text-8xl tracking-tight text-text-primary">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter + i}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="text-gold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              .
            </motion.span>
          </div>

          <div className="absolute bottom-10 left-6 md:left-12 font-mono text-sm text-text-muted tabular-nums">
            {String(count).padStart(3, '0')}
            <span className="text-gold"> %</span>
          </div>
          <div className="absolute bottom-10 right-6 md:right-12 font-mono text-[11px] text-text-muted tracking-[0.3em] uppercase">
            Portfolio · 2026
          </div>
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gold transition-[width] duration-100"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
