import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    // Check for valid secret - use REVALIDATION_SECRET without NEXT_PUBLIC_ prefix
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Get all projects to revalidate their individual pages
    const supabase = await createServerClient()
    const { data: projects, error } = await supabase.from("projects").select("slug")

    if (error) {
      console.error("Error fetching projects for revalidation:", error)
      return NextResponse.json({ success: false, message: "Error fetching projects", error }, { status: 500 })
    }

    // Revalidate main pages
    revalidatePath("/", "layout")
    revalidatePath("/work", "layout")

    // Revalidate each project page
    const revalidatedSlugs = []
    for (const project of projects) {
      if (project.slug) {
        revalidatePath(`/work/${project.slug}`, "layout")
        revalidatedSlugs.push(project.slug)
      }
    }

    // Revalidate tags
    revalidateTag("projects")
    revalidateTag("work")

    console.log(`Revalidated all pages and ${revalidatedSlugs.length} project pages`)

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: `Revalidated all pages and ${revalidatedSlugs.length} project pages`,
      revalidatedSlugs,
    })
  } catch (error) {
    console.error("Full revalidation error:", error)
    return NextResponse.json({ success: false, message: "Error revalidating", error }, { status: 500 })
  }
}
