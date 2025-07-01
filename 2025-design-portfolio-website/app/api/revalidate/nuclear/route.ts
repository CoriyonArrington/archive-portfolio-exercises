import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    // Get the secret from the request
    const requestData = await request.json()
    const { secret } = requestData

    // Check if the secret matches
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    // Revalidate all major paths
    revalidatePath("/", "layout")
    revalidatePath("/testimonials")
    revalidatePath("/projects")
    revalidatePath("/services")
    revalidatePath("/process")
    revalidatePath("/about")
    revalidatePath("/contact")

    // Revalidate all major tags
    revalidateTag("testimonials")
    revalidateTag("projects")
    revalidateTag("services")
    revalidateTag("process")
    revalidateTag("faqs")

    return NextResponse.json({
      success: true,
      message: "Nuclear revalidation successful. All paths and tags have been revalidated.",
    })
  } catch (error) {
    console.error("Error in nuclear revalidation:", error)
    return NextResponse.json({ error: "Failed to perform nuclear revalidation" }, { status: 500 })
  }
}

