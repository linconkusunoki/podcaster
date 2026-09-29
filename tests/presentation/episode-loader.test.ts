import { describe, expect, it, vi } from 'vitest'

import type { PodcastRepository } from '@/application/ports/podcast-repository'
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

  it('rejects missing route IDs', () => {
    const loader = createEpisodeLoader({} as PodcastRepository)

    expect(() => loader({ params: { podcastId: 'podcast-42' } } as never)).toThrow(
      'Episode not found: missing',
    )
  })
})
