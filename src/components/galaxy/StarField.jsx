import { useEffect, useRef } from 'react'

/**
 * Three layers of stars on one fixed canvas, parallaxing against the scroll.
 *
 * Density is per square pixel of the virtual field, so a phone gets
 * proportionally fewer stars than a desktop without any breakpoint logic. Each
 * layer wraps over a field twice the viewport height, which keeps the repeat
 * far enough apart not to read as a pattern.
 */
const LAYERS = [
  { density: 1 / 4800, speed: 0.06, size: [0.5, 1.1], alpha: [0.2, 0.45], twinkle: 0.4 },
  { density: 1 / 7200, speed: 0.17, size: [0.8, 1.7], alpha: [0.35, 0.7], twinkle: 0.8 },
  { density: 1 / 22000, speed: 0.38, size: [1.3, 2.4], alpha: [0.55, 1], twinkle: 1.3, glow: true },
]

// Mostly warm white, a little gold, the occasional blue giant.
const COLOURS = [
  '255, 243, 222', '255, 243, 222', '255, 243, 222',
  '255, 209, 102', '245, 166, 35',
  '186, 205, 255',
]

const rand = (min, max) => min + Math.random() * (max - min)

function buildLayer(w, h, layer) {
  const fieldH = h * 2
  const count = Math.round(w * fieldH * layer.density)
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * fieldH,
    r: rand(layer.size[0], layer.size[1]),
    a: rand(layer.alpha[0], layer.alpha[1]),
    tw: rand(0.4, 1.2) * layer.twinkle,
    ph: Math.random() * Math.PI * 2,
    c: COLOURS[(Math.random() * COLOURS.length) | 0],
  }))
}

export default function StarField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let layers = []
    let raf = 0

    const resize = () => {
      // Cap the pixel ratio: beyond 2 the extra fill cost buys nothing visible.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layers = LAYERS.map((l) => buildLayer(w, h, l))
    }

    const draw = (time) => {
      const scroll = window.scrollY
      const t = time / 1000
      ctx.clearRect(0, 0, w, h)
      const fieldH = h * 2

      for (let i = 0; i < LAYERS.length; i++) {
        const layer = LAYERS[i]
        const stars = layers[i]
        for (let j = 0; j < stars.length; j++) {
          const s = stars[j]
          // Wrap into [0, fieldH) so the layer scrolls forever.
          let y = (s.y - scroll * layer.speed) % fieldH
          if (y < 0) y += fieldH
          if (y < -4 || y > h + 4) continue

          const a = still ? s.a : s.a * (0.7 + 0.3 * Math.sin(t * s.tw + s.ph))

          if (layer.glow) {
            ctx.fillStyle = `rgba(${s.c}, ${a * 0.12})`
            ctx.beginPath()
            ctx.arc(s.x, y, s.r * 4, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.fillStyle = `rgba(${s.c}, ${a})`
          ctx.beginPath()
          ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (time) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!raf && !still) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // Reduced motion still gets a starfield, it just never animates. It is
    // redrawn on scroll so the parallax survives, but nothing twinkles.
    const onScroll = () => {
      if (still) draw(0)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onResize = () => {
      resize()
      draw(performance.now())
    }

    resize()
    draw(performance.now())
    start()

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="galaxy-stars" aria-hidden="true" />
}
