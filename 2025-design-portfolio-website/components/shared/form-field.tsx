"use client"

import type React from "react"

/**
 * Form Field Component
 *
 * This component handles form field rendering with proper validation,
 * error messages, and accessibility attributes.
 *
 * Features:
 * - Label and input association
 * - Error message handling
 * - Required field indication
 * - Accessible error states
 * - Support for different input types
 */
import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  hintClassName?: string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      id,
      error,
      hint,
      required = false,
      className = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      hintClassName = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasError = !!error

    // Generate unique IDs for associated elements
    const hintId = `${id}-hint`
    const errorId = `${id}-error`
    const describedBy =
      [hint && !hasError ? hintId : null, hasError ? errorId : null].filter(Boolean).join(" ") || undefined

    return (
      <div className={cn("form-group", className)}>
        <label
          htmlFor={id}
          className={cn(
            "form-label",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            hasError ? "text-destructive" : "text-foreground",
            labelClassName,
          )}
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          required={required}
          className={cn(
            "form-input",
            hasError ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring",
            isFocused && !hasError && "ring-2 ring-ring ring-offset-1",
            inputClassName,
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Error message */}
        {hasError && (
          <p id={errorId} className={cn("mt-1 text-sm text-destructive", errorClassName)} aria-live="polite">
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !hasError && (
          <p id={hintId} className={cn("mt-1 text-sm text-muted-foreground", hintClassName)}>
            {hint}
          </p>
        )}
      </div>
    )
  },
)

FormField.displayName = "FormField"

export default FormField
