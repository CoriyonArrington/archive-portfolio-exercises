"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { Project } from "@/types/project"

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const supabase = createBrowserSupabaseClient()

        const { data, error: fetchError } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true })

        if (fetchError) throw new Error(fetchError.message)

        setProjects(data as Project[])
      } catch (err: any) {
        console.error("Error fetching projects:", err)
        setError(err.message || "Failed to fetch projects")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return

    try {
      setIsDeleting(id)
      const supabase = createBrowserSupabaseClient()

      // First, get the project to know its slug
      const { data: project, error: fetchError } = await supabase.from("projects").select("slug").eq("id", id).single()

      if (fetchError) throw new Error(fetchError.message)

      // Then delete it
      const { error: deleteError } = await supabase.from("projects").delete().eq("id", id)

      if (deleteError) throw new Error(deleteError.message)

      // Remove the deleted project from state
      setProjects(projects.filter((p) => p.id !== id))

      // Use the special deletion revalidation API
      try {
        const response = await fetch("/api/revalidate-deletion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
          }),
        })

        if (!response.ok) {
          console.error("Deletion revalidation failed:", await response.text())
          throw new Error("Deletion revalidation failed")
        }

        // Also trigger a deploy to ensure the deletion is reflected
        const deployResponse = await fetch("/api/deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
          }),
        })

        if (!deployResponse.ok) {
          console.error("Deploy failed:", await deployResponse.text())
          throw new Error("Deploy failed")
        }

        alert(
          "Project deleted successfully and site rebuild triggered. The changes should appear on the live site within a few minutes.",
        )
      } catch (revalidateError) {
        console.error("Error during revalidation or deploy:", revalidateError)
        alert(
          "Project deleted but there was an issue with cache revalidation. You may need to manually rebuild the site.",
        )
      }
    } catch (err: any) {
      console.error("Error deleting project:", err)
      alert(`Failed to delete project: ${err.message}`)
    } finally {
      setIsDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-md">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded text-center">
        <p className="mb-4">No projects found</p>
        <Link href="/admin/projects/new">
          <Button>Add Your First Project</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white border rounded-md p-4 flex justify-between items-center">
          <div>
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-sm text-gray-500 truncate max-w-md">{project.description || "No description"}</p>
            <div className="flex gap-2 mt-2">
              {project.featured && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Featured</span>
              )}
              {project.scheduled && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Scheduled</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(project.id)}
              disabled={isDeleting === project.id}
            >
              {isDeleting === project.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

