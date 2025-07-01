import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the admin-auth cookie
  cookies().delete("admin-auth")

  // Redirect to login page
  return NextResponse.json({ success: true, message: "Logged out successfully" })
}
