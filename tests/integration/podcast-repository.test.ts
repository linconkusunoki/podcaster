import { describe, expect, it, vi } from 'vitest'

import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'
import { buildItunesCatalogResponse } from '../builders/itunes-catalog-response'
import { buildItunesDetailResponse } from '../builders/itunes-detail-response'

describe('PodcastRepository integration', () => {
  it('fetches and maps catalog through HTTP client', async () => {
    const data = buildItunesCatalogResponse()
    const get = vi.fn().mockResolvedValue(new Response(JSON.stringify(data)))
    const httpClient = createFetchHttpClient(get as unknown as typeof fetch)
    const repository = createPodcastRepository(httpClient)

    const podcasts = await repository.list()

    expect(get).toHaveBeenCalledWith(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    )
    expect(podcasts).toHaveLength(1)
    expect(podcasts[0]).toMatchObject({
      id: '1751194045',
      title: "Tony Mantor's: Almost Live... Nashville",
      author: 'Tony Mantor',
    })
  })

  it('fetches and maps podcast details through HTTP client', async () => {
    const catalogData = buildItunesCatalogResponse()
    const detailData = buildItunesDetailResponse()
    const get = vi
      .fn()
      .mockImplementation((url: string) =>
        Promise.resolve(
          new Response(JSON.stringify(url.includes('lookup') ? detailData : catalogData)),
        ),
      )
    const httpClient = createFetchHttpClient(get as unknown as typeof fetch)
    const repository = createPodcastRepository(httpClient)

    const details = await repository.getDetails('934552872')

    expect(get).toHaveBeenCalledWith(
      'https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20',
    )
    expect(details).not.toBeNull()
    expect(details?.podcast.id).toBe('934552872')
    expect(details?.episodes).toHaveLength(1)
    expect(details?.episodes[0]).toMatchObject({
      id: '1000791062617',
      podcastId: '934552872',
    })
  })
})
