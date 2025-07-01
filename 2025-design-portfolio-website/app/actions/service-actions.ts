"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
}

export async function createServiceAction(formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("display_order") as string) || 0

  // Generate slug from title
  const slug = generateSlug(title)

  // Handle deliverables as an array
  const deliverablesString = formData.get("deliverables") as string
  const deliverables = deliverablesString
    ? deliverablesString
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  const { error } = await supabase.from("services").insert({
    title,
    description,
    icon,
    display_order: displayOrder,
    deliverables,
    slug, // Add the slug field
  })

  if (error) {
    console.error("Error creating service:", error)
    throw new Error(`Failed to create service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  redirect("/admin/services")
}

export async function updateServiceAction(id: string, formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("display_order") as string) || 0

  // Generate slug from title
  const slug = generateSlug(title)

  // Handle deliverables as an array
  const deliverablesString = formData.get("deliverables") as string
  const deliverables = deliverablesString
    ? deliverablesString
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  const { error } = await supabase
    .from("services")
    .update({
      title,
      description,
      icon,
      display_order: displayOrder,
      deliverables,
      slug, // Add the slug field
    })
    .eq("id", id)

  if (error) {
    console.error(`Error updating service with id ${id}:`, error)
    throw new Error(`Failed to update service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  redirect("/admin/services")
}

export async function deleteServiceAction(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting service with id ${id}:`, error)
    throw new Error(`Failed to delete service: ${error.message}`)
  }

  revalidatePath("/admin/services")
  redirect("/admin/services")
}
