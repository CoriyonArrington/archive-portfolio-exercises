"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSideClient } from "@/lib/supabase/browser"
import type { ProcessPhase } from "@/types/process"

interface ProcessFormProps {
  phase?: ProcessPhase
}

export default function ProcessForm({ phase }: ProcessFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    phase_title: phase?.phaseTitle || "",
    phase_subtitle: phase?.phaseSubtitle || "",
    phase_description: phase?.phaseDescription || "",
    steps: phase?.steps ? JSON.stringify(phase.steps) : "[]",
    image_url: phase?.imageUrl || "",
    quote_text: phase?.quoteText || "",
    quote_author: phase?.quoteAuthor || "",
    outputs: phase?.outputs ? JSON.stringify(phase.outputs) : "[]",
    insights: phase?.insights ? JSON.stringify(phase.insights) : "[]",
    display_order: phase?.displayOrder || 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClientSideClient()

      // Parse JSON fields
      let stepsArray, outputsArray, insightsArray
      try {
        stepsArray = JSON.parse(formData.steps)
        outputsArray = JSON.parse(formData.outputs)
        insightsArray = JSON.parse(formData.insights)
      } catch (err) {
        throw new Error("Invalid JSON in steps, outputs, or insights field")
      }

      const phaseData = {
        phase_title: formData.phase_title,
        phase_subtitle: formData.phase_subtitle,
        phase_description: formData.phase_description,
        steps: stepsArray,
        image_url: formData.image_url,
        quote_text: formData.quote_text,
        quote_author: formData.quote_author,
        outputs: outputsArray,
        insights: insightsArray,
        display_order: formData.display_order,
        updated_at: new Date().toISOString(),
      }

      if (phase) {
        // Update existing phase
        const { error } = await supabase.from("process_steps").update(phaseData).eq("id", phase.id)

        if (error) throw error
      } else {
        // Create new phase
        phaseData.created_at = new Date().toISOString()

        const { error } = await supabase.from("process_steps").insert(phaseData)

        if (error) throw error
      }

      router.push("/admin/process")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the process phase")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="phase_title" className="block text-sm font-medium">
            Phase Title
          </label>
          <input
            type="text"
            id="phase_title"
            name="phase_title"
            value={formData.phase_title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="phase_subtitle" className="block text-sm font-medium">
            Phase Subtitle
          </label>
          <input
            type="text"
            id="phase_subtitle"
            name="phase_subtitle"
            value={formData.phase_subtitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="phase_description" className="block text-sm font-medium">
            Phase Description
          </label>
          <textarea
            id="phase_description"
            name="phase_description"
            value={formData.phase_description}
            onChange={handleChange}
            rows={3}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="steps" className="block text-sm font-medium">
            Steps (JSON array of objects)
          </label>
          <textarea
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: [{('title": "Step 1', 'description": "Description of step 1')},{" "}
            {('title": "Step 2', 'description": "Description of step 2')}]
          </p>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="quote_text" className="block text-sm font-medium">
            Quote Text
          </label>
          <textarea
            id="quote_text"
            name="quote_text"
            value={formData.quote_text}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="quote_author" className="block text-sm font-medium">
            Quote Author
          </label>
          <input
            type="text"
            id="quote_author"
            name="quote_author"
            value={formData.quote_author}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="outputs" className="block text-sm font-medium">
            Outputs (JSON array)
          </label>
          <textarea
            id="outputs"
            name="outputs"
            value={formData.outputs}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Example: ["Project Brief", "Research Plan", "Success Metrics"]</p>
        </div>

        <div>
          <label htmlFor="insights" className="block text-sm font-medium">
            Insights (JSON array)
          </label>
          <textarea
            id="insights"
            name="insights"
            value={formData.insights}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: ["Clear understanding of business goals", "Defined user needs and pain points"]
          </p>
        </div>

        <div>
          <label htmlFor="display_order" className="block text-sm font-medium">
            Display Order
          </label>
          <input
            type="number"
            id="display_order"
            name="display_order"
            value={formData.display_order}
            onChange={handleNumberChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : phase ? "Update Process Phase" : "Create Process Phase"}
        </button>
      </div>
    </form>
  )
}

