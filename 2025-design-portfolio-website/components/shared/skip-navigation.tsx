"use client"

/**
 * Skip Navigation Component
 *
 * This component provides a skip link that allows keyboard users to bypass
 * navigation and go directly to the main content.
 *
 * Accessibility features:
 * - Only visible when focused (for keyboard users)
 * - Properly positioned at the top of the page
 * - Clear, descriptive text
 * - High contrast styling
 */
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SkipNavigationProps {
  mainContentId?: string
  label?: string
  className?: string
}

export default function SkipNavigation({
  mainContentId = "main-content",
  label = "Skip to main content",
  className,
}: SkipNavigationProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <a
      href={`#${mainContentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50",
        "focus:bg-white focus:text-black focus:p-4 focus:m-2 focus:rounded",
        "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500",
        className,
      )}
      onClick={(e) => {
        // Prevent default behavior to handle focus manually
        e.preventDefault()

        // Find the main content element
        const mainContent = document.getElementById(mainContentId)

        if (mainContent) {
          // Set tabindex to make it focusable if it isn't already
          if (!mainContent.hasAttribute("tabindex")) {
            mainContent.setAttribute("tabindex", "-1")
          }

          // Focus the element
          mainContent.focus()

          // Update URL hash
          window.location.hash = mainContentId
        }
      }}
    >
      {label}
    </a>
  )
}
