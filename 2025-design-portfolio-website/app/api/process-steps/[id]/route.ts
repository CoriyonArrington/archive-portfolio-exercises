import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("process_steps").select("*").eq("id", params.id).single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching process step:", error)
    return NextResponse.json({ error: "Error fetching process step" }, { status: 500 })
  }
}
