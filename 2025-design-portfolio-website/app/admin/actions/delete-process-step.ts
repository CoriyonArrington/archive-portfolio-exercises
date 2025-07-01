"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteProcessStepAction(id: string) {
  try {
    const supabase = await createClient()

    // Delete from Supabase
    const { error } = await supabase.from("process_steps").delete().eq("id", id)

    if (error) {
      console.error("Error deleting process step:", error)
      throw new Error(`Failed to delete process step: ${error.message}`)
    }

    // Revalidate the process steps page to show the updated list
    revalidatePath("/admin/process-steps")

    // Return success instead of redirecting to avoid 404 errors
    return { success: true }
  } catch (error) {
    console.error("Error in deleteProcessStepAction:", error)
    throw error
  }
}
