"use client"

import { useState, useEffect } from "react"
import type { Project } from "@/types/project"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProjectGridProps {
  projects: Project[]
  loading?: boolean
}

export function ProjectGrid({ projects, loading = false }: ProjectGridProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (loading || !isClient) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row gap-6 border rounded-lg p-4 md:p-0 md:pr-6">
            <Skeleton className="h-64 md:h-auto md:w-2/5 rounded-lg" />
            <div className="flex-1 py-6 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return <div className="text-center py-12">No projects found</div>
  }

  return (
    <div className="space-y-12">
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  // Format date if available
  const projectYear = project.date ? new Date(project.date).getFullYear() : null

  // Get categories (handle both array and string formats)
  const categories = Array.isArray(project.categories)
    ? project.categories
    : typeof project.categories === "string"
      ? project.categories.split(",").map((c) => c.trim())
      : []

  // Get the main category for the header
  const mainCategory = categories.length > 0 ? categories[0] : "Project"

  // Try all possible image field names
  const imageUrl =
    project.thumbnail_url ||
    project.thumbnailUrl ||
    project.image ||
    project.image_url ||
    "/placeholder.svg?height=600&width=800"

  // Get key achievements (from outcomes or highlights)
  const achievements = project.outcomes || project.highlights || []

  return (
    <div className="flex flex-col md:flex-row gap-6 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image section */}
      <div className="relative md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={project.title || "Project thumbnail"}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      {/* Content section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="font-medium text-primary">{mainCategory}</span>

          {projectYear && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {projectYear}
            </span>
          )}

          {project.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3">{project.description || project.summary}</p>

        {/* Tags */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.slice(0, 5).map((tag, index) => (
              <span key={index} className="bg-muted px-2.5 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Key Achievements */}
        {achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
            <ul className="space-y-1">
              {achievements.slice(0, 2).map((achievement, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-2">
          <Button asChild variant="default" className="group">
            <Link href={`/work/${project.slug}`} className="flex items-center">
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
