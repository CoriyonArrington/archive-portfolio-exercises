import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// For backward compatibility
export const supabase = createBrowserClient
export { createBrowserClient as createClient }

export const createClientSideClient = createBrowserClient
