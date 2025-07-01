"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProjectsClient } from "@/lib/client-projects"
import ProjectCard from "@/components/projects/project-card"
import { NotificationModal } from "@/components/projects/notification-modal"
import type { ProjectType } from "@/types/project"

export function ProcessCaseStudies() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string } | null>(null)

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

        // Transform projects to ensure they have tags instead of categories
        const projectsWithTags = sortedProjects.map((project) => {
          // Convert categories to tags if tags don't exist
          if (!project.tags || (Array.isArray(project.tags) && project.tags.length === 0)) {
            return {
              ...project,
              tags: project.categories || [],
            }
          }
          return project
        })

        setProjects(projectsWithTags)
      } catch (error) {
        console.error("Error loading projects:", error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleNotification = (project: ProjectType) => {
    setSelectedProject({
      id: project.id,
      title: project.title,
    })
    setShowNotificationModal(true)
  }

  return (
    <>
      <section className="py-12 md:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-0">
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
                  className="w-full transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden"
                >
                  <ProjectCard
                    project={{
                      ...project,
                      thumbnailUrl:
                        project.thumbnail_url || project.thumbnailUrl || `/placeholder.svg?height=600&width=800`,
                    }}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notification Modal */}
      {showNotificationModal && selectedProject && (
        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          projectTitle={selectedProject.title || ""}
          projectId={selectedProject.id || ""}
        />
      )}
    </>
  )
}

// Add default export that references the named export
export default ProcessCaseStudies
