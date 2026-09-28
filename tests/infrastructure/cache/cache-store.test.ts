import { describe, expect, it } from 'vitest'

import {
  CATALOG_CACHE_KEY,
  createLocalStorageCacheStore,
  podcastDetailCacheKey,
} from '@/infrastructure/cache/cache-store'

describe('local storage cache store', () => {
  it('stores timestamped values under isolated keys', () => {
    const storage = localStorage
    const store = createLocalStorageCacheStore(storage)

    store.write(CATALOG_CACHE_KEY, { value: 'catalog' }, 1000)
    store.write(podcastDetailCacheKey('42'), { value: 'detail' }, 2000)

    expect(store.read(CATALOG_CACHE_KEY)).toEqual({
      value: { value: 'catalog' },
      cachedAt: 1000,
    })
    expect(store.read(podcastDetailCacheKey('42'))).toEqual({
      value: { value: 'detail' },
      cachedAt: 2000,
    })
  })
  it('ignores malformed entries', () => {
    const storage = localStorage
    const store = createLocalStorageCacheStore(storage)
    storage.setItem(CATALOG_CACHE_KEY, '{invalid')

    expect(store.read(CATALOG_CACHE_KEY)).toBeNull()
    expect(storage.getItem(CATALOG_CACHE_KEY)).toBeNull()
  })
})
