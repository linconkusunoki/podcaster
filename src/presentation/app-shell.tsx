import type { ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { NavigationPending } from './navigation-pending'
import { LoadingStatus } from './components/loading-status'

function ShellFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="brand-mark" to="/">
            <span>Pod</span>
            <span className="brand-mark__accent">caster</span>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export function AppShell() {
  return (
    <ShellFrame>
      <Outlet />
      <NavigationPending />
    </ShellFrame>
  )
}

export function InitialLoadingShell() {
  return (
    <ShellFrame>
      <LoadingStatus />
    </ShellFrame>
  )
}
