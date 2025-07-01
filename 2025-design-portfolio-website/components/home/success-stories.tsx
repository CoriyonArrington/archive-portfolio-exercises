"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  image?: string
  avatar_url?: string
  featured: boolean
}

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

export function SuccessStories() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedTestimonials() {
      try {
        setIsLoading(true)

        // Direct fetch with proper headers
        const response = await fetch("/api/testimonials/featured", {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Response is not JSON:", contentType)
          throw new Error("Invalid response format")
        }

        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
        } else {
          console.warn("No featured testimonials found or invalid data format")
          setTestimonials([])
        }
      } catch (err) {
        console.error("Error fetching featured testimonials:", err)
        setError("Failed to load testimonials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedTestimonials()
  }, [])

  // Fallback content for loading or error states
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container px-0">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-8">Success stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border h-48 animate-pulse"
              >
                <div className="bg-muted h-24 rounded mb-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted"></div>
                  <div>
                    <div className="bg-muted h-4 w-24 rounded"></div>
                    <div className="bg-muted h-3 w-32 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || testimonials.length === 0) {
    return null // Don't show the section at all if there's an error or no data
  }

  return (
    <section className="py-16">
      <div className="container px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair">Success stories</h2>
          <Button asChild variant="ghost">
            <Link href="/testimonials" aria-label="Read more testimonials">
              Read more stories <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border"
            >
              <div className="text-primary text-4xl mb-4">"</div>
              <blockquote className="mb-6 italic">{testimonial.quote}</blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  {(testimonial.image || testimonial.avatar_url) &&
                  (testimonial.image || testimonial.avatar_url) !== "No image" ? (
                    <AvatarImage
                      src={testimonial.image || testimonial.avatar_url}
                      alt={testimonial.author}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  ) : null}
                  <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
