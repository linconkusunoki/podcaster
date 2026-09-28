import { createBrowserRouter, type LoaderFunctionArgs, type RouteObject } from 'react-router-dom'

import { AppShell } from './app-shell'
import { CatalogRoute, EpisodeRoute, PodcastRoute } from './route-placeholders'

export function podcastLoader({ params }: LoaderFunctionArgs) {
  return { podcastId: params.podcastId }
}

export function episodeLoader({ params }: LoaderFunctionArgs) {
  return { podcastId: params.podcastId, episodeId: params.episodeId }
}

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, Component: CatalogRoute },
      {
        path: 'podcasts/:podcastId',
        Component: PodcastRoute,
        loader: podcastLoader,
      },
      {
        path: 'podcasts/:podcastId/episodes/:episodeId',
        Component: EpisodeRoute,
        loader: episodeLoader,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
