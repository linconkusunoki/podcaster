import type { HttpClient } from '@/application/ports/http-client'
import type { PodcastRepository } from '@/application/ports/podcast-repository'

import type { ItunesCatalogResponse } from './catalog-dto'
import { mapItunesCatalogEntryToPodcast, mapItunesEpisodeResultToEpisode } from './mappers'
import type { ItunesEpisodeResult, ItunesLookupResponse } from './detail-dto'
import { mapItunesPodcastResultToPodcast } from './mappers'

export const ITUNES_CATALOG_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export function createPodcastRepository(httpClient: HttpClient): PodcastRepository {
  async function list() {
    const response = await httpClient.get<ItunesCatalogResponse>(ITUNES_CATALOG_URL)
    return response.feed.entry.map(mapItunesCatalogEntryToPodcast)
  }

  async function lookup(podcastId: string) {
    const params = new URLSearchParams({
      id: podcastId,
      media: 'podcast',
      entity: 'podcastEpisode',
      limit: '20',
    })
    const response = await httpClient.get<ItunesLookupResponse>(
      `https://itunes.apple.com/lookup?${params.toString()}`,
    )

    return response
  }

  return {
    list,
    async getDetails(podcastId) {
      const [catalog, response] = await Promise.all([list(), lookup(podcastId)])
      const podcastResult = response.results.find((result) => result.kind === 'podcast')

      if (!podcastResult) {
        return null
      }

      const podcast = catalog.find((item) => item.id === podcastId)
      const episodes = response.results
        .filter(isItunesEpisodeResult)
        .map(mapItunesEpisodeResultToEpisode)

      return {
        podcast: podcast ?? mapItunesPodcastResultToPodcast(podcastResult),
        episodes,
      }
    },
    async getEpisode(podcastId, episodeId) {
      const response = await lookup(podcastId)
      const episode = response.results.find(
        (result): result is ItunesEpisodeResult =>
          isItunesEpisodeResult(result) && String(result.trackId) === episodeId,
      )

      return episode ? mapItunesEpisodeResultToEpisode(episode) : null
    },
  }
}

function isItunesEpisodeResult(
  result: ItunesLookupResponse['results'][number],
): result is ItunesEpisodeResult {
  return result.kind === 'podcast-episode'
}
