"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import type { Testimonial } from "@/types/testimonial"

export default function DeleteTestimonialPage({ params }: { params: { id: string } }) {
  const id = params.id // Simply use params directly
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const supabase = createClient()

        const { data, error: fetchError } = await supabase.from("testimonials").select("*").eq("id", id).single()

        if (fetchError) throw new Error(fetchError.message)

        setTestimonial({
          id: data.id,
          quote: data.quote,
          author: data.author,
          title: data.title,
          company: data.company,
          image: data.avatar_url,
          featured: data.featured,
          phaseTag: data.phase_tag,
          displayOrder: data.display_order,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        } as Testimonial)
      } catch (err: any) {
        console.error("Error fetching testimonial:", err)
        setError(err.message || "Failed to fetch testimonial")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonial()
  }, [id])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)

      const supabase = createClient()

      const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", id)

      if (deleteError) throw new Error(deleteError.message)

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

      // Also try to trigger a more aggressive revalidation
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
            tag: "testimonials",
          }),
        })
      } catch (revalidateError) {
        console.error("Error revalidating tag:", revalidateError)
      }

      router.push("/admin/testimonials")
      router.refresh()
    } catch (err: any) {
      console.error("Error deleting testimonial:", err)
      setError(err.message || "Failed to delete testimonial")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-red-600">Delete Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ) : testimonial ? (
            <div className="space-y-4">
              <p>Are you sure you want to delete this testimonial?</p>
              <div className="bg-gray-50 p-4 rounded border">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
                <p className="mt-2 italic">"{testimonial.quote.substring(0, 100)}..."</p>
              </div>
              <p className="text-red-600 text-sm">This action cannot be undone.</p>
            </div>
          ) : (
            <p>Testimonial not found</p>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded">
              <p>{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/testimonials">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting || isLoading || !testimonial}>
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

