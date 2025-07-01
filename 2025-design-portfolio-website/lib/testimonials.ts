import { createClient } from "@/lib/supabase/clients"

// Type definition for testimonial data
export interface TestimonialType {
  id: string
  quote: string
  author?: string
  name?: string
  title?: string
  image?: string | null
  avatar?: string | null
  project?: string
  created_at?: string
  updated_at?: string
  featured?: boolean
  phase_tag?: string | null
}

// Fallback testimonials for when database is unavailable
const fallbackTestimonials: TestimonialType[] = [
  {
    id: "1",
    quote:
      "Working with Cori was a game-changer for our business. Her design expertise transformed our website into a powerful tool that truly represents our brand.",
    author: "Sarah Johnson",
    title: "CEO, TechStart Solutions",
    image: "/testimonials/sarah-johnson.jpg",
    featured: true,
  },
  {
    id: "2",
    quote:
      "Cori's attention to detail and understanding of user experience is exceptional. She delivered a design that exceeded our expectations.",
    author: "Michael Chen",
    title: "Marketing Director, Innovate Inc.",
    image: "/testimonials/michael-chen.jpg",
    featured: true,
  },
]

/**
 * Fetches all testimonials from the database
 * @returns An array of testimonials
 */
export async function getAllTestimonials(): Promise<TestimonialType[]> {
  try {
    const supabase = createClient()
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error fetching testimonials:", error)
      return fallbackTestimonials
    }

    return (testimonials || fallbackTestimonials) as TestimonialType[]
  } catch (error) {
    console.error("Unexpected error fetching testimonials:", error)
    return fallbackTestimonials
  }
}

/**
 * Fetches featured testimonials with images
 * @param limit Maximum number of testimonials to return
 * @returns Array of featured testimonials with images
 */
export async function getFeaturedTestimonialsWithImages(limit = 5): Promise<TestimonialType[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .not("image", "is", null)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured testimonials with images:", error)
      return fallbackTestimonials.filter((t) => t.featured && t.image)
    }

    return data?.length ? data : fallbackTestimonials.filter((t) => t.featured && t.image)
  } catch (error) {
    console.error("Unexpected error fetching featured testimonials with images:", error)
    return fallbackTestimonials.filter((t) => t.featured && t.image)
  }
}

/**
 * Fetches featured testimonials
 * @param limit Maximum number of testimonials to return
 * @returns Array of featured testimonials
 */
export async function getFeaturedTestimonials(limit = 5): Promise<TestimonialType[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured testimonials:", error)
      return fallbackTestimonials.filter((t) => t.featured)
    }

    return data?.length ? data : fallbackTestimonials.filter((t) => t.featured)
  } catch (error) {
    console.error("Unexpected error fetching featured testimonials:", error)
    return fallbackTestimonials.filter((t) => t.featured)
  }
}

/**
 * Fetches a single featured testimonial
 * @returns A single featured testimonial or null
 */
export async function getFeaturedTestimonial(): Promise<TestimonialType | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching featured testimonial:", error)
      const fallback = fallbackTestimonials.find((t) => t.featured)
      return fallback || null
    }

    return data || fallbackTestimonials.find((t) => t.featured) || null
  } catch (error) {
    console.error("Unexpected error fetching featured testimonial:", error)
    const fallback = fallbackTestimonials.find((t) => t.featured)
    return fallback || null
  }
}

// Synchronous versions for static rendering or fallbacks
export function getAllTestimonialsSync(): TestimonialType[] {
  return fallbackTestimonials
}

export function getFeaturedTestimonialsSync(): TestimonialType[] {
  return fallbackTestimonials.filter((t) => t.featured)
}

export function getFeaturedTestimonialsWithImagesSync(): TestimonialType[] {
  return fallbackTestimonials.filter((t) => t.featured && t.image)
}

export function getFeaturedTestimonialSync(): TestimonialType | null {
  return fallbackTestimonials.find((t) => t.featured) || null
}
