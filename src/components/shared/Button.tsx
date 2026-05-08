import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'warning'
  isLoading?: boolean
}

function Button({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-cyan-500 text-white',
    secondary: 'border border-cyan-500 text-cyan-500',
    danger: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-white',
  }

  return (
    <button
      className={`px-4 py-2 rounded ${variants[variant]} ${className} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

export default Button
