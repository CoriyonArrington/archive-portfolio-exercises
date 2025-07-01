"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Testimonial } from "@/types/testimonial"

interface TestimonialFormProps {
  initialData: Testimonial
  onSubmit: (data: Partial<Testimonial>) => Promise<void>
  isSubmitting: boolean
}

export default function TestimonialForm({ initialData, onSubmit, isSubmitting }: TestimonialFormProps) {
  // Ensure all form fields have default values
  const [formData, setFormData] = useState<Testimonial>({
    id: initialData.id || "",
    author: initialData.author || "",
    title: initialData.title || "",
    company: initialData.company || "",
    quote: initialData.quote || "",
    avatarUrl: initialData.avatarUrl || "",
    phaseTag: initialData.phaseTag || "",
    displayOrder: initialData.displayOrder || 0,
    featured: initialData.featured || false,
    createdAt: initialData.createdAt || new Date().toISOString(),
    updatedAt: initialData.updatedAt || new Date().toISOString(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="title">Title/Position</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" value={formData.company} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="quote">Testimonial Quote</Label>
          <Textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows={5} required />
        </div>

        <div>
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <Label htmlFor="phaseTag">Phase Tag</Label>
          <Input
            id="phaseTag"
            name="phaseTag"
            value={formData.phaseTag}
            onChange={handleChange}
            placeholder="e.g., Discovery, Design, Development"
          />
        </div>

        <div>
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input
            id="displayOrder"
            name="displayOrder"
            type="number"
            value={formData.displayOrder.toString()}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value, 10)
              setFormData((prev) => ({ ...prev, displayOrder: value }))
            }}
            min={0}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
          />
          <Label htmlFor="featured">Featured Testimonial</Label>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Testimonial"}
      </Button>
    </form>
  )
}

