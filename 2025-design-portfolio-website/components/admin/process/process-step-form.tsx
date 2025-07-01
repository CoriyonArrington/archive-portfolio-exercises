"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProcessStepFormProps {
  onSubmit: (formData: FormData) => void
  isSubmitting: boolean
  defaultValues?: {
    phase_title?: string
    phase_subtitle?: string
    phase_description?: string
    image_url?: string
    quote_text?: string
    quote_author?: string
    icon?: string
    display_order?: number
  }
}

export function ProcessStepForm({ onSubmit, isSubmitting, defaultValues = {} }: ProcessStepFormProps) {
  return (
    <form action={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={defaultValues.phase_title || ""} required />
          <p className="text-sm text-muted-foreground mt-1">The main title for this process step.</p>
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" name="subtitle" defaultValue={defaultValues.phase_subtitle || ""} />
          <p className="text-sm text-muted-foreground mt-1">A short subtitle for this process step.</p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={defaultValues.phase_description || ""} rows={4} />
          <p className="text-sm text-muted-foreground mt-1">The detailed description of this process step.</p>
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={defaultValues.image_url || ""} />
          <p className="text-sm text-muted-foreground mt-1">An optional image URL for this process step.</p>
        </div>

        <div>
          <Label htmlFor="quoteText">Quote Text</Label>
          <Textarea id="quoteText" name="quoteText" defaultValue={defaultValues.quote_text || ""} rows={2} />
          <p className="text-sm text-muted-foreground mt-1">An optional testimonial quote for this step.</p>
        </div>

        <div>
          <Label htmlFor="quoteAuthor">Quote Author</Label>
          <Input id="quoteAuthor" name="quoteAuthor" defaultValue={defaultValues.quote_author || ""} />
          <p className="text-sm text-muted-foreground mt-1">The author of the quote.</p>
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Input id="icon" name="icon" defaultValue={defaultValues.icon || ""} />
          <p className="text-sm text-muted-foreground mt-1">An optional icon name for this process step.</p>
        </div>

        <div>
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input id="displayOrder" name="displayOrder" type="number" defaultValue={defaultValues.display_order || 0} />
          <p className="text-sm text-muted-foreground mt-1">
            The order in which this process step should be displayed.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Process Step"}
        </Button>
      </div>
    </form>
  )
}

