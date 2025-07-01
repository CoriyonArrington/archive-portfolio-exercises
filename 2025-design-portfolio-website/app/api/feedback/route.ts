import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  // Check environment variables first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Log for debugging (remove in production)
  console.log("Supabase URL defined:", !!supabaseUrl)
  console.log("Supabase Service Key defined:", !!supabaseServiceKey)

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables")
    return NextResponse.json(
      { error: "Server configuration error. Please contact the administrator." },
      { status: 500 },
    )
  }

  try {
    // Parse the request body
    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("Failed to parse request body:", e)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { content, sentiment, pageUrl, metadata } = body

    if (!content) {
      return NextResponse.json({ error: "Feedback content is required" }, { status: 400 })
    }

    // Create Supabase client with verified credentials
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert into Supabase
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          content,
          sentiment,
          page_url: pageUrl,
          metadata,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      data,
    })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
