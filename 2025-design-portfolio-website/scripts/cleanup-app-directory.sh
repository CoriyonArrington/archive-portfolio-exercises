#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p .backup/app

echo "Creating backup of app directory..."
cp -R app/* .backup/app/

# Define core app directories to keep
CORE_DIRS=(
  "about"
  "admin"
  "api"
  "contact"
  "services"
  "work"
)

# Define core app files to keep
CORE_FILES=(
  "app/layout.tsx"
  "app/page.tsx"
  "app/not-found.tsx"
  "app/globals.css"
  "app/icon.tsx"
  "app/apple-icon.tsx"
)

echo "Identifying test and duplicate directories..."

# Move test directories to a separate location
mkdir -p .backup/app/test-directories

# List of directories to move to test-directories backup
TEST_DIRS=(
  "bypass"
  "debug"
  "design-system"
  "faqs"
  "login-test"
  "playground"
  "supabase-test"
  "test-images"
  "test-page"
  "test-pdf"
  "test-resume-download"
  "typography-example"
)

# Move duplicate/temporary directories to backup
DUPLICATE_DIRS=(
  "(admin)"
  "(main)"
  "1257admin1257"
  "1257main1257"
  "components"
)

echo "Moving test directories to backup..."
for dir in "${TEST_DIRS[@]}"; do
  if [ -d "app/$dir" ]; then
    echo "Moving app/$dir to .backup/app/test-directories/"
    mkdir -p .backup/app/test-directories/$dir
    cp -R app/$dir/* .backup/app/test-directories/$dir/
    rm -rf app/$dir
  fi
done

echo "Moving duplicate directories to backup..."
for dir in "${DUPLICATE_DIRS[@]}"; do
  if [ -d "app/$dir" ]; then
    echo "Moving app/$dir to .backup/app/"
    mkdir -p .backup/app/$dir
    cp -R app/$dir/* .backup/app/$dir/
    rm -rf app/$dir
  fi
done

# Clean up any remaining test files in the app directory
echo "Cleaning up test files..."
find app -name "*test*" -type f -not -path "*/node_modules/*" | while read file; do
  echo "Backing up $file"
  mkdir -p .backup/$(dirname "$file")
  cp "$file" .backup/"$file"
  rm "$file"
done

echo "App directory cleanup complete!"
echo "Backup of removed files is stored in .backup/app/"
echo "You can restore any files if needed from the backup."

