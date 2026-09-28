import { Link } from 'react-router-dom'

import type { Episode } from '@/domain/episode'
import { formatDuration, formatPublishedAt } from '@/presentation/utils/episode-formatters'

export type EpisodeListProps = {
  episodes: Episode[]
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <section className="episode-list" aria-label="Episodes">
      <h2>Episodes ({episodes.length})</h2>
      {episodes.length > 0 ? (
        <ol>
          {episodes.map((episode) => (
            <li key={episode.id}>
              <Link
                className="episode-list__link"
                to={`/podcasts/${episode.podcastId}/episodes/${episode.id}`}
              >
                <strong>{episode.title}</strong>
                <span className="episode-list__metadata">
                  <time dateTime={episode.publishedAt.toISOString()}>
                    {formatPublishedAt(episode.publishedAt)}
                  </time>
                  {episode.durationMs ? <span>{formatDuration(episode.durationMs)}</span> : null}
                </span>
                <span className="episode-list__description">{episode.description}</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status">No episodes found.</p>
      )}
    </section>
  )
}
