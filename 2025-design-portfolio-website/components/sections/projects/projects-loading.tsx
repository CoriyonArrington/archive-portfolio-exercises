/**
 * ProjectsLoading Component
 *
 * This component displays a loading skeleton for the projects grid.
 * It's shown while the projects data is being fetched.
 *
 * Accessibility features:
 * - Aria-live region to announce loading state to screen readers
 * - Visual indication of loading state
 */
import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton for a single project card
function ProjectSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-8 w-32 mt-4" />
      </div>
    </div>
  )
}

// Projects loading component with multiple skeletons
export default function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-live="polite" aria-busy="true">
      {[...Array(6)].map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  )
}

