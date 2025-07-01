"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import useSWR from "swr"

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

// This component loads the testimonial avatars separately from the main content
export default function TestimonialAvatars() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [testimonials, setTestimonials] = useState<
    Array<{
      id?: string
      author?: string
      name?: string
      image?: string | null
      avatar_url?: string | null
      hasImage?: boolean
      featured?: boolean
    }>
  >([])

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .catch((err) => {
        console.error(`Error fetching from ${url}:`, err)
        throw err
      })

  const { data: totalCount, error: countError } = useSWR<number>("/api/testimonials/count", fetcher, {
    onError: (err) => console.error("Error fetching testimonial count:", err),
    fallbackData: 12, // Fallback count if API fails
  })

  useEffect(() => {
    // Fetch testimonials client-side after the main content has loaded
    async function fetchTestimonials() {
      try {
        setIsLoading(true)
        // Add a timeout to the fetch to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Explicitly request featured testimonials
        const response = await fetch("/api/testimonials?featured=true&limit=5", {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          console.error(`Testimonials API error: ${response.status} ${response.statusText}`)
          throw new Error(`Error fetching testimonials: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Raw testimonials data:", data)

        if (!Array.isArray(data)) {
          console.error("Testimonials data is not an array:", data)
          throw new Error("Invalid testimonials data format")
        }

        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        setError(error instanceof Error ? error : new Error(String(error)))
        // Set empty array to prevent further errors
        setTestimonials([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Filter testimonials that have images - with detailed logging
  const testimonialsWithImages = testimonials.filter((t) => {
    // Check if image or avatar_url is a non-empty string
    const hasValidImage = Boolean(
      (typeof t.image === "string" && t.image.trim() !== "") ||
        (typeof t.avatar_url === "string" && t.avatar_url.trim() !== ""),
    )

    console.log(
      `Testimonial ${t.id || "unknown"} (${t.author || t.name || "unnamed"}) has valid image: ${hasValidImage}`,
      {
        image: t.image,
        avatar_url: t.avatar_url,
        imageType: typeof t.image,
        avatarUrlType: typeof t.avatar_url,
        featured: t.featured,
      },
    )

    return hasValidImage
  })

  console.log(
    `Found ${testimonialsWithImages.length} testimonials with valid images out of ${testimonials.length} total`,
  )

  // If loading or error or no testimonials with images, show placeholder
  if (isLoading || error || testimonialsWithImages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mb-12">
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
        <p className="text-sm text-muted-foreground">Trusted by {totalCount || 12} satisfied clients</p>
      </div>
    )
  }

  // Debug the testimonials that will be displayed
  console.log(
    "Testimonials with images that will be displayed:",
    testimonialsWithImages.slice(0, 5).map((t) => ({
      id: t.id,
      author: t.author || t.name,
      imageUrl: t.image || t.avatar_url,
    })),
  )

  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="flex -space-x-3">
        {testimonialsWithImages.slice(0, 5).map((testimonial, i) => {
          // Ensure we have a valid image URL
          const imageUrl =
            (testimonial.image || testimonial.avatar_url || "").trim() ||
            `/placeholder.svg?height=40&width=40&text=${i + 1}`
          const authorName = testimonial.author || testimonial.name || "Client"
          const initials = getInitials(authorName)

          console.log(`Rendering avatar ${i + 1}:`, { imageUrl, authorName, initials })

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
                    console.error(`Error loading image: ${imageUrl}`)
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
      <p className="text-sm text-muted-foreground">
        Trusted by {totalCount || testimonials.length || 12} satisfied clients
      </p>
    </div>
  )
}

