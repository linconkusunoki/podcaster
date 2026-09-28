import type { HttpClient } from '@/application/ports/http-client'

export function createFetchHttpClient(fetcher: typeof fetch = fetch): HttpClient {
  return {
    async get<T>(url: string): Promise<T> {
      const response = await fetcher(url)

      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}: ${url}`)
      }

      return (await response.json()) as T
    },
  }
}
