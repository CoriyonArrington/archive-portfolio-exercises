"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AdvancedLoaderProps {
  className?: string
  showProgress?: boolean
  duration?: number
  onComplete?: () => void
}

export function AdvancedLoader({ className, showProgress = true, duration = 2000, onComplete }: AdvancedLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isMovingUp, setIsMovingUp] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    // Update progress every 16ms (roughly 60fps)
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const newProgress = Math.min(100, (elapsed / duration) * 100)

      setProgress(newProgress)

      // When progress is at 75%, start moving up
      if (newProgress >= 75 && !isMovingUp) {
        setIsMovingUp(true)
      }

      if (now >= endTime) {
        clearInterval(interval)
        setIsExiting(true)

        // Call onComplete after exit animation
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 500)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [duration, onComplete, isMovingUp])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500",
        isExiting ? "opacity-0" : "opacity-100",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Container that moves up */}
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-1000 ease-in-out",
            isMovingUp ? "transform -translate-y-[40vh]" : "",
          )}
        >
          {/* Pulsing Circle */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-xs text-primary font-medium">online</span>
        </div>

        {/* Progress bar - fades out when moving up */}
        {showProgress && (
          <div
            className={cn(
              "w-48 h-1 bg-gray-800 rounded-full overflow-hidden transition-opacity duration-500",
              isMovingUp ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  )
}
