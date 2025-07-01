import type { ProjectType } from "@/types/project"
import { processArrayData } from "./utils/process-array-data"

// Mock projects to use when API call fails
const mockProjects: ProjectType[] = [
  {
    id: "1",
    title: "HealthTrack Mobile App",
    description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
    tags: ["UX Research", "UI Design", "Mobile App"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    thumbnail_url: "/placeholder.svg?height=600&width=800",
    slug: "health-track-app",
    featured: true,
    display_order: 1,
    scheduled: false,
  },
  {
    id: "2",
    title: "MedConnect Platform",
    description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
    tags: ["Service Design", "UI/UX", "Web Application"],
    thumbnailUrl: "/placeholder.svg?height=600&width=800",
    thumbnail_url: "/placeholder.svg?height=600&width=800",
    slug: "med-connect-platform",
    featured: true,
    display_order: 2,
    scheduled: true,
  },
]

/**
 * Client-safe function to fetch featured projects
 */
export async function getFeaturedProjectsClient(): Promise<ProjectType[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase credentials not available")
      return mockProjects
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const response = await fetch(`${supabaseUrl}/rest/v1/projects?order=display_order.asc,created_at.desc`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      return mockProjects
    }

    // Transform the data to match our ProjectType
    return data.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: processArrayData(project.tags),
      thumbnailUrl: project.thumbnail_url || null,
      thumbnail_url: project.thumbnail_url || null,
      slug: project.slug,
      featured: project.featured || false,
      display_order: project.display_order || null,
      client: project.client || undefined,
      year: project.year || undefined,
      categories: processArrayData(project.categories),
      scheduled: project.scheduled || false,
    }))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return mockProjects
  }
}
