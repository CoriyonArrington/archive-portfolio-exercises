"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationModal } from "@/components/projects/notification-modal"
import type { Project } from "@/types/projects"

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isComingSoon = project.status === "coming_soon" || project.scheduled

  // Debug the project data
  useEffect(() => {
    console.log("Home Project data:", project.title, {
      id: project.id,
      thumbnail_url: project.thumbnail_url,
      thumbnailUrl: project.thumbnailUrl,
      image: project.image,
      image_url: project.image_url,
      categories: project.categories,
    })
  }, [project])

  // Try all possible image field names
  const imageUrl =
    project.thumbnail_url ||
    project.thumbnailUrl ||
    project.image ||
    project.image_url ||
    "/placeholder.svg?height=600&width=800"

  // Use categories instead of tags
  let categories = []
  if (Array.isArray(project.categories)) {
    categories = project.categories
  } else if (typeof project.categories === "string") {
    try {
      // Try to parse JSON string if it's stored that way
      categories = JSON.parse(project.categories)
    } catch (e) {
      // If it's a comma-separated string
      categories = project.categories.split(",").map((category) => category.trim())
    }
  }

  return (
    <>
      <div className="rounded-2xl overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-800 dark:bg-black bg-white transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
        {/* Project image with overlay badge */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden group">
            {/* Debug info overlay */}
            {process.env.NODE_ENV === "development" && (
              <div className="absolute top-0 left-0 z-10 bg-black bg-opacity-70 text-white text-xs p-1">
                Image URL: {imageUrl.substring(0, 30)}...
              </div>
            )}

            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={project.title || "Project thumbnail"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error(`Failed to load image for ${project.title}:`, imageUrl)
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = "/placeholder.svg?height=600&width=800"
              }}
            />

            {/* Fallback for development */}
            {process.env.NODE_ENV === "development" && !imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <p className="text-sm text-gray-500">Loading image: {imageUrl.substring(0, 20)}...</p>
              </div>
            )}
          </div>

          {/* Status badge overlay */}
          {isComingSoon && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
          {categories &&
            categories.length > 0 &&
            categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                {category}
              </span>
            ))}
        </div>

        {/* Project title and description */}
        <div className="px-6 py-4 flex-grow">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description || project.summary}</p>
        </div>

        {/* Action button */}
        <div className="px-6 pb-6">
          {isComingSoon ? (
            <Button
              variant="link"
              className="text-green-500 hover:text-green-600 pl-0 h-auto font-medium"
              onClick={() => setIsNotificationModalOpen(true)}
            >
              <span>Get Notified</span>
              <Bell className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Link href={`/work/${project.slug}`} className="inline-block">
              <Button variant="default">View Project</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      {isComingSoon && (
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          projectTitle={project.title || ""}
          projectId={project.id || ""}
        />
      )}
    </>
  )
}

