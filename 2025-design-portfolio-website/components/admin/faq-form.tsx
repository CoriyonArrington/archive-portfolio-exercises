"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createFAQ, updateFAQ } from "@/app/actions/faq-actions"
import type { FAQ } from "@/types/faqs"

interface FAQFormProps {
  faq?: FAQ
  mode?: "create" | "edit"
}

export function FAQForm({ faq, mode = "create" }: FAQFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      if (mode === "edit" && faq) {
        const result = await updateFAQ(faq.id, formData)
        if (result && !result.success) {
          setError(result.error)
        }
      } else {
        const result = await createFAQ(formData)
        if (result && !result.success) {
          setError(result.error)
        }
      }

      router.push("/admin/faqs")
      router.refresh()
    } catch (err) {
      console.error("Error submitting FAQ:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium">
            Question
          </label>
          <input
            id="question"
            name="question"
            type="text"
            required
            defaultValue={faq?.question || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={5}
            required
            defaultValue={faq?.answer || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="display_order" className="block text-sm font-medium">
            Display Order
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={faq?.display_order || 0}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={faq?.category || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">Use categories like "services", "process", etc. to group FAQs</p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : mode === "edit" ? "Update FAQ" : "Create FAQ"}
        </button>
      </div>
    </form>
  )
}
