import { type NextRequest, NextResponse } from "next/server"
import { getAllProcessPhases, createProcessPhase } from "@/lib/data/process"
import { requireAdmin } from "@/lib/auth"

// GET /api/process - Get all process phases
export async function GET(request: NextRequest) {
  try {
    const phases = await getAllProcessPhases()
    return NextResponse.json(phases)
  } catch (error) {
    console.error("Error in GET /api/process:", error)
    return NextResponse.json({ error: "Failed to fetch process phases" }, { status: 500 })
  }
}

// POST /api/process - Create a new process phase (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const phaseData = await request.json()

    // Create process phase
    const { data, error } = await createProcessPhase(phaseData)

    if (error) {
      return NextResponse.json({ error: "Failed to create process phase", details: error }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/process:", error)
    return NextResponse.json({ error: "Failed to create process phase" }, { status: 500 })
  }
}
