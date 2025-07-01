"use client"

import { useState, useEffect } from "react"
import type { Project } from "@/types/project"
import { ArrowRight, Bell, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
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
  const router = useRouter()

  // Get tags (handle both array and string formats)
  const tags = Array.isArray(project.tags)
    ? project.tags
    : typeof project.tags === "string"
      ? project.tags.split(",").map((t) => t.trim())
      : []

  // Try all possible image field names
  const imageUrl =
    project.thumbnail_url ||
    project.thumbnailUrl ||
    project.image ||
    project.image_url ||
    "/placeholder.svg?height=600&width=800"

  // Get key achievements (from outcomes or highlights)
  const achievements = project.outcomes || []

  // Check if project is scheduled/coming soon
  const isComingSoon = project.scheduled || project.status === "coming_soon" || project.coming_soon

  // Handle notification subscription
  const handleNotification = () => {
    // Store the project ID in localStorage for the modal to use
    if (typeof window !== "undefined") {
      localStorage.setItem("notificationProjectId", project.id)
      localStorage.setItem("notificationProjectTitle", project.title)

      // Trigger the notification modal
      const notificationEvent = new CustomEvent("openNotificationModal", {
        detail: { projectId: project.id, projectTitle: project.title },
      })
      window.dispatchEvent(notificationEvent)
    }
  }

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

        {/* Coming soon badge */}
        {isComingSoon && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Tags - moved above title */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 5).map((tag, index) => (
              <span key={index} className="bg-muted px-2.5 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

        {/* Key Achievements - hidden on mobile */}
        {achievements && achievements.length > 0 && (
          <div className="mb-4 hidden md:block">
            <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
            <ul className="space-y-1">
              {achievements.slice(0, 3).map((achievement, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-2">
          {isComingSoon ? (
            <Button
              variant="outline"
              onClick={handleNotification}
              className="bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border-green-200 hover:border-green-300 dark:bg-green-950 dark:hover:bg-green-900 dark:text-green-400 dark:hover:text-green-300 dark:border-green-800 dark:hover:border-green-700"
            >
              <span>Get Notified</span>
              <Bell className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button asChild variant="ghost" className="group p-0 hover:bg-transparent">
              <Link href={`/work/${project.slug}`} className="flex items-center text-primary">
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

