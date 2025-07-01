"use client"

import { useEffect, useRef } from "react"

/**
 * Focus trap hook
 *
 * This hook traps focus within a container when it's active
 * Improves accessibility for modal dialogs and other overlays
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus the first element when the trap is activated
    if (firstElement) {
      firstElement.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Save the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Restore focus when the trap is deactivated
      if (previouslyFocused) {
        previouslyFocused.focus()
      }
    }
  }, [isActive])

  return containerRef
}
