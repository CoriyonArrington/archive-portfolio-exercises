"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function subscribeToProject(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const projectId = formData.get("projectId") as string
    const projectTitle = formData.get("projectTitle") as string

    if (!email || !projectId || !projectTitle) {
      return {
        success: false,
        message: "Missing required fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    const supabase = await createServerClient()

    // Check if this email is already subscribed to this project
    const { data: existingSubscription } = await supabase
      .from("project_subscriptions")
      .select("*")
      .eq("email", email)
      .eq("project_id", projectId)
      .single()

    if (existingSubscription) {
      return {
        success: true,
        message: "You're already subscribed to updates for this project!",
      }
    }

    // Insert new subscription
    const { error } = await supabase.from("project_subscriptions").insert({
      email,
      project_id: projectId,
      project_title: projectTitle,
    })

    if (error) {
      console.error("Error subscribing to project:", error)
      return {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      }
    }

    // Revalidate the project page
    revalidatePath(`/work/${projectId}`)

    return {
      success: true,
      message: "You've been subscribed to updates for this project!",
    }
  } catch (error) {
    console.error("Error in subscribeToProject:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
