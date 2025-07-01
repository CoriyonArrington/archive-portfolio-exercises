import { supabase } from "./supabase"
import type { ProcessPhase } from "@/types/process"
import { processArrayData } from "./utils/process-array-data"

// Mock process phases to use when Supabase connection fails
const mockProcessPhases: ProcessPhase[] = [
  {
    id: "mock-1",
    phaseTitle: "Discovery",
    phaseSubtitle: "Understanding your needs",
    phaseDescription:
      "We start by deeply understanding your business goals, user needs, and technical constraints to establish a solid foundation for the project.",
    steps: [
      {
        title: "Kickoff Meeting",
        description: "We'll discuss your business goals, target users, and project scope to align our expectations.",
      },
      {
        title: "Stakeholder Interviews",
        description: "I'll interview key stakeholders to understand different perspectives and requirements.",
      },
      {
        title: "Research Planning",
        description: "We'll define the research approach to gather insights about your users and market.",
      },
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    quote: {
      text: "The discovery phase was eye-opening. It helped us clarify what we really needed versus what we thought we wanted.",
      author: "Healthcare Startup CEO",
    },
    outputs: ["Project Brief", "Research Plan", "Success Metrics"],
    insights: [
      "Clear understanding of business goals",
      "Defined user needs and pain points",
      "Identified technical constraints",
    ],
    displayOrder: 1,
  },
  {
    id: "mock-2",
    phaseTitle: "Design",
    phaseSubtitle: "Crafting the solution",
    phaseDescription:
      "Using insights from the discovery phase, we'll create user-centered designs that balance business goals with user needs.",
    steps: [
      {
        title: "Ideation",
        description: "We'll explore multiple design concepts to address the identified user needs and business goals.",
      },
      {
        title: "Wireframing",
        description: "I'll create low-fidelity wireframes to establish the information architecture and user flows.",
      },
      {
        title: "Visual Design",
        description: "I'll develop the visual language and apply it to create high-fidelity mockups.",
      },
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    quote: {
      text: "The iterative design process helped us refine our product vision and create something truly user-centered.",
      author: "Product Manager",
    },
    outputs: ["Wireframes", "User Flows", "High-fidelity Mockups"],
    insights: ["Intuitive navigation structure", "Simplified complex workflows", "Accessible and inclusive design"],
    displayOrder: 2,
  },
  {
    id: "mock-3",
    phaseTitle: "Delivery",
    phaseSubtitle: "Bringing designs to life",
    phaseDescription:
      "I'll work closely with your development team to ensure the design is implemented correctly and help with any adjustments needed during development.",
    steps: [
      {
        title: "Developer Handoff",
        description: "I'll provide detailed specifications and assets to your development team.",
      },
      {
        title: "Implementation Support",
        description: "I'll be available to answer questions and provide guidance during development.",
      },
      {
        title: "Quality Assurance",
        description: "I'll review the implemented design to ensure it matches the approved mockups.",
      },
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    quote: {
      text: "Having a designer involved during implementation made a huge difference in the quality of our final product.",
      author: "Engineering Lead",
    },
    outputs: ["Design Specifications", "Asset Library", "Implementation Guidelines"],
    insights: ["Smooth developer handoff", "Consistent implementation", "Maintained design integrity"],
    displayOrder: 3,
  },
]

// Get all process phases from Supabase
export async function getAllProcessPhases(): Promise<ProcessPhase[]> {
  try {
    console.log("Fetching all process phases from Supabase...")
    const { data, error } = await supabase.from("process_steps").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching process phases:", error)
      console.log("Returning mock process phases data instead")
      return mockProcessPhases
    }

    if (!data || data.length === 0) {
      console.log("No process phases found in Supabase, returning mock data")
      return mockProcessPhases
    }

    console.log(`Successfully fetched ${data.length} process phases from Supabase`)

    // Transform the data to match our ProcessPhase type
    return data.map((phase: any) => ({
      id: phase.id,
      phaseTitle: phase.phase_title,
      phaseSubtitle: phase.phase_subtitle,
      phaseDescription: phase.phase_description,
      steps: phase.steps || [],
      imageUrl: phase.image_url,
      quote: phase.quote_text
        ? {
            text: phase.quote_text,
            author: phase.quote_author,
          }
        : undefined,
      outputs: processArrayData(phase.outputs),
      insights: processArrayData(phase.insights),
      displayOrder: phase.display_order,
    }))
  } catch (error) {
    console.error("Error fetching process phases:", error)
    console.log("Returning mock process phases data due to error")
    return mockProcessPhases
  }
}
