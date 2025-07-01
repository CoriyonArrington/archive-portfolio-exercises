import { type NextRequest, NextResponse } from "next/server"
import { getFAQById, updateFAQ, deleteFAQ } from "@/lib/data/faqs"
import { requireAdmin } from "@/lib/auth"

// GET /api/faqs/[id] - Get a FAQ by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const faq = await getFAQById(id)

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json(faq)
  } catch (error) {
    console.error(`Error in GET /api/faqs/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 })
  }
}

// PUT /api/faqs/[id] - Update a FAQ (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const faqData = await request.json()

    const { data, error } = await updateFAQ(id, faqData)

    if (error) {
      return NextResponse.json({ error: "Failed to update FAQ", details: error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in PUT /api/faqs/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 })
  }
}

// DELETE /api/faqs/[id] - Delete a FAQ (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { error } = await deleteFAQ(id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete FAQ", details: error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/faqs/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
