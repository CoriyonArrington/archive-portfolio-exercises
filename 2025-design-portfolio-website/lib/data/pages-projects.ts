import { pagesClient } from "@/lib/supabase/pages-client"
import type { Project } from "@/types/project"

// These functions are specifically for use in the pages directory
// They NEVER import anything from next/headers

export async function getPagesProjects(): Promise<Project[]> {
  try {
    console.log("Fetching projects from Supabase (pages)...")

    const { data, error } = await pagesClient.from("projects").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching projects:", error)
      throw error
    }

    console.log(`Successfully fetched ${data.length} projects from Supabase (pages)`)

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
    console.error("Error in getPagesProjects:", error)
    return []
  }
}

export async function getPagesProjectById(id: string): Promise<Project | null> {
  try {
    console.log(`Fetching project with ID ${id} from Supabase (pages)...`)

    const { data, error } = await pagesClient.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching project with ID ${id}:`, error)
      return null
    }

    if (!data) {
      console.log(`Project with ID ${id} not found`)
      return null
    }

    console.log(`Successfully fetched project: ${data.title} (pages)`)

    // Map database fields to our application types
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
    console.error(`Error in getPagesProjectById(${id}):`, error)
    return null
  }
}

export async function getPagesProjectBySlug(slug: string): Promise<Project | null> {
  try {
    console.log(`Fetching project with slug "${slug}" from Supabase (pages)...`)

    // Implement retry logic for flaky connections
    let attempts = 0
    const maxAttempts = 3
    let data = null
    let error = null

    while (attempts < maxAttempts) {
      attempts++
      console.log(`Attempting to fetch project with slug "${slug}" (attempt ${attempts}/${maxAttempts}) (pages)`)

      const result = await pagesClient.from("projects").select("*").eq("slug", slug).single()

      if (!result.error) {
        data = result.data
        break
      }

      error = result.error
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second before retrying
    }

    if (error) {
      console.error(`Error fetching project with slug "${slug}" after ${maxAttempts} attempts:`, error)
      return null
    }

    if (!data) {
      console.log(`Project with slug "${slug}" not found`)
      return null
    }

    console.log(`Successfully fetched project with slug "${slug}" (pages)`)

    // Map database fields to our application types
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
    console.error(`Error in getPagesProjectBySlug(${slug}):`, error)
    return null
  }
}

export async function createPagesProject(project: Partial<Project>): Promise<Project | null> {
  try {
    console.log("Creating new project (pages):", project.title)

    // Map our application types to database fields
    const dbProject: any = {}

    if (project.title !== undefined) dbProject.title = project.title
    if (project.description !== undefined) dbProject.description = project.description
    if (project.client !== undefined) dbProject.client = project.client
    if (project.year !== undefined) dbProject.year = project.year
    if (project.role !== undefined) dbProject.role = project.role
    if (project.duration !== undefined) dbProject.duration = project.duration
    if (project.challenge !== undefined) dbProject.challenge = project.challenge
    if (project.solution !== undefined) dbProject.solution = project.solution

    // Ensure array fields are initialized
    dbProject.outcomes = project.outcomes || []
    dbProject.process = project.process || []
    dbProject.images = project.images || []
    dbProject.tags = project.tags || []
    dbProject.tools = project.tools || []
    dbProject.categories = project.categories || []

    if (project.slug !== undefined) dbProject.slug = project.slug
    if (project.featured !== undefined) dbProject.featured = project.featured
    if (project.scheduled !== undefined) dbProject.scheduled = project.scheduled
    if (project.thumbnailUrl !== undefined) dbProject.thumbnail_url = project.thumbnailUrl
    if (project.displayOrder !== undefined) dbProject.display_order = project.displayOrder

    dbProject.created_at = new Date().toISOString()
    dbProject.updated_at = new Date().toISOString()

    const { data, error } = await pagesClient.from("projects").insert(dbProject).select().single()

    if (error) {
      console.error("Error creating project:", error)
      throw error
    }

    console.log("Project created successfully (pages):", data.id)

    // Map database fields to our application types
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
    console.error("Error in createPagesProject:", error)
    throw error
  }
}

export async function updatePagesProject(id: string, project: Partial<Project>): Promise<Project | null> {
  try {
    console.log(`Updating project with ID ${id} (pages):`, project.title)

    // Map our application types to database fields
    const dbProject: any = {}

    if (project.title !== undefined) dbProject.title = project.title
    if (project.description !== undefined) dbProject.description = project.description
    if (project.client !== undefined) dbProject.client = project.client
    if (project.year !== undefined) dbProject.year = project.year
    if (project.role !== undefined) dbProject.role = project.role
    if (project.duration !== undefined) dbProject.duration = project.duration
    if (project.challenge !== undefined) dbProject.challenge = project.challenge
    if (project.solution !== undefined) dbProject.solution = project.solution

    // Ensure array fields are initialized
    if (project.outcomes !== undefined) dbProject.outcomes = project.outcomes
    if (project.process !== undefined) dbProject.process = project.process
    if (project.images !== undefined) dbProject.images = project.images
    if (project.tags !== undefined) dbProject.tags = project.tags
    if (project.tools !== undefined) dbProject.tools = project.tools
    if (project.categories !== undefined) dbProject.categories = project.categories

    if (project.slug !== undefined) dbProject.slug = project.slug
    if (project.featured !== undefined) dbProject.featured = project.featured
    if (project.scheduled !== undefined) dbProject.scheduled = project.scheduled
    if (project.thumbnailUrl !== undefined) dbProject.thumbnail_url = project.thumbnailUrl
    if (project.displayOrder !== undefined) dbProject.display_order = project.displayOrder

    dbProject.updated_at = new Date().toISOString()

    const { data, error } = await pagesClient.from("projects").update(dbProject).eq("id", id).select().single()

    if (error) {
      console.error(`Error updating project with ID ${id}:`, error)
      throw error
    }

    console.log(`Project updated successfully (pages): ${id}`)

    // Map database fields to our application types
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
    console.error(`Error in updatePagesProject(${id}):`, error)
    throw error
  }
}

export async function deletePagesProject(id: string): Promise<boolean> {
  try {
    console.log(`Deleting project with ID ${id} (pages)`)

    const { error } = await pagesClient.from("projects").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting project with ID ${id}:`, error)
      throw error
    }

    console.log(`Project deleted successfully (pages): ${id}`)
    return true
  } catch (error) {
    console.error(`Error in deletePagesProject(${id}):`, error)
    return false
  }
}
