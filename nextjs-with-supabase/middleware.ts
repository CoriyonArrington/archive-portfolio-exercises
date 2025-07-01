// ts-prune-ignore
import { type NextRequest, NextResponse } from 'next/server';
// Import the specific functions needed
import { updateSession, getEdgeUserProfile } from '@/utils/supabase/middleware';
import type { Database } from '@/types/supabase'; // Import Database type if needed by Profile definition

// Define Profile type locally or import if needed by getEdgeUserProfile return type signature
// Example definition (adjust based on your actual needs):
type Profile = {
  id: string;
  role: string | null;
  // Add other fields returned by getEdgeUserProfile if necessary
} | null;


export async function middleware(request: NextRequest) {
  // 1. Refresh session for all matched paths
  let response = await updateSession(request);

  // 2. Check if the path is for the admin section
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    // 3. Fetch user profile specifically for this check
    // Assuming getEdgeUserProfile returns Profile type or null
    const profile: Profile = await getEdgeUserProfile(request);

    // 4. Check for admin role
    if (!profile || profile.role !== 'admin') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/'; // Redirect to home page
      redirectUrl.searchParams.set('error', 'Access Denied');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 5. If not an admin path OR if admin check passed, continue
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};