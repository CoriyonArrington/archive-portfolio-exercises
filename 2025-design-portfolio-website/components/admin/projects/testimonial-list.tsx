"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type { TestimonialType } from "@/types/testimonial"

export function TestimonialList() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = createBrowserSupabaseClient()

        const { data, error: fetchError } = await supabase
          .from("testimonials")
          .select("*")
          .order("display_order", { ascending: true })

        if (fetchError) throw new Error(fetchError.message)

        // Map database fields to our application types
        setTestimonials(
          data.map((item) => ({
            id: item.id,
            quote: item.quote,
            author: item.author,
            title: item.title,
            project: item.project,
            image: item.image,
            phaseTag: item.phase_tag,
            featured: item.featured,
            displayOrder: item.display_order,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          })),
        )
      } catch (err: any) {
        console.error("Error fetching testimonials:", err)
        setError(err.message || "Failed to fetch testimonials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const supabase = createBrowserSupabaseClient()

      const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", id)

      if (deleteError) throw new Error(deleteError.message)

      // Update local state
      setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id))

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
    } catch (err: any) {
      console.error("Error deleting testimonial:", err)
      alert(`Failed to delete testimonial: ${err.message}`)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-md">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>No testimonials found. Create your first testimonial to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quote
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {testimonial.image && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={testimonial.image || "/placeholder.svg"}
                          alt=""
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2">{testimonial.quote}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      testimonial.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {testimonial.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.displayOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

