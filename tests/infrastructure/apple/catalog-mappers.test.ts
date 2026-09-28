import { describe, expect, it } from 'vitest'

import { buildItunesCatalogEntry } from '../../builders/itunes-catalog-response'
import { buildItunesPodcastResult } from '../../builders/itunes-detail-response'
import {
  mapItunesCatalogEntryToPodcast,
  mapItunesPodcastResultToPodcast,
} from '@/infrastructure/apple/mappers'

describe('iTunes Podcast mappers', () => {
  it('maps catalog entries to Podcasts', () => {
    const entry = buildItunesCatalogEntry()

    expect(mapItunesCatalogEntryToPodcast(entry)).toEqual({
      id: '1751194045',
      title: "Tony Mantor's: Almost Live... Nashville",
      author: 'Tony Mantor',
      imageUrl: 'https://example.com/podcast-170.jpg',
      description: 'A podcast about music and entertainment.',
    })
  })

  it('maps lookup podcast results to Podcasts', () => {
    const result = buildItunesPodcastResult()

    expect(mapItunesPodcastResultToPodcast(result, 'Catalog description')).toEqual({
      id: '934552872',
      title: 'Switched on Pop',
      author: 'Vulture',
      imageUrl: 'https://example.com/switched-on-pop-600.jpg',
      description: 'Catalog description',
    })
  })

  it('falls back to the last catalog image when 170px is unavailable', () => {
    const entry = buildItunesCatalogEntry({
      'im:image': [
        {
          label: 'https://example.com/podcast-60.jpg',
          attributes: { height: '60' },
        },
      ],
    })

    expect(mapItunesCatalogEntryToPodcast(entry).imageUrl).toBe(
      'https://example.com/podcast-60.jpg',
    )
  })

  it('returns an empty image URL when the catalog has no images', () => {
    const entry = buildItunesCatalogEntry({ 'im:image': [] })

    expect(mapItunesCatalogEntryToPodcast(entry).imageUrl).toBe('')
  })

  it('defaults a missing lookup description to an empty string', () => {
    const result = buildItunesPodcastResult()

    expect(mapItunesPodcastResultToPodcast(result).description).toBe('')
  })
})
