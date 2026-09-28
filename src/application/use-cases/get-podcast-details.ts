import type { Podcast } from '@/domain/podcast'

import { PodcastNotFoundError } from '../errors'
import type { PodcastDetails, PodcastRepository } from '../ports/podcast-repository'

export async function getPodcastDetails(
  repository: PodcastRepository,
  id: Podcast['id'],
): Promise<PodcastDetails> {
  const details = await repository.getDetails(id)

  if (!details) {
    throw new PodcastNotFoundError(id)
  }

  return details
}
