import type { ItunesCatalogResponse } from '@/infrastructure/apple/catalog-dto'

export const appleCatalogResponse = {
  feed: {
    entry: [
      {
        'im:name': { label: "Tony Mantor's: Almost Live... Nashville" },
        'im:image': [
          {
            label: 'https://example.com/podcast-55.jpg',
            attributes: { height: '55' },
          },
          {
            label: 'https://example.com/podcast-170.jpg',
            attributes: { height: '170' },
          },
        ],
        summary: { label: 'A podcast about music and entertainment.' },
        id: {
          label: 'https://podcasts.apple.com/us/podcast/id1751194045',
          attributes: { 'im:id': '1751194045' },
        },
        'im:artist': { label: 'Tony Mantor' },
      },
    ],
  },
} satisfies ItunesCatalogResponse
