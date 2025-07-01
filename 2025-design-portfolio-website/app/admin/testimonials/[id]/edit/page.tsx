"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TestimonialForm from '@/components/admin/testimonials/testimonial-form"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { TestimonialType } from "@/types/testimonial"

interface EditTestimonialPageProps {
  params: {
    id: string
  }
}

export default function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = params
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<TestimonialType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        // Use browser client directly
        const supabase = createBrowserSupabaseClient()

        const { data, error: fetchError } = await supabase.from("testimonials").select("*").eq("id", id).single()

        if (fetchError) throw new Error(fetchError.message)

        // Map database fields to our application types
        setTestimonial({
          id: data.id,
          quote: data.quote,
          author: data.author,
          title: data.title,
          project: data.project,
          image: data.image,
          phaseTag: data.phase_tag,
          featured: data.featured,
          displayOrder: data.display_order,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        } as TestimonialType)
      } catch (err: any) {
        console.error("Error fetching testimonial:", err)
        setError(err.message || "Failed to fetch testimonial")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonial()
  }, [id])

  const handleSubmit = async (data: Partial<TestimonialType>) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Use browser client directly
      const supabase = createBrowserSupabaseClient()

      // Map our application types to database fields
      const testimonialData = {
        quote: data.quote,
        author: data.author,
        title: data.title,
        project: data.project,
        image: data.image,
        phase_tag: data.phaseTag,
        featured: data.featured,
        display_order: data.displayOrder,
        updated_at: new Date().toISOString(),
      }

      const { error: updateError } = await supabase.from("testimonials").update(testimonialData).eq("id", id)

      if (updateError) throw new Error(updateError.message)

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
      console.error("Error updating testimonial:", err)
      setError(err.message || "Failed to update testimonial")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Testimonial</h1>
        <Link href="/admin/testimonials">
          <Button variant="outline">Back to Testimonials</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      ) : testimonial ? (
        <TestimonialForm initialData={testimonial} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p>Testimonial not found</p>
        </div>
      )}
    </div>
  )
}

