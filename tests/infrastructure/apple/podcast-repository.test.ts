import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '@/application/ports/http-client'
import {
  createPodcastRepository,
  ITUNES_CATALOG_URL,
} from '@/infrastructure/apple/podcast-repository'
import {
  buildItunesCatalogEntry,
  buildItunesCatalogResponse,
} from '../../builders/itunes-catalog-response'
import {
  buildItunesDetailResponse,
  buildItunesEpisodeResult,
} from '../../builders/itunes-detail-response'

const podcastId = '934552872'
const lookupUrl =
  'https://itunes.apple.com/lookup?' + 'id=934552872&media=podcast&entity=podcastEpisode&limit=20'

describe('createPodcastRepository', () => {
  it('lists catalog Podcasts through the HTTP client', async () => {
    const get = vi.fn().mockResolvedValue(buildItunesCatalogResponse())
    const repository = createPodcastRepository({ get } satisfies HttpClient)

    await expect(repository.list()).resolves.toHaveLength(1)
    expect(get).toHaveBeenCalledWith(ITUNES_CATALOG_URL)
  })

  it('returns Podcast details with mapped Episodes', async () => {
    const get = vi.fn().mockImplementation((url: string) =>
      url === ITUNES_CATALOG_URL
        ? buildItunesCatalogResponse({
            feed: {
              entry: [
                buildItunesCatalogEntry({
                  id: {
                    label: 'https://podcasts.apple.com/us/podcast/id934552872',
                    attributes: { 'im:id': podcastId },
                  },
                }),
              ],
            },
          })
        : buildItunesDetailResponse(),
    )
    const repository = createPodcastRepository({ get } satisfies HttpClient)

    await expect(repository.getDetails(podcastId)).resolves.toMatchObject({
      podcast: { id: podcastId },
      episodes: [{ id: '1000791062617', podcastId }],
    })
    expect(get).toHaveBeenCalledWith(ITUNES_CATALOG_URL)
    expect(get).toHaveBeenCalledWith(lookupUrl)
  })

  it('returns one Episode by ID', async () => {
    const episode = buildItunesEpisodeResult({ trackId: 123 })
    const get = vi
      .fn()
      .mockResolvedValue(
        buildItunesDetailResponse({ results: [buildItunesDetailResponse().results[0], episode] }),
      )
    const repository = createPodcastRepository({ get } satisfies HttpClient)

    await expect(repository.getEpisode(podcastId, '123')).resolves.toMatchObject({ id: '123' })
  })
})
