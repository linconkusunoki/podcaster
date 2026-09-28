import { describe, expect, it, vi } from 'vitest'

import type { PodcastCatalogRepository } from '@/application/ports/podcast-repository'
import { CATALOG_CACHE_KEY, createLocalStorageCacheStore } from '@/infrastructure/cache/cache-store'
import { createCatalogLoader } from '@/presentation/loaders/catalog-loader'
import { buildPodcast } from '../builders/podcast'

describe('createCatalogLoader', () => {
  it('returns fresh cached Podcasts without requesting the repository', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const podcasts = [buildPodcast()]
    const list = vi.fn()
    const repository: PodcastCatalogRepository = { list }
    store.write(CATALOG_CACHE_KEY, podcasts, 1000)
    const loadCatalog = createCatalogLoader(repository, store, () => 1000)

    await expect(loadCatalog()).resolves.toEqual(podcasts)
    expect(list).not.toHaveBeenCalled()
  })

  it('requests and replaces expired cached data', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const freshPodcasts = [buildPodcast({ id: 'fresh' })]
    const list = vi.fn().mockResolvedValue(freshPodcasts)
    const repository: PodcastCatalogRepository = { list }
    store.write(CATALOG_CACHE_KEY, [buildPodcast({ id: 'stale' })], 1000)
    const loadCatalog = createCatalogLoader(repository, store, () => 1000 + 86_400_000)

    await expect(loadCatalog()).resolves.toEqual(freshPodcasts)
    expect(list).toHaveBeenCalledOnce()
    expect(store.read(CATALOG_CACHE_KEY)).toEqual({
      value: freshPodcasts,
      cachedAt: 86_401_000,
    })
  })
})
