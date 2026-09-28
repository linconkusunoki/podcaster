import type { Episode } from '@/domain/episode'
import type { Podcast } from '@/domain/podcast'

import type { ItunesCatalogEntry } from './catalog-dto'
import type { ItunesEpisodeResult, ItunesPodcastResult } from './detail-dto'

export function mapItunesCatalogEntryToPodcast(entry: ItunesCatalogEntry): Podcast {
  return {
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    author: entry['im:artist'].label,
    imageUrl: selectCatalogImage(entry),
    description: entry.summary.label,
  }
}

export function mapItunesPodcastResultToPodcast(
  result: ItunesPodcastResult,
  description = '',
): Podcast {
  return {
    id: String(result.collectionId),
    title: result.collectionName,
    author: result.artistName,
    imageUrl: result.artworkUrl600,
    description,
  }
}

export function mapItunesEpisodeResultToEpisode(result: ItunesEpisodeResult): Episode {
  return {
    id: String(result.trackId),
    podcastId: String(result.collectionId),
    title: result.trackName,
    description: result.description,
    publishedAt: new Date(result.releaseDate),
    audioUrl: result.episodeUrl ?? '',
    durationMs: result.trackTimeMillis ?? null,
    imageUrl: result.artworkUrl160 ?? result.artworkUrl600 ?? '',
  }
}

function selectCatalogImage(entry: ItunesCatalogEntry): string {
  return (
    entry['im:image'].find((image) => image.attributes.height === '170')?.label ??
    entry['im:image'].at(-1)?.label ??
    ''
  )
}
