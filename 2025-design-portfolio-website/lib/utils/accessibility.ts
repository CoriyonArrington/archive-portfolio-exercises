/**
 * Accessibility Utility Functions
 *
 * This file contains utility functions to help with accessibility features
 * such as focus management, keyboard navigation, and ARIA attribute handling.
 */

/**
 * Sets focus to an element and announces a message to screen readers
 * @param elementId - The ID of the element to focus
 * @param message - Optional message to announce to screen readers
 */
export function focusElement(elementId: string, message?: string): void {
  const element = document.getElementById(elementId)

  if (element) {
    // Set focus to the element
    element.focus()

    // If a message is provided, announce it to screen readers
    if (message) {
      const announcer = document.createElement("div")
      announcer.setAttribute("aria-live", "polite")
      announcer.setAttribute("aria-atomic", "true")
      announcer.classList.add("sr-only")
      announcer.textContent = message

      document.body.appendChild(announcer)

      // Remove the announcer after the message has been read
      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 3000)
    }
  }
}

/**
 * Traps focus within a specified container for modal dialogs
 * @param containerId - The ID of the container to trap focus within
 * @param active - Whether the focus trap is active
 */
export function trapFocus(containerId: string, active: boolean): () => void {
  if (!active) return () => {}

  const container = document.getElementById(containerId)
  if (!container) return () => {}

  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  // Set initial focus
  firstElement.focus()

  // Handle keydown events to trap focus
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // If shift+tab and on first element, move to last element
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // If tab and on last element, move to first element
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Close on escape key
    if (e.key === "Escape") {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }

  document.addEventListener("keydown", handleKeyDown)

  // Return cleanup function
  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  }
}
