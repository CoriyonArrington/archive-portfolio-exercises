"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Testimonial } from "@/types/testimonial"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = createBrowserClient()

        const { data, error: fetchError } = await supabase
          .from("testimonials")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false })

        if (fetchError) throw new Error(fetchError.message)

        setTestimonials(
          data.map((item: any) => ({
            id: item.id,
            quote: item.quote,
            author: item.author,
            title: item.title,
            company: item.company,
            image: item.avatar_url,
            featured: item.featured,
            phaseTag: item.phase_tag,
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button>Add New Testimonial</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">No testimonials found</p>
          <Link href="/admin/testimonials/new">
            <Button className="mt-4">Add Your First Testimonial</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold">{testimonial.author}</h2>
                    {testimonial.featured && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.title}</p>
                  <p className="italic text-gray-700">"{testimonial.quote.substring(0, 100)}..."</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/admin/testimonials/${testimonial.id}/delete`}>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                      Delete
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
