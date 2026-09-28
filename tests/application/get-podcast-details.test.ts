import { describe, expect, it } from 'vitest'

import { PodcastNotFoundError } from '@/application/errors'
import { getPodcastDetails } from '@/application/use-cases/get-podcast-details'
import { buildEpisode } from '../builders/episode'
import { buildPodcast } from '../builders/podcast'
import { buildPodcastRepository } from '../builders/podcast-repository'

describe('getPodcastDetails', () => {
  it('returns the Podcast and its Episodes', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({ podcastId: podcast.id })
    const repository = buildPodcastRepository({
      getDetails: async () => ({ podcast, episodes: [episode] }),
    })

    await expect(getPodcastDetails(repository, podcast.id)).resolves.toEqual({
      podcast,
      episodes: [episode],
    })
  })

  it('throws when the Podcast does not exist', async () => {
    const repository = buildPodcastRepository()

    await expect(getPodcastDetails(repository, 'missing')).rejects.toBeInstanceOf(
      PodcastNotFoundError,
    )
  })

  it('returns a Podcast with no Episodes', async () => {
    const podcast = buildPodcast()
    const repository = buildPodcastRepository({
      getDetails: async () => ({ podcast, episodes: [] }),
    })

    await expect(getPodcastDetails(repository, podcast.id)).resolves.toEqual({
      podcast,
      episodes: [],
    })
  })
})
