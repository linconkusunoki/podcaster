import type { LoaderFunctionArgs } from 'react-router-dom'

import { PodcastNotFoundError } from '@/application/errors'
import { getPodcastDetails } from '@/application/use-cases/get-podcast-details'
import type { PodcastDetails, PodcastRepository } from '@/application/ports/podcast-repository'
import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import {
  createLocalStorageCacheStore,
  isCacheFresh,
  podcastDetailCacheKey,
  type CacheStore,
} from '@/infrastructure/cache/cache-store'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

const repository = createPodcastRepository(createFetchHttpClient())
const cacheStore = createLocalStorageCacheStore()

export function createPodcastLoader(
  podcastRepository: PodcastRepository = repository,
  store: CacheStore = cacheStore,
  now: () => number = Date.now,
) {
  return async function loadPodcast({ params }: LoaderFunctionArgs): Promise<PodcastDetails> {
    if (!params.podcastId) {
      throw new PodcastNotFoundError('missing')
    }

    const key = podcastDetailCacheKey(params.podcastId)
    const cached = store.read<PodcastDetails>(key)

    if (cached && isCacheFresh(cached, now())) {
      return {
        ...cached.value,
        episodes: cached.value.episodes.map((episode) => ({
          ...episode,
          publishedAt: new Date(episode.publishedAt),
        })),
      }
    }

    const details = await getPodcastDetails(podcastRepository, params.podcastId)
    store.write(key, details, now())
    return details
  }
}

export const podcastLoader = createPodcastLoader()
