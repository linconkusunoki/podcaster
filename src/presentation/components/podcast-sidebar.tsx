import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import type { Podcast } from '@/domain/podcast'
import { useIsOverflowing } from '@/presentation/hooks/use-is-overflowing'

export type PodcastSidebarProps = {
  podcast: Podcast
}

export function PodcastSidebar({ podcast }: PodcastSidebarProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const isDescriptionOverflowing = useIsOverflowing(
    descriptionRef,
    podcast.description,
    !isDescriptionExpanded,
  )

  return (
    <aside className="podcast-sidebar" aria-labelledby="podcast-sidebar-title">
      <div className="podcast-sidebar__identity">
        <Link className="podcast-sidebar__identity-link" to={`/podcasts/${podcast.id}`}>
          <img
            className="podcast-sidebar__image"
            src={podcast.imageUrl}
            alt=""
            style={{ viewTransitionName: `podcast-artwork-${podcast.id}` }}
          />
          <h2 id="podcast-sidebar-title">{podcast.title}</h2>
        </Link>
        <div className="podcast-sidebar__metadata">
          <p>{podcast.author}</p>
        </div>
      </div>
      <p
        ref={descriptionRef}
        className={[
          'podcast-sidebar__description',
          isDescriptionExpanded && 'podcast-sidebar__description--expanded',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {podcast.description}
      </p>
      {isDescriptionOverflowing ? (
        <button
          className="podcast-sidebar__description-toggle"
          type="button"
          aria-expanded={isDescriptionExpanded}
          onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
        >
          {isDescriptionExpanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </aside>
  )
}
