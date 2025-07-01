"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export async function updateProjectImages(projectId: string, images: string[]) {
  try {
    console.log(`Updating images for project ${projectId}:`, images)

    // Create a new Supabase client with the service role key for admin operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Server configuration error. Missing Supabase credentials.")
    }

    console.log("Creating Supabase admin client with service role key")
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Log the update operation
    console.log(`Updating project ${projectId} with images:`, images)

    // Perform the update
    const { data, error } = await supabase.from("projects").update({ images }).eq("id", projectId).select()

    if (error) {
      console.error("Error updating project images:", error)
      throw new Error(`Failed to update project images: ${error.message}`)
    }

    console.log("Update successful, response data:", data)

    // Revalidate all relevant paths
    revalidatePath(`/work/${projectId}`)
    revalidatePath("/work")
    revalidatePath("/")
    revalidatePath("/process")
    revalidatePath(`/admin/projects/${projectId}/edit`)
    revalidatePath(`/api/projects/${projectId}`)

    // Force revalidation of API routes
    revalidatePath("/api/projects")

    // Revalidate the image itself
    revalidatePath(`/api/revalidate-images?path=/work&secret=${process.env.REVALIDATION_SECRET}`)

    return { success: true, data }
  } catch (error) {
    console.error("Error in updateProjectImages:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update project images",
    }
  }
}
