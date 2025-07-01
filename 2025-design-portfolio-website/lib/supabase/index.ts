import { createClient } from "./client"
import { createServerSupabaseClient } from "./server"

export async function getSupabaseClient() {
  // Check if we're in a server component
  try {
    return await createServerSupabaseClient()
  } catch (error) {
    // If we're in a client component, use the browser client
    return createClient()
  }
}
