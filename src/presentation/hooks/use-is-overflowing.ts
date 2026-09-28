import { useEffect, useState, type RefObject } from 'react'

export function useIsOverflowing(
  ref: RefObject<HTMLElement | null>,
  content: string,
  enabled = true,
): boolean {
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (!enabled || !ref.current) {
      return
    }

    const element = ref.current
    const measure = () => setIsOverflowing(element.scrollHeight > element.clientHeight)

    measure()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(measure)
    observer.observe(element)

    return () => observer.disconnect()
  }, [content, enabled, ref])

  return isOverflowing
}
