import { describe, expect, it } from 'vitest'

import { routes } from '@/presentation/router'

describe('router', () => {
  it('defines catalog, podcast, and episode routes', () => {
    const children = routes[0].children ?? []

    expect(children.map((route) => route.path ?? 'index')).toEqual([
      'index',
      'podcasts/:podcastId',
      'podcasts/:podcastId/episodes/:episodeId',
    ])
  })
})
