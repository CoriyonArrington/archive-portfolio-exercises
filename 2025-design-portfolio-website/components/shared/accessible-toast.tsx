"use client"

/**
 * Accessible Toast Component
 *
 * This component provides accessible toast notifications.
 *
 * Accessibility features:
 * - Proper ARIA roles and attributes
 * - Screen reader announcements
 * - Keyboard dismissal
 * - Auto-dismissal with configurable timing
 * - Visual styling for different toast types
 */
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info" | "warning"

interface AccessibleToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
  isVisible: boolean
  id?: string
}

export default function AccessibleToast({
  message,
  type = "info",
  duration = 5000,
  onClose,
  isVisible,
  id,
}: AccessibleToastProps) {
  const [isMounted, setIsMounted] = useState(false)
  const toastId = id || `toast-${Math.random().toString(36).substring(2, 9)}`

  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isMounted || !isVisible) {
    return null
  }

  // Get icon based on toast type
  const IconComponent = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }[type]

  // Get color classes based on toast type
  const colorClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200",
    error: "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200",
  }[type]

  return createPortal(
    <div
      id={toastId}
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed bottom-4 right-4 z-50",
        "flex items-center gap-3 p-4 rounded-lg shadow-lg",
        "border-l-4 max-w-md animate-slide-up",
        colorClasses,
      )}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1">{message}</div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  )
}
