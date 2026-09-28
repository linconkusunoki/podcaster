import type { Episode } from '@/domain/episode'
import type { Podcast } from '@/domain/podcast'

export type PodcastDetails = {
  podcast: Podcast
  episodes: Episode[]
}

export type EpisodeDetails = {
  podcast: Podcast
  episode: Episode
}

export interface PodcastRepository {
  list(): Promise<Podcast[]>
  getDetails(id: Podcast['id']): Promise<PodcastDetails | null>
  getEpisode(podcastId: Podcast['id'], episodeId: Episode['id']): Promise<Episode | null>
}
