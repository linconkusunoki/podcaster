import { describe, expect, it } from 'vitest'
import type { LoaderFunctionArgs } from 'react-router-dom'

import { episodeLoader, podcastLoader, routes } from '@/presentation/router'

describe('router', () => {
  const loaderArgs = (params: Record<string, string>): LoaderFunctionArgs => ({
    request: new Request('http://localhost/'),
    params,
    context: {},
    url: new URL('http://localhost/'),
    pattern: '',
  })

  it('defines catalog, podcast, and episode routes', () => {
    const children = routes[0].children ?? []

    expect(children.map((route) => route.path ?? 'index')).toEqual([
      'index',
      'podcasts/:podcastId',
      'podcasts/:podcastId/episodes/:episodeId',
    ])
  })

  it('passes dynamic Podcast IDs to loaders', () => {
    expect(podcastLoader(loaderArgs({ podcastId: '42' }))).toEqual({
      podcastId: '42',
    })
  })

  it('passes dynamic Podcast and Episode IDs to loaders', () => {
    expect(episodeLoader(loaderArgs({ podcastId: '42', episodeId: '7' }))).toEqual({
      podcastId: '42',
      episodeId: '7',
    })
  })
})
