import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildEpisode } from '../builders/episode'
import { buildPodcast } from '../builders/podcast'
import { EpisodePage } from '@/presentation/episode-page'

describe('EpisodePage', () => {
  it('renders episode metadata, description, sidebar, and audio', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({ description: '<p>Episode description.</p>' })
    const router = createMemoryRouter(
      [{ path: '/', Component: EpisodePage, loader: () => ({ podcast, episode }) }],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: episode.title })).toBeInTheDocument()
    expect(screen.getByText('Episode description.')).toBeInTheDocument()
    expect(screen.getByLabelText(`Audio player for ${episode.title}`)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: podcast.title })).toBeInTheDocument()
  })

  it('renders trusted HTML description with links and formatting', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({
      description:
        '<p>Episode with <strong>bold</strong> and <a href="https://example.com">link</a>.</p>',
    })
    const router = createMemoryRouter(
      [{ path: '/', Component: EpisodePage, loader: () => ({ podcast, episode }) }],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: episode.title })).toBeInTheDocument()
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('renders multi-paragraph HTML descriptions', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({
      description: '<p>First paragraph.</p><p>Second paragraph.</p>',
    })
    const router = createMemoryRouter(
      [{ path: '/', Component: EpisodePage, loader: () => ({ podcast, episode }) }],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: episode.title })).toBeInTheDocument()
    expect(screen.getByText('First paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
  })

  it('preserves newlines in plain text descriptions', async () => {
    const podcast = buildPodcast()
    const episode = buildEpisode({
      description: 'Line one.\nLine two.\nLine three.',
    })
    const router = createMemoryRouter(
      [{ path: '/', Component: EpisodePage, loader: () => ({ podcast, episode }) }],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByText(/Line one/)).toBeInTheDocument()
    expect(screen.getByText(/Line two/)).toBeInTheDocument()
    expect(screen.getByText(/Line three/)).toBeInTheDocument()
  })
})
