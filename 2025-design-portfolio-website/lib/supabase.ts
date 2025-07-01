import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables")
  throw new Error("Missing Supabase credentials")
}

// Create a single instance of the Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: (...args) => {
          return fetch(...args)
        },
      },
    })
  }

  return supabaseInstance
}

export const supabase = getSupabaseClient()

// Maximum number of retry attempts
const MAX_RETRIES = 3

export async function checkSupabaseConnection(retryCount = 0) {
  try {
    const { data, error } = await supabase.from("projects").select("id").limit(1)

    if (error) {
      console.error(`Error connecting to Supabase (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error)

      // Retry logic
      if (retryCount < MAX_RETRIES - 1) {
        // Exponential backoff: 1s, 2s, 4s, etc.
        const backoffTime = Math.pow(2, retryCount) * 1000
        console.log(`Retrying in ${backoffTime}ms...`)

        await new Promise((resolve) => setTimeout(resolve, backoffTime))
        return checkSupabaseConnection(retryCount + 1)
      }

      return {
        connected: false,
        error: error.message,
        retryCount,
      }
    }

    return {
      connected: true,
      data,
      retryCount,
    }
  } catch (error: any) {
    console.error(`Error connecting to Supabase (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error)

    // Retry logic for unexpected errors
    if (retryCount < MAX_RETRIES - 1) {
      const backoffTime = Math.pow(2, retryCount) * 1000
      console.log(`Retrying in ${backoffTime}ms...`)

      await new Promise((resolve) => setTimeout(resolve, backoffTime))
      return checkSupabaseConnection(retryCount + 1)
    }

    return {
      connected: false,
      error: error.message,
      retryCount,
    }
  }
}
