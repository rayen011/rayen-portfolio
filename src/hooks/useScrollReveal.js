import { useInView } from 'react-intersection-observer'

export function useScrollReveal(options = {}) {
  const { ref, inView } = useInView({
    threshold: options.threshold ?? 0.15,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin ?? '0px',
  })

  return { ref, inView }
}
