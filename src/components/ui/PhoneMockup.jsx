import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * The hero's signature element: a phone that "designs itself" — cycling
 * through a few app screens to show the app-dev + UI/UX + bug-fix story
 * at a glance. Pure CSS/SVG UI, no images needed.
 */

const SCREENS = [
  {
    key: 'home',
    label: 'App Development',
    tint: '#F5A623',
    render: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2 w-16 rounded bg-white/80" />
            <div className="mt-1.5 h-1.5 w-10 rounded bg-white/30" />
          </div>
          <div className="w-7 h-7 rounded-full bg-gold/80" />
        </div>
        <div className="h-20 rounded-2xl bg-gradient-to-br from-gold/80 to-gold-dim/70 p-3 flex flex-col justify-end">
          <div className="h-1.5 w-20 rounded bg-black/30" />
          <div className="mt-1 h-1.5 w-12 rounded bg-black/20" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-white/10 border border-white/10 p-2">
              <div className="w-5 h-5 rounded-lg bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'design',
    label: 'UI/UX Design',
    tint: '#8B5CF6',
    render: () => (
      <div className="flex flex-col gap-3">
        <div className="h-1.5 w-20 rounded bg-white/60" />
        <div className="h-28 rounded-2xl border border-dashed border-[#8B5CF6]/60 bg-[#8B5CF6]/10 flex items-center justify-center relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6]" />
          {/* design handles */}
          {[
            'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2',
          ].map((pos) => (
            <span key={pos} className={`absolute ${pos} w-2 h-2 rounded-sm bg-white border border-[#8B5CF6]`} />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="h-6 flex-1 rounded-lg bg-[#8B5CF6]/80" />
          <div className="h-6 w-6 rounded-lg bg-white/15" />
          <div className="h-6 w-6 rounded-lg bg-white/15" />
        </div>
      </div>
    ),
  },
  {
    key: 'fix',
    label: 'Bug Fixes',
    tint: '#10B981',
    render: () => (
      <div className="flex flex-col gap-2 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/60">debug console</span>
          <span className="text-[9px] text-[#10B981]">● passing</span>
        </div>
        <div className="rounded-lg bg-black/40 border border-white/10 p-2.5 flex flex-col gap-1.5">
          <span className="text-[9px] text-[#EF4444] line-through opacity-60">✗ NullCheck on null value</span>
          <span className="text-[9px] text-[#EF4444] line-through opacity-60">✗ jank: 42ms frame</span>
          <span className="text-[9px] text-[#10B981]">✓ crash resolved</span>
          <span className="text-[9px] text-[#10B981]">✓ 60fps restored</span>
          <span className="text-[9px] text-white/40">↳ cold start −51%</span>
        </div>
        <div className="h-6 rounded-lg bg-[#10B981]/80 flex items-center justify-center">
          <span className="text-[9px] text-black font-semibold">Ship it →</span>
        </div>
      </div>
    ),
  },
]

export default function PhoneMockup() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const screen = SCREENS[i]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -12 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-cursor
      className="relative mx-auto"
      style={{ perspective: 1200 }}
    >
      {/* ambient glow that picks up the active screen tint */}
      <motion.div
        className="absolute -inset-8 blur-3xl rounded-full pointer-events-none"
        animate={{ backgroundColor: `${screen.tint}22` }}
        transition={{ duration: 0.8 }}
      />

      {/* floating service label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen.key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
          className="absolute -left-4 top-10 z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-card -translate-x-full"
        >
          <span className="w-2 h-2 rounded-full" style={{ background: screen.tint }} />
          <span className="font-mono text-xs whitespace-nowrap" style={{ color: screen.tint }}>
            {screen.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* phone body */}
      <div className="relative w-[230px] h-[470px] rounded-[2.4rem] bg-[#0a0a0a] border border-border p-2.5 shadow-card">
        {/* side buttons */}
        <span className="absolute -left-[3px] top-24 w-[3px] h-10 rounded-l bg-border" />
        <span className="absolute -left-[3px] top-36 w-[3px] h-10 rounded-l bg-border" />
        <span className="absolute -right-[3px] top-28 w-[3px] h-14 rounded-r bg-border" />

        {/* screen */}
        <div className="relative w-full h-full rounded-[1.9rem] bg-surface overflow-hidden">
          {/* notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0a0a] rounded-b-2xl z-10" />

          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-2.5 text-[9px] text-white/60 font-mono">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>

          {/* swappable app content */}
          <div className="px-4 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {screen.render()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* bottom tab bar */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-black/30 border-t border-white/5 flex items-center justify-around px-6">
            {SCREENS.map((s, idx) => (
              <span
                key={s.key}
                className="w-5 h-5 rounded-lg transition-colors"
                style={{
                  background: idx === i ? s.tint : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* screen indicator dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {SCREENS.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setI(idx)}
            aria-label={`Show ${s.label}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === i ? 20 : 6,
              background: idx === i ? screen.tint : 'var(--tw-border, #2A2A2A)',
              backgroundColor: idx === i ? screen.tint : '#2A2A2A',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
