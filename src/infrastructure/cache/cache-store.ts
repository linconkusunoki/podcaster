export const CATALOG_CACHE_KEY = 'podcast:catalog'

export type CacheEntry<T> = {
  value: T
  cachedAt: number
}

export interface CacheStore {
  read<T>(key: string): CacheEntry<T> | null
  write<T>(key: string, value: T, cachedAt: number): void
}

export function podcastDetailCacheKey(podcastId: string): string {
  return `podcast:detail:${podcastId}`
}

export function createLocalStorageCacheStore(storage: Storage = localStorage): CacheStore {
  return {
    read<T>(key: string) {
      const value = storage.getItem(key)

      if (!value) {
        return null
      }

      try {
        return JSON.parse(value) as CacheEntry<T>
      } catch {
        storage.removeItem(key)
        return null
      }
    },
    write<T>(key: string, value: T, cachedAt: number) {
      storage.setItem(key, JSON.stringify({ value, cachedAt } satisfies CacheEntry<T>))
    },
  }
}
