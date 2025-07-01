import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body

    // Validate the secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid revalidation secret" }, { status: 401 })
    }

    // Revalidate the entire site
    revalidatePath("/", "layout")

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Site rebuild triggered",
    })
  } catch (error) {
    console.error("Error in site rebuild API:", error)
    return NextResponse.json({ error: "Failed to trigger site rebuild" }, { status: 500 })
  }
}

