import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/types/project"

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/work/${project.slug}`} className="block">
        <div className="relative aspect-video bg-gray-100">
          {project.image_url ? (
            <Image
              src={project.image_url || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{project.title}</h3>
          <p className="text-gray-600 line-clamp-2">{project.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{project.client || "Personal Project"}</span>
            <span className="text-sm font-medium text-gray-900">{project.year || "Ongoing"}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
