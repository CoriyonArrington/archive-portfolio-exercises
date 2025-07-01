#!/bin/bash

echo "Updating imports in codebase..."

# Update hooks imports
find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*hooks/" | grep -v "node_modules" | while read -r file; do
  echo "Updating hooks imports in $file"
  sed -i '' 's|from "\.\.\/hooks\/|from "@/lib/hooks/|g' "$file"
  sed -i '' "s|from '\.\.\/hooks\/|from '@/lib/hooks/|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/hooks\/|from "@/lib/hooks/|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/hooks\/|from '@/lib/hooks/|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/hooks\/|from "@/lib/hooks/|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/\.\.\/hooks\/|from '@/lib/hooks/|g" "$file"
done

# Update lib/utils imports
find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*lib/utils" | grep -v "node_modules" | while read -r file; do
  echo "Updating utils imports in $file"
  sed -i '' 's|from "\.\.\/lib/utils"|from "@/lib/utils"|g' "$file"
  sed -i '' "s|from '\.\.\/lib/utils'|from '@/lib/utils'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/lib/utils"|from "@/lib/utils"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/lib/utils'|from '@/lib/utils'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/lib/utils"|from "@/lib/utils"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/\.\.\/lib/utils'|from '@/lib/utils'|g" "$file"
done

# Update lib/supabase imports
find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*lib/supabase" | grep -v "node_modules" | while read -r file; do
  echo "Updating supabase imports in $file"
  sed -i '' 's|from "\.\.\/lib/supabase"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/lib/supabase'|from '@/lib/supabase'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/lib/supabase"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/lib/supabase'|from '@/lib/supabase'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/lib/supabase"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/\.\.\/lib/supabase'|from '@/lib/supabase'|g" "$file"
done

# Update lib/supabase-client imports
find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*lib/supabase-client" | grep -v "node_modules" | while read -r file; do
  echo "Updating supabase-client imports in $file"
  sed -i '' 's|from "\.\.\/lib/supabase-client"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/lib/supabase-client'|from '@/lib/supabase'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/lib/supabase-client"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/lib/supabase-client'|from '@/lib/supabase'|g" "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/lib/supabase-client"|from "@/lib/supabase"|g' "$file"
  sed -i '' "s|from '\.\.\/\.\.\/\.\.\/lib/supabase-client'|from '@/lib/supabase'|g" "$file"
done

echo "Import updates complete!"

