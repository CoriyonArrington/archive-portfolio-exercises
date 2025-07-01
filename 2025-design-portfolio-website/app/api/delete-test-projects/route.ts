import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    // Check for valid secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    console.log("Starting test project cleanup...")

    const supabase = await createServerSupabaseClient()

    // Delete all projects with "test" in the title (case insensitive)
    const { data, error } = await supabase.from("projects").delete().ilike("title", "%test%").select()

    if (error) {
      console.error("Error deleting test projects:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    console.log(`Deleted ${data?.length || 0} test projects`)

    // Revalidate everything
    revalidatePath("/", "layout")
    revalidatePath("/work", "layout")
    revalidateTag("projects")

    // Trigger deploy hook
    try {
      console.log("Triggering deploy hook...")
      if (process.env.VERCEL_DEPLOY_HOOK_URL) {
        const deployResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
          method: "POST",
        })
        console.log(`Deploy hook status: ${deployResponse.status}`)
      } else {
        console.log("No deploy hook URL configured")
      }
    } catch (deployError) {
      console.error("Error triggering deploy hook:", deployError)
    }

    return NextResponse.json({
      success: true,
      deletedCount: data?.length || 0,
      message: `Successfully deleted ${data?.length || 0} test projects`,
    })
  } catch (error) {
    console.error("Error in delete-test-projects API:", error)
    return NextResponse.json({ success: false, message: "Error deleting test projects", error }, { status: 500 })
  }
}

