import { describe, expect, it } from 'vitest'

import { buildItunesEpisodeResult } from '../../builders/itunes-detail-response'
import { mapItunesEpisodeResultToEpisode } from '@/infrastructure/apple/mappers'

describe('iTunes Episode mappers', () => {
  it('maps episode results to Episodes', () => {
    const result = buildItunesEpisodeResult()

    expect(mapItunesEpisodeResultToEpisode(result)).toEqual({
      id: '1000791062617',
      podcastId: '934552872',
      title: 'Tove Lo wants her music to sound out of control',
      description: 'A conversation about Tove Lo and her latest album.',
      publishedAt: new Date('2026-09-22T07:01:00Z'),
      audioUrl: 'https://example.com/tove-lo.mp3',
      durationMs: 2299000,
      imageUrl: 'https://example.com/tove-lo-160.jpg',
    })
  })

  it('falls back to the 600px artwork and null duration when optional fields are missing', () => {
    const result = buildItunesEpisodeResult({
      trackTimeMillis: undefined,
      episodeUrl: undefined,
      artworkUrl160: undefined,
    })

    expect(mapItunesEpisodeResultToEpisode(result)).toMatchObject({
      audioUrl: '',
      durationMs: null,
      imageUrl: 'https://example.com/tove-lo-600.jpg',
    })
  })

  it('returns an empty image URL when episode artwork is missing', () => {
    const result = buildItunesEpisodeResult({
      artworkUrl160: undefined,
      artworkUrl600: undefined,
    })

    expect(mapItunesEpisodeResultToEpisode(result).imageUrl).toBe('')
  })
})
