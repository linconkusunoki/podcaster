import { renderHook } from '@testing-library/react'
import type { RefObject } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useIsOverflowing } from '@/presentation/hooks/use-is-overflowing'

afterEach(() => {
  vi.unstubAllGlobals()
})

function createElementRef(
  scrollHeight: number,
  clientHeight: number,
): RefObject<HTMLElement | null> {
  const element = document.createElement('p')
  Object.defineProperty(element, 'scrollHeight', { configurable: true, value: scrollHeight })
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: clientHeight })
  return { current: element }
}

describe('useIsOverflowing', () => {
  it('detects content taller than the visible element', () => {
    const ref = createElementRef(200, 100)

    const { result } = renderHook(() => useIsOverflowing(ref, 'long description'))

    expect(result.current).toBe(true)
  })

  it('observes size changes and disconnects on cleanup', () => {
    const observe = vi.fn()
    const disconnect = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = observe
        disconnect = disconnect
      },
    )
    const ref = createElementRef(100, 100)

    const { unmount } = renderHook(() => useIsOverflowing(ref, 'description'))

    expect(observe).toHaveBeenCalledWith(ref.current)
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('does not measure while disabled', () => {
    const observe = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = observe
      },
    )
    const ref = createElementRef(200, 100)

    const { result } = renderHook(() => useIsOverflowing(ref, 'description', false))

    expect(result.current).toBe(false)
    expect(observe).not.toHaveBeenCalled()
  })
})
