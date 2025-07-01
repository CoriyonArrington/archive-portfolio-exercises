import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Client specifically for pages directory - does NOT use next/headers
export const pagesClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)
