import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    // Get the secret from the request
    const secret = request.nextUrl.searchParams.get("secret")

    // Check if the secret is valid
    if (secret !== process.env.REVALIDATION_SECRET) {
      // We'll verify the secret on the server side
      // This is more secure than exposing it in client code
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = request.nextUrl.searchParams.get("projectId")
    const thumbnailUrl = request.nextUrl.searchParams.get("thumbnailUrl")

    if (!projectId || !thumbnailUrl) {
      return NextResponse.json({ error: "Missing required parameters: projectId and thumbnailUrl" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = createClient()

    // Update the project thumbnail
    const { data: project, error } = await supabase
      .from("projects")
      .update({ thumbnail_url: thumbnailUrl })
      .eq("id", projectId)
      .select("title, slug")
      .single()

    if (error) {
      console.error("Error updating project thumbnail:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/work")
    if (project.slug) {
      revalidatePath(`/work/${project.slug}`)
    }

    return NextResponse.json({
      success: true,
      project,
      message: `Updated thumbnail for project ${project.title}`,
    })
  } catch (error) {
    console.error("Error in fix-thumbnails route:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
