"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Helper function to get initials
function getInitials(name: string): string {
  if (!name) return "??"
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

interface Testimonial {
  id: string
  quote: string
  author: string
  title?: string
  company?: string
  image?: string
  avatar_url?: string
  featured: boolean
}

export function TestimonialAvatars() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(12) // Default fallback count

  useEffect(() => {
    // Fetch testimonial count
    async function fetchCount() {
      try {
        const response = await fetch("/api/testimonials/count", {
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data && typeof data.count === "number") {
            setTotalCount(data.count)
          }
        }
      } catch (err) {
        console.error("Error fetching count:", err)
        // Keep using the default count
      }
    }

    // Fetch testimonials client-side after the main content has loaded
    async function fetchTestimonials() {
      try {
        setIsLoading(true)
        // Add a timeout to the fetch to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Explicitly request featured testimonials with proper headers
        const response = await fetch("/api/testimonials/featured", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          console.error(`Testimonials API error: ${response.status} ${response.statusText}`)
          throw new Error(`Error fetching testimonials: ${response.status} ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Response is not JSON:", contentType)
          throw new Error("Invalid response format")
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          console.error("Testimonials data is not an array:", data)
          throw new Error("Invalid testimonials data format")
        }

        setTestimonials(data)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError(err instanceof Error ? error : new Error(String(error)))
        // Set empty array to prevent further errors
        setTestimonials([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
    fetchTestimonials()
  }, [])

  // Filter testimonials that have images
  const testimonialsWithImages = testimonials.filter((t) => {
    // Check if image or avatar_url is a non-empty string
    return Boolean(
      (typeof t.image === "string" && t.image.trim() !== "") ||
        (typeof t.avatar_url === "string" && t.avatar_url.trim() !== ""),
    )
  })

  // If loading or error or no testimonials with images, show placeholder
  if (isLoading || error || testimonialsWithImages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="flex -space-x-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-700 flex items-center justify-center"
              >
                <span className="text-gray-200 text-xs font-semibold">{i + 1}</span>
              </div>
            ))}
        </div>
        <p className="text-sm text-muted-foreground">Trusted by {totalCount} satisfied clients</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex -space-x-3">
        {testimonialsWithImages.slice(0, 5).map((testimonial, i) => {
          // Ensure we have a valid image URL
          const imageUrl =
            (testimonial.image || testimonial.avatar_url || "").trim() ||
            `/placeholder.svg?height=40&width=40&text=${i + 1}`
          const authorName = testimonial.author || testimonial.name || "Client"
          const initials = getInitials(authorName)

          return (
            <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              {imageUrl && imageUrl !== "/placeholder.svg" ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${authorName}'s avatar`}
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={(e) => {
                    // Replace with initials
                    const target = e.currentTarget.parentElement
                    if (target) {
                      target.innerHTML = `<div class="w-full h-full bg-gray-700 flex items-center justify-center"><span class="text-gray-200 text-xs font-semibold">${initials}</span></div>`
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-200 text-xs font-semibold">{initials}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">Trusted by {totalCount} satisfied clients</p>
      {/* Client Logos Section */}
      <div className="mt-8 overflow-hidden">
        <div className="flex items-center pt-7 md:pt-0 justify-around">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-loop-horizontally items-center justify-around"
                style={{ width: "100%" }}
              >
                {[
                  "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/general/iecvt95df28_1744297618045.svg",
                  "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/general/c31sikjgr8c_1744297780007.svg",
                  "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/general/e0lsm6dn608_1744298270210.svg",
                ].map((logo, index) => (
                  <img
                    key={index}
                    className="mx-7 max-h-12 shrink-0 md:mx-10 md:max-h-14"
                    src={logo || "/placeholder.svg"}
                    alt={`Healthcare Client Logo ${index + 1}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialAvatars
