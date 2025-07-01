import { createClient } from "@/lib/supabase/server"
import type { Service } from "@/types/services"

export async function getServices() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching services:", error)
    return []
  }

  return data as Service[]
}

export async function getServiceById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching service with id ${id}:`, error)
    return null
  }

  return data as Service
}
