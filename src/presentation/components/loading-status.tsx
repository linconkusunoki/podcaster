import type { ComponentPropsWithoutRef } from 'react'

export type LoadingStatusProps = Omit<ComponentPropsWithoutRef<'div'>, 'role'> & {
  label?: string
}

export function LoadingStatus({ label = 'Loading...', className, ...props }: LoadingStatusProps) {
  return (
    <div
      {...props}
      className={['loading-status', className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="loading-status__indicator" aria-hidden="true" />
      {label}
    </div>
  )
}
