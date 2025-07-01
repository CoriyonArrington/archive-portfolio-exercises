"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProcessStep } from "@/app/admin/actions/process-step-actions"

export default function NewProcessStepClient() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createProcessStep(formData)

      if (!result.success) {
        throw new Error(result.error || "Failed to create process step")
      }

      setSuccess(true)

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push("/admin/process-steps")
        router.refresh()
      }, 1500)
    } catch (err: any) {
      console.error("Error creating process step:", err)
      setError(err.message || "Failed to create process step")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Process Step</h1>
        <p className="text-muted-foreground">Create a new process step for your workflow.</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="bg-green-50 p-4 rounded-md text-green-500 mb-4">Process step created successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="phase_title">Title</Label>
            <Input id="phase_title" name="phase_title" required />
          </div>

          <div>
            <Label htmlFor="phase_subtitle">Subtitle</Label>
            <Input id="phase_subtitle" name="phase_subtitle" />
          </div>

          <div>
            <Label htmlFor="phase_description">Description</Label>
            <Textarea id="phase_description" name="phase_description" rows={4} />
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" />
          </div>

          <div>
            <Label htmlFor="quote_text">Quote Text</Label>
            <Textarea id="quote_text" name="quote_text" rows={2} />
          </div>

          <div>
            <Label htmlFor="quote_author">Quote Author</Label>
            <Input id="quote_author" name="quote_author" />
          </div>

          <div>
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" />
          </div>

          <div>
            <Label htmlFor="display_order">Display Order</Label>
            <Input id="display_order" name="display_order" type="number" defaultValue="0" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/process-steps")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || success}>
            {isSubmitting ? "Creating..." : "Create Process Step"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export { NewProcessStepClient }
