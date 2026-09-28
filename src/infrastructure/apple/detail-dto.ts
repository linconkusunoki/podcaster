export type ItunesLookupResponse = {
  resultCount: number
  results: [ItunesPodcastResult, ...ItunesEpisodeResult[]]
}

export type ItunesPodcastResult = {
  wrapperType: 'track'
  kind: 'podcast'
  artistId: number
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  collectionViewUrl: string
  feedUrl: string
  artworkUrl600: string
  releaseDate: string
  trackCount: number
  genres: string[]
}

export type ItunesEpisodeResult = {
  wrapperType: 'podcastEpisode'
  kind: 'podcast-episode'
  collectionId: number
  collectionName: string
  trackId: number
  trackName: string
  description: string
  releaseDate: string
  trackTimeMillis?: number
  episodeUrl?: string
  artworkUrl160?: string
  artworkUrl600?: string
  trackViewUrl?: string
  collectionViewUrl: string
}
