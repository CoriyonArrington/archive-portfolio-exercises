"use client"

import type { ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "danger"
}

export function FormButton({ children, isLoading = false, variant = "primary", disabled, ...props }: FormButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`

  return (
    <button type="button" className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  )
}

