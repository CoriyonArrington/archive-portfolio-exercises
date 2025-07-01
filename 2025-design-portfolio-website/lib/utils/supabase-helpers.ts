import { createClient } from "@/lib/supabase/client"
import { cookies } from "next/headers"

// Create a simple mock for createServerClient if it doesn't exist
const createServerClient = (cookieStore: any) => {
  return createClient()
}

/**
 * Get a Supabase client for server components
 * @returns Supabase client
 */
export function getServerSupabase() {
  const cookieStore = cookies()
  return createServerClient(cookieStore)
}

/**
 * Get a Supabase client for client components
 * @returns Supabase client
 */
export function getClientSupabase() {
  return createClient()
}

/**
 * Check if a table exists in the database
 * @param tableName Table name to check
 * @returns Promise<boolean> True if table exists
 */
export async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    // Query the information_schema to check if table exists
    const { data, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", tableName)

    if (error) {
      console.error("Error checking table existence:", error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error("Error in checkTableExists:", error)
    return false
  }
}
