"use client"

import type React from "react"

/**
 * Accessible Modal Component
 *
 * This component provides a fully accessible modal dialog implementation.
 *
 * Accessibility features:
 * - Proper ARIA roles and attributes
 * - Focus management (focus trap within modal)
 * - Keyboard navigation and escape key support
 * - Screen reader announcements
 * - Background scroll locking
 */
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { trapFocus } from "@/lib/utils/accessibility"

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  initialFocusRef?: React.RefObject<HTMLElement>
  returnFocusRef?: React.RefObject<HTMLElement>
  id?: string
}

export default function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocusRef,
  returnFocusRef,
  id,
}: AccessibleModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)
  const modalId = id || `modal-${Math.random().toString(36).substring(2, 9)}`
  const titleId = `${modalId}-title`
  const descriptionId = `${modalId}-description`

  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle body scroll locking
  useEffect(() => {
    const currentReturnFocusRef = returnFocusRef?.current
    if (isOpen) {
      // Save current active element to restore focus later
      previousActiveElement.current = document.activeElement

      // Lock body scroll
      document.body.style.overflow = "hidden"

      // Set initial focus
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else if (modalRef.current) {
        modalRef.current.focus()
      }

      // Set up focus trap
      const cleanupFocusTrap = trapFocus(modalId, true)

      return () => {
        // Unlock body scroll
        document.body.style.overflow = ""

        // Restore focus
        if (currentReturnFocusRef) {
          currentReturnFocusRef.focus()
        } else if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus()
        }

        // Clean up focus trap
        cleanupFocusTrap()
      }
    }
  }, [isOpen, initialFocusRef, returnFocusRef, modalId])

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, closeOnEscape])

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isMounted || !isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        id={modalId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cn(
          "relative bg-white dark:bg-gray-800 rounded-lg shadow-lg",
          "w-full max-w-md mx-4 sm:mx-auto p-4 focus:outline-none",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id={titleId} className="text-xl font-bold">
            {title}
          </h2>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className={cn("overflow-y-auto", contentClassName)}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
