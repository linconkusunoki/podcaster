import { useEffect } from 'react'
import { useLocation, useRouteError } from 'react-router-dom'

export function RouteErrorBoundary() {
  const error = useRouteError()
  const location = useLocation()

  useEffect(() => {
    console.error('Route loading failed', {
      pathname: location.pathname,
      error,
    })
  }, [error, location.pathname])

  return null
}
