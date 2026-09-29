import { describe, expect, it, vi } from 'vitest'

import type { PodcastRepository } from '@/application/ports/podcast-repository'
import { createLocalStorageCacheStore } from '@/infrastructure/cache/cache-store'
import { createEpisodeLoader } from '@/presentation/loaders/episode-loader'
import { buildEpisode } from '../builders/episode'
import { buildPodcast } from '../builders/podcast'

describe('createEpisodeLoader', () => {
  it('loads the requested Podcast and Episode', async () => {
    const podcast = buildPodcast({ id: 'podcast-42' })
    const episode = buildEpisode({ id: 'episode-7', podcastId: podcast.id })
    const getDetails = vi.fn().mockResolvedValue({ podcast, episodes: [episode] })
    const getEpisode = vi.fn().mockResolvedValue(episode)
    const repository = {
      list: async () => [],
      getDetails,
      getEpisode,
    } satisfies PodcastRepository
    const loader = createEpisodeLoader(repository)

    await expect(
      loader({ params: { podcastId: podcast.id, episodeId: episode.id } } as never),
    ).resolves.toEqual({ podcast, episode })
    expect(getDetails).toHaveBeenCalledWith(podcast.id)
    expect(getEpisode).toHaveBeenCalledWith(podcast.id, episode.id)
  })

  it('rejects missing route IDs', async () => {
    const loader = createEpisodeLoader({} as PodcastRepository)

    await expect(loader({ params: { podcastId: 'podcast-42' } } as never)).rejects.toThrow(
      'Episode not found: missing',
    )
  })

  it('returns fresh cached episode details without requesting the repository', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const podcast = buildPodcast({ id: 'cached-podcast' })
    const episode = buildEpisode({ id: 'cached-episode', podcastId: podcast.id })
    const details = { podcast, episode }
    const getDetails = vi.fn()
    const getEpisode = vi.fn()
    const repository = { getDetails, list: async () => [], getEpisode }
    store.write('podcast:episode:cached-podcast:cached-episode', details, 1000)
    const loader = createEpisodeLoader(repository, store, () => 1000)

    await expect(
      loader({ params: { podcastId: 'cached-podcast', episodeId: 'cached-episode' } } as never),
    ).resolves.toEqual(details)
    expect(getDetails).not.toHaveBeenCalled()
    expect(getEpisode).not.toHaveBeenCalled()
  })

  it('requests and replaces expired cached episode details', async () => {
    const store = createLocalStorageCacheStore(localStorage)
    const podcast = buildPodcast({ id: 'expired-podcast' })
    const episode = buildEpisode({ id: 'expired-episode', podcastId: podcast.id })
    const details = { podcast, episode }
    const getDetails = vi.fn().mockResolvedValue({ podcast, episodes: [episode] })
    const getEpisode = vi.fn().mockResolvedValue(episode)
    const repository = { getDetails, list: async () => [], getEpisode }
    store.write('podcast:episode:expired-podcast:expired-episode', details, 1000)
    const loader = createEpisodeLoader(repository, store, () => 1000 + 86_400_000)

    await expect(
      loader({ params: { podcastId: 'expired-podcast', episodeId: 'expired-episode' } } as never),
    ).resolves.toEqual(details)
    expect(getDetails).toHaveBeenCalledOnce()
    expect(getEpisode).toHaveBeenCalledOnce()
  })
})
