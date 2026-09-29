import { describe, expect, it } from 'vitest'

import { CACHE_TTL_MS, isCacheFresh } from '@/infrastructure/cache/cache-store'

describe('isCacheFresh', () => {
  it('returns true for entries younger than TTL', () => {
    expect(isCacheFresh({ value: null, cachedAt: 1000 }, 1000 + CACHE_TTL_MS - 1)).toBe(true)
  })

  it('returns false for entries at or beyond TTL', () => {
    expect(isCacheFresh({ value: null, cachedAt: 1000 }, 1000 + CACHE_TTL_MS)).toBe(false)
  })

  it('returns false for entries beyond TTL', () => {
    expect(isCacheFresh({ value: null, cachedAt: 1000 }, 1000 + CACHE_TTL_MS + 1)).toBe(false)
  })
})
