"use client"

import type React from "react"

import { useEffect, useState } from "react"
import FloatingStatCard from "../home/floating-stat-card"

export default function HeroShowcaseWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative w-full">
      {/* Make sure floating stats are visible on all screen sizes */}
      {isClient && (
        <>
          <FloatingStatCard position="top-left" title="Client Satisfaction" value="98%" />
          <FloatingStatCard position="top-right" title="Projects Completed" value="120+" />
          <FloatingStatCard position="bottom-left" title="Years Experience" value="8+" />
          <FloatingStatCard position="bottom-right" title="Design Awards" value="12" />
        </>
      )}
      {children}
    </div>
  )
}

