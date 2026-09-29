import { useLoaderData } from 'react-router-dom'

import type { EpisodeDetails } from '@/application/ports/podcast-repository'

import { AudioPlayer } from './components/audio-player'
import { PodcastSidebar } from './components/podcast-sidebar'

export function EpisodePage() {
  const { podcast, episode } = useLoaderData() as EpisodeDetails

  return (
    <div className="episode-page">
      <PodcastSidebar podcast={podcast} />
      <article className="episode-page__content">
        <p className="episode-page__eyebrow">Episode</p>
        <h1>{episode.title}</h1>
        <div className="episode-page__metadata">
          <time dateTime={episode.publishedAt.toISOString()}>
            {episode.publishedAt.toLocaleDateString('en-US')}
          </time>
          {episode.durationMs ? <span>{Math.round(episode.durationMs / 60000)} min</span> : null}
        </div>
        <AudioPlayer src={episode.audioUrl} title={episode.title} />
        <div
          className="episode-page__description"
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
        {/* Trust boundary: episode.description HTML is sourced from Apple's API and rendered as trusted content. */}
      </article>
    </div>
  )
}
