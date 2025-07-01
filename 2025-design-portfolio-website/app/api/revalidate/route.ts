import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { secret, path, tag } = await request.json()

    // Check for valid secret - use REVALIDATION_SECRET without NEXT_PUBLIC_ prefix
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        success: true,
        revalidated: true,
        message: `Path ${path} revalidated`,
      })
    }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        success: true,
        revalidated: true,
        message: `Tag ${tag} revalidated`,
      })
    }

    return NextResponse.json({
      success: false,
      message: "No path or tag provided",
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ success: false, message: "Error revalidating", error }, { status: 500 })
  }
}
