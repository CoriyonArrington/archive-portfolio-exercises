#!/bin/bash

# Create supabase directory if it doesn't exist
mkdir -p lib/supabase

# Create an index.ts file to re-export all supabase utilities
cat > lib/supabase/index.ts << 'EOF'
// Re-export all supabase utilities
export * from './client';
export * from './helpers';
export * from './middleware';
// Add more exports as you migrate supabase utilities
EOF

# Copy supabase utilities from their original locations
echo "Migrating Supabase utilities..."

# Check if lib/supabase-client.ts exists and migrate it
if [ -f lib/supabase-client.ts ]; then
  echo "Migrating lib/supabase-client.ts to lib/supabase/client.ts"
  cp lib/supabase-client.ts lib/supabase/client.ts
fi

# Check if lib/supabase.ts exists and migrate it
if [ -f lib/supabase.ts ]; then
  echo "Migrating lib/supabase.ts to lib/supabase/helpers.ts"
  cp lib/supabase.ts lib/supabase/helpers.ts
fi

# Check if lib/supabase/middleware.ts exists
if [ -f lib/supabase/middleware.ts ]; then
  echo "lib/supabase/middleware.ts already exists, skipping"
fi

# Check if lib/supabase/clients.ts exists and migrate it
if [ -f lib/supabase/clients.ts ]; then
  echo "Consolidating lib/supabase/clients.ts with lib/supabase/client.ts"
  # This would require manual intervention to merge the files
  echo "Please manually merge lib/supabase/clients.ts with lib/supabase/client.ts"
fi

# Check if lib/supabase/browser.ts exists and migrate it
if [ -f lib/supabase/browser.ts ]; then
  echo "Consolidating lib/supabase/browser.ts with lib/supabase/client.ts"
  # This would require manual intervention to merge the files
  echo "Please manually merge lib/supabase/browser.ts with lib/supabase/client.ts"
fi

# Check if lib/supabase/client-browser.ts exists and migrate it
if [ -f lib/supabase/client-browser.ts ]; then
  echo "Consolidating lib/supabase/client-browser.ts with lib/supabase/client.ts"
  # This would require manual intervention to merge the files
  echo "Please manually merge lib/supabase/client-browser.ts with lib/supabase/client.ts"
fi

echo "Supabase utilities migration complete!"

