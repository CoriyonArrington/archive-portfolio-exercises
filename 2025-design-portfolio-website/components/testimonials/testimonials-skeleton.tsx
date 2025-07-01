/**
 * TestimonialsSkeleton Component
 *
 * This component displays a loading skeleton for the testimonials content.
 * It's shown while the testimonials data is being fetched.
 *
 * Accessibility features:
 * - Aria-live region to announce loading state to screen readers
 * - Visual indication of loading state
 */
import { Skeleton } from "@/components/ui/skeleton"

export default function TestimonialsSkeleton() {
  return (
    <div className="space-y-24" aria-live="polite" aria-busy="true">
      {/* Featured testimonial skeleton */}
      <section className="bg-muted p-8 md:p-12 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <Skeleton className="w-32 h-32 rounded-full mx-auto" />
          </div>
          <div className="md:w-2/3">
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-60 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </section>

      {/* Testimonials grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-8 w-8 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-6" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-40 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
