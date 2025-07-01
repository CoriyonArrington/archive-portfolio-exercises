"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the HeroShowcase component with higher priority
const HeroShowcase = dynamic(() => import("./hero-showcase"), {
  loading: () => <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>,
  ssr: false,
})

export default function HeroShowcaseWrapper() {
  // Use state to defer loading of the showcase until after the main content is rendered
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Use requestIdleCallback to load the component when the browser is idle
    const loadComponent = () => {
      setIsLoaded(true)
    }

    if ("requestIdleCallback" in window) {
      // Use requestIdleCallback if available
      window.requestIdleCallback(loadComponent, { timeout: 2000 })
    } else {
      // Fallback to setTimeout with a delay
      setTimeout(loadComponent, 200)
    }
  }, [])

  // Show a placeholder until the component is ready to load
  if (!isLoaded) {
    return <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
  }

  return (
    <Suspense
      fallback={<div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}
    >
      <HeroShowcase />
    </Suspense>
  )
}
