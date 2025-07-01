import { type NextRequest, NextResponse } from "next/server"
import { getProcessPhaseById, updateProcessPhase, deleteProcessPhase } from "@/lib/data/process"
import { requireAdmin } from "@/lib/auth"

// GET /api/process/[id] - Get a process phase by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const phase = await getProcessPhaseById(id)

    if (!phase) {
      return NextResponse.json({ error: "Process phase not found" }, { status: 404 })
    }

    return NextResponse.json(phase)
  } catch (error) {
    console.error(`Error in GET /api/process/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch process phase" }, { status: 500 })
  }
}

// PUT /api/process/[id] - Update a process phase (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const phaseData = await request.json()

    const { data, error } = await updateProcessPhase(id, phaseData)

    if (error) {
      return NextResponse.json({ error: "Failed to update process phase", details: error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in PUT /api/process/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update process phase" }, { status: 500 })
  }
}

// DELETE /api/process/[id] - Delete a process phase (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { error } = await deleteProcessPhase(id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete process phase", details: error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/process/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete process phase" }, { status: 500 })
  }
}
