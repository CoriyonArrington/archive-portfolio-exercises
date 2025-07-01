"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createFAQ(formData: FormData) {
  const supabase = await createServerClient()

  const question = formData.get("question") as string
  const answer = formData.get("answer") as string
  const display_order = Number.parseInt(formData.get("display_order") as string) || 0
  const category = (formData.get("category") as string) || null

  const { data, error } = await supabase
    .from("faqs")
    .insert([
      {
        question,
        answer,
        display_order,
        category,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating FAQ:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/faqs")
  revalidatePath("/services")
  revalidatePath("/faqs")
  redirect("/admin/faqs")
}

export async function updateFAQ(id: string, formData: FormData) {
  const supabase = await createServerClient()

  const question = formData.get("question") as string
  const answer = formData.get("answer") as string
  const display_order = Number.parseInt(formData.get("display_order") as string) || 0
  const category = (formData.get("category") as string) || null

  console.log(`Updating FAQ with id ${id}:`, { question, answer, display_order, category })

  const { error } = await supabase
    .from("faqs")
    .update({
      question,
      answer,
      display_order,
      category,
    })
    .eq("id", id)

  if (error) {
    console.error(`Error updating FAQ with id ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/faqs")
  revalidatePath("/services")
  revalidatePath("/faqs")
  redirect("/admin/faqs")
}

export async function deleteFAQ(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("faqs").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting FAQ with id ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/faqs")
  revalidatePath("/services")
  revalidatePath("/faqs")
  redirect("/admin/faqs")
}
