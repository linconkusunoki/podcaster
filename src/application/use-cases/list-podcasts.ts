import type { Podcast } from '@/domain/podcast'

import type { PodcastCatalogRepository } from '../ports/podcast-repository'

export function listPodcasts(repository: PodcastCatalogRepository): Promise<Podcast[]> {
  return repository.list()
}
