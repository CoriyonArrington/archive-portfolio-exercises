"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProcessStepAction(formData: FormData) {
  try {
    const supabase = await createClient()

    // Extract form data
    const phase_title = formData.get("title") as string
    const phase_subtitle = formData.get("subtitle") as string
    const phase_description = formData.get("description") as string
    const image_url = formData.get("imageUrl") as string
    const quote_text = formData.get("quoteText") as string
    const quote_author = formData.get("quoteAuthor") as string
    const icon = formData.get("icon") as string
    const display_order = Number.parseInt(formData.get("displayOrder") as string) || 0

    // Insert into Supabase
    const { data, error } = await supabase
      .from("process_steps")
      .insert({
        phase_title,
        phase_subtitle,
        phase_description,
        image_url,
        quote_text,
        quote_author,
        icon,
        display_order,
      })
      .select()

    if (error) {
      console.error("Error creating process step:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the process steps page to show the new data
    revalidatePath("/admin/process-steps")
    revalidatePath("/process")

    // Return success instead of redirecting
    return { success: true, data }
  } catch (error: any) {
    console.error("Error in createProcessStepAction:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}
