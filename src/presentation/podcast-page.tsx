import { useLoaderData } from 'react-router-dom'

import type { PodcastDetails } from '@/application/ports/podcast-repository'
import { usePageTitle } from '@/presentation/hooks/use-page-title'

import { EpisodeList } from './components/episode-list'
import { PodcastSidebar } from './components/podcast-sidebar'

export function PodcastPage() {
  const { podcast, episodes } = useLoaderData() as PodcastDetails
  usePageTitle(`${podcast.title} — Podcaster`)

  return (
    <div className="podcast-page">
      <PodcastSidebar podcast={podcast} />
      <div className="podcast-page__content">
        <EpisodeList episodes={episodes} />
      </div>
    </div>
  )
}
