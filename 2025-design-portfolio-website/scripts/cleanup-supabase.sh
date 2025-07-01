#!/bin/bash

echo "Cleaning up duplicate Supabase client files..."

# Remove duplicate files
rm -f lib/supabase/clients.ts
rm -f lib/supabase/client-browser.ts
rm -f lib/supabase-client.ts
rm -f lib/supabase.ts

echo "Supabase client cleanup complete!"

