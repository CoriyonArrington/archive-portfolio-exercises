"use client"

import { useEffect, useState } from "react"

export default function TestimonialDebug() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials?featured=true")
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return <p>Loading testimonials...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  const featuredTestimonials = testimonials.filter((t) => t.featured)

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Testimonial Debug</h3>
      <p>Found {featuredTestimonials.length} featured testimonials</p>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Featured Testimonials:</h4>
        <ul className="space-y-4">
          {featuredTestimonials.map((item, index) => (
            <li key={index} className="border p-3 rounded">
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Author:</strong> {item.author}
              </p>
              <p>
                <strong>Featured:</strong> {String(item.featured)}
              </p>
              <p>
                <strong>Avatar URL:</strong> {item.avatar_url || "No image"}
              </p>
              <p>
                <strong>Image URL:</strong> {item.image || "No image"}
              </p>
              {(item.image || item.avatar_url) && (
                <div className="mt-2">
                  <p>Image preview:</p>
                  <img
                    src={item.image || item.avatar_url || "/placeholder.svg"}
                    alt={`${item.author}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      // @ts-ignore - currentTarget.src exists on HTMLImageElement
                      e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

