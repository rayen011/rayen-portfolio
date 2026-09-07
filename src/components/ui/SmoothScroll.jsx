import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis = null

/** The live Lenis instance (null when reduced motion is on or before mount). */
export const getLenis = () => lenis

/**
 * Scroll to a selector / element / number. Uses Lenis when it's running so the
 * easing matches the rest of the page, otherwise falls back to native smooth
 * scrolling.
 */
export function scrollToTarget(target, opts = {}) {
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: -64, duration: 1.4, ...opts })
    return
  }
  if (el && typeof el !== 'number') el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])

  return children
}
