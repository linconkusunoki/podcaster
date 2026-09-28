import type { ReactNode } from 'react'
import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

import { NavigationPending } from './navigation-pending'
import { LoadingStatus } from './components/loading-status'

function ShellFrame({ children, headerStatus }: { children: ReactNode; headerStatus?: ReactNode }) {
  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="brand-mark" to="/" viewTransition>
            <span>Pod</span>
            <span className="brand-mark__accent">
              <span className="brand-mark__track">
                <span>caster</span>
                <span aria-hidden="true">caster</span>
              </span>
            </span>
          </Link>
          {headerStatus}
        </div>
      </header>
      <main>{children}</main>
      <ScrollRestoration />
    </>
  )
}

export function AppShell() {
  return (
    <ShellFrame headerStatus={<NavigationPending />}>
      <Outlet />
    </ShellFrame>
  )
}

export function InitialLoadingShell() {
  return (
    <ShellFrame headerStatus={<LoadingStatus className="navigation-pending" />}>{null}</ShellFrame>
  )
}
