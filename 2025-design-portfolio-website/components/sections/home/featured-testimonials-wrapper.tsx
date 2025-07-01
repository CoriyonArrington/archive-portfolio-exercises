"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface FeaturedTestimonialsWrapperProps {
  children: React.ReactNode
}

export function FeaturedTestimonialsWrapper({ children }: FeaturedTestimonialsWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="featured-testimonials-wrapper">
      {children}
      {isClient && (
        <div className="hidden">
          {/* This is just to confirm the component is hydrated */}
          <span data-testid="featured-testimonials-hydrated"></span>
        </div>
      )}
    </div>
  )
}

