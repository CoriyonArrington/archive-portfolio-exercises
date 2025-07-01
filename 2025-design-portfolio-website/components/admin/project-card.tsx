import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const isComingSoon = project.status === "coming_soon" || project.scheduled

  // Try all possible image field names
  const imageUrl =
    project.thumbnail_url ||
    project.thumbnailUrl ||
    project.image ||
    project.image_url ||
    "/placeholder.svg?height=600&width=800"

  return (
    <div className="rounded-lg overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={project.title || "Project thumbnail"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />

        {/* Status badge overlay */}
        {isComingSoon && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{project.description || project.summary}</p>

        {project.categories && project.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(project.categories)
              ? project.categories.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))
              : typeof project.categories === "string" &&
                project.categories
                  .split(",")
                  .slice(0, 3)
                  .map((tag, index) => (
                    <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                      {tag.trim()}
                    </span>
                  ))}
          </div>
        )}

        {isComingSoon ? (
          <Button variant="link" className="text-green-500 hover:text-green-600 pl-0 h-auto font-medium justify-start">
            <span>Get Notified</span>
            <Bell className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button asChild variant="ghost" className="justify-start p-0 hover:bg-transparent">
            <Link href={`/work/${project.slug}`} className="flex items-center text-primary">
              View Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProjectCard

