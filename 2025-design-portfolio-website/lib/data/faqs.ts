import { createServerClient } from "@/lib/supabase/server"
import type { FAQ } from "@/types/faqs"

export async function getFAQs() {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("faqs").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching FAQs:", error)
    return []
  }

  return data as FAQ[]
}

export async function getFAQById(id: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("faqs").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching FAQ with id ${id}:`, error)
    return null
  }

  return data as FAQ
}

export const getAllFAQs = getFAQs

export async function createFAQ(faqData: Partial<FAQ>): Promise<FAQ | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("faqs").insert([faqData]).select().single()

    if (error) {
      console.error("Error creating FAQ:", error)
      return null
    }

    return data as FAQ
  } catch (error) {
    console.error("Error in createFAQ:", error)
    return null
  }
}

export async function updateFAQ(id: string, faqData: Partial<FAQ>): Promise<FAQ | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("faqs").update(faqData).eq("id", id).select().single()

    if (error) {
      console.error(`Error updating FAQ with id ${id}:`, error)
      return null
    }

    return data as FAQ
  } catch (error) {
    console.error("Error in updateFAQ:", error)
    return null
  }
}

export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.from("faqs").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting FAQ with id ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteFAQ:", error)
    return false
  }
}
