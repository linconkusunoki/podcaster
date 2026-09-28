import { describe, expect, it } from 'vitest'

import { EpisodeNotFoundError, PodcastNotFoundError } from '@/application/errors'
import { getEpisodeDetails } from '@/application/use-cases/get-episode-details'
import { buildEpisode } from '../builders/episode'
import { buildPodcast } from '../builders/podcast'
import { buildPodcastRepository } from '../builders/podcast-repository'

describe('getEpisodeDetails', () => {
  it('returns the Podcast and Episode', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({ podcastId: podcast.id })
    const repository = buildPodcastRepository({
      getDetails: async () => ({ podcast, episodes: [episode] }),
      getEpisode: async () => episode,
    })

    await expect(getEpisodeDetails(repository, podcast.id, episode.id)).resolves.toEqual({
      podcast,
      episode,
    })
  })

  it('throws when the Podcast does not exist', async () => {
    const repository = buildPodcastRepository()

    await expect(getEpisodeDetails(repository, 'missing', 'episode-1')).rejects.toBeInstanceOf(
      PodcastNotFoundError,
    )
  })

  it('throws when the Episode does not exist', async () => {
    const podcast = buildPodcast()
    const repository = buildPodcastRepository({
      getDetails: async () => ({ podcast, episodes: [] }),
    })

    await expect(getEpisodeDetails(repository, podcast.id, 'missing')).rejects.toBeInstanceOf(
      EpisodeNotFoundError,
    )
  })
})
