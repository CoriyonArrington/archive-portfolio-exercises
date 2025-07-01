// Importing createClient from the Supabase library
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
export const supabase = createClient(
  process.env.SUPABASE_URL as string,  // Ensure your Supabase URL is set in the .env.local file
  process.env.SUPABASE_ANON_KEY as string  // Ensure your Supabase anon key is set in the .env.local file
);
