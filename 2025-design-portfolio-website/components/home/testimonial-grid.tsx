"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllTestimonials } from "@/lib/testimonials"
import type { TestimonialType } from "@/types/testimonial"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

function TestimonialCard({ testimonial }: { testimonial: TestimonialType }) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "??"
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="bg-black border border-gray-800 p-6 rounded-lg shadow-sm flex flex-col h-full">
      {/* Quote Icon */}
      <div className="mb-4">
        <span className="text-green-500 text-5xl leading-none">&ldquo;</span>
      </div>

      {/* Testimonial Content */}
      <blockquote className="flex-grow mb-4">
        <p className="text-white italic leading-relaxed text-lg">{testimonial.quote}</p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center mt-auto">
        {testimonial.image ? (
          <div className="flex-shrink-0 mr-3">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={`Photo of ${testimonial.author || testimonial.name}`}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded-full mr-3 flex items-center justify-center">
            <span className="text-gray-200 font-semibold text-lg">
              {getInitials(testimonial.author || testimonial.name || "")}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{testimonial.author || testimonial.name}</p>
          {testimonial.title && <p className="text-sm text-gray-300">{testimonial.title}</p>}
          {testimonial.project && <p className="text-xs text-green-400 mt-1">Project: {testimonial.project}</p>}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialGrid() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setIsLoading(true)
        const data = await getAllTestimonials()
        console.log("Testimonials loaded:", data.length)

        // Sort by display_order first, then fallback to featured flag
        const sortedTestimonials = data.sort((a, b) => {
          // If display_order is null, put at the end
          if (a.display_order === null && b.display_order === null) {
            // If both have no display_order, use featured flag
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return 0
          }
          if (a.display_order === null) return 1
          if (b.display_order === null) return -1
          // Otherwise sort by display_order
          return (a.display_order || 0) - (b.display_order || 0)
        })

        // Limit based on screen size
        const displayLimit = isDesktop ? 3 : 2
        setTestimonials(sortedTestimonials.slice(0, displayLimit))
      } catch (error) {
        console.error("Error loading testimonials:", error)
        setTestimonials([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [isDesktop]) // Re-run when screen size changes

  if (isLoading) {
    return <TestimonialGridSkeleton />
  }

  // If no testimonials were loaded, don't render the section
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-24" aria-labelledby="testimonials-heading">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold font-playfair">
            Success stories
          </h2>
          <Button asChild variant="ghost">
            <Link href="/testimonials" aria-label="Read more stories">
              Read more stories <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialGridSkeleton() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="w-full">
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto mb-4"></div>
          <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm h-64 animate-pulse"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-1"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-6"></div>
              <div className="flex items-center mt-auto">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
