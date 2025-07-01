"use client"

import { createClient } from "@supabase/supabase-js"

// Create a Supabase client for client-side usage with better error handling
const createClientSideClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables. Using fallback data.")
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Fallback data for when Supabase connection fails
const fallbackServices = [
  {
    id: "1",
    title: "UX Research & User Testing",
    description: "Uncover deep user insights through qualitative and quantitative research to inform design decisions.",
    icon: "🔍",
    slug: "ux-research",
    order: 1,
  },
  {
    id: "2",
    title: "UI/UX Design Systems",
    description: "Create scalable, consistent design systems that improve development efficiency and user experience.",
    icon: "🎨",
    slug: "design-systems",
    order: 2,
  },
  {
    id: "3",
    title: "Healthcare Product Design",
    description: "Specialized design for healthcare applications that improve patient outcomes and clinical workflows.",
    icon: "⚕️",
    slug: "healthcare-design",
    order: 3,
  },
]

const fallbackProjects = [
  {
    id: "1",
    title: "Reducing out-of-pocket costs",
    description:
      "40% of adults have delayed needed care due to the cost. CareHive improves access to high-value providers while reducing the cost of care.",
    slug: "reducing-costs",
    featured: true,
    thumbnail: "/placeholder.svg?height=300&width=400",
    client: "CareHive Health",
    tags: ["Healthcare", "Cost Reduction"],
  },
  {
    id: "2",
    title: "Streamlining physician workflows",
    description:
      "We launched a web app that allows them to build custom care plans, learn evidence-based processes, and manage tasks in real-time.",
    slug: "physician-workflows",
    featured: true,
    thumbnail: "/placeholder.svg?height=300&width=400",
    client: "Global Health Initiative",
    tags: ["Healthcare", "Workflow"],
  },
]

const fallbackProcessSteps = [
  {
    id: "1",
    title: "Discovery",
    description: "Understanding your business goals, user needs, and technical constraints.",
    order: 1,
    icon: "🔍",
  },
  {
    id: "2",
    title: "Research",
    description: "Gathering insights through user interviews, competitive analysis, and data review.",
    order: 2,
    icon: "📊",
  },
  {
    id: "3",
    title: "Design",
    description: "Creating wireframes, prototypes, and high-fidelity designs based on research findings.",
    order: 3,
    icon: "✏️",
  },
  {
    id: "4",
    title: "Implementation",
    description: "Working with developers to ensure the design is implemented correctly.",
    order: 4,
    icon: "🛠️",
  },
]

const fallbackTestimonials = [
  {
    id: "1",
    quote:
      "Working with this team transformed our product. User engagement increased by 45% after implementing their design recommendations.",
    author: "Sarah Johnson",
    title: "Product Manager at HealthTech",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    quote:
      "The design system they created has dramatically improved our development speed and consistency across products.",
    author: "Michael Chen",
    title: "CTO at MedConnect",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    quote:
      "Their deep understanding of healthcare workflows made all the difference in creating a product that physicians actually want to use.",
    author: "Dr. Emily Rodriguez",
    title: "Chief Medical Officer",
    featured: true,
    order: 3,
  },
]

// Services
export async function getServicesClient() {
  try {
    const supabase = createClientSideClient()

    if (!supabase) {
      console.warn("Using fallback services data")
      return fallbackServices
    }

    const { data, error } = await supabase.from("services").select("*").order("order")

    if (error) {
      console.error("Error fetching services:", error)
      return fallbackServices
    }

    return data || fallbackServices
  } catch (error) {
    console.error("Error in getServicesClient:", error)
    return fallbackServices
  }
}

// Projects
export async function getProjectsClient() {
  try {
    const supabase = createClientSideClient()

    if (!supabase) {
      console.warn("Using fallback projects data")
      return fallbackProjects
    }

    const { data, error } = await supabase.from("projects").select("*").order("order")

    if (error) {
      console.error("Error fetching projects:", error)
      return fallbackProjects
    }

    return data || fallbackProjects
  } catch (error) {
    console.error("Error in getProjectsClient:", error)
    return fallbackProjects
  }
}

// Process Steps
export async function getProcessStepsClient() {
  try {
    const supabase = createClientSideClient()

    if (!supabase) {
      console.warn("Using fallback process steps data")
      return fallbackProcessSteps
    }

    const { data, error } = await supabase.from("process_steps").select("*").order("order")

    if (error) {
      console.error("Error fetching process steps:", error)
      return fallbackProcessSteps
    }

    return data || fallbackProcessSteps
  } catch (error) {
    console.error("Error in getProcessStepsClient:", error)
    return fallbackProcessSteps
  }
}

// Testimonials
export async function getTestimonialsClient() {
  try {
    const supabase = createClientSideClient()

    if (!supabase) {
      console.warn("Using fallback testimonials data")
      return fallbackTestimonials
    }

    const { data, error } = await supabase.from("testimonials").select("*").order("order")

    if (error) {
      console.error("Error fetching testimonials:", error)
      return fallbackTestimonials
    }

    return data || fallbackTestimonials
  } catch (error) {
    console.error("Error in getTestimonialsClient:", error)
    return fallbackTestimonials
  }
}

// Featured Testimonials
export async function getFeaturedTestimonialsClient() {
  try {
    const supabase = createClientSideClient()

    if (!supabase) {
      console.warn("Using fallback featured testimonials data")
      return fallbackTestimonials.filter((t) => t.featured)
    }

    const { data, error } = await supabase.from("testimonials").select("*").eq("featured", true).order("order")

    if (error) {
      console.error("Error fetching featured testimonials:", error)
      return fallbackTestimonials.filter((t) => t.featured)
    }

    return data || fallbackTestimonials.filter((t) => t.featured)
  } catch (error) {
    console.error("Error in getFeaturedTestimonialsClient:", error)
    return fallbackTestimonials.filter((t) => t.featured)
  }
}

