import type { Podcast } from '@/domain/podcast'

import { PodcastCard } from './podcast-card'

export type PodcastGridProps = {
  podcasts: Podcast[]
  title?: string
}

export function PodcastGrid({ podcasts, title = 'Top podcasts' }: PodcastGridProps) {
  return (
    <section className="podcast-grid-section" aria-label={title}>
      <h2>{title}</h2>
      {podcasts.length > 0 ? (
        <ol className="podcast-grid">
          {podcasts.map((podcast, index) => (
            <li key={podcast.id}>
              <PodcastCard podcast={podcast} rank={index + 1} />
            </li>
          ))}
        </ol>
      ) : (
        <p className="podcast-grid__empty" role="status">
          No podcasts found.
        </p>
      )}
    </section>
  )
}
