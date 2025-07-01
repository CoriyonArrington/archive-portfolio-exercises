import { supabase } from "./supabase"
import type { ServiceType } from "@/types/service"

// Fallback services in case the API call fails
export const fallbackServices = [
  {
    id: "1",
    title: "UX Research & User Testing",
    description: "Uncover deep user insights through qualitative and quantitative research to inform design decisions.",
    deliverables: ["User Interviews", "Usability Testing", "Heuristic Evaluations"],
    businessOutcomes: ["Increased user satisfaction", "Reduced development costs", "Data-driven design decisions"],
    businessStatValue: "42%",
    businessStatLabel: "average increase in user satisfaction",
    iconName: "search",
  },
  // More fallback services...
]

export async function getAllServices(): Promise<ServiceType[]> {
  try {
    const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching services:", error.message || "Unknown error")
      return fallbackServices
    }

    if (!data || data.length === 0) {
      console.warn("No services found, using fallback data")
      return fallbackServices
    }

    // Map the database fields to our ServiceType interface
    return data.map((service) => {
      // Determine appropriate icon based on service title or type
      const iconName = service.icon_name || determineIconName(service.title, service.description)

      return {
        id: service.id,
        title: service.title,
        description: service.description,
        deliverables: service.deliverables || [],
        businessOutcomes: service.business_outcomes || [],
        businessStatValue: service.business_stat_value,
        businessStatLabel: service.business_stat_label,
        image: service.image_url,
        iconName: iconName,
        // Add these fields to match what we're trying to access in the component
        business_stat: service.business_stat_value,
        business_stat_label: service.business_stat_label,
      }
    })
  } catch (error) {
    console.error("Error in getAllServices:", error)
    return fallbackServices
  }
}

// Helper function to determine icon name based on service title and description
function determineIconName(title: string, description: string): string {
  title = title.toLowerCase()
  description = description ? description.toLowerCase() : ""

  if (title.includes("ui/ux design system") || title.includes("design system")) {
    return "layers"
  } else if (title.includes("interaction design") || description.includes("interaction")) {
    return "penTool"
  } else if (title.includes("portal") || title.includes("redesign")) {
    return "layout"
  } else if (title.includes("research") || title.includes("discovery") || description.includes("research")) {
    return "search"
  } else if (title.includes("strategy") || title.includes("roadmap")) {
    return "lineChart"
  } else if (title.includes("workshop") || title.includes("facilitation")) {
    return "users"
  } else if (title.includes("implementation") || title.includes("development")) {
    return "code"
  } else if (title.includes("usability")) {
    return "microscope"
  } else if (title.includes("prototype")) {
    return "penTool"
  } else if (title.includes("assessment")) {
    return "gauge"
  } else if (title.includes("workflow") || title.includes("optimization")) {
    return "sparkles"
  } else if (title.includes("telehealth") || title.includes("virtual care")) {
    return "monitorSmartphone"
  } else if (title.includes("medical device")) {
    return "stethoscope"
  } else if (title.includes("mobile") || title.includes("app")) {
    return "smartphone"
  } else if (title.includes("analytics") || title.includes("data")) {
    return "lineChart"
  } else if (title.includes("accessibility")) {
    return "users"
  } else if (title.includes("audit")) {
    return "microscope"
  }

  // Default icon
  return "lightbulb"
}

export async function getServices(): Promise<ServiceType[]> {
  return getAllServices()
}

// Function to get a single service by ID
export async function getServiceById(id: string): Promise<ServiceType | null> {
  try {
    const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching service:", error)
      return null
    }

    if (!data) {
      return null
    }

    // Determine appropriate icon based on service title or type
    const iconName = data.icon_name || determineIconName(data.title, data.description)

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      deliverables: data.deliverables || [],
      businessOutcomes: data.business_outcomes || [],
      businessStatValue: data.business_stat_value,
      businessStatLabel: data.business_stat_label,
      image: data.image_url,
      iconName: iconName,
      business_stat: data.business_stat_value,
      business_stat_label: data.business_stat_label,
    }
  } catch (error) {
    console.error("Error in getServiceById:", error)
    return null
  }
}
