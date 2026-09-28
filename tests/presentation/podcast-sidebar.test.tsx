import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildPodcast } from '../builders/podcast'
import { PodcastSidebar } from '@/presentation/components/podcast-sidebar'

describe('PodcastSidebar', () => {
  it('renders non-interactive Podcast metadata and keeps description readable', () => {
    const podcast = buildPodcast({ description: 'A readable podcast description.' })

    render(
      <MemoryRouter>
        <PodcastSidebar podcast={podcast} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: podcast.title })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: podcast.title })).toHaveAttribute(
      'src',
      podcast.imageUrl,
    )
    expect(screen.getByText(podcast.description)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument()
  })
})
