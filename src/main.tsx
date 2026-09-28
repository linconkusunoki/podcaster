import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/presentation/router'
import './presentation/reset.css'
import './presentation/tokens.css'
import './presentation/app-shell.css'
import './presentation/components/input.css'
import './presentation/components/loading-status.css'
import './presentation/components/podcast-card.css'
import './presentation/components/podcast-grid.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
