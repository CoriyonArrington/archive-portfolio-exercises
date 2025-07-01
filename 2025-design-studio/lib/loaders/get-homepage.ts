// Importing the Supabase client to interact with the database
import { supabase } from '@/lib/supabase/server';  // Import the initialized Supabase client

// This function fetches the homepage content from the Supabase database
export async function getHomepageContent() {
  // Fetching data from the 'pages' table where slug is 'home'
  const { data, error } = await supabase
    .from('pages')
    .select('content')  // Only selecting the 'content' field
    .eq('slug', 'home')  // Filtering the row where slug is 'home'
    .single();  // Since there should be only one home page

  // Throwing an error if there’s an issue fetching the data
  if (error) throw error;

  // Returning the 'content' field of the homepage
  return data.content;
}
