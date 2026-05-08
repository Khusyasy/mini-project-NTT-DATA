import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={`w-full border p-2 rounded ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Input
