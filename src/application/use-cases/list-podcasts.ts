import type { Podcast } from '@/domain/podcast'

import type { PodcastRepository } from '../ports/podcast-repository'

export function listPodcasts(repository: PodcastRepository): Promise<Podcast[]> {
  return repository.list()
}
