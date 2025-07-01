import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    // Get the secret from the request
    const secret = request.nextUrl.searchParams.get("secret")

    // Check if the secret is valid
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 })
    }

    // Get the path to revalidate from the request
    const path = request.nextUrl.searchParams.get("path") || "/"

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      revalidated: true,
      message: `Path ${path} revalidated successfully`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error during revalidation:", error)
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error revalidating",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
