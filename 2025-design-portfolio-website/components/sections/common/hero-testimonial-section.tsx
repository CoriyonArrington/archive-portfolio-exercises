"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { getAllTestimonials } from "@/lib/data/testimonials"
import type { TestimonialType } from "@/types/testimonial"

export default function HeroTestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setIsLoading(true)
        const data = await getAllTestimonials()

        // Filter for featured testimonials with images
        const featuredTestimonialsWithImages = data.filter(
          (testimonial) => testimonial.featured === true && testimonial.image,
        )

        console.log("All testimonials:", data.length)
        console.log("Featured testimonials with images:", featuredTestimonialsWithImages.length)

        // If we have featured testimonials with images, use those
        if (featuredTestimonialsWithImages.length > 0) {
          setTestimonials(featuredTestimonialsWithImages.slice(0, 5))
        } else {
          // Otherwise, use all featured testimonials
          const featuredTestimonials = data.filter((testimonial) => testimonial.featured === true)
          setTestimonials(featuredTestimonials.slice(0, 5))
        }
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
    return <HeroTestimonialSkeleton />
  }

  // If no testimonials were loaded, don't render the section
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialType }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
      {/* Star Rating */}
      <div className="flex mb-4" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-grow mb-6">
        <p className="text-gray-700 italic line-clamp-4">"{testimonial.quote}"</p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center mt-auto">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200">
          {testimonial.image ? (
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={`Portrait of ${testimonial.author || testimonial.name}`}
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
          <p className="font-semibold">{testimonial.author || testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.title}</p>
        </div>
      </div>
    </div>
  )
}

function HeroTestimonialSkeleton() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="h-10 w-64 bg-gray-200 rounded-md mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
    </section>
  )
}

