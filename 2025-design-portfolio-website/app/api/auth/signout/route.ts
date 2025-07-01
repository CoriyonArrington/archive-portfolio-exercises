import { createClient } from "@/lib/supabase/client"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = cookies()
  const supabase = createClient()

  // Sign out on the server
  await supabase.auth.signOut()

  // Clear cookies
  cookieStore.delete("sb-auth-token")

  // Redirect to home page
  return NextResponse.redirect(new URL("/", process.env.VERCEL_URL || "http://localhost:3000"))
}
