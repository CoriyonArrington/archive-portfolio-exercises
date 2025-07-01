"use server"

import { createServerSupabaseClient } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string

  const supabase = await createServerSupabaseClient()

  await supabase.from("projects").delete().eq("id", id)

  revalidatePath("/admin/projects")
}

export async function createProject(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const client = formData.get("client") as string
  const year = formData.get("year") as string
  const role = formData.get("role") as string
  const duration = formData.get("duration") as string
  const challenge = formData.get("challenge") as string
  const solution = formData.get("solution") as string
  const slug = formData.get("slug") as string
  const featured = formData.get("featured") === "on"

  // Parse tags from comma-separated string
  const tagsString = formData.get("tags") as string
  const tags = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)

  // Parse outcomes from newline-separated string
  const outcomesString = formData.get("outcomes") as string
  const outcomes = outcomesString
    .split("\n")
    .map((outcome) => outcome.trim())
    .filter(Boolean)

  // For simplicity, we're using placeholder images
  const images = [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ]

  // Create a simple process array
  const process = [
    {
      phase: "Research",
      description: "Conducted user research to understand needs and pain points.",
    },
    {
      phase: "Ideation",
      description: "Developed concepts and ideas based on research insights.",
    },
    {
      phase: "Design",
      description: "Created wireframes and prototypes, iterating based on feedback.",
    },
    {
      phase: "Implementation",
      description: "Worked with developers to bring the design to life.",
    },
  ]

  const { error } = await supabase.from("projects").insert({
    title,
    description,
    client,
    year,
    role,
    duration,
    challenge,
    solution,
    outcomes: JSON.stringify(outcomes),
    process: JSON.stringify(process),
    images: JSON.stringify(images),
    tags: JSON.stringify(tags),
    slug,
    featured,
  })

  if (error) {
    console.error("Error creating project:", error)
    throw new Error("Failed to create project")
  }

  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}

export async function updateProject(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const client = formData.get("client") as string
  const year = formData.get("year") as string
  const role = formData.get("role") as string
  const duration = formData.get("duration") as string
  const challenge = formData.get("challenge") as string
  const solution = formData.get("solution") as string
  const slug = formData.get("slug") as string
  const featured = formData.get("featured") === "on"

  // Parse tags from comma-separated string
  const tagsString = formData.get("tags") as string
  const tags = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)

  // Parse outcomes from newline-separated string
  const outcomesString = formData.get("outcomes") as string
  const outcomes = outcomesString
    .split("\n")
    .map((outcome) => outcome.trim())
    .filter(Boolean)

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description,
      client,
      year,
      role,
      duration,
      challenge,
      solution,
      outcomes: JSON.stringify(outcomes),
      tags: JSON.stringify(tags),
      slug,
      featured,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating project:", error)
    throw new Error("Failed to update project")
  }

  revalidatePath("/admin/projects")
  revalidatePath(`/work/${slug}`)
  redirect("/admin/projects")
}

