"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProjects } from "@/lib/projects"
import { useState, useEffect } from "react"
import { NotificationModal } from "@/components/projects/notification-modal"

export function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeProjectTitle, setActiveProjectTitle] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)

  // This will be called in useEffect
  const fetchProjects = async () => {
    try {
      // Fetch actual featured projects from Supabase
      const projects = await getFeaturedProjects(true)

      // Add sample achievements for debugging if they don't exist
      const enhancedProjects = projects.map((project) => {
        if (!project.key_achievements && !project.keyAchievements) {
          return {
            ...project,
            key_achievements: [
              "Platform adopted by 200+ healthcare providers within first quarter",
              "Patient satisfaction scores 15% higher than industry average",
              "Average consultation setup time reduced by 65%",
            ],
          }
        }
        return project
      })

      // Log the first project for debugging
      if (enhancedProjects && enhancedProjects.length > 0) {
        console.log("First project data:", JSON.stringify(enhancedProjects[0], null, 2))
        setDebugInfo(enhancedProjects[0])
      }

      return enhancedProjects || []
    } catch (error) {
      console.error("Error fetching featured projects:", error)
      return []
    }
  }

  // Use state to store projects
  const [featuredProjects, setFeaturedProjects] = useState([])

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects().then((projects) => {
      setFeaturedProjects(projects)
    })
  }, [])

  const openNotificationModal = (projectId: string, projectTitle: string) => {
    setActiveProjectId(projectId)
    setActiveProjectTitle(projectTitle)
    setIsModalOpen(true)
  }

  const closeNotificationModal = () => {
    setIsModalOpen(false)
  }

  if (!featuredProjects || featuredProjects.length === 0) {
    return <div className="text-center py-8">No featured projects available</div>
  }

  return (
    <div className="space-y-12">
      {featuredProjects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col md:flex-row gap-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Image section */}
          <div className="relative md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
            {project.scheduled && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                  Coming Soon
                </span>
              </div>
            )}
            <Image
              src={project.thumbnail_url || "/placeholder.svg"}
              alt={project.title || "Project thumbnail"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{ objectPosition: "center 10%" }}
            />
          </div>

          {/* Content section */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Tags - moved above title */}
            {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 5).map((tag, index) => (
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

            {/* Key Achievements - ALWAYS SHOW FOR DEBUGGING */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
              <ul className="space-y-1">
                {(project.key_achievements || []).map((achievement, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
                {/* If no achievements, show placeholder */}
                {(!project.key_achievements || project.key_achievements.length === 0) && (
                  <>
                    <li className="text-sm flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Platform adopted by 200+ healthcare providers within first quarter</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Patient satisfaction scores 15% higher than industry average</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Average consultation setup time reduced by 65%</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-2">
              {project.scheduled ? (
                <Button
                  variant="outline"
                  onClick={() => openNotificationModal(project.id, project.title)}
                  className="gap-2 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 dark:text-green-500 dark:border-green-500 dark:hover:bg-green-950 dark:hover:text-green-400"
                >
                  <span>Get Notified</span>
                  <Bell className="h-4 w-4" />
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
      ))}

      {/* See all projects button */}
      <div className="flex justify-center mt-16">
        <Button asChild variant="primary" size="lg" className="group">
          <Link href="/work" className="flex items-center">
            See all projects
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={closeNotificationModal}
        projectTitle={activeProjectTitle}
        projectId={activeProjectId || ""}
      />
    </div>
  )
}

export default FeaturedProjects
