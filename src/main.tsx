import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/presentation/router'
import './presentation/styles/reset.css'
import './presentation/styles/tokens.css'
import './presentation/styles/app-shell.css'
import './presentation/styles/input.css'
import './presentation/styles/loading-status.css'
import './presentation/styles/podcast-card.css'
import './presentation/styles/podcast-grid.css'
import './presentation/styles/podcast-sidebar.css'
import './presentation/styles/episode-list.css'
import './presentation/styles/audio-player.css'
import './presentation/styles/podcast-page.css'
import './presentation/styles/catalog-page.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
