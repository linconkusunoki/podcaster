import type { Podcast } from '@/domain/podcast'

export function buildPodcast(overrides: Partial<Podcast> = {}): Podcast {
  return {
    id: 'podcast-1',
    title: 'The Daily Briefing',
    author: 'Example Network',
    imageUrl: 'https://example.com/podcast.jpg',
    description: 'A daily podcast about the stories shaping the world.',
    ...overrides,
  }
}
