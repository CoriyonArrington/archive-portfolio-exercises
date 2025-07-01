/**
 * ProjectsGrid Component
 *
 * This component fetches and displays a grid of project cards.
 * It's a server component that fetches data from Supabase.
 *
 * Accessibility features:
 * - Proper error handling with user feedback
 * - Semantic HTML structure
 */
import ProjectCard from "@/components/projects/project-card"
import { getAllProjects } from "@/lib/data/projects"
import type { Project } from "@/types/project"

interface ProjectsGridProps {
  projects?: Project[]
}

export default async function ProjectsGrid({ projects: propProjects }: ProjectsGridProps) {
  // If projects are provided as props, use them
  // Otherwise, fetch projects from Supabase
  const projects = propProjects || (await getAllProjects())

  // If no projects found, show a message
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        // Ensure thumbnailUrl is properly set
        const projectWithImage = {
          ...project,
          thumbnailUrl: project.thumbnailUrl || `/placeholder.svg?height=600&width=800`,
          scheduled: project.scheduled || false, // Ensure scheduled property is explicitly set
        }
        return <ProjectCard key={project.id} project={projectWithImage} />
      })}
    </div>
  )
}

