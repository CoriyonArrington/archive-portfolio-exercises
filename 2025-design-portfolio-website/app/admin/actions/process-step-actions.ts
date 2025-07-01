"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProcessStep(formData: FormData) {
  try {
    const supabase = await createServerClient()

    const phase_title = formData.get("phase_title") as string
    const phase_subtitle = formData.get("phase_subtitle") as string
    const phase_description = formData.get("phase_description") as string
    const image_url = formData.get("image_url") as string
    const quote_text = formData.get("quote_text") as string
    const quote_author = formData.get("quote_author") as string
    const icon = formData.get("icon") as string
    const display_order = Number.parseInt(formData.get("display_order") as string) || 0

    const { error } = await supabase.from("process_steps").insert([
      {
        phase_title,
        phase_subtitle,
        phase_description,
        image_url,
        quote_text,
        quote_author,
        icon,
        display_order,
      },
    ])

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateProcessStep(id: string, formData: FormData) {
  try {
    const supabase = await createServerClient()

    const phase_title = formData.get("phase_title") as string
    const phase_subtitle = formData.get("phase_subtitle") as string
    const phase_description = formData.get("phase_description") as string
    const image_url = formData.get("image_url") as string
    const quote_text = formData.get("quote_text") as string
    const quote_author = formData.get("quote_author") as string
    const icon = formData.get("icon") as string
    const display_order = Number.parseInt(formData.get("display_order") as string) || 0

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
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProcessStep(id: string) {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.from("process_steps").delete().eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
