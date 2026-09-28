import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import { listPodcasts } from '@/application/use-cases/list-podcasts'
import type { PodcastCatalogRepository } from '@/application/ports/podcast-repository'
import {
  CATALOG_CACHE_KEY,
  createLocalStorageCacheStore,
  isCacheFresh,
  type CacheStore,
} from '@/infrastructure/cache/cache-store'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'
import type { Podcast } from '@/domain/podcast'

const repository = createPodcastRepository(createFetchHttpClient())
const cacheStore = createLocalStorageCacheStore()

export function createCatalogLoader(
  catalogRepository: PodcastCatalogRepository = repository,
  store: CacheStore = cacheStore,
  now: () => number = Date.now,
) {
  return async function loadCatalog(): Promise<Podcast[]> {
    const cached = store.read<Podcast[]>(CATALOG_CACHE_KEY)

    if (cached && isCacheFresh(cached, now())) {
      return cached.value
    }

    const podcasts = await listPodcasts(catalogRepository)
    store.write(CATALOG_CACHE_KEY, podcasts, now())
    return podcasts
  }
}

export const catalogLoader = createCatalogLoader()
