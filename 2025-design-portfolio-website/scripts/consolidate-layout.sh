#!/bin/bash

echo "Consolidating layout components..."

# Create backup directory
mkdir -p backups/components/layout

# Backup existing layout components
cp -r components/layout/header backups/components/layout/
cp -r components/layout/footer backups/components/layout/
cp -r components/layout/navigation backups/components/layout/

# Remove old layout component directories
rm -rf components/layout/header
rm -rf components/layout/footer
rm -rf components/layout/navigation

# Update imports in the codebase
echo "Updating imports in the codebase..."

# Find files that import from the old layout components
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/layout/header/" | grep -v "node_modules" | while read -r file; do
  echo "Updating imports in $file"
  sed -i '' 's|from ".*components/layout/header/.*"|from "@/components/layout"|g' "$file"
  sed -i '' "s|from '.*components/layout/header/.*'|from '@/components/layout'|g" "$file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/layout/footer/" | grep -v "node_modules" | while read -r file; do
  echo "Updating imports in $file"
  sed -i '' 's|from ".*components/layout/footer/.*"|from "@/components/layout"|g' "$file"
  sed -i '' "s|from '.*components/layout/footer/.*'|from '@/components/layout'|g" "$file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/layout/navigation/" | grep -v "node_modules" | while read -r file; do
  echo "Updating imports in $file"
  sed -i '' 's|from ".*components/layout/navigation/.*"|from "@/components/layout"|g' "$file"
  sed -i '' "s|from '.*components/layout/navigation/.*'|from '@/components/layout'|g" "$file"
done

echo "Layout components consolidated successfully!"

