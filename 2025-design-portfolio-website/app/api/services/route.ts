import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching services:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("Unexpected error in services API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, and description are required" },
        { status: 400 },
      )
    }

    // Check if slug already exists
    const { data: existingService } = await supabase.from("services").select("id").eq("slug", body.slug).single()

    if (existingService) {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 })
    }

    // Set default values if not provided
    const serviceData = {
      ...body,
      featured: body.featured ?? false,
      display_order: body.display_order ?? 999,
    }

    const { data, error } = await supabase.from("services").insert([serviceData]).select().single()

    if (error) {
      console.error("Error creating service:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Unexpected error in services API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
