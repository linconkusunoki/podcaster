import type { LoaderFunctionArgs } from 'react-router-dom'

import { EpisodeNotFoundError, PodcastNotFoundError } from '@/application/errors'
import { getEpisodeDetails } from '@/application/use-cases/get-episode-details'
import type { PodcastRepository } from '@/application/ports/podcast-repository'
import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

const repository = createPodcastRepository(createFetchHttpClient())

export function createEpisodeLoader(podcastRepository: PodcastRepository = repository) {
  return function episodeLoader({ params }: LoaderFunctionArgs) {
    if (!params.podcastId) {
      throw new PodcastNotFoundError('missing')
    }

    if (!params.episodeId) {
      throw new EpisodeNotFoundError('missing')
    }

    return getEpisodeDetails(podcastRepository, params.podcastId, params.episodeId)
  }
}

export const episodeLoader = createEpisodeLoader()
