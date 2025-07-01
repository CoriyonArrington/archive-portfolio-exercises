import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    // Check for valid secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Revalidate everything
    revalidatePath("/", "layout")
    revalidatePath("/work", "layout")
    revalidateTag("projects")

    console.log("Revalidated all paths and tags for deletion")

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: "Revalidated all paths and tags for deletion",
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ success: false, message: "Error revalidating", error }, { status: 500 })
  }
}

