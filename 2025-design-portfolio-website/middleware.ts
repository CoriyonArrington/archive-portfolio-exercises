import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next()

  // Add cache control headers to prevent aggressive caching
  response.headers.set("Cache-Control", "no-store, max-age=0")

  return response
}

export const config = {
  matcher: ["/testimonials", "/api/testimonials/:path*"],
}
