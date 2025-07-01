
/**
 * CORS headers for Supabase Edge Functions
 * 
 * Standard CORS headers to allow cross-origin requests to our edge functions.
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
