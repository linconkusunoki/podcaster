import type { HttpClient } from '@/application/ports/http-client'

const ALL_ORIGINS_RAW_URL = 'https://api.allorigins.win/raw'

export function createAllOriginsHttpClient(fetcher: typeof fetch = fetch): HttpClient {
  return {
    async get<T>(targetUrl: string): Promise<T> {
      const proxyUrl = `${ALL_ORIGINS_RAW_URL}?url=${encodeURIComponent(targetUrl)}`

      try {
        const response = await fetcher(proxyUrl)

        if (!response.ok) {
          throw new Error(`AllOrigins request failed with status ${response.status}`)
        }

        return (await response.json()) as T
      } catch (error) {
        console.error('AllOrigins request failed', { targetUrl, error })
        throw error
      }
    },
  }
}
