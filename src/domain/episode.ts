export type Episode = {
  id: string
  podcastId: string
  title: string
  description: string
  publishedAt: Date
  audioUrl: string
  durationMs: number | null
  imageUrl: string
}
