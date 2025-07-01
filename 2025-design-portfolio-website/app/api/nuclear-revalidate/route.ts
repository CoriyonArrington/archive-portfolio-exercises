import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    // Check for valid secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    console.log("Starting nuclear revalidation...")

    // Revalidate EVERYTHING
    revalidatePath("/", "layout")
    revalidatePath("/work", "layout")
    revalidatePath("/admin", "layout")
    revalidateTag("projects")

    // Force dynamic rendering for key pages
    const headers = new Headers()
    headers.set("Cache-Control", "no-store, max-age=0")

    // Get the site URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || "http://localhost:3000"

    console.log(`Using site URL: ${siteUrl}`)

    // Fetch key pages to force a refresh
    try {
      console.log("Pre-fetching work page...")
      const workResponse = await fetch(`${siteUrl}/work`, {
        headers,
        cache: "no-store",
        next: { revalidate: 0 },
      })
      console.log(`Work page fetch status: ${workResponse.status}`)

      // Directly trigger a deploy hook
      console.log("Triggering deploy hook...")
      if (process.env.VERCEL_DEPLOY_HOOK_URL) {
        const deployResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
          method: "POST",
        })
        console.log(`Deploy hook status: ${deployResponse.status}`)
      } else {
        console.log("No deploy hook URL configured")
      }
    } catch (fetchError) {
      console.error("Error pre-fetching pages:", fetchError)
    }

    console.log("Nuclear revalidation complete")

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: "Nuclear revalidation complete",
    })
  } catch (error) {
    console.error("Nuclear revalidation error:", error)
    return NextResponse.json({ success: false, message: "Error during nuclear revalidation", error }, { status: 500 })
  }
}

