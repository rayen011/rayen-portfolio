import { useEffect, useState } from 'react'

/**
 * Id of the section currently filling the middle of the viewport.
 *
 * Tracks the intersection ratio of every candidate rather than taking the last
 * one to fire, so a short section sandwiched between two tall ones can't win
 * the band on its way past.
 */
export function useActiveSection(ids, fallback = '') {
  const [active, setActive] = useState(fallback)

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return

    const ratios = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = ''
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        if (best) setActive(best)
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: [0, 0.15, 0.35, 0.6, 0.9] }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [ids])

  return active
}
