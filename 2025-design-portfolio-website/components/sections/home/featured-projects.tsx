"use client"

import { useState, useEffect } from "react"
import { getProjectsClient } from "@/lib/supabase/client-utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  slug: string
  featured: boolean
  thumbnail?: string
  client?: string
  tags?: string[]
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getProjectsClient()

        // Add safety check
        if (projects && Array.isArray(projects)) {
          // Filter featured projects
          const featuredProjects = projects.filter((project) => project.featured).slice(0, 3) // Limit to 3 featured projects

          setProjects(featuredProjects)
        } else {
          console.warn("Projects data is not an array or is empty")
          setProjects([])
        }
      } catch (error) {
        console.error("Error loading projects:", error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return <div className="py-24 text-center">Loading projects...</div>
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-24" aria-labelledby="projects-heading">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Featured Work
          </h2>
          <Button asChild variant="ghost">
            <Link href="/work">
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/work/${project.slug}`} className="group block">
              <div className="bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  {project.client && <span className="text-sm text-muted-foreground mb-1">{project.client}</span>}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    View case study <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

