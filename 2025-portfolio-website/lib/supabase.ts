import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client with environment variables
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Initialize the Supabase admin client with service role key
export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL and Service Role Key are required")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}
