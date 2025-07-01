import { Suspense } from "react"
import ProjectCard from "@/components/projects/project-card"
import { getFeaturedProjects } from "@/lib/projects"
import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton for projects
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

// Projects loading component
function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProjectSkeleton />
      <ProjectSkeleton />
    </div>
  )
}

// Featured projects component that fetches data
async function FeaturedProjectsContent({ featured = false }: { featured?: boolean }) {
  // Get featured projects data from Supabase
  const featuredProjects = await getFeaturedProjects(featured)

  // If no projects found, show a message
  if (featuredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No featured projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {featuredProjects.map((project, index) => {
        // Ensure thumbnail_url is properly set (using the correct field name)
        const projectWithImage = {
          ...project,
          thumbnail_url: project.thumbnail_url || `/placeholder.svg?height=600&width=800`,
          categories: project.categories || [],
        }
        // Prioritize loading the first project image
        return (
          <div key={project.id} className="w-full">
            <ProjectCard project={projectWithImage} priority={index === 0} />
          </div>
        )
      })}
    </div>
  )
}

// Main component with suspense boundary
export default function FeaturedProjects({ featured = false }: { featured?: boolean }) {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <FeaturedProjectsContent featured={featured} />
    </Suspense>
  )
}

