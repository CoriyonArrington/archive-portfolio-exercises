import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

    const supabase = getSupabaseClient()
    let query = supabase.from("testimonials").select("*")

    if (featured) {
      query = query.eq("featured", true)
    }

    const { data, error } = await query.order("display_order", { ascending: true }).limit(limit)

    if (error) {
      console.error("Error fetching testimonials:", error)
      return NextResponse.json([], {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return NextResponse.json(data || [], {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in testimonials API route:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
