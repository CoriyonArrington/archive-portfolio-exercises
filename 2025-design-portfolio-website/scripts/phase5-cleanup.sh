#!/bin/bash

# Phase 5 Cleanup: Fix misplaced admin components
# This script moves admin components to their correct directories

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Phase 5 Cleanup: Fixing misplaced admin components${NC}"

# Create necessary directories if they don't exist
echo -e "${BLUE}Step 1: Ensuring all admin component directories exist...${NC}"
mkdir -p components/admin/common
mkdir -p components/admin/dashboard

# Function to move components to their correct location
move_component() {
  local source_file=$1
  local target_dir=$2
  local filename=$(basename "$source_file")
  
  # Skip if the file doesn't exist
  if [ ! -f "$source_file" ]; then
    echo -e "${YELLOW}File ${source_file} doesn't exist, skipping...${NC}"
    return
  fi
  
  # Create target directory if it doesn't exist
  mkdir -p "$target_dir"
  
  # Move the file to the target directory
  mv "$source_file" "${target_dir}/${filename}"
  echo -e "Moved ${filename} to ${target_dir}"
}

# Step 2: Move dashboard components
echo -e "${BLUE}Step 2: Moving dashboard components...${NC}"
move_component "components/admin/projects/audit-dashboard.tsx" "components/admin/dashboard"
move_component "components/admin/projects/audit-dashboard-api-update.tsx" "components/admin/dashboard"
move_component "components/admin/projects/health-score.tsx" "components/admin/dashboard"
move_component "components/admin/projects/component-status-list.tsx" "components/admin/dashboard"
move_component "components/admin/projects/implementation-checklist.tsx" "components/admin/dashboard"

# Step 3: Move common components
echo -e "${BLUE}Step 3: Moving common components...${NC}"
move_component "components/admin/projects/data-table.tsx" "components/admin/common"
move_component "components/admin/projects/form-field.tsx" "components/admin/common"
move_component "components/admin/projects/form-button.tsx" "components/admin/common"
move_component "components/admin/projects/audit-skeleton.tsx" "components/admin/common"
move_component "components/admin/projects/unused-components-list.tsx" "components/admin/common"
move_component "components/admin/projects/unused-dependencies-list.tsx" "components/admin/common"
move_component "components/admin/projects/code-duplication-list.tsx" "components/admin/common"
move_component "components/admin/projects/supabase-debug-client.tsx" "components/admin/common"

# Step 4: Create index files for common and dashboard directories
echo -e "${BLUE}Step 4: Creating index files for common and dashboard directories...${NC}"

# Create dashboard index file
if [ -d "components/admin/dashboard" ] && [ "$(ls -A components/admin/dashboard)" ]; then
  echo "// Dashboard admin components barrel export file" > "components/admin/dashboard/index.ts"
  echo "// This file exports all dashboard admin components for easier imports" >> "components/admin/dashboard/index.ts"
  echo "" >> "components/admin/dashboard/index.ts"
  
  # Add exports for each component
  for file in components/admin/dashboard/*.tsx; do
    if [ -f "$file" ]; then
      filename=$(basename "$file" .tsx)
      echo "export * from './${filename}';" >> "components/admin/dashboard/index.ts"
    fi
  done
  
  echo -e "Created components/admin/dashboard/index.ts"
else
  echo -e "${YELLOW}No components found in components/admin/dashboard, skipping index file creation${NC}"
fi

# Create common index file
if [ -d "components/admin/common" ] && [ "$(ls -A components/admin/common)" ]; then
  echo "// Common admin components barrel export file" > "components/admin/common/index.ts"
  echo "// This file exports all common admin components for easier imports" >> "components/admin/common/index.ts"
  echo "" >> "components/admin/common/index.ts"
  
  # Add exports for each component
  for file in components/admin/common/*.tsx; do
    if [ -f "$file" ]; then
      filename=$(basename "$file" .tsx)
      echo "export * from './${filename}';" >> "components/admin/common/index.ts"
    fi
  done
  
  echo -e "Created components/admin/common/index.ts"
else
  echo -e "${YELLOW}No components found in components/admin/common, skipping index file creation${NC}"
fi

# Step 5: Update the main admin index file to include common and dashboard
echo -e "${BLUE}Step 5: Updating main admin index file...${NC}"

# Check if common directory has files
if [ -d "components/admin/common" ] && [ "$(ls -A components/admin/common)" ]; then
  # Check if common is already in the index file
  if ! grep -q "export \* from './common';" "components/admin/index.ts"; then
    # Add common export if it doesn't exist
    sed -i '' "s|export \* from './dashboard';|export * from './dashboard';\nexport * from './common';|g" "components/admin/index.ts"
    echo -e "Updated components/admin/index.ts to include common components"
  fi
fi

echo -e "${GREEN}Phase 5 Cleanup complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Review the moved files"
echo -e "2. Test your application"
echo -e "3. Commit your changes"

# Ask if the user wants to commit the changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 5 Cleanup: Fix misplaced admin components"
  echo -e "${GREEN}Committed admin component cleanup changes${NC}"
fi

