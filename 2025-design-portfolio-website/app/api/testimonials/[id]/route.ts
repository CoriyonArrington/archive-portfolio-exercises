import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath, revalidateTag } from "next/cache"
import type { Database } from "@/types/supabase"

export const dynamic = "force-dynamic"

// Create a direct Supabase client for API routes
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}

// Get testimonial by ID
async function getTestimonialById(id: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

  if (error) {
    throw error
  }

  return data
}

// Update testimonial
async function updateTestimonial(id: string, testimonialData: any) {
  const supabase = getSupabaseClient()
  return await supabase
    .from("testimonials")
    .update({
      quote: testimonialData.quote,
      author: testimonialData.author,
      title: testimonialData.title,
      company: testimonialData.company,
      avatar_url: testimonialData.image,
      featured: testimonialData.featured || false,
      phase_tag: testimonialData.phaseTag,
      display_order: testimonialData.displayOrder || 999,
      project: testimonialData.project,
    })
    .eq("id", id)
    .select()
}

// Delete testimonial
async function deleteTestimonial(id: string) {
  const supabase = getSupabaseClient()
  return await supabase.from("testimonials").delete().eq("id", id)
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testimonial = await getTestimonialById(params.id)

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error(`Error in GET /api/testimonials/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testimonialData = await request.json()
    const { data, error } = await updateTestimonial(params.id, testimonialData)

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    // Revalidate both the path and tag
    revalidatePath("/testimonials")
    revalidateTag("testimonials")

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in PUT /api/testimonials/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await deleteTestimonial(params.id)

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    // Revalidate both the path and tag
    revalidatePath("/testimonials")
    revalidateTag("testimonials")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/testimonials/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
