import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import axe from 'axe-core'

import { buildPodcast } from '../builders/podcast'
import { buildEpisode } from '../builders/episode'
import { routes } from '@/presentation/router'

describe('route accessibility', () => {
  it('catalog route has no axe violations', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] })
    const { container } = render(<RouterProvider router={router} />)
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('podcast detail route has no axe violations', async () => {
    const podcast = buildPodcast({ id: '42' })
    const episode = buildEpisode({ podcastId: '42' })
    const router = createMemoryRouter(
      [
        {
          path: '/',
          Component: () => null,
          children: [
            {
              path: 'podcasts/:podcastId',
              Component: () => null,
              loader: () => ({ podcast, episodes: [episode] }),
            },
          ],
        },
      ],
      { initialEntries: ['/podcasts/42'] },
    )
    const { container } = render(<RouterProvider router={router} />)
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it('episode detail route has no axe violations', async () => {
    const podcast = buildPodcast({ id: '42' })
    const episode = buildEpisode({ id: '7', podcastId: '42' })
    const router = createMemoryRouter(
      [
        {
          path: '/',
          Component: () => null,
          children: [
            {
              path: 'podcasts/:podcastId/episodes/:episodeId',
              Component: () => null,
              loader: () => ({ podcast, episode }),
            },
          ],
        },
      ],
      { initialEntries: ['/podcasts/42/episodes/7'] },
    )
    const { container } = render(<RouterProvider router={router} />)
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
