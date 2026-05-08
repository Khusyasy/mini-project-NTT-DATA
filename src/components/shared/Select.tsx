import type { SelectHTMLAttributes, ReactNode } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: ReactNode
}

function Select({
  label,
  error,
  children,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <select
        className={`w-full border p-2 rounded ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Select
