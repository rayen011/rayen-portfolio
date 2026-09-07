import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HERO_SCREENS } from '@/lib/data'

/**
 * The hero's signature element: a phone showing real screenshots of shipped
 * apps, cycling every few seconds, tilting in 3D toward the cursor.
 */
export default function PhoneMockup({ ready = true }) {
  const [i, setI] = useState(0)
  const screen = HERO_SCREENS[i]

  // Tilt toward the mouse (viewport-relative so it works from anywhere in the hero)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 80, damping: 18 })
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 80, damping: 18 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_SCREENS.length), 3600)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-fit"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative animate-float"
      >
        {/* glow tinted by the active app */}
        <motion.div
          className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
          animate={{ backgroundColor: `${screen.color}2e` }}
          transition={{ duration: 0.9 }}
        />

        {/* phone body */}
        <div className="relative w-[250px] h-[520px] sm:w-[270px] sm:h-[560px] rounded-[2.9rem] bg-[#0b0b0b] p-[9px] shadow-phone border border-white/10">
          <span className="absolute -left-[3px] top-24 w-[3px] h-9 rounded-l bg-[#2a2a2a]" />
          <span className="absolute -left-[3px] top-36 w-[3px] h-14 rounded-l bg-[#2a2a2a]" />
          <span className="absolute -right-[3px] top-32 w-[3px] h-16 rounded-r bg-[#2a2a2a]" />

          <div className="relative w-full h-full rounded-[2.35rem] overflow-hidden bg-black">
            <AnimatePresence mode="sync">
              <motion.img
                key={screen.key}
                src={screen.src}
                alt={`${screen.app} app screen`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
              />
            </AnimatePresence>

            {/* punch-hole camera */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black ring-1 ring-white/10 z-10" />
            {/* glass reflection */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
          </div>
        </div>

        {/* floating chips (lifted off the phone in 3D) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${screen.key}-label`}
            initial={{ opacity: 0, x: -16, y: 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4 }}
            style={{ transform: 'translateZ(70px)' }}
            className="absolute -left-10 sm:-left-20 top-16 flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-white/10 shadow-card"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: screen.color }} />
            <span className="font-display font-bold text-sm tracking-tight">{screen.app}</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${screen.key}-tag`}
            initial={{ opacity: 0, x: 16, y: -6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            style={{ transform: 'translateZ(60px)' }}
            className="absolute -right-6 sm:-right-16 bottom-28 px-3.5 py-2 rounded-xl glass border border-white/10 shadow-card font-mono text-[11px] text-text-secondary max-w-[190px]"
          >
            <span style={{ color: screen.color }}>▸</span> {screen.tagline}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* indicator dots */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {HERO_SCREENS.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setI(idx)}
            aria-label={`Show ${s.app}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: idx === i ? 24 : 6, backgroundColor: idx === i ? s.color : '#2a2a2a' }}
          />
        ))}
      </div>
    </motion.div>
  )
}
