"use client"

import type React from "react"

import { ArrowLeft, ArrowRight, RotateCw, X, Lock, Star, Plus } from "lucide-react"
import { useEffect, useState } from "react"

// Define the props for our BrowserMockup component
interface BrowserMockupProps {
  children: React.ReactNode
  url?: string
}

export default function BrowserMockup({
  children,
  url = "https://healthspark.app/progress-tracker",
}: BrowserMockupProps) {
  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device when the component mounts
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkIfMobile()

    // Update on window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div
      className="rounded-lg overflow-hidden shadow-2xl border border-gray-200 max-w-6xl mx-auto"
      role="region"
      aria-label="Browser mockup"
    >
      {/* Browser Header - Chrome-like UI */}
      <div className="bg-gray-100 border-b border-gray-200">
        {/* Window Controls (red, yellow, green circles) */}
        <div className="flex items-center px-4 py-2">
          <div className="flex space-x-2 mr-4" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Browser Tabs */}
          <div className="flex items-center">
            {/* Active Tab */}
            <div
              className="flex items-center bg-white rounded-t-lg border-t border-l border-r border-gray-200 px-4 py-2 text-sm text-gray-700 font-medium"
              role="tab"
              aria-selected="true"
            >
              <span className="mr-2 truncate max-w-[150px]">HealthSpark Progress</span>
              <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" aria-label="Close tab">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* New Tab Button */}
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="New tab"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Address Bar and Navigation Controls */}
        <div className="flex items-center px-4 pb-2">
          {/* Navigation Buttons */}
          <div className="flex items-center mr-4 text-gray-500">
            <button
              className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go forward"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Refresh page"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          {/* URL Bar */}
          <div
            className="flex-1 flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
            role="textbox"
            aria-label="Address bar"
            tabIndex={0}
          >
            <Lock className="h-3 w-3 text-gray-500 mr-2" aria-hidden="true" />
            <span className="truncate">{url}</span>
          </div>

          {/* Bookmark Button */}
          <div className="flex items-center ml-4 text-gray-500">
            <button
              className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Bookmark this page"
            >
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Browser Content Area */}
      <div className="bg-gray-50 overflow-auto" style={{ maxHeight: isMobile ? "auto" : "calc(100vh - 200px)" }}>
        {children}
      </div>
    </div>
  )
}
