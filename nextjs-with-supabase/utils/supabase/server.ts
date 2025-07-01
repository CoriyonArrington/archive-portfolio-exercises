// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Ensure correct import
import type { Database } from '@/types/supabase'; // Ensure this path is correct

// Define Profile type - This should work AFTER regenerating types
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Standard function to create Supabase client for Server Components, Route Handlers, Server Actions
export function createClient() {
  // Get the cookie store from next/headers
  const cookieStore = cookies();

  // Create and return the Supabase client
  return createServerClient<Database>( // Pass the Database generic
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Define the cookie handling functions exactly as expected by @supabase/ssr
        // ADDED await based on TypeScript errors
        async get(name: string) {
          // Add await here
          return (await cookieStore).get(name)?.value;
        },
        // ADDED await based on TypeScript errors
        async set(name: string, value: string, options: CookieOptions) {
          try {
             // Add await here
            (await cookieStore).set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
         // ADDED await based on TypeScript errors
        async remove(name: string, options: CookieOptions) {
          try {
             // Add await here
            (await cookieStore).set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Fetches the user's profile based on the current session
export async function getUserProfile(): Promise<{ profile: Profile | null, error: any | null }> {
    const supabase = createClient(); // Use the server client
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        // console.error('Error fetching user:', userError);
        return { profile: null, error: userError || new Error('User not found') };
    }

    // Fetch the profile using the user's ID
    // This .from('profiles') should work AFTER regenerating types
    const { data: profile, error: profileError } = await supabase
        .from('profiles') // Query the 'profiles' table
        .select('*') // Select all profile columns
        .eq('id', user.id) // Match the user ID
        .single(); // Expect only one profile per user

    if (profileError) {
        console.error('Error fetching profile:', profileError);
        return { profile: null, error: profileError };
    }

    // Type assertion might be needed if structure differs slightly, but should be ok
    return { profile: profile as Profile | null, error: null };
}
