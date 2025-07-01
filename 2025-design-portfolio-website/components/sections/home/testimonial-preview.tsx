"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  image?: string
  featured: boolean
}

export function TestimonialPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setIsLoading(true)
        // Explicitly request featured testimonials only
        const response = await fetch("/api/testimonials?featured=true&limit=3")

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched testimonials for preview:", data)

        // Double-check that we're only showing featured testimonials
        const featuredTestimonials = data.filter((t: any) => t.featured === true)
        setTestimonials(featuredTestimonials)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError("Failed to load testimonials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading testimonials...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (testimonials.length === 0) {
    return <div className="text-center py-8">No featured testimonials available</div>
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Success stories</h2>
          <Link href="/testimonials" className="flex items-center gap-2 text-primary hover:underline">
            Read more stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-primary text-4xl mb-4">"</div>
              <blockquote className="mb-6 italic">{testimonial.quote}</blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  {testimonial.image ? (
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.author}
                      onError={(e) => {
                        console.error(`Failed to load image for ${testimonial.author}`, e)
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  ) : null}
                  <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Debug info - will only show in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p>Total testimonials loaded: {testimonials.length}</p>
            <p>Featured testimonials: {testimonials.filter((t) => t.featured).length}</p>
            <pre className="mt-2 p-2 bg-gray-200 rounded text-xs overflow-auto">
              {JSON.stringify(testimonials, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  )
}

