import type { ProjectType } from "@/types/project"
import { supabase } from "./supabase"
import { processArrayData } from "./utils/process-array-data"
import type { Database } from "@/types/supabase"

// Add this near the top of the file, after imports
import { cache } from "react"
import { validateImageUrl } from "./utils/image-debug"

export type Project = Database["public"]["Tables"]["projects"]["Row"]

// Mock projects to use when Supabase connection fails
const mockProjects: ProjectType[] = [
  {
    id: "1",
    title: "HealthTrack Mobile App",
    description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
    tags: ["UX Research", "UI Design", "Mobile App"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "health-track-app",
    client: "HealthTech Inc.",
    year: "2023",
    role: "Lead Designer",
    duration: "4 months",
    challenge:
      "Create an intuitive interface for patients to track complex health metrics while ensuring high engagement and medication adherence.",
    solution:
      "Designed a personalized dashboard with visual health trends and medication reminders integrated with gamification elements to encourage regular use.",
    externalUrl: "https://healthtrack-demo.vercel.app", // Added example external URL
  },
  {
    id: "2",
    title: "MedConnect Platform",
    description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
    tags: ["Service Design", "UI/UX", "Web Application"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "med-connect-platform",
    client: "MedConnect",
    year: "2022",
    role: "UX Designer",
    duration: "6 months",
    challenge:
      "Design a telemedicine platform that feels as personal and effective as in-person visits while being accessible to users with varying technical abilities.",
    solution:
      "Created an intuitive video consultation interface with pre-visit preparation flows and post-visit follow-up tools to ensure continuity of care.",
  },
  {
    id: "3",
    title: "BioWearable Dashboard",
    description: "Analytics dashboard for healthcare professionals to monitor patient data from wearable devices.",
    tags: ["Data Visualization", "Dashboard Design", "Healthcare"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "bio-wearable-dashboard",
    client: "BioTech Solutions",
    year: "2022",
    role: "Product Designer",
    duration: "3 months",
    challenge:
      "Present complex biometric data from wearable devices in a way that allows healthcare providers to quickly identify trends and potential issues.",
    solution:
      "Designed an adaptive dashboard with customizable views and AI-powered insights that highlight significant changes in patient health metrics.",
  },
  {
    id: "4",
    title: "Patient Portal Redesign",
    description: "A comprehensive redesign of a patient portal to improve usability and accessibility.",
    tags: ["UX Research", "UI Design", "Web Application"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "patient-portal-redesign",
  },
  {
    id: "5",
    title: "MedDispense System",
    description: "A system for automated medication dispensing in hospitals, reducing errors and improving efficiency.",
    tags: ["UX Design", "System Design", "Healthcare"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "med-dispense-system",
  },
  {
    id: "6",
    title: "Health Education Platform",
    description: "An online platform providing health education resources to patients in underserved communities.",
    tags: ["UX Research", "UI Design", "Web Application"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    slug: "health-education-platform",
  },
]

import { createServerClient } from "@/lib/supabase/server"

/**
 * Fetches featured projects from Supabase
 * @param featured - Whether to fetch only featured projects
 * @returns Array of project objects
 */
export async function getFeaturedProjects(featured = true): Promise<Project[]> {
  try {
    const supabase = await createServerClient()

    let query = supabase.from("projects").select("*").order("display_order", { ascending: true })

    if (featured) {
      query = query.eq("featured", true)
    }

    const { data, error } = await query.limit(6)

    if (error) {
      console.error("Error fetching projects:", error)
      return []
    }

    // Log the data to help debug
    console.log(
      "Projects data from Supabase:",
      data.map((p) => ({
        id: p.id,
        title: p.title,
        thumbnail_url: p.thumbnail_url,
      })),
    )

    return data || []
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return []
  }
}

/**
 * Fetches a single project by slug
 * @param slug - The project slug
 * @returns Project object or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Failed to fetch project with slug ${slug}:`, error)
    return null
  }
}

// Similarly, wrap other data fetching functions with cache
export const getAllProjects = cache(async (): Promise<ProjectType[]> => {
  try {
    console.log("Fetching all projects from Supabase...")

    // Check if Supabase URL and key are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase credentials not available")
      return mockProjects
    }

    // Use a direct fetch with cache control instead of the Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Making fetch request to Supabase REST API")
    const response = await fetch(`${supabaseUrl}/rest/v1/projects?order=display_order.asc,created_at.desc`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error: ${response.status} - ${errorText}`)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      console.log("No projects found in Supabase, returning mock data")
      return mockProjects
    }

    console.log(`Successfully fetched ${data.length} projects from Supabase`)

    // Transform the data to match our ProjectType
    interface SupabaseProject {
      id: string
      title: string
      description: string
      tags: string[] | string
      thumbnail_url: string
      slug: string
      featured?: boolean
      display_order?: number
      scheduled?: boolean
      client?: string
      year?: string
      role?: string
      duration?: string
      challenge?: string
      solution?: string
      process?: ProcessStep[] | ProcessStep
      outcomes?: string[] | string
      images?: string[] | string
      tools?: string[] | string
      categories?: string[] | string
      external_url?: string
    }

    // Define a more specific type for process steps
    interface ProcessStep {
      phase: string
      description: string
    }

    // Log the raw data to see the structure
    console.log("Raw project data sample:", data[0])

    // Transform the data to match our ProjectType
    return data.map((project: SupabaseProject) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: processArrayData(project.tags),
      thumbnailUrl: validateImageUrl(project.thumbnail_url),
      slug: project.slug,
      featured: project.featured || false, // Add this line to include the featured flag
      display_order: project.display_order || null, // Add this line to include display_order
      scheduled: project.scheduled || false,
      client: project.client || undefined,
      year: project.year || undefined,
      role: project.role || undefined,
      duration: project.duration || undefined,
      challenge: project.challenge || undefined,
      solution: project.solution || undefined,
      process: Array.isArray(project.process)
        ? (project.process as ProcessStep[])
        : project.process
          ? [project.process as ProcessStep]
          : undefined,
      outcomes: Array.isArray(project.outcomes)
        ? (project.outcomes as string[])
        : project.outcomes
          ? [project.outcomes as string]
          : undefined,
      images: Array.isArray(project.images)
        ? (project.images as string[])
        : project.images
          ? [project.images as string]
          : undefined,
      tools: processArrayData(project.tools),
      categories: processArrayData(project.categories),
      externalUrl: project.external_url || undefined,
    }))
  } catch (error) {
    console.error("Error fetching projects:", error)
    console.log("Returning mock projects data due to error")
    return mockProjects
  }
})

// Get project by ID
export async function getProjectById(id: string): Promise<ProjectType | null> {
  try {
    console.log(`Fetching project with ID "${id}" from Supabase...`)

    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching project with ID "${id}":`, error)
      return null
    }

    if (!data) {
      console.log(`No project found with ID "${id}" in Supabase`)
      return null
    }

    console.log(`Successfully fetched project with ID "${id}"`)

    // Transform the data to match our ProjectType
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      tags: processArrayData(data.tags),
      thumbnailUrl: data.thumbnail_url,
      slug: data.slug,
      scheduled: false,
      client: data.client || undefined,
      year: data.year || undefined,
      role: data.role || undefined,
      duration: data.duration || undefined,
      challenge: data.challenge || undefined,
      solution: data.solution || undefined,
      process: Array.isArray(data.process) ? data.process : data.process ? [data.process] : undefined,
      outcomes: Array.isArray(data.outcomes) ? data.outcomes : data.outcomes ? [data.outcomes] : undefined,
      images: Array.isArray(data.images) ? data.images : data.images ? [data.images] : undefined,
      tools: processArrayData(data.tools),
      categories: processArrayData(data.categories),
      externalUrl: data.external_url || undefined,
    }
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error)
    return null
  }
}

// Get related projects (excluding current project)
export async function getRelatedProjects(currentProjectId: string, limit = 2): Promise<ProjectType[]> {
  try {
    console.log(`Fetching related projects (excluding ${currentProjectId}) from Supabase...`)
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .neq("id", currentProjectId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching related projects:", error)

      // Return mock related projects
      const relatedMockProjects = mockProjects.filter((p) => p.id !== currentProjectId).slice(0, limit)

      console.log(`Returning ${relatedMockProjects.length} mock related projects`)
      return relatedMockProjects
    }

    if (!data || data.length === 0) {
      console.log("No related projects found in Supabase, returning mock data")

      // Return mock related projects
      const relatedMockProjects = mockProjects.filter((p) => p.id !== currentProjectId).slice(0, limit)

      return relatedMockProjects
    }

    console.log(`Successfully fetched ${data.length} related projects from Supabase`)

    // Transform the data to match our ProjectType
    return data.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: processArrayData(project.tags),
      thumbnailUrl: project.thumbnail_url,
      slug: project.slug,
      scheduled: project.scheduled || false,
      client: project.client || undefined,
      year: project.year || undefined,
      role: project.role || undefined,
      duration: project.duration || undefined,
      challenge: project.challenge || undefined,
      solution: project.solution || undefined,
      process: Array.isArray(project.process) ? project.process : project.process ? [project.process] : undefined,
      outcomes: Array.isArray(project.outcomes) ? project.outcomes : project.outcomes ? [project.outcomes] : undefined,
      images: Array.isArray(project.images) ? project.images : project.images ? [project.images] : undefined,
      tools: processArrayData(project.tools),
      categories: processArrayData(project.categories),
      externalUrl: project.external_url || undefined,
    }))
  } catch (error) {
    console.error("Error fetching related projects:", error)

    // Return mock related projects
    const relatedMockProjects = mockProjects.filter((p) => p.id !== currentProjectId).slice(0, limit)

    console.log(`Returning ${relatedMockProjects.length} mock related projects due to error`)
    return relatedMockProjects
  }
}
