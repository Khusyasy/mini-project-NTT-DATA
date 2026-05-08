import type { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

function TextArea({ label, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <textarea
        className={`w-full border p-2 rounded ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default TextArea
