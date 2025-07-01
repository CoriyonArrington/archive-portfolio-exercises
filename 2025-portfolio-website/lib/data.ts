import { supabase, type Project, type Testimonial, type Service } from "./supabase"
import { getMockFeaturedProjects, getMockProjects, getMockTestimonials, getMockServices } from "./mock-data"

// Get featured projects with fallback to mock data
export async function getFeaturedProjects(): Promise<Project[]> {
  // Start with mock data as the default fallback
  let result = getMockFeaturedProjects()

  try {
    // Check if the projects table exists before querying it
    const { error: tableCheckError } = await supabase.from("projects").select("id").limit(1).single()

    // If the table doesn't exist, return mock data immediately
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Projects table does not exist, using mock data")
      return result
    }

    // If the table exists, try to fetch featured projects
    const { data, error } = await supabase.from("projects").select("*").eq("featured", true)

    // If there's an error or no data, log it and use mock data
    if (error) {
      console.error("Error fetching featured projects:", error.message)
      return result
    }

    // If we got data, use it
    if (data && data.length > 0) {
      result = data.map(transformProject)
    } else {
      console.log("No featured projects found, using mock data")
    }
  } catch (error) {
    // Catch any other errors and use mock data
    console.error("Exception in getFeaturedProjects:", error)
  }

  return result
}

// Get all projects with fallback to mock data
export async function getAllProjects(): Promise<Project[]> {
  // Start with mock data as the default fallback
  let result = getMockProjects()

  try {
    // Check if the projects table exists before querying it
    const { error: tableCheckError } = await supabase.from("projects").select("id").limit(1).single()

    // If the table doesn't exist, return mock data immediately
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Projects table does not exist, using mock data")
      return result
    }

    // If the table exists, try to fetch all projects
    const { data, error } = await supabase.from("projects").select("*").order("year", { ascending: false })

    // If there's an error or no data, log it and use mock data
    if (error) {
      console.error("Error fetching all projects:", error.message)
      return result
    }

    // If we got data, use it
    if (data && data.length > 0) {
      result = data.map(transformProject)
    } else {
      console.log("No projects found, using mock data")
    }
  } catch (error) {
    // Catch any other errors and use mock data
    console.error("Exception in getAllProjects:", error)
  }

  return result
}

// Get a project by slug with fallback to mock data
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Start with finding the project in mock data as fallback
  let result = getMockProjects().find((p) => p.slug === slug) || null

  try {
    // Check if the projects table exists before querying it
    const { error: tableCheckError } = await supabase.from("projects").select("id").limit(1).single()

    // If the table doesn't exist, return mock data immediately
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Projects table does not exist, using mock data")
      return result
    }

    // If the table exists, try to fetch the project by slug
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

    // If there's an error, log it and use mock data
    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error.message)
      return result
    }

    // If we got data, use it
    if (data) {
      result = transformProject(data)
    } else {
      console.log(`No project found with slug ${slug}, using mock data`)
    }
  } catch (error) {
    // Catch any other errors and use mock data
    console.error(`Exception in getProjectBySlug for ${slug}:`, error)
  }

  return result
}

// Get testimonials with fallback to mock data
export async function getTestimonials(): Promise<Testimonial[]> {
  // Start with mock data as the default fallback
  let result = getMockTestimonials()

  try {
    // Check if the testimonials table exists before querying it
    const { error: tableCheckError } = await supabase.from("testimonials").select("id").limit(1).single()

    // If the table doesn't exist, return mock data immediately
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Testimonials table does not exist, using mock data")
      return result
    }

    // If the table exists, try to fetch testimonials
    const { data, error } = await supabase.from("testimonials").select("*")

    // If there's an error or no data, log it and use mock data
    if (error) {
      console.error("Error fetching testimonials:", error.message)
      return result
    }

    // If we got data, use it
    if (data && data.length > 0) {
      result = data
    } else {
      console.log("No testimonials found, using mock data")
    }
  } catch (error) {
    // Catch any other errors and use mock data
    console.error("Exception in getTestimonials:", error)
  }

  return result
}

// Get services with fallback to mock data
export async function getServices(): Promise<Service[]> {
  // Start with mock data as the default fallback
  let result = getMockServices()

  try {
    // Check if the services table exists before querying it
    const { error: tableCheckError } = await supabase.from("services").select("id").limit(1).single()

    // If the table doesn't exist, return mock data immediately
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Services table does not exist, using mock data")
      return result
    }

    // If the table exists, try to fetch services
    const { data, error } = await supabase.from("services").select("*")

    // If there's an error or no data, log it and use mock data
    if (error) {
      console.error("Error fetching services:", error.message)
      return result
    }

    // If we got data, use it
    if (data && data.length > 0) {
      result = data.map((service) => ({
        ...service,
        deliverables:
          typeof service.deliverables === "string" ? JSON.parse(service.deliverables) : service.deliverables,
      }))
    } else {
      console.log("No services found, using mock data")
    }
  } catch (error) {
    // Catch any other errors and use mock data
    console.error("Exception in getServices:", error)
  }

  return result
}

// Helper function to transform project data from Supabase
function transformProject(project: any): Project {
  return {
    ...project,
    outcomes: typeof project.outcomes === "string" ? JSON.parse(project.outcomes) : project.outcomes,
    process: typeof project.process === "string" ? JSON.parse(project.process) : project.process,
    images: typeof project.images === "string" ? JSON.parse(project.images) : project.images,
    tags: typeof project.tags === "string" ? JSON.parse(project.tags) : project.tags,
  }
}

// Contact form submission
export async function submitContactForm(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Check if the contact_submissions table exists before inserting
    const { error: tableCheckError } = await supabase.from("contact_submissions").select("id").limit(1).single()

    // If the table doesn't exist, simulate success
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Contact submissions table does not exist, simulating success")
      return { success: true }
    }

    // If the table exists, try to insert the form data
    const { error } = await supabase.from("contact_submissions").insert([formData])

    if (error) {
      console.error("Error submitting contact form:", error)
      throw new Error("Failed to submit contact form")
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form")
  }
}

