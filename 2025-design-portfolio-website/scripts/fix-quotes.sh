#!/bin/bash

echo "Fixing double quotes in import statements..."

# Find all TypeScript and TSX files with the problematic import pattern
FILES=$(grep -r "from \"@/lib/supabase\"\"" --include="*.ts" --include="*.tsx" . | cut -d: -f1)

for FILE in $FILES; do
  echo "Fixing $FILE"
  
  # Use sed to replace the double quote at the end
  # The pattern matches 'from "@/lib/supabase""' and replaces it with 'from "@/lib/supabase"'
  sed -i '' 's/from "@\/lib\/supabase""/from "@\/lib\/supabase"/' "$FILE"
done

echo "Fixed quotes in all files."

# Now fix the imports to use the correct modules based on the imported function
echo "Updating imports to use correct modules..."

FILES=$(grep -r "from \"@/lib/supabase\"" --include="*.ts" --include="*.tsx" . | cut -d: -f1)

for FILE in $FILES; do
  echo "Updating imports in $FILE"
  
  # Check what function is being imported and update the import path accordingly
  if grep -q "import { createBrowserClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/browser"/' "$FILE"
  elif grep -q "import { createBrowserSupabaseClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/browser"/' "$FILE"
  elif grep -q "import { createClientSideClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/browser"/' "$FILE"
  elif grep -q "import { createServerClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/server"/' "$FILE"
  elif grep -q "import { createServerSupabaseClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/server"/' "$FILE"
  elif grep -q "import { createClient" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/client"/' "$FILE"
  elif grep -q "import { supabase" "$FILE"; then
    sed -i '' 's/from "@\/lib\/supabase"/from "@\/lib\/supabase\/client"/' "$FILE"
  fi
done

echo "All imports updated to use correct modules."

