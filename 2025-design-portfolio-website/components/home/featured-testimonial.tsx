"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { getAllTestimonials } from "@/lib/testimonials"
import type { TestimonialType } from "@/types/testimonial"

export function FeaturedTestimonial() {
  const [testimonial, setTestimonial] = useState<TestimonialType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonial() {
      try {
        setIsLoading(true)
        const data = await getAllTestimonials()

        // Filter for featured testimonials
        const featuredTestimonials = data.filter((t) => t.featured === true)

        // Get the first featured testimonial or fall back to the first testimonial
        if (featuredTestimonials.length > 0) {
          setTestimonial(featuredTestimonials[0])
        } else if (data.length > 0) {
          setTestimonial(data[0])
        }
      } catch (error) {
        console.error("Error loading testimonial:", error)
        setTestimonial(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonial()
  }, [])

  if (isLoading) {
    return <FeaturedTestimonialSkeleton />
  }

  if (!testimonial) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image column - only shown on medium screens and up */}
        <div className="relative hidden md:block h-full min-h-[400px] bg-gray-100 dark:bg-gray-700">
          {testimonial.image ? (
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={`${testimonial.author || testimonial.name} portrait`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
              <Quote className="h-24 w-24 text-primary/20" />
            </div>
          )}
        </div>

        {/* Content column */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Star Rating */}
          <div className="flex mb-6" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl font-medium italic mb-8">"{testimonial.quote}"</blockquote>

          {/* Author Info */}
          <div className="flex items-center">
            <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 bg-gray-200">
              {testimonial.image ? (
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`${testimonial.author || testimonial.name} portrait`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                  {(testimonial.author?.[0] || testimonial.name?.[0] || "A").toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-lg">{testimonial.author || testimonial.name}</p>
              <p className="text-muted-foreground">{testimonial.title}</p>
              {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedTestimonialSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block h-full min-h-[400px] bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-8 md:p-12">
          <div className="flex mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full mr-1"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-full mb-3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-5/6 mb-3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-4/6 mb-8"></div>
          <div className="flex items-center">
            <div className="h-14 w-14 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
            <div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-32 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
