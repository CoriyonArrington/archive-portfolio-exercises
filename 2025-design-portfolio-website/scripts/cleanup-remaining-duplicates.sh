#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p .backup/app-cleanup

echo "Creating backup of current app directory..."
cp -R app/* .backup/app-cleanup/

# List of directories to clean up (these should no longer be needed)
CLEANUP_DIRS=(
  "app/debug"
  "app/design-system"
  "app/faqs"
  "app/login-test"
  "app/playground"
  "app/supabase-test"
  "app/test-images"
  "app/test-page"
  "app/test-pdf"
  "app/test-resume-download"
  "app/typography-example"
  "app/bypass"
)

echo "Cleaning up test and duplicate directories..."
for dir in "${CLEANUP_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "Backing up and removing $dir"
    mkdir -p ".backup/$(dirname "$dir")"
    cp -R "$dir" ".backup/$(dirname "$dir")/"
    rm -rf "$dir"
  fi
done

echo "Cleanup complete!"
echo "Backup of removed directories is stored in .backup/"

