"use server"

import { supabase } from "@/lib/supabase"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required" }
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert([{ name, email, subject, message }])

    if (error) {
      console.error("Error submitting contact form:", error)
      return { success: false, message: "Failed to submit form. Please try again." }
    }

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

