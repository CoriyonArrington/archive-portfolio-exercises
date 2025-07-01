"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Project } from "@/types/project"

interface ProjectFormProps {
  initialData: Project
  onSubmit: (data: Partial<Project>) => Promise<void>
  isSubmitting: boolean
}

export default function ProjectForm({ initialData, onSubmit, isSubmitting }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" value={formData.title || ""} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug || ""}
            onChange={handleChange}
            placeholder="Generated from title if left empty"
          />
          <p className="text-sm text-gray-500 mt-1">Used in the URL: /work/your-slug</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client">Client</Label>
            <Input id="client" name="client" value={formData.client || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" value={formData.year || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" value={formData.role || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
            <Input
              id="thumbnail_url"
              name="thumbnail_url"
              value={formData.thumbnail_url || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              name="display_order"
              type="number"
              value={formData.display_order?.toString() || "0"}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured || false}
              onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="scheduled"
              checked={formData.scheduled || false}
              onCheckedChange={(checked) => handleCheckboxChange("scheduled", checked === true)}
            />
            <Label htmlFor="scheduled">Scheduled</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData.id ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}

