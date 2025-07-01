import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export function createClient(request: NextRequest) {
  // Create a response object
  const response = NextResponse.next()

  // Create a direct Supabase client without using cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables in middleware")
    return { response }
  }

  const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseKey)

  return { supabase, response }
}
