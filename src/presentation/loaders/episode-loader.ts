import type { LoaderFunctionArgs } from 'react-router-dom'

import { EpisodeNotFoundError, PodcastNotFoundError } from '@/application/errors'
import { getEpisodeDetails } from '@/application/use-cases/get-episode-details'
import type { EpisodeDetails, PodcastRepository } from '@/application/ports/podcast-repository'
import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import {
  createLocalStorageCacheStore,
  episodeCacheKey,
  isCacheFresh,
  type CacheStore,
} from '@/infrastructure/cache/cache-store'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

const repository = createPodcastRepository(createFetchHttpClient())
const cacheStore = createLocalStorageCacheStore()

export function createEpisodeLoader(
  podcastRepository: PodcastRepository = repository,
  store: CacheStore = cacheStore,
  now: () => number = Date.now,
) {
  return async function episodeLoader({ params }: LoaderFunctionArgs): Promise<EpisodeDetails> {
    if (!params.podcastId) {
      throw new PodcastNotFoundError('missing')
    }

    if (!params.episodeId) {
      throw new EpisodeNotFoundError('missing')
    }

    const key = episodeCacheKey(params.podcastId, params.episodeId)
    const cached = store.read<EpisodeDetails>(key)

    if (cached && isCacheFresh(cached, now())) {
      return {
        ...cached.value,
        episode: {
          ...cached.value.episode,
          publishedAt: new Date(cached.value.episode.publishedAt),
        },
      }
    }

    const details = await getEpisodeDetails(podcastRepository, params.podcastId, params.episodeId)
    store.write(key, details, now())
    return details
  }
}

export const episodeLoader = createEpisodeLoader()
