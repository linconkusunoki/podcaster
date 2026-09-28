import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildPodcast } from '../builders/podcast'
import { PodcastCard } from '@/presentation/components/podcast-card'

describe('PodcastCard', () => {
  it('renders accessible navigation and podcast metadata', () => {
    const podcast = buildPodcast()

    render(
      <MemoryRouter>
        <PodcastCard podcast={podcast} rank={3} />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: /the daily briefing/i })
    expect(link).toHaveAttribute('href', `/podcasts/${podcast.id}`)
    expect(screen.getByRole('heading', { name: podcast.title })).toBeInTheDocument()
    expect(screen.getByText('#3')).toBeInTheDocument()
    expect(screen.getByText(podcast.author)).toBeInTheDocument()
    expect(screen.getByAltText('')).toHaveAttribute('src', podcast.imageUrl)
  })
})
