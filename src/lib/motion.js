/**
 * The site's motion vocabulary.
 *
 * Everything arrives *from depth* rather than sliding up: it starts small and
 * out of focus, as though coming into view from far away, and resolves. Keep
 * the easing and the blur radius consistent — the whole page should feel like
 * one camera.
 */
export const EASE = [0.16, 1, 0.3, 1]

/** Section content coming into focus. */
export const fromDepth = (delay = 0, distance = 0.92) => ({
  initial: { opacity: 0, scale: distance, filter: 'blur(10px)' },
  whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 0.9, delay, ease: EASE },
})

/** Smaller things — list items, chips — that only need a gentle focus pull. */
export const fromDepthSoft = (delay = 0) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-6% 0px' },
  transition: { duration: 0.7, delay, ease: EASE },
})
