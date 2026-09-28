import { afterEach, describe, expect, it, vi } from 'vitest'

import { createAllOriginsHttpClient } from '@/infrastructure/allorigins/adapter'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('createAllOriginsHttpClient', () => {
  it('encodes the target URL and parses JSON', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ result: 'ok' }), {
        headers: { 'content-type': 'application/json' },
      }),
    )

    const client = createAllOriginsHttpClient(fetcher)

    await expect(
      client.get('https://itunes.apple.com/us/rss/toppodcasts?genre=1310'),
    ).resolves.toEqual({ result: 'ok' })

    expect(fetcher).toHaveBeenCalledWith(
      'https://api.allorigins.win/raw?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%3Fgenre%3D1310',
    )
  })

  it('logs and rejects non-success responses', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }))

    const client = createAllOriginsHttpClient(fetcher)

    await expect(client.get('https://example.com')).rejects.toThrow(
      'AllOrigins request failed with status 503',
    )
    expect(error).toHaveBeenCalledOnce()
  })

  it('logs and rethrows network errors', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const failure = new Error('network unavailable')
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(failure)

    const client = createAllOriginsHttpClient(fetcher)

    await expect(client.get('https://example.com')).rejects.toBe(failure)
    expect(error).toHaveBeenCalledOnce()
  })
})
