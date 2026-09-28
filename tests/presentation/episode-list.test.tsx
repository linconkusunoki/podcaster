import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildEpisode } from '../builders/episode'
import { EpisodeList } from '@/presentation/components/episode-list'

describe('EpisodeList', () => {
  it('links Episodes to their detail routes', () => {
    const episode = buildEpisode({
      description: 'A short episode description.',
    })

    render(
      <MemoryRouter>
        <EpisodeList episodes={[episode]} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: new RegExp(episode.title) })).toHaveAttribute(
      'href',
      `/podcasts/${episode.podcastId}/episodes/${episode.id}`,
    )
    expect(screen.getByText('Jan 15, 2026')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
    expect(screen.getByText(episode.description)).toBeInTheDocument()
  })
})
