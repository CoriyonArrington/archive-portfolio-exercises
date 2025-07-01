"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface FloatingStatCardProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  title: string
  value: string
}

const FloatingStatCard: React.FC<FloatingStatCardProps> = ({ position, title, value }) => {
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define position classes based on the position prop
  const positionClasses = {
    "top-left": "top-4 left-4 md:-top-12 md:-left-10",
    "top-right": "top-4 right-4 md:-top-12 md:-right-10",
    "bottom-left": "bottom-16 left-4 md:bottom-32 md:left-10",
    "bottom-right": "bottom-16 right-4 md:bottom-32 md:right-10",
  }

  if (!mounted) return null

  return (
    <div
      className={`absolute ${positionClasses[position]} bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 md:p-4 border border-gray-100 dark:border-gray-700 animate-float`}
      style={{
        transform: "translateZ(0)", // Force a new stacking context
        willChange: "transform", // Force a new stacking context
        backfaceVisibility: "hidden", // Force a new stacking context
      }}
    >
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-sm md:text-lg font-bold text-primary">{value}</p>
    </div>
  )
}

export default FloatingStatCard
