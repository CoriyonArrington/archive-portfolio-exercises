import { createServerClient } from "@/lib/supabase/server"
import type { Project } from "@/types/project"

export async function getProjects(): Promise<Project[]> {
  try {
    console.log("Fetching projects from Supabase...")

    const supabase = await createServerClient()

    const { data, error } = await supabase.from("projects").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching projects:", error)
      return [] // Return empty array instead of throwing
    }

    if (!data) {
      return []
    }

    console.log(`Successfully fetched ${data.length} projects from Supabase`)

    // Map database fields to our application types
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      client: item.client || "",
      year: item.year || "",
      role: item.role || "",
      duration: item.duration || "",
      challenge: item.challenge || "",
      solution: item.solution || "",
      outcomes: item.outcomes || [],
      process: item.process || [],
      images: item.images || [],
      tags: item.tags || [],
      slug: item.slug,
      featured: item.featured || false,
      scheduled: item.scheduled || false,
      thumbnailUrl: item.thumbnail_url || "",
      tools: item.tools || [],
      categories: item.categories || [],
      displayOrder: item.display_order || 0,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }))
  } catch (error) {
    console.error("Error in getProjects:", error)
    return [] // Return empty array instead of throwing
  }
}

// Update the other functions similarly to handle errors gracefully

export async function createProject(projectData: Partial<Project>): Promise<Project | null> {
  try {
    console.log("Creating new project in Supabase...")

    const supabase = await createServerClient()

    const { data, error } = await supabase.from("projects").insert([projectData]).select().single()

    if (error) {
      console.error("Error creating project:", error)
      return null
    }

    console.log("Successfully created project in Supabase")

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      client: data.client || "",
      year: data.year || "",
      role: data.role || "",
      duration: data.duration || "",
      challenge: data.challenge || "",
      solution: data.solution || "",
      outcomes: data.outcomes || [],
      process: data.process || [],
      images: data.images || [],
      tags: data.tags || [],
      slug: data.slug,
      featured: data.featured || false,
      scheduled: data.scheduled || false,
      thumbnailUrl: data.thumbnail_url || "",
      tools: data.tools || [],
      categories: data.categories || [],
      displayOrder: data.display_order || 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error("Error in createProject:", error)
    return null
  }
}

export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project | null> {
  try {
    console.log(`Updating project ${id} in Supabase...`)

    const supabase = await createServerClient()

    const { data, error } = await supabase.from("projects").update(projectData).eq("id", id).select().single()

    if (error) {
      console.error("Error updating project:", error)
      return null
    }

    console.log("Successfully updated project in Supabase")

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      client: data.client || "",
      year: data.year || "",
      role: data.role || "",
      duration: data.duration || "",
      challenge: data.challenge || "",
      solution: data.solution || "",
      outcomes: data.outcomes || [],
      process: data.process || [],
      images: data.images || [],
      tags: data.tags || [],
      slug: data.slug,
      featured: data.featured || false,
      scheduled: data.scheduled || false,
      thumbnailUrl: data.thumbnail_url || "",
      tools: data.tools || [],
      categories: data.categories || [],
      displayOrder: data.display_order || 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error("Error in updateProject:", error)
    return null
  }
}

export async function getAllProjects(): Promise<Project[]> {
  return getProjects()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    console.log(`Fetching project with slug ${slug} from Supabase...`)

    const supabase = await createServerClient()

    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error)
      return null
    }

    if (!data) {
      return null
    }

    console.log(`Successfully fetched project with slug ${slug} from Supabase`)

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      client: data.client || "",
      year: data.year || "",
      role: data.role || "",
      duration: data.duration || "",
      challenge: data.challenge || "",
      solution: data.solution || "",
      outcomes: data.outcomes || [],
      process: data.process || [],
      images: data.images || [],
      tags: data.tags || [],
      slug: data.slug,
      featured: data.featured || false,
      scheduled: data.scheduled || false,
      thumbnailUrl: data.thumbnail_url || "",
      tools: data.tools || [],
      categories: data.categories || [],
      displayOrder: data.display_order || 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error(`Error in getProjectBySlug:`, error)
    return null
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    console.log(`Deleting project ${id} from Supabase...`)

    const supabase = await createServerClient()

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting project ${id}:`, error)
      return false
    }

    console.log(`Successfully deleted project ${id} from Supabase`)

    return true
  } catch (error) {
    console.error(`Error in deleteProject:`, error)
    return false
  }
}
