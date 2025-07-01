// utils/supabase/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/supabase' // Import generated types

// Define Profile type based on your table structure
// Ensure this matches the columns in your public.profiles table
export type Profile = Database['public']['Tables']['profiles']['Row'];


// Function to create Supabase client suitable for Middleware (Edge runtime)
// Note: This is slightly different from the server.ts version
function createClient(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>( // Specify Database type
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  return { supabase, response }
}


// Original updateSession function (refreshes session)
export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            get(name: string) {
            return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
            supabaseResponse.cookies.set({
                name,
                value,
                ...options,
            });
            },
            remove(name: string, options: CookieOptions) {
            supabaseResponse.cookies.set({
                name,
                value: "",
                ...options,
            });
            },
        },
        }
    );

    // IMPORTANT: Avoid writing Supabase options to cookies in middleware. Documentation warns against this.
    // Refresh session - this will refresh the session cookie if needed
    await supabase.auth.getUser();

    return supabaseResponse;
}


// --- NEW FUNCTION ---
// Fetches the user's profile from within middleware/edge function
// Returns profile or null, handles errors internally
export async function getEdgeUserProfile(request: NextRequest): Promise<Profile | null> {
    // Create client and response (needed for potential cookie updates during auth)
    const { supabase } = createClient(request);

    // Get user session
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        // console.log('Middleware: No user session found.');
        return null;
    }

    // Fetch the profile using the user's ID
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role') // Only select necessary fields (id, role)
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error('Middleware: Error fetching profile:', profileError.message);
        return null;
    }
    // console.log('Middleware: Fetched profile:', profile);
    return profile as Profile | null; // Type assertion
}
// --- END NEW FUNCTION ---

