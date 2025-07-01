import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and public anon key
const SUPABASE_URL = 'https://bmkezkovrcocmmqupifp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta2V6a292cmNvY21tcXVwaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2ODU2NDEsImV4cCI6MjA2MDI2MTY0MX0.ktloV2mkqVeAPLbbq2ZeLv1d26yIRJYapWkouUHkmsA';

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
