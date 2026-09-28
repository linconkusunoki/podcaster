import { Link } from 'react-router-dom'

import type { Podcast } from '@/domain/podcast'

export type PodcastCardProps = {
  podcast: Podcast
  rank: number
}

export function PodcastCard({ podcast, rank }: PodcastCardProps) {
  return (
    <article className="podcast-card">
      <Link className="podcast-card__link" to={`/podcasts/${podcast.id}`}>
        <img className="podcast-card__image" src={podcast.imageUrl} alt="" loading="lazy" />
        <div className="podcast-card__content">
          <span className="podcast-card__rank">#{rank}</span>
          <h2 className="podcast-card__title">{podcast.title}</h2>
          <p className="podcast-card__author">{podcast.author}</p>
        </div>
      </Link>
    </article>
  )
}
