import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get the secret from the request
    const requestData = await request.json()
    const { secret } = requestData

    // Check if the secret matches
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    // Trigger the Vercel deploy hook
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

    if (!deployHookUrl) {
      return NextResponse.json({ error: "Deploy hook URL not configured" }, { status: 500 })
    }

    const response = await fetch(deployHookUrl, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`Deploy hook failed with status: ${response.status}`)
    }

    return NextResponse.json({
      success: true,
      message: "Deploy hook triggered successfully. The site will rebuild in a few minutes.",
    })
  } catch (error) {
    console.error("Error triggering deploy hook:", error)
    return NextResponse.json({ error: "Failed to trigger deploy hook" }, { status: 500 })
  }
}

