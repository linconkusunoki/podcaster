import { useLoaderData } from 'react-router-dom'

import type { Podcast } from '@/domain/podcast'

import { PodcastGrid } from './components/podcast-grid'

export function CatalogPage() {
  const podcasts = useLoaderData() as Podcast[]

  return <PodcastGrid podcasts={podcasts} />
}
