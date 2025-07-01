"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProcessStepAction(id: string, formData: FormData) {
  if (!id) {
    throw new Error("Process step ID is required")
  }

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

    console.log("Updating process step with ID:", id)

    // Update in Supabase
    const { error } = await supabase
      .from("process_steps")
      .update({
        phase_title,
        phase_subtitle,
        phase_description,
        image_url,
        quote_text,
        quote_author,
        icon,
        display_order,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating process step:", error)
      throw new Error(`Failed to update process step: ${error.message}`)
    }

    // Revalidate the process steps page to show the updated data
    revalidatePath("/admin/process-steps")
    revalidatePath("/process")

    // Redirect to the process steps list
    redirect("/admin/process-steps")
  } catch (error) {
    console.error("Error in updateProcessStepAction:", error)
    throw error
  }
}
