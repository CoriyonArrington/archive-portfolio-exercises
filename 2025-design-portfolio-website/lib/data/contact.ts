import { createServerClient } from "@/lib/supabase/server"

export async function getContactSubmissions(limit = 100) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching contact submissions:", error)
    return []
  }

  return data
}
