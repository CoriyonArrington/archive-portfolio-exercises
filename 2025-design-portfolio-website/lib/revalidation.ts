/**
 * Utility function to trigger revalidation for a specific path
 */
export async function revalidatePath(path: string) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    console.log(`Triggering revalidation for path: ${path}`)

    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.REVALIDATION_SECRET,
        path,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`Revalidation failed: ${error}`)
      return false
    }

    const result = await response.json()
    console.log("Revalidation result:", result)
    return result.revalidated
  } catch (error) {
    console.error("Error triggering revalidation:", error)
    return false
  }
}
