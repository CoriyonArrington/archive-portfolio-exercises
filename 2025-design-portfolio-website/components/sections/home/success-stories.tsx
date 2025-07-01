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

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    id: "1",
    quote:
      "Working with this team transformed our product. User engagement increased by 45% after implementing their design recommendations.",
    author: "Sarah Johnson",
    title: "Product Manager at HealthTech",
    image: "",
    featured: true,
  },
  {
    id: "2",
    quote:
      "The design system they created has dramatically improved our development speed and consistency across products.",
    author: "Michael Chen",
    title: "CTO at MedConnect",
    image: "",
    featured: true,
  },
  {
    id: "3",
    quote:
      "Their deep understanding of healthcare workflows made all the difference in creating a product that physicians actually want to use.",
    author: "Dr. Emily Rodriguez",
    title: "Chief Medical Officer",
    image: "",
    featured: true,
  },
]

export default function SuccessStories() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedTestimonials() {
      try {
        console.log("Fetching featured testimonials...")
        setIsLoading(true)

        // Add a timeout to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Direct fetch with no transformation
        const response = await fetch("/api/testimonials/featured", {
          signal: controller.signal,
        }).catch((err) => {
          if (err.name === "AbortError") {
            throw new Error("Request timed out")
          }
          throw err
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched featured testimonials:", data)

        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
        } else {
          console.warn("No featured testimonials found or invalid data format")
          setTestimonials(fallbackTestimonials)
        }
      } catch (err) {
        console.error("Error fetching featured testimonials:", err)
        setError("Failed to load testimonials")
        setTestimonials(fallbackTestimonials)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedTestimonials()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Success stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card animate-pulse h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Success stories</h2>
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
                  {testimonial.image && testimonial.image !== "No image" ? (
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.author}
                      onError={(e) => {
                        console.error(`Failed toload image for ${testimonial.author}`, e)
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

