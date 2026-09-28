import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildPodcast } from '../builders/podcast'
import { PodcastGrid } from '@/presentation/components/podcast-grid'

describe('PodcastGrid', () => {
  it('renders Podcasts as an ordered accessible collection', () => {
    const firstPodcast = buildPodcast({ id: 'first', title: 'First podcast' })
    const secondPodcast = buildPodcast({ id: 'second', title: 'Second podcast' })

    render(
      <MemoryRouter>
        <PodcastGrid podcasts={[firstPodcast, secondPodcast]} title="Top podcasts" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('region', { name: 'Top podcasts' })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('#2')).toBeInTheDocument()
  })

  it('announces empty results', () => {
    render(<PodcastGrid podcasts={[]} />)

    expect(screen.getByRole('status')).toHaveTextContent('No podcasts found.')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
