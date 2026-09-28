import type { Episode } from '@/domain/episode'
import type { Podcast } from '@/domain/podcast'

import { EpisodeNotFoundError, PodcastNotFoundError } from '../errors'
import type { EpisodeDetails, PodcastRepository } from '../ports/podcast-repository'

export async function getEpisodeDetails(
  repository: PodcastRepository,
  podcastId: Podcast['id'],
  episodeId: Episode['id'],
): Promise<EpisodeDetails> {
  const [podcastDetails, episode] = await Promise.all([
    repository.getDetails(podcastId),
    repository.getEpisode(podcastId, episodeId),
  ])

  if (!podcastDetails) {
    throw new PodcastNotFoundError(podcastId)
  }

  if (!episode) {
    throw new EpisodeNotFoundError(episodeId)
  }

  return { podcast: podcastDetails.podcast, episode }
}
