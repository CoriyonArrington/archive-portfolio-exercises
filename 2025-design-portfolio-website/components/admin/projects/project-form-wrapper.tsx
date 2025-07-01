"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProjectForm from "./project-form"
import { createProject, updateProject } from "@/lib/data/projects"
import type { Project } from "@/types/project"

interface ProjectFormWrapperProps {
  initialData?: Project
  projectId?: string
}

export default function ProjectFormWrapper({ initialData, projectId }: ProjectFormWrapperProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true)
      setError(null)

      if (projectId) {
        await updateProject(projectId, data)
      } else {
        await createProject(data)
      }

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
      console.error("Error submitting project:", err)
      setError(err.message || "Failed to submit project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <ProjectForm
        initialData={
          initialData || {
            title: "",
            description: "",
            slug: "",
            featured: false,
            scheduled: false,
            displayOrder: 0,
            id: "",
            outcomes: [],
            process: [],
            images: [],
            tags: [],
            tools: [],
            categories: [],
          }
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

