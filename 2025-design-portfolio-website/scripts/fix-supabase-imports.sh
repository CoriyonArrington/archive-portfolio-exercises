#!/bin/bash

echo "Fixing Supabase imports..."

# Find files that import from @/lib/supabase/client
FILES_CLIENT=$(find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*@/lib/supabase/client" | grep -v "node_modules")

# Find files that import from @/lib/supabase/server
FILES_SERVER=$(find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*@/lib/supabase/server" | grep -v "node_modules")

# Find files that import from @/lib/supabase/browser
FILES_BROWSER=$(find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*@/lib/supabase/browser" | grep -v "node_modules")

# Update imports to use the index file
for file in $FILES_CLIENT $FILES_SERVER $FILES_BROWSER; do
  echo "Updating Supabase imports in $file"
  sed -i '' 's/from.*@\/lib\/supabase\/client/from "@\/lib\/supabase"/g' "$file"
  sed -i '' 's/from.*@\/lib\/supabase\/server/from "@\/lib\/supabase"/g' "$file"
  sed -i '' 's/from.*@\/lib\/supabase\/browser/from "@\/lib\/supabase"/g' "$file"
done

echo "Supabase import fixes complete!"

