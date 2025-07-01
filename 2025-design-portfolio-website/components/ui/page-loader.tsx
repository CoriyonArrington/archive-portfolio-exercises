"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface PageLoaderProps {
  className?: string
  text?: string // Optional prop to override the default text
}

export function PageLoader({ className, text }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [isMovingUp, setIsMovingUp] = useState(false)
  const pathname = usePathname()

  // Determine text based on pathname - "online" for home page, "loading" for others
  const loaderText = text || (pathname === "/" ? "Online" : "Loading")

  useEffect(() => {
    // Start moving up after 1.5 seconds
    const moveUpTimer = setTimeout(() => {
      setIsMovingUp(true)
    }, 1500)

    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 2000)

    // Remove component after exit animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500) // 2000ms + 500ms for exit animation

    return () => {
      clearTimeout(moveUpTimer)
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isExiting ? "opacity-0" : "opacity-100",
        className,
      )}
    >
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
        <span className="text-xs text-primary font-medium transition-colors">{loaderText}</span>
      </div>
    </div>
  )
}
