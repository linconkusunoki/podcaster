import { describe, expect, it, vi } from 'vitest'

import { createFetchHttpClient } from '@/infrastructure/http/fetch-client'

describe('createFetchHttpClient', () => {
  it('fetches and parses JSON', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ result: 'ok' })))
    const client = createFetchHttpClient(fetcher)

    await expect(client.get('https://example.com/data')).resolves.toEqual({ result: 'ok' })
    expect(fetcher).toHaveBeenCalledWith('https://example.com/data')
  })

  it('rejects non-success responses', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }))
    const client = createFetchHttpClient(fetcher)

    await expect(client.get('https://example.com/data')).rejects.toThrow('status 503')
  })
})
