import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath, revalidateTag } from "next/cache"

export type TestimonialType = {
  id: string
  quote: string
  author: string
  name?: string
  title?: string
  company?: string
  image?: string
  featured: boolean
  phaseTag?: string
  displayOrder?: number
  project?: string
  createdAt: string
  updatedAt: string
}

// Make sure the getAllTestimonials function accepts a limit parameter
export async function getAllTestimonials(limit?: number) {
  try {
    const supabase = await createServerClient()

    let query = supabase.from("testimonials").select("*")

    // Apply limit if provided
    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching testimonials:", error)
      return []
    }

    return (
      data.map((item: any) => ({
        id: item.id,
        quote: item.quote,
        author: item.author,
        name: item.author, // For backward compatibility
        title: item.title,
        company: item.company,
        image: item.avatar_url || item.image, // Try both field names
        featured: item.featured,
        phaseTag: item.phase_tag,
        displayOrder: item.display_order,
        project: item.project,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) || []
    )
  } catch (error) {
    console.error("Error in getAllTestimonials:", error)
    return []
  }
}

export async function getTestimonialById(id: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching testimonial ${id}:`, error)
    return null
  }

  return {
    id: data.id,
    quote: data.quote,
    author: data.author,
    name: data.author, // For backward compatibility
    title: data.title,
    company: data.company,
    image: data.avatar_url || data.image, // Try both field names
    featured: data.featured,
    phaseTag: data.phase_tag,
    displayOrder: data.display_order,
    project: data.project,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export async function createTestimonial(testimonialData: any) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("testimonials")
    .insert([
      {
        quote: testimonialData.quote,
        author: testimonialData.author,
        title: testimonialData.title,
        company: testimonialData.company,
        avatar_url: testimonialData.image,
        featured: testimonialData.featured || false,
        phase_tag: testimonialData.phaseTag,
        display_order: testimonialData.displayOrder || 999,
        project: testimonialData.project,
      },
    ])
    .select()

  // Revalidate the testimonials page
  revalidatePath("/testimonials")
  revalidateTag("testimonials")

  return { data, error }
}

export async function updateTestimonial(id: string, testimonialData: any) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("testimonials")
    .update({
      quote: testimonialData.quote,
      author: testimonialData.author,
      title: testimonialData.title,
      company: testimonialData.company,
      avatar_url: testimonialData.image,
      featured: testimonialData.featured,
      phase_tag: testimonialData.phaseTag,
      display_order: testimonialData.displayOrder,
      project: testimonialData.project,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  // Revalidate the testimonials page
  revalidatePath("/testimonials")
  revalidateTag("testimonials")

  return { data, error }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  // Revalidate the testimonials page
  revalidatePath("/testimonials")
  revalidateTag("testimonials")

  return { error }
}

export async function getFeaturedTestimonials(limit = 3) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured testimonials:", error)
    return []
  }

  return data.map((item: any) => ({
    id: item.id,
    quote: item.quote,
    author: item.author,
    name: item.author, // For backward compatibility
    title: item.title,
    company: item.company,
    image: item.avatar_url || item.image, // Try both field names
    featured: item.featured,
    phaseTag: item.phase_tag,
    displayOrder: item.display_order,
    project: item.project,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))
}
