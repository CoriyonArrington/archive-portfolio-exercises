import { createServerClient } from "@/lib/supabase/server"

export async function getFeedback(limit = 100) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching feedback:", error)
    return []
  }

  return data
}

export async function getFeedbackStats(days = 7) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("feedback_stats")
    .select("*")
    .order("day", { ascending: false })
    .limit(days)

  if (error) {
    console.error("Error fetching feedback stats:", error)
    return []
  }

  return data
}
