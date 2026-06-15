import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!start) return

    let startTime = null
    const startValue = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(startValue + eased * (target - startValue)))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, start])

  return count
}
