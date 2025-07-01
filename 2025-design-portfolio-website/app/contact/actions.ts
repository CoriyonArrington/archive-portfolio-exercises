"use server"

import { supabase } from "@/lib/supabase"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Insert into contact_submissions table
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        email,
        subject,
        message,
        // Note: created_at will be automatically set by Supabase
      },
    ])

    if (error) {
      console.error("Error saving contact submission:", error)
      return {
        success: false,
        error: "Failed to save your message. Please try again.",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
