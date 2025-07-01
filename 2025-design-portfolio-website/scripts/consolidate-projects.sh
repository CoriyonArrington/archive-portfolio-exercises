#!/bin/bash

# Consolidate Projects Script
# This script consolidates project components into a unified system

echo "Consolidating project components..."

# Create projects directory if it doesn't exist
mkdir -p components/sections/projects

# Find all project-related components
project_files=$(find ./components -name "*project*.tsx" -o -name "*Project*.tsx")

# Copy project components to the projects directory
for file in $project_files; do
  # Get the base filename
  filename=$(basename "$file")
  
  # Copy the file to the projects directory
  cp "$file" "components/sections/projects/$filename"
  echo "Copied $file to components/sections/projects/$filename"
done

# Create index file for projects
echo "Creating index file for projects..."
cat > components/sections/projects/index.ts << 'EOL'
// Project Components barrel export file
// This file exports all project components for easier imports

// Export all project components
export * from './project-card'
export * from './project-grid'
export * from './project-gallery'
export * from './project-process-section'
export * from './download-case-study'
export * from './notification-modal'
EOL

echo "Project components consolidated!"

