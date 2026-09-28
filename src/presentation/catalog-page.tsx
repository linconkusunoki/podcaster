import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import type { Podcast } from '@/domain/podcast'

import { Input } from './components/input'
import { PodcastGrid } from './components/podcast-grid'

export function CatalogPage() {
  const podcasts = useLoaderData() as Podcast[]
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredPodcasts = podcasts.filter((podcast) =>
    `${podcast.title} ${podcast.author}`.toLocaleLowerCase().includes(normalizedQuery),
  )

  return (
    <section className="catalog-page" aria-label="Podcast catalog">
      <Input
        id="podcast-filter"
        label="Filter podcasts"
        wrapperClassName="catalog-filter"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        status={`${filteredPodcasts.length} podcasts`}
      />
      <PodcastGrid podcasts={filteredPodcasts} />
    </section>
  )
}
