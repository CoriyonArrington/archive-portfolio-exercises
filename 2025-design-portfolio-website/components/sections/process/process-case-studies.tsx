"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProjectsClient } from "@/lib/client-projects"
import ProjectCard from "@/components/projects/project-card"
import type { ProjectType } from "@/types/project"

export function ProcessCaseStudies() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true)
        const allProjects = await getFeaturedProjectsClient()

        // Sort by display_order first, then fallback to featured flag
        const sortedProjects = allProjects
          .sort((a, b) => {
            // If display_order is null, put at the end
            if (a.display_order === null && b.display_order === null) {
              // If both have no display_order, use featured flag
              if (a.featured && !b.featured) return -1
              if (!a.featured && b.featured) return 1
              return 0
            }
            if (a.display_order === null) return 1
            if (b.display_order === null) return -1
            // Otherwise sort by display_order
            return (a.display_order || 0) - (b.display_order || 0)
          })
          .slice(0, 2) // Limit to 2 projects

        setProjects(sortedProjects)
      } catch (error) {
        console.error("Error loading projects:", error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section className="py-12 md:py-16 transition-colors">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">See my process in action</h2>
          <Button asChild variant="ghost">
            <Link href="/work">
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-full transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 rounded-lg overflow-hidden"
              >
                <ProjectCard
                  project={{
                    ...project,
                    thumbnailUrl:
                      project.thumbnail_url || project.thumbnailUrl || `/placeholder.svg?height=600&width=800`,
                    tags: project.categories || project.tags || [],
                  }}
                  priority={index === 0}
                />

                {project.scheduled && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-t border-purple-100 dark:border-purple-800">
                    <Button
                      variant="outline"
                      className="w-full border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-800"
                      onClick={() => {
                        // Open notification modal or scroll to subscription form
                        const notificationModal = document.getElementById("notification-modal")
                        if (notificationModal) {
                          notificationModal.classList.remove("hidden")
                        } else {
                          // Fallback to scrolling to contact form
                          const contactSection = document.getElementById("contact-section")
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" })
                          }
                        }
                      }}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Get notified when published
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

