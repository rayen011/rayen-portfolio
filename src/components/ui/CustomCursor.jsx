import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor]'

/**
 * Gold dot + trailing ring. The ring grows over interactive elements and turns
 * into a filled label ("View", "Open"…) over anything carrying a
 * `data-cursor="Label"` attribute. Runs entirely off requestAnimationFrame —
 * no React re-renders on mouse move. Disabled on touch / coarse pointers.
 */
export default function CustomCursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let down = false
    let raf

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${down ? 0.8 : 1})`
      raf = requestAnimationFrame(loop)
    }

    const setState = (target) => {
      const el = target?.closest?.(INTERACTIVE)
      const label = el?.dataset?.cursor
      ring.classList.remove('cursor-ring--active', 'cursor-ring--label')
      ring.textContent = ''
      dot.style.opacity = '1'
      if (!el) return
      if (label && label !== 'true') {
        ring.classList.add('cursor-ring--label')
        ring.textContent = label
        dot.style.opacity = '0'
      } else {
        ring.classList.add('cursor-ring--active')
      }
    }

    const onOver = (e) => setState(e.target)
    const onDown = () => { down = true }
    const onUp = () => { down = false }
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
