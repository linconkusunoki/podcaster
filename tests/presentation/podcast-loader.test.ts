import { describe, expect, it, vi } from 'vitest'

import type { PodcastRepository } from '@/application/ports/podcast-repository'
import {
  podcastDetailCacheKey,
  createLocalStorageCacheStore,
} from '@/infrastructure/cache/cache-store'
import { createPodcastLoader } from '@/presentation/loaders/podcast-loader'
import { buildEpisode } from '../builders/episode'
import { buildPodcast } from '../builders/podcast'

describe('createPodcastLoader', () => {
  it('isolates cached details by Podcast ID', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const first = { podcast: buildPodcast({ id: 'first' }), episodes: [] }
    const second = { podcast: buildPodcast({ id: 'second' }), episodes: [] }
    const getDetails = vi
      .fn()
      .mockImplementation(async (id: string) => (id === 'first' ? first : second))
    const repository = {
      getDetails,
      list: async () => [],
      getEpisode: async () => null,
    } satisfies PodcastRepository
    const loadPodcast = createPodcastLoader(repository, store, () => 1000)

    await loadPodcast({ params: { podcastId: 'first' } } as never)
    await loadPodcast({ params: { podcastId: 'second' } } as never)

    expect(store.read(podcastDetailCacheKey('first'))?.value).toEqual(first)
    expect(store.read(podcastDetailCacheKey('second'))?.value).toEqual(second)
  })

  it('returns fresh cached details without requesting the repository', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const details = { podcast: buildPodcast({ id: 'cached' }), episodes: [buildEpisode()] }
    const getDetails = vi.fn()
    const repository = { getDetails, list: async () => [], getEpisode: async () => null }
    store.write(podcastDetailCacheKey('cached'), details, 1000)
    const loadPodcast = createPodcastLoader(repository, store, () => 1000)

    await expect(loadPodcast({ params: { podcastId: 'cached' } } as never)).resolves.toEqual(
      details,
    )
    expect(getDetails).not.toHaveBeenCalled()
  })
})
