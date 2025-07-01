"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TestimonialForm from '@/components/admin/testimonials/testimonial-form"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { TestimonialType } from "@/types/testimonial"

export default function NewTestimonialPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: Partial<TestimonialType>) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Use browser client directly
      const supabase = createBrowserSupabaseClient()

      // Prepare data for insertion
      const testimonialData = {
        quote: data.quote,
        author: data.author,
        title: data.title,
        project: data.project,
        image: data.image,
        phase_tag: data.phaseTag,
        featured: data.featured || false,
        display_order: data.displayOrder || 0,
      }

      const { error: createError } = await supabase.from("testimonials").insert([testimonialData])

      if (createError) throw new Error(createError.message)

      // Trigger revalidation
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
            path: "/testimonials",
          }),
        })
      } catch (revalidateError) {
        console.error("Error revalidating:", revalidateError)
      }

      router.push("/admin/testimonials")
      router.refresh()
    } catch (err: any) {
      console.error("Error creating testimonial:", err)
      setError(err.message || "Failed to create testimonial")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">New Testimonial</h1>
        <Link href="/admin/testimonials">
          <Button variant="outline">Back to Testimonials</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <TestimonialForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        initialData={
          {
            quote: "",
            author: "",
            title: "",
            project: "",
            image: "",
            phaseTag: "",
            featured: false,
            displayOrder: 0,
          } as TestimonialType
        }
      />
    </div>
  )
}

