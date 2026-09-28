import type { ComponentPropsWithoutRef } from 'react'

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  id: string
  label: string
  status?: string
}

export function Input({ id, label, status, className, ...props }: InputProps) {
  const statusId = status ? `${id}-status` : undefined

  return (
    <div className="ui-input">
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} className={className} aria-describedby={statusId} />
      {status ? (
        <span className="ui-input__status" id={statusId} role="status" aria-live="polite">
          {status}
        </span>
      ) : null}
    </div>
  )
}
