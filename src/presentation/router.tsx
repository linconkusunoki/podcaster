import { createBrowserRouter, type LoaderFunctionArgs, type RouteObject } from 'react-router-dom'

import { AppShell, InitialLoadingShell } from './app-shell'
import { CatalogPage } from './catalog-page'
import { catalogLoader } from './loaders/catalog-loader'
import { EpisodeRoute, PodcastRoute } from './route-placeholders'
import { RouteErrorBoundary } from './route-error-boundary'

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
    HydrateFallback: InitialLoadingShell,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, Component: CatalogPage, loader: catalogLoader },
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
