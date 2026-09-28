import { Link, Outlet } from 'react-router-dom'

import { NavigationPending } from './navigation-pending'

export function AppShell() {
  return (
    <>
      <header className="app-header">
        <Link to="/">Podcaster</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <NavigationPending />
    </>
  )
}
