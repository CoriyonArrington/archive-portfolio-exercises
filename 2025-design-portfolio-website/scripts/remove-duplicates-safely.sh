#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p .backup/final-cleanup/app
mkdir -p .backup/final-cleanup/root

echo "Creating backup of files before removal..."

# Backup and remove duplicate app directories
APP_DUPLICATES=(
  "about"
  "actions"
  "admin"
  "contact"
  "process"
  "resume"
  "services"
  "testimonials"
  "work"
)

for dir in "${APP_DUPLICATES[@]}"; do
  if [ -d "app/$dir" ]; then
    echo "Backing up app/$dir"
    cp -R "app/$dir" ".backup/final-cleanup/app/"
    echo "Removing app/$dir"
    rm -rf "app/$dir"
  fi
done

# Backup and move root TypeScript files to appropriate lib directories
ROOT_TS_FILES=(
  "auth.ts"
  "check-schema.ts"
  "client-projects.ts"
  "env-validation.ts"
  "monitoring.ts"
  "navigation.ts"
  "page-config.ts"
  "revalidation.ts"
  "static-pdf-generator.ts"
  "storage.ts"
  "supabase-queries.ts"
)

for file in "${ROOT_TS_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Backing up $file"
    cp "$file" ".backup/final-cleanup/root/"
    
    # Determine the appropriate lib directory based on file name
    if [[ "$file" == *"auth"* ]]; then
      mkdir -p "lib/auth"
      mv "$file" "lib/auth/"
    elif [[ "$file" == *"schema"* ]]; then
      mkdir -p "lib/validation"
      mv "$file" "lib/validation/"
    elif [[ "$file" == *"project"* ]]; then
      mkdir -p "lib/data"
      mv "$file" "lib/data/"
    elif [[ "$file" == *"validation"* ]]; then
      mkdir -p "lib/validation"
      mv "$file" "lib/validation/"
    elif [[ "$file" == *"monitoring"* ]]; then
      mkdir -p "lib/utils"
      mv "$file" "lib/utils/"
    elif [[ "$file" == *"navigation"* ]]; then
      mkdir -p "lib/utils"
      mv "$file" "lib/utils/"
    elif [[ "$file" == *"config"* ]]; then
      mkdir -p "lib/config"
      mv "$file" "lib/config/"
    elif [[ "$file" == *"revalidation"* ]]; then
      mkdir -p "lib/cache"
      mv "$file" "lib/cache/"
    elif [[ "$file" == *"pdf"* ]]; then
      mkdir -p "lib/pdf"
      mv "$file" "lib/pdf/"
    elif [[ "$file" == *"storage"* ]]; then
      mkdir -p "lib/storage"
      mv "$file" "lib/storage/"
    elif [[ "$file" == *"supabase"* ]]; then
      mkdir -p "lib/supabase"
      mv "$file" "lib/supabase/"
    else
      mkdir -p "lib/utils"
      mv "$file" "lib/utils/"
    fi
  fi
done

# Remove page.tsx.bak2 if it exists
if [ -f "app/page.tsx.bak2" ]; then
  cp "app/page.tsx.bak2" ".backup/final-cleanup/app/"
  rm "app/page.tsx.bak2"
fi

echo "Cleanup complete!"
echo "Backups of all removed files are stored in .backup/final-cleanup/"
echo "TypeScript files have been moved to appropriate lib directories"

