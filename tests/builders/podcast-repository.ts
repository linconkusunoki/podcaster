import type { PodcastRepository } from '@/application/ports/podcast-repository'

export function buildPodcastRepository(
  overrides: Partial<PodcastRepository> = {},
): PodcastRepository {
  return {
    list: async () => [],
    getDetails: async () => null,
    getEpisode: async () => null,
    ...overrides,
  }
}
