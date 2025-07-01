import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/clients"

export async function GET() {
  try {
    const supabase = createClient()

    // Fetch all testimonials
    const { data: allTestimonials, error: allError } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    // Fetch featured testimonials
    const { data: featuredTestimonials, error: featuredError } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (allError || featuredError) {
      console.error("Error fetching testimonials:", allError || featuredError)
      return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
    }

    return NextResponse.json({
      all: allTestimonials,
      featured: featuredTestimonials,
      counts: {
        all: allTestimonials?.length || 0,
        featured: featuredTestimonials?.length || 0,
      },
    })
  } catch (error) {
    console.error("Error in testimonials API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
