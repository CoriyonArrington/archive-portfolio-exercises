import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    // Check for valid secret - use REVALIDATION_SECRET without NEXT_PUBLIC_ prefix
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Get the deploy hook URL from environment variable
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

    if (!deployHookUrl) {
      return NextResponse.json({ success: false, message: "Deploy hook URL not configured" }, { status: 500 })
    }

    // Trigger a rebuild
    const response = await fetch(deployHookUrl, {
      method: "POST",
    })

    if (!response.ok) {
      return NextResponse.json({ success: false, message: "Failed to trigger deploy hook" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Deploy hook triggered successfully",
    })
  } catch (error) {
    console.error("Error triggering deploy hook:", error)
    return NextResponse.json({ success: false, message: "Error triggering deploy hook", error }, { status: 500 })
  }
}
