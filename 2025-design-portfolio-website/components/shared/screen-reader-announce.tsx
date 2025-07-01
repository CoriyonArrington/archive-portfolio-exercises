"use client"

/**
 * Screen Reader Announcement Component
 *
 * This component provides a way to make announcements to screen readers
 * without visually affecting the UI.
 *
 * Features:
 * - Visually hidden but accessible to screen readers
 * - Configurable politeness level (polite or assertive)
 * - Support for clearing announcements after they're read
 */
import { useEffect, useState } from "react"

interface ScreenReaderAnnounceProps {
  message: string
  politeness?: "polite" | "assertive"
  clearAfter?: number // Time in ms to clear the message
}

export default function ScreenReaderAnnounce({
  message,
  politeness = "polite",
  clearAfter = 5000,
}: ScreenReaderAnnounceProps) {
  const [announcement, setAnnouncement] = useState(message)

  useEffect(() => {
    // Update announcement when message changes
    setAnnouncement(message)

    // Clear announcement after specified time
    if (clearAfter > 0) {
      const timer = setTimeout(() => {
        setAnnouncement("")
      }, clearAfter)

      return () => clearTimeout(timer)
    }
  }, [message, clearAfter])

  if (!announcement) {
    return null
  }

  return (
    <div role="status" aria-live={politeness} aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  )
}
