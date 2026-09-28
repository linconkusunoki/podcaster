import type { ComponentPropsWithoutRef } from 'react'

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  id: string
  label: string
  status?: string
  wrapperClassName?: string
}

export function Input({
  id,
  label,
  status,
  wrapperClassName,
  className,
  placeholder,
  ...props
}: InputProps) {
  const statusId = status ? `${id}-status` : undefined

  return (
    <div className={['ui-input', wrapperClassName].filter(Boolean).join(' ')}>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        className={className}
        placeholder={placeholder ?? label}
        aria-describedby={statusId}
      />
      {status ? (
        <span className="ui-input__status" id={statusId} role="status" aria-live="polite">
          {status}
        </span>
      ) : null}
    </div>
  )
}
