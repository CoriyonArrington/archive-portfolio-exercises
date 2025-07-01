"use client"

import type React from "react"

/**
 * Toast Provider Component
 *
 * This component provides a context for managing toast notifications throughout the application.
 *
 * Features:
 * - Create toast notifications of different types
 * - Manage multiple toasts
 * - Automatically remove toasts after they're dismissed
 * - Accessible toast implementation
 */
import { createContext, useContext, useState, useCallback } from "react"
import AccessibleToast, { type ToastType } from "@/components/shared/accessible-toast"

interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  hideToast: (id: string) => void
  clearAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Show a new toast
  const showToast = useCallback((message: string, type: ToastType = "info", duration = 5000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
        duration,
      },
    ])

    return id
  }, [])

  // Hide a specific toast
  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast, clearAllToasts }}>
      {children}

      {/* Render all active toasts */}
      {toasts.map((toast) => (
        <AccessibleToast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          isVisible={true}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  )
}
