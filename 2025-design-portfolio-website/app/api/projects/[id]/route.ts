import { type NextRequest, NextResponse } from "next/server"
import { getProjectBySlug, updateProject, deleteProject } from "@/lib/data/projects"
import { requireAdmin } from "@/lib/auth"

// GET /api/projects/[id] - Get a project by ID/slug
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const project = await getProjectBySlug(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error(`Error in GET /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT /api/projects/[id] - Update a project (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const projectData = await request.json()

    const { data, error } = await updateProject(id, projectData)

    if (error) {
      return NextResponse.json({ error: "Failed to update project", details: error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in PUT /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE /api/projects/[id] - Delete a project (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const isAdmin = await requireAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const { error } = await deleteProject(id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete project", details: error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
