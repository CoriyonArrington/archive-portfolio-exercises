import { createBrowserClient } from "@/lib/supabase/client"

export interface ProcessStep {
  id: string
  phaseTitle: string
  phaseSubtitle: string
  phaseDescription: string
  displayOrder: number
  imageUrl?: string
  quoteText?: string
  quoteAuthor?: string
  icon?: string
  steps?: string[]
  outputs?: string[] | string
  keyResults?: string[] | string
  statValue?: string
  statLabel?: string
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = createBrowserClient()

    const { data, error } = await supabase.from("process_steps").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching process steps:", error)
      return []
    }

    return data.map((step) => ({
      id: step.id,
      phaseTitle: step.phase_title || "",
      phaseSubtitle: step.phase_subtitle || "",
      phaseDescription: step.phase_description || "",
      imageUrl: step.image_url || "",
      quoteText: step.quote_text || "",
      quoteAuthor: step.quote_author || "",
      icon: step.icon || "",
      displayOrder: step.display_order || 0,
      steps: step.steps || [],
      outputs: step.outputs || [],
      keyResults: step.key_results || [],
      statValue: step.stat_value || "",
      statLabel: step.stat_label || "",
    }))
  } catch (error) {
    console.error("Error fetching process steps:", error)
    return []
  }
}

export async function getProcessStepById(id: string): Promise<ProcessStep | null> {
  try {
    const supabase = createBrowserClient()

    const { data, error } = await supabase.from("process_steps").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching process step with id ${id}:`, error)
      return null
    }

    return {
      id: data.id,
      phaseTitle: data.phase_title || "",
      phaseSubtitle: data.phase_subtitle || "",
      phaseDescription: data.phase_description || "",
      imageUrl: data.image_url || "",
      quoteText: data.quote_text || "",
      quoteAuthor: data.quote_author || "",
      icon: data.icon || "",
      displayOrder: data.display_order || 0,
      steps: data.steps || [],
      outputs: data.outputs || [],
      keyResults: data.key_results || [],
      statValue: data.stat_value || "",
      statLabel: data.stat_label || "",
    }
  } catch (error) {
    console.error(`Error fetching process step with id ${id}:`, error)
    return null
  }
}

export async function getProcessStepsForDisplay(): Promise<ProcessStep[]> {
  try {
    const steps = await getProcessSteps()

    // Sort by display order, then by phase title
    return steps.sort((a, b) => {
      // First sort by display order
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder
      }
      // If displayOrder is the same, sort by phaseTitle
      return (a.phaseTitle || "").localeCompare(b.phaseTitle || "")
    })
  } catch (error) {
    console.error("Error fetching process steps:", error)
    return []
  }
}

export const fallbackProcessSteps: ProcessStep[] = [
  {
    id: "1",
    phaseTitle: "Discovery Phase",
    phaseSubtitle: "Understanding the problem",
    phaseDescription:
      "Every great solution starts with a deep understanding of the problem. During this phase, I immerse myself in the user's world to uncover their needs, pain points, and motivations.",
    displayOrder: 1,
    imageUrl: "/placeholder.svg?height=400&width=600",
    quoteText:
      "One persona we aren't doing well for yet... marketers. They don't want these tactical features. They need aggregated data to act on.",
    quoteAuthor: "Olivia Alexander, VP Product Management",
    steps: [
      {
        title: "Stakeholder interviews",
        description:
          "I interview key stakeholders to understand business goals, technical constraints, and success metrics.",
      },
      {
        title: "User research",
        description:
          "Through interviews, surveys, and contextual inquiry, I gain insights into user behaviors, needs, and frustrations.",
      },
      {
        title: "Market analysis",
        description:
          "I analyze competitor products and industry trends to identify opportunities and avoid common pitfalls.",
      },
      {
        title: "Synthesis",
        description: "I synthesize research findings into actionable insights that will guide the design process.",
      },
    ],
    outputs: ["Research report", "User personas", "Journey maps", "Problem statement"],
    keyResults: ["Data accessibility issues", "Integration pain points", "Unmet stakeholder needs"],
  },
  {
    id: "2",
    phaseTitle: "Design Phase",
    phaseSubtitle: "Creating the solution",
    phaseDescription:
      "With a clear understanding of the problem space, I explore multiple solutions through collaborative ideation, focusing on both innovative thinking and practical constraints.",
    displayOrder: 2,
    imageUrl: "/placeholder.svg?height=400&width=600",
    quoteText:
      "The dashboard concept is promising, but users struggled to understand how to customize their views. We need to simplify this interaction.",
    quoteAuthor: "From usability testing notes",
    steps: [
      {
        title: "Ideation",
        description:
          "I facilitate ideation workshops with cross-functional teams to explore a wide range of potential solutions.",
      },
      {
        title: "Information architecture",
        description: "I create user flows and information architecture to establish a solid foundation for the design.",
      },
      {
        title: "Prototyping",
        description:
          "I develop wireframes and interactive prototypes of increasing fidelity to visualize and test solutions.",
      },
      {
        title: "Usability testing",
        description: "I conduct usability testing to validate design decisions and identify areas for improvement.",
      },
    ],
    outputs: ["User flows", "Wireframes", "Interactive prototypes", "Design system"],
    keyResults: ["85% task completion", "3 critical usability issues", "5 design iterations"],
  },
  {
    id: "3",
    phaseTitle: "Delivery Phase",
    phaseSubtitle: "Bringing designs to life",
    phaseDescription:
      "Design doesn't end with handoff. I work closely with development teams to ensure the design vision is realized in the final product and measure its impact.",
    displayOrder: 3,
    imageUrl: "/placeholder.svg?height=400&width=600",
    quoteText:
      "The design system documentation was incredibly helpful. It made implementation much faster and more consistent across the team.",
    quoteAuthor: "James Chen, Lead Developer",
    steps: [
      {
        title: "Design specifications",
        description: "I create detailed specifications and assets for developers to ensure accurate implementation.",
      },
      {
        title: "Implementation support",
        description:
          "I collaborate with developers throughout the build process, making pragmatic adjustments as needed.",
      },
      {
        title: "Quality assurance",
        description:
          "I conduct design QA throughout development to ensure the final product matches the design vision.",
      },
      {
        title: "Measurement & optimization",
        description: "After launch, I analyze user behavior and metrics to identify opportunities for improvement.",
      },
    ],
    outputs: ["Design specifications", "Asset library", "Implementation guide", "QA checklist"],
    keyResults: ["40% increase in user engagement", "35% reduction in support tickets", "92% user satisfaction"],
  },
]
