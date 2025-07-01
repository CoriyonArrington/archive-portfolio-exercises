import { type NextRequest, NextResponse } from "next/server"
import { getAllFAQs, createFAQ } from "@/lib/data/faqs"
import { requireAdmin } from "@/lib/auth"

// GET /api/faqs - Get all FAQs
export async function GET(request: NextRequest) {
  try {
    const faqs = await getAllFAQs()
    return NextResponse.json(faqs)
  } catch (error) {
    console.error("Error in GET /api/faqs:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

// POST /api/faqs - Create a new FAQ (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const faqData = await request.json()

    // Create FAQ
    const { data, error } = await createFAQ(faqData)

    if (error) {
      return NextResponse.json({ error: "Failed to create FAQ", details: error }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/faqs:", error)
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
