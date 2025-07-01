import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("process_steps").select("*").order("display_order", { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching process steps:", error)
    return NextResponse.json({ error: "Error fetching process steps" }, { status: 500 })
  }
}
