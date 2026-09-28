import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import { listPodcasts } from '@/application/use-cases/list-podcasts'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

const repository = createPodcastRepository(createFetchHttpClient())

export function catalogLoader() {
  return listPodcasts(repository)
}
