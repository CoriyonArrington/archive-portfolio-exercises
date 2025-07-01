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

export async function GET() {
  try {
    // Create a Supabase client
    const supabase = getSupabaseClient()

    // Query only featured testimonials
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Set proper content type header
    return NextResponse.json(data || [], {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in featured testimonials API route:", error)
    // Return empty array instead of error to prevent client-side issues
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
