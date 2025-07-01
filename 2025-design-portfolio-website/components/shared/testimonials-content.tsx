import { Suspense } from "react"
import { getAllTestimonials } from "@/lib/data/testimonials"
import TestimonialCard from '@/components/sections/testimonials/testimonial-card"

// Loading skeleton for testimonials
function TestimonialsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
          <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
              <div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Testimonials content component
export async function TestimonialsContent() {
  const testimonials = await getAllTestimonials()

  // Find the featured testimonial (first one or first with featured flag)
  const featuredTestimonial = testimonials.find((t) => t.featured) || testimonials[0]

  // Filter out the featured testimonial from the rest
  const otherTestimonials = testimonials.filter((t) => t.id !== featuredTestimonial?.id)

  return (
    <div className="space-y-12">
      {/* Featured testimonial */}
      {featuredTestimonial && (
        <div className="mb-12">
          <TestimonialCard testimonial={featuredTestimonial} featured={true} />
        </div>
      )}

      {/* Grid of other testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

// Main component with suspense boundary
export default function Testimonials() {
  return (
    <Suspense fallback={<TestimonialsLoadingSkeleton />}>
      <TestimonialsContent />
    </Suspense>
  )
}

