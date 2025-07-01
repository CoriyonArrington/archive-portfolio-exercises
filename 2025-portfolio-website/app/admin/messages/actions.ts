"use server"

import { createServerSupabaseClient } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function deleteMessage(formData: FormData) {
  const id = formData.get("id") as string

  const supabase = await createServerSupabaseClient()

  await supabase.from("contact_submissions").delete().eq("id", id)

  revalidatePath("/admin/messages")
}

