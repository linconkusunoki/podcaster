import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AppShell, InitialLoadingShell } from './app-shell'
import { CatalogPage } from './catalog-page'
import { catalogLoader } from './loaders/catalog-loader'
import { podcastLoader } from './loaders/podcast-loader'
import { episodeLoader } from './loaders/episode-loader'
import { EpisodeRoute } from './route-placeholders'
import { PodcastPage } from './podcast-page'
import { RouteErrorBoundary } from './route-error-boundary'

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
        Component: PodcastPage,
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
