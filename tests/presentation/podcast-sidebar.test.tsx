import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildPodcast } from '../builders/podcast'
import { PodcastSidebar } from '@/presentation/components/podcast-sidebar'

describe('PodcastSidebar', () => {
  it('links Podcast artwork and title and keeps description readable', () => {
    const podcast = buildPodcast({ description: 'A readable podcast description.' })

    render(
      <MemoryRouter>
        <PodcastSidebar podcast={podcast} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: podcast.title })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', `/podcasts/${podcast.id}`)
    expect(screen.getByRole('presentation')).toHaveAttribute('src', podcast.imageUrl)
    expect(screen.getByText(podcast.description)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument()
  })
})
