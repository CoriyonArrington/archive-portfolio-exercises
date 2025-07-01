import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getAllProjects } from "@/lib/projects"

// Props interface for the ProjectFooterNav component
interface ProjectFooterNavProps {
  currentProjectId: string
}

// Server component for project navigation
export default async function ProjectFooterNav({ currentProjectId }: ProjectFooterNavProps) {
  // Fetch all projects directly in the server component
  const projects = await getAllProjects()

  // Find the index of the current project
  const currentIndex = projects.findIndex((project) => project.id === currentProjectId)

  // Get previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // If no navigation is possible, don't render anything
  if (!prevProject && !nextProject) {
    return null
  }

  return (
    <div className="border-t mb-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="border rounded-lg p-6 flex items-center hover:bg-muted transition-colors group text-left"
              prefetch={true}
            >
              <div className="flex items-center space-x-4">
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous Project</p>
                  <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                    {prevProject.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className={`border rounded-lg p-6 flex items-center justify-between hover:bg-muted transition-colors group text-left ${!prevProject ? "md:col-span-2" : ""}`}
              prefetch={true}
            >
              <div>
                <p className="text-sm text-muted-foreground">Next Project</p>
                <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
