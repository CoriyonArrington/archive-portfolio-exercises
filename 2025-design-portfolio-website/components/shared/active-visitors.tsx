"use client"

import { useState, useEffect } from "react"

interface ActiveVisitorsProps {
  className?: string
  showDot?: boolean
}

export function ActiveVisitors({ className = "", showDot = true }: ActiveVisitorsProps) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    // Simulate a visitor count between 5-15 for demo purposes
    // In a real implementation, this would fetch from an API or Supabase
    const baseCount = Math.floor(Math.random() * 11) + 5 // Random number between 5-15

    // Add a small random fluctuation every few seconds to simulate visitors joining/leaving
    setVisitorCount(baseCount)

    const interval = setInterval(() => {
      // 50% chance to change the count
      if (Math.random() > 0.5) {
        // 50% chance to increase, 50% chance to decrease
        const change = Math.random() > 0.5 ? 1 : -1
        setVisitorCount((prev) => {
          if (!prev) return baseCount
          // Keep within reasonable bounds
          const newCount = prev + change
          return newCount >= 3 && newCount <= 20 ? newCount : prev
        })
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (visitorCount === null) {
    return null // Don't render until we have a count
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {showDot && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
      )}
      <span className="text-xs text-primary font-medium">{visitorCount} online now</span>
    </span>
  )
}

