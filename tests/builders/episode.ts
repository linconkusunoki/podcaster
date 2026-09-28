import type { Episode } from '@/domain/episode'

export function buildEpisode(overrides: Partial<Episode> = {}): Episode {
  return {
    id: 'episode-1',
    podcastId: 'podcast-1',
    title: 'The Daily Briefing: Today in Focus',
    description: "A concise summary of today's most important stories.",
    publishedAt: new Date('2026-01-15T08:00:00.000Z'),
    audioUrl: 'https://example.com/episode.mp3',
    durationMs: 1800000,
    imageUrl: 'https://example.com/episode.jpg',
    ...overrides,
  }
}
