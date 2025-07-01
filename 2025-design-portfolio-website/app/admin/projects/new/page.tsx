"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectForm from '@/components/admin/projects/project-form"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { Project } from "@/types/project"

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Use browser client directly
      const supabase = createBrowserSupabaseClient()

      // Generate slug if not provided
      if (!data.slug && data.title) {
        data.slug = data.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
      }

      // Remove id field to let Supabase generate it
      const { id, ...projectData } = data

      const { error: createError } = await supabase.from("projects").insert([projectData])

      if (createError) throw new Error(createError.message)

      // Trigger revalidation
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
            path: "/work",
          }),
        })
      } catch (revalidateError) {
        console.error("Error revalidating:", revalidateError)
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      console.error("Error creating project:", err)
      setError(err.message || "Failed to create project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">New Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <ProjectForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        initialData={
          {
            title: "",
            description: "",
            slug: "",
            featured: false,
            scheduled: false,
            display_order: 0,
            outcomes: [],
            process: [],
            images: [],
            tags: [],
            tools: [],
            categories: [],
          } as Project
        }
      />
    </div>
  )
}

