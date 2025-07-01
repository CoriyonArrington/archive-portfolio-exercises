export async function getPublicEnvInfo() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
  }
}
