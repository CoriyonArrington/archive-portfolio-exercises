"use client"
import HealthProgressTracker from "@/components/health-progress-tracker"
import BrowserMockup from "@/components/browser-mockup"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react"

/**
 * HeroShowcase - Visual showcase of work sample
 *
 * Displays a browser mockup with a health tracker app and floating stat cards.
 * Now with deferred loading to improve initial page performance.
 *
 * Accessibility features:
 * - Appropriate aria-hidden for decorative elements
 * - Semantic HTML structure
 */
const HeroShowcase = () => {
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
    <div className="w-full animate-fade-in">
      {/* Browser mockup wrapping our health progress tracker */}
      <div className="relative w-full mb-4">
        <BrowserMockup>
          <div style={{ maxHeight: "500px", overflow: "hidden" }}>
            <HealthProgressTracker />
          </div>
        </BrowserMockup>
        <Toaster />
      </div>

      <div className="flex justify-between text-sm text-muted-foreground mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span>Before Redesign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>After Redesign</span>
        </div>
      </div>
    </div>
  )
}

export default HeroShowcase
