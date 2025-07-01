"use client"

import { useState, useEffect } from "react"
import { getAllTestimonials } from "@/lib/testimonials"
import type { TestimonialType } from "@/types/testimonial"
import TestimonialCard from "@/components/testimonials/testimonial-card"

export default function TestimonialPageContent() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setIsLoading(true)
        const data = await getAllTestimonials()

        // Sort testimonials: featured first, then by date
        const sortedTestimonials = [...data].sort((a, b) => {
          // First sort by featured status
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1

          // Then sort by date (newest first)
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
          return dateB.getTime() - dateA.getTime()
        })

        setTestimonials(sortedTestimonials)
      } catch (error) {
        console.error("Error loading testimonials:", error)
        setTestimonials([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  if (isLoading) {
    return <TestimonialPageSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Client Testimonials</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No testimonials found.</p>
        </div>
      )}
    </div>
  )
}

function TestimonialPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-12 w-64 bg-gray-200 rounded-md mx-auto mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md h-64 animate-pulse">
            <div className="flex mb-4">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-5 w-5 bg-gray-200 rounded-full mr-1"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="flex items-center mt-auto">
              <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded-md w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-md w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
