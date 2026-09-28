import { Link, Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <>
      <header className="app-header">
        <Link to="/">Podcaster</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
