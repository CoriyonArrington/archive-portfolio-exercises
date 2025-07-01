"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toast } = useToast()
  const [toasts, setToasts] = useState<any[]>([])

  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    // Access the toast provider state
    if (typeof window !== "undefined") {
      // Get initial toasts
      // @ts-ignore - Access the internal toast state
      const initialToasts = window.__TOAST_PROVIDER__?.toasts || []
      setToasts(initialToasts)

      // Set up a listener for toast changes
      const handleToastChange = () => {
        try {
          // @ts-ignore - Access the internal toast state
          const currentToasts = window.__TOAST_PROVIDER__?.toasts || []
          setToasts([...currentToasts])
        } catch (error) {
          console.error("Error updating toasts:", error)
          // Fallback to empty array if there's an error
          setToasts([])
        }
      }

      // Use a more reliable approach with interval checking
      const intervalId = setInterval(handleToastChange, 300)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [])

  return (
    <ToastProvider>
      {Array.isArray(toasts) &&
        toasts.map(({ id, title, description, action, ...props }) => (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
      <ToastViewport />
    </ToastProvider>
  )
}
