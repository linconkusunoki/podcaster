import { describe, expect, it } from 'vitest'

import { listPodcasts } from '@/application/use-cases/list-podcasts'
import { buildPodcast } from '../builders/podcast'
import { buildPodcastRepository } from '../builders/podcast-repository'

describe('listPodcasts', () => {
  it('returns Podcasts from the repository', async () => {
    const podcast = buildPodcast()
    const repository = buildPodcastRepository({ list: async () => [podcast] })

    await expect(listPodcasts(repository)).resolves.toEqual([podcast])
  })

  it('returns an empty list when the catalog is empty', async () => {
    const repository = buildPodcastRepository()

    await expect(listPodcasts(repository)).resolves.toEqual([])
  })

  it('propagates repository errors', async () => {
    const error = new Error('catalog unavailable')
    const repository = buildPodcastRepository({
      list: async () => {
        throw error
      },
    })

    await expect(listPodcasts(repository)).rejects.toBe(error)
  })
})
