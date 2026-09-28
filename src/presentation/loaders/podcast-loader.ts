import type { LoaderFunctionArgs } from 'react-router-dom'

import { PodcastNotFoundError } from '@/application/errors'
import { getPodcastDetails } from '@/application/use-cases/get-podcast-details'
import { createPodcastRepository } from '@/infrastructure/apple/podcast-repository'
import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

const repository = createPodcastRepository(createFetchHttpClient())

export function podcastLoader({ params }: LoaderFunctionArgs) {
  if (!params.podcastId) {
    throw new PodcastNotFoundError('missing')
  }

  return getPodcastDetails(repository, params.podcastId)
}
