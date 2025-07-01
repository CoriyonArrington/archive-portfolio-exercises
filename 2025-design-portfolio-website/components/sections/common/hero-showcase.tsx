"use client"
import { HealthProgressTracker } from "@/components/shared/health-progress-tracker"
import browserMockup from "@/components/sections/common/browser-mockup"
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
    <div className="relative animate-fade-in">
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span>Before Redesign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>After Redesign</span>
        </div>
      </div>

      {/* Browser mockup wrapping our health progress tracker */}
      <div className="w-full mb-8 relative">
        <BrowserMockup>
          <HealthProgressTracker />
        </BrowserMockup>
        <Toaster />
      </div>

      {/* Stats cards in a clean, horizontal layout */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform">
          <p className="text-sm text-gray-500 dark:text-gray-400">Patient engagement up</p>
          <p className="text-xl font-bold text-primary">+40% user retention</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform">
          <p className="text-sm text-gray-500 dark:text-gray-400">Patient satisfaction up</p>
          <p className="text-xl font-bold text-primary">+70% user satisfaction</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg">
          <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3 text-left">The Problem</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-left">
            Healthcare providers struggled with an outdated, complex system that frustrated users and hindered adoption.
            The legacy interface was unintuitive, leading to poor user engagement and resistance to change.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
          <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 text-left">The Solution</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-left">
            Through careful UX research and iterative design, we transformed the complex system into an engaging,
            user-centered experience. The new interface helps patients stay on track with their daily health goals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroShowcase

