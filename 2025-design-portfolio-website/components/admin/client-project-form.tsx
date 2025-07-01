"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getClientProjectById, updateClientProject, createClientProject } from "@/lib/data/client-projects"
import { revalidatePage } from "@/app/actions/revalidation"
import type { Project } from "@/types/project"

interface ClientProjectFormProps {
  projectId?: string
}

export function ClientProjectForm({ projectId }: ClientProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(projectId ? true : false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    slug: "",
    featured: false,
    scheduled: false,
    client: "",
    year: "",
    role: "",
    thumbnailUrl: "",
    displayOrder: 0,
  })

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const data = await getClientProjectById(projectId)
          if (data) {
            setProject({
              title: data.title || "",
              description: data.description || "",
              slug: data.slug || "",
              featured: data.featured || false,
              scheduled: data.scheduled || false,
              client: data.client || "",
              year: data.year || "",
              role: data.role || "",
              thumbnailUrl: data.thumbnailUrl || "",
              displayOrder: data.displayOrder || 0,
            })
          }
        } catch (err) {
          console.error("Error fetching project:", err)
          setError("Failed to load project")
        } finally {
          setIsLoading(false)
        }
      }

      fetchProject()
    }
  }, [projectId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProject((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      if (!project.title) {
        throw new Error("Title is required")
      }

      if (!project.slug) {
        // Generate slug from title
        const slug = project.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")

        project.slug = slug
      }

      if (projectId) {
        await updateClientProject(projectId, project)
      } else {
        await createClientProject(project)
      }

      // Trigger revalidation using server action
      try {
        await revalidatePage("/work")
      } catch (revalidateError) {
        console.error("Error revalidating:", revalidateError)
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      console.error("Error saving project:", err)
      setError(err.message || "Failed to save project")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" value={project.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={project.description} onChange={handleChange} rows={4} />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={project.slug}
            onChange={handleChange}
            placeholder="Generated from title if left empty"
          />
          <p className="text-sm text-gray-500 mt-1">Used in the URL: /work/your-slug</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client">Client</Label>
            <Input id="client" name="client" value={project.client} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" value={project.year} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" value={project.role} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
            <Input id="thumbnailUrl" name="thumbnailUrl" value={project.thumbnailUrl} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              value={project.displayOrder?.toString()}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={project.featured}
              onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="scheduled"
              checked={project.scheduled}
              onCheckedChange={(checked) => handleCheckboxChange("scheduled", checked === true)}
            />
            <Label htmlFor="scheduled">Scheduled</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : projectId ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
