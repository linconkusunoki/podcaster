export class PodcastNotFoundError extends Error {
  constructor(id: string) {
    super(`Podcast not found: ${id}`)
    this.name = 'PodcastNotFoundError'
  }
}

export class EpisodeNotFoundError extends Error {
  constructor(id: string) {
    super(`Episode not found: ${id}`)
    this.name = 'EpisodeNotFoundError'
  }
}
