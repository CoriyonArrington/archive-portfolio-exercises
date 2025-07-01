/**
 * ProjectDetailSkeleton Component
 *
 * This component displays a loading skeleton for the project detail page.
 * It's shown while the project data is being fetched.
 *
 * Accessibility features:
 * - Aria-live region to announce loading state to screen readers
 * - Visual indication of loading state
 */
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailSkeleton() {
  return (
    <div className="space-y-12" aria-live="polite" aria-busy="true">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-16">
          <section>
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </section>

          <Skeleton className="h-[400px] w-full rounded-lg" />

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full mt-2" />
            </div>
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full mt-2" />
            </div>
          </section>
        </div>

        <div>
          <div className="rounded-lg border p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-6">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              <Skeleton className="h-px w-full" />

              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
