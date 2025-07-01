/**
 * @deprecated Use ProjectFooterNav instead for consistent navigation styling
 */
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllProjects } from "@/lib/projects"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

// Props interface for the ProjectNav component
interface ProjectNavProps {
  currentProjectId: string
}

// Loading skeleton for project navigation
function ProjectNavSkeleton() {
  return (
    <div className="flex justify-between items-center border-t pt-8">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
    </div>
  )
}

// Project navigation content component that fetches data
async function ProjectNavContent({ currentProjectId }: ProjectNavProps) {
  // Get all projects
  const projects = await getAllProjects()

  // Find the index of the current project
  const currentIndex = projects.findIndex((project) => project.id === currentProjectId)

  // Get previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="flex justify-between items-center border-t pt-8">
      {prevProject ? (
        <Button asChild variant="outline">
          <Link href={`/work/${prevProject.slug}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous:</span> {prevProject.title}
          </Link>
        </Button>
      ) : (
        <div></div>
      )}
      {nextProject ? (
        <Button asChild variant="outline">
          <Link href={`/work/${nextProject.slug}`} className="flex items-center">
            <span className="hidden sm:inline">Next:</span> {nextProject.title}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  )
}

// Project navigation component with suspense boundary
export default function ProjectNav({ currentProjectId }: ProjectNavProps) {
  return (
    <Suspense fallback={<ProjectNavSkeleton />}>
      <ProjectNavContent currentProjectId={currentProjectId} />
    </Suspense>
  )
}
