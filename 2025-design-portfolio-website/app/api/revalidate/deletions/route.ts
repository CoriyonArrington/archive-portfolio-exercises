import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body

    // Validate the secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid revalidation secret" }, { status: 401 })
    }

    // Revalidate main content paths
    const paths = ["/testimonials", "/projects", "/services", "/process"]

    paths.forEach((path) => {
      revalidatePath(path)
    })

    // Revalidate content tags
    const tags = ["testimonials", "projects", "services", "process"]

    tags.forEach((tag) => {
      revalidateTag(tag)
    })

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Deletion revalidation complete",
    })
  } catch (error) {
    console.error("Error in deletion revalidation API:", error)
    return NextResponse.json({ error: "Failed to perform deletion revalidation" }, { status: 500 })
  }
}

