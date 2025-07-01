"use server"

import { revalidatePath, revalidateTag } from "next/cache"

// This function will be called from client components
export async function revalidatePage(path: string) {
  // The secret is only accessible on the server
  revalidatePath(path)
  return { success: true }
}

export async function revalidateTagAction(tag: string) {
  revalidateTag(tag)
  return { success: true }
}

export async function triggerDeploy() {
  try {
    // The deploy hook URL is only accessible on the server
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

    if (!deployHookUrl) {
      return { success: false, message: "Deploy hook URL not configured" }
    }

    const response = await fetch(deployHookUrl, {
      method: "POST",
    })

    if (!response.ok) {
      return { success: false, message: "Failed to trigger deploy hook" }
    }

    return { success: true, message: "Deploy triggered successfully" }
  } catch (error) {
    console.error("Error triggering deploy:", error)
    return { success: false, message: "Error triggering deploy" }
  }
}

export async function nuclearRevalidation() {
  // Revalidate all major paths
  revalidatePath("/", "layout")
  revalidatePath("/testimonials")
  revalidatePath("/projects")
  revalidatePath("/services")
  revalidatePath("/process")
  revalidatePath("/about")
  revalidatePath("/contact")

  // Revalidate all major tags
  revalidateTag("testimonials")
  revalidateTag("projects")
  revalidateTag("services")
  revalidateTag("process")
  revalidateTag("faqs")

  return { success: true, message: "Nuclear revalidation complete" }
}
