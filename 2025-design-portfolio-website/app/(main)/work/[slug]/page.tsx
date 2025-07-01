import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { createServerClient } from "@/lib/supabase/server"
import { ProjectProcessSection } from "@/components/projects/project-process-section"

// Make this page dynamic to ensure fresh data
export const dynamic = "force-dynamic"
export const revalidate = 0

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const supabase = await createServerClient()

    const { data: project } = await supabase.from("projects").select("*").eq("slug", params.slug).single()

    if (!project) {
      return {
        title: "Project Not Found",
      }
    }

    return {
      title: `${project.title} | Design Portfolio`,
      description: project.description,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Project Details",
    }
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const supabase = await createServerClient()

    const { data: project, error } = await supabase.from("projects").select("*").eq("slug", params.slug).single()

    if (error || !project) {
      console.error("Error fetching project:", error)
      notFound()
    }

    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          {project.image_url && (
            <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
              <Image
                src={project.image_url || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{project.description}</p>
            </div>

            <div className="space-y-6">
              {project.client && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client</h3>
                  <p className="mt-1">{project.client}</p>
                </div>
              )}

              {project.year && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Year</h3>
                  <p className="mt-1">{project.year}</p>
                </div>
              )}

              {project.services && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Services</h3>
                  <p className="mt-1">{project.services}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add the project process section */}
          <ProjectProcessSection project={project} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in ProjectPage:", error)
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Error Loading Project</h1>
          <p>There was an error loading this project. Please try again later.</p>
        </div>
      </div>
    )
  }
}

