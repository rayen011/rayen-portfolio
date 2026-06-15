import { useEffect, useRef, useState } from 'react'

/**
 * A glowing gold cursor that trails the mouse and grows when hovering
 * interactive elements. Pure transform animation — runs off rAF, never
 * triggers React re-renders on move. Disabled on touch / coarse pointers.
 *
 * `enabled` is computed lazily (synchronously) so the cursor elements are
 * present in the very first render — that way the refs are valid by the time
 * the effect runs and starts driving them.
 */
export default function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches
  )
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Only hide the native cursor now that we know the custom one is live.
    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf

    // Start centered so the cursor is visible even before the first move.
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    const loop = () => {
      // Ring eases toward the dot for a soft elastic trail.
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor], input, textarea')) {
        ring.classList.add('cursor-ring--active')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor], input, textarea')) {
        ring.classList.remove('cursor-ring--active')
      }
    }
    const onDown = () => ring.classList.add('cursor-ring--down')
    const onUp = () => ring.classList.remove('cursor-ring--down')
    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
