import { supabase } from "./supabase"
import type { FAQType } from "@/types/faq"

// Mock FAQs to use when Supabase connection fails
const mockFAQs: FAQType[] = [
  {
    id: "mock-1",
    question: "How do your services help my business goals?",
    answer:
      "My design services directly impact key business metrics like user engagement, conversion rates, and customer retention. I focus on creating experiences that not only delight users but also drive measurable business outcomes.",
    category: "services",
    displayOrder: 1,
  },
  {
    id: "mock-2",
    question: "What makes you different from other healthcare designers?",
    answer:
      "My background in biomedical engineering gives me unique insights into healthcare challenges. I combine this technical knowledge with human-centered design principles to create solutions that balance clinical requirements with usability.",
    category: "services",
    displayOrder: 2,
  },
  {
    id: "mock-3",
    question: "How do you charge for projects?",
    answer:
      "I offer both value-based pricing and hourly rates depending on the project scope. For most client projects, I prefer value-based pricing as it aligns my work directly with your business outcomes.",
    category: "services",
    displayOrder: 3,
  },
  {
    id: "mock-4",
    question: "Do you work with startups?",
    answer:
      "I enjoy working with healthcare startups to help shape their products from early stages. I offer flexible engagement models and pricing specifically for early-stage companies.",
    category: "services",
    displayOrder: 4,
  },
]

// Get all FAQs from Supabase
export async function getAllFAQs(): Promise<FAQType[]> {
  try {
    console.log("Fetching all FAQs from Supabase...")
    const { data, error } = await supabase.from("faqs").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching FAQs:", error)
      console.log("Returning mock FAQs data instead")
      return mockFAQs
    }

    if (!data || data.length === 0) {
      console.log("No FAQs found in Supabase, returning mock data")
      return mockFAQs
    }

    console.log(`Successfully fetched ${data.length} FAQs from Supabase`)

    // Transform the data to match our FAQType
    return data.map((faq: any) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      displayOrder: faq.display_order,
    }))
  } catch (error) {
    console.error("Error fetching FAQs:", error)
    console.log("Returning mock FAQs data due to error")
    return mockFAQs
  }
}

// Get FAQs by category from Supabase
export async function getFAQsByCategory(category: string): Promise<FAQType[]> {
  try {
    console.log(`Fetching FAQs for category ${category} from Supabase...`)
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("category", category)
      .order("display_order", { ascending: true })

    if (error) {
      console.error(`Error fetching FAQs for category ${category}:`, error)
      console.log("Returning filtered mock FAQs data instead")
      return mockFAQs.filter((faq) => faq.category === category)
    }

    if (!data || data.length === 0) {
      console.log(`No FAQs found for category ${category} in Supabase, returning filtered mock data`)
      return mockFAQs.filter((faq) => faq.category === category)
    }

    console.log(`Successfully fetched ${data.length} FAQs for category ${category} from Supabase`)

    // Transform the data to match our FAQType
    return data.map((faq: any) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      displayOrder: faq.display_order,
    }))
  } catch (error) {
    console.error(`Error fetching FAQs for category ${category}:`, error)
    console.log("Returning filtered mock FAQs data due to error")
    return mockFAQs.filter((faq) => faq.category === category)
  }
}
