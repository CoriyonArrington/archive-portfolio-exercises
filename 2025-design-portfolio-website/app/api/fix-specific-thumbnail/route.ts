import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  try {
    // Check for admin authorization
    const url = new URL(request.url)
    const secret = url.searchParams.get("secret")

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find the project by title (case insensitive)
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .ilike("title", "%patient engagement%")

    if (fetchError) {
      return NextResponse.json({ error: `Failed to fetch projects: ${fetchError.message}` }, { status: 500 })
    }

    if (!projects || projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const project = projects[0]

    // Log current state
    console.log("Found project:", {
      id: project.id,
      title: project.title,
      thumbnail_url: project.thumbnail_url,
    })

    // Update the thumbnail
    const thumbnailUrl =
      "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/general/tt1c2yt8iq_1742502496207.jpeg"

    const { data, error: updateError } = await supabase
      .from("projects")
      .update({ thumbnail_url: thumbnailUrl })
      .eq("id", project.id)
      .select()

    if (updateError) {
      return NextResponse.json({ error: `Failed to update thumbnail: ${updateError.message}` }, { status: 500 })
    }

    console.log("Updated thumbnail:", data[0].thumbnail_url)

    // Revalidate all paths
    revalidatePath("/")
    revalidatePath("/work")
    revalidatePath("/process")
    revalidatePath(`/work/${project.slug}`)
    revalidatePath("/api/projects")

    return NextResponse.json({
      success: true,
      message: "Project thumbnail updated",
      project: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        thumbnail_url: thumbnailUrl,
      },
    })
  } catch (error) {
    console.error("Error in fix-specific-thumbnail route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
