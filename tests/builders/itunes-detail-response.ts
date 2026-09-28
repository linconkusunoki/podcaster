import type {
  ItunesEpisodeResult,
  ItunesLookupResponse,
  ItunesPodcastResult,
} from '@/infrastructure/apple/detail-dto'

const defaultPodcastResult: ItunesPodcastResult = {
  wrapperType: 'track',
  kind: 'podcast',
  artistId: 1536636674,
  collectionId: 934552872,
  trackId: 934552872,
  artistName: 'Vulture',
  collectionName: 'Switched on Pop',
  collectionViewUrl: 'https://podcasts.apple.com/us/podcast/switched-on-pop/id934552872',
  feedUrl: 'https://feeds.megaphone.fm/switchedonpop',
  artworkUrl600: 'https://example.com/switched-on-pop-600.jpg',
  releaseDate: '2026-09-22T07:01:00Z',
  trackCount: 554,
  genres: ['Music Commentary', 'Podcasts', 'Music'],
}

const defaultEpisodeResult: ItunesEpisodeResult = {
  wrapperType: 'podcastEpisode',
  kind: 'podcast-episode',
  collectionId: 934552872,
  collectionName: 'Switched on Pop',
  trackId: 1000791062617,
  trackName: 'Tove Lo wants her music to sound out of control',
  description: 'A conversation about Tove Lo and her latest album.',
  releaseDate: '2026-09-22T07:01:00Z',
  trackTimeMillis: 2299000,
  episodeUrl: 'https://example.com/tove-lo.mp3',
  artworkUrl160: 'https://example.com/tove-lo-160.jpg',
  artworkUrl600: 'https://example.com/tove-lo-600.jpg',
  trackViewUrl: 'https://podcasts.apple.com/us/podcast/tove-lo/id934552872',
  collectionViewUrl: 'https://podcasts.apple.com/us/podcast/switched-on-pop/id934552872',
}

const defaultDetailResponse: ItunesLookupResponse = {
  resultCount: 2,
  results: [defaultPodcastResult, defaultEpisodeResult],
}

export function buildItunesPodcastResult(
  overrides: Partial<ItunesPodcastResult> = {},
): ItunesPodcastResult {
  return { ...defaultPodcastResult, ...overrides }
}

export function buildItunesEpisodeResult(
  overrides: Partial<ItunesEpisodeResult> = {},
): ItunesEpisodeResult {
  return { ...defaultEpisodeResult, ...overrides }
}

export function buildItunesDetailResponse(
  overrides: Partial<ItunesLookupResponse> = {},
): ItunesLookupResponse {
  return { ...defaultDetailResponse, ...overrides }
}
