import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("services").select("*").eq("id", params.id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Service not found" }, { status: 404 })
      }
      console.error(`Error fetching service with id ${params.id}:`, error)
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if slug already exists for a different service
    if (body.slug) {
      const { data: existingService } = await supabase
        .from("services")
        .select("id")
        .eq("slug", body.slug)
        .neq("id", params.id)
        .single()

      if (existingService) {
        return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 })
      }
    }

    const { data, error } = await supabase.from("services").update(body).eq("id", params.id).select().single()

    if (error) {
      console.error(`Error updating service with id ${params.id}:`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in services API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("services").delete().eq("id", params.id)

    if (error) {
      console.error(`Error deleting service with id ${params.id}:`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in services API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
