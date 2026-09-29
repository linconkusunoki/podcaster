import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { buildPodcast } from '../builders/podcast'
import { CatalogPage } from '@/presentation/catalog-page'

describe('CatalogPage', () => {
  it('filters by title or author immediately and updates the count', async () => {
    const podcasts = [
      buildPodcast({ id: 'daily', title: 'The Daily', author: 'News Network' }),
      buildPodcast({ id: 'music', title: 'Sound Check', author: 'Music Network' }),
    ]
    const router = createMemoryRouter(
      [{ path: '/', Component: CatalogPage, loader: () => podcasts }],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    const input = await screen.findByRole('textbox', { name: 'Filter podcasts' })
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('2 podcasts')

    fireEvent.change(input, { target: { value: 'MUSIC' } })

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(1)
    })
    expect(screen.getByRole('link', { name: /sound check/i })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('1 podcasts')
  })

  it('restores filter from URL search params on navigation', async () => {
    const podcasts = [
      buildPodcast({ id: 'daily', title: 'The Daily', author: 'News Network' }),
      buildPodcast({ id: 'music', title: 'Sound Check', author: 'Music Network' }),
    ]
    const router = createMemoryRouter(
      [{ path: '/', Component: CatalogPage, loader: () => podcasts }],
      { initialEntries: ['/?q=music'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('textbox', { name: 'Filter podcasts' })).toHaveValue('music')
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: /sound check/i })).toBeInTheDocument()
  })
})
