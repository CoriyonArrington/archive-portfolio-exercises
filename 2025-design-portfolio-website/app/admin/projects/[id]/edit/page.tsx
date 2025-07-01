"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectForm from '@/components/admin/projects/project-form"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { Project } from "@/types/project"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = params
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Use browser client directly
        const supabase = createBrowserSupabaseClient()

        const { data, error: fetchError } = await supabase.from("projects").select("*").eq("id", id).single()

        if (fetchError) throw new Error(fetchError.message)

        setProject(data as Project)
      } catch (err: any) {
        console.error("Error fetching project:", err)
        setError(err.message || "Failed to fetch project")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Use browser client directly
      const supabase = createBrowserSupabaseClient()

      const { error: updateError } = await supabase.from("projects").update(data).eq("id", id)

      if (updateError) throw new Error(updateError.message)

      // Trigger revalidation
      try {
        const baseUrl = window.location.origin

        // Revalidate the work page
        await fetch(`${baseUrl}/api/revalidate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
            path: "/work",
          }),
        })

        // Revalidate the specific project page
        if (data.slug) {
          await fetch(`${baseUrl}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
              path: `/work/${data.slug}`,
            }),
          })
        }
      } catch (revalidateError) {
        console.error("Error revalidating:", revalidateError)
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      console.error("Error updating project:", err)
      setError(err.message || "Failed to update project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      ) : project ? (
        <ProjectForm initialData={project} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p>Project not found</p>
        </div>
      )}
    </div>
  )
}

