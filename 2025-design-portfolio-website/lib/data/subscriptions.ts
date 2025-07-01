import { createServerClient } from "@/lib/supabase/server"

export async function getProjectSubscriptions(limit = 100) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("project_subscriptions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching project subscriptions:", error)
    return []
  }

  return data
}
