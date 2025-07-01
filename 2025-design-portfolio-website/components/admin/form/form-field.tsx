"use client"

import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: ReactNode
  description?: string
}

export function FormField({ label, htmlFor, error, required = false, children, description }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {description && <p className="text-sm text-gray-500">{description}</p>}

      {children}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
