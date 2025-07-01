#!/bin/bash

# Phase 4 Migration: Section Components
# This script organizes page-specific section components into a more structured format

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Phase 4 Migration: Section Components${NC}"

# Create necessary directories if they don't exist
echo -e "${BLUE}Step 1: Creating section directories...${NC}"
mkdir -p components/sections/home
mkdir -p components/sections/about
mkdir -p components/sections/work
mkdir -p components/sections/services
mkdir -p components/sections/process
mkdir -p components/sections/contact
mkdir -p components/sections/testimonials
mkdir -p components/sections/common

# Function to migrate section components
migrate_section_components() {
  local source_dir=$1
  local target_dir=$2
  local section_name=$3
  
  echo -e "${BLUE}Migrating ${section_name} section components...${NC}"
  
  # Find all components in the source directory
  find ${source_dir} -type f -name "*.tsx" | while read file; do
    filename=$(basename "$file")
    
    # Skip if the file already exists in the target directory
    if [ -f "${target_dir}/${filename}" ]; then
      echo -e "${YELLOW}File ${filename} already exists in ${target_dir}, skipping...${NC}"
      continue
    fi
    
    # Copy the file to the target directory
    cp "$file" "${target_dir}/${filename}"
    echo -e "Migrated ${filename} to ${target_dir}"
  done
}

# Step 2: Migrate home section components
echo -e "${BLUE}Step 2: Migrating home section components...${NC}"
migrate_section_components "components/home" "components/sections/home" "home"

# Step 3: Migrate about section components
echo -e "${BLUE}Step 3: Migrating about section components...${NC}"
migrate_section_components "components/about" "components/sections/about" "about"

# Step 4: Migrate work section components
echo -e "${BLUE}Step 4: Migrating work section components...${NC}"
migrate_section_components "components/work" "components/sections/work" "work"

# Step 5: Migrate services section components
echo -e "${BLUE}Step 5: Migrating services section components...${NC}"
migrate_section_components "components/services" "components/sections/services" "services"

# Step 6: Migrate process section components
echo -e "${BLUE}Step 6: Migrating process section components...${NC}"
migrate_section_components "components/process" "components/sections/process" "process"

# Step 7: Migrate testimonial section components
echo -e "${BLUE}Step 7: Migrating testimonial section components...${NC}"
migrate_section_components "components/testimonials" "components/sections/testimonials" "testimonials"

# Step 8: Migrate contact section components
echo -e "${BLUE}Step 8: Migrating contact section components...${NC}"
# Look for contact-related components in various directories
find components -type f -name "*contact*.tsx" | grep -v "components/sections" | while read file; do
  filename=$(basename "$file")
  
  # Skip if the file already exists in the target directory
  if [ -f "components/sections/contact/${filename}" ]; then
    echo -e "${YELLOW}File ${filename} already exists in components/sections/contact, skipping...${NC}"
    continue
  fi
  
  # Copy the file to the target directory
  cp "$file" "components/sections/contact/${filename}"
  echo -e "Migrated ${filename} to components/sections/contact"
done

# Step 9: Identify and migrate common section components
echo -e "${BLUE}Step 9: Identifying and migrating common section components...${NC}"
# Common section components include hero sections, CTA sections, etc.
find components -type f -name "*hero*.tsx" -o -name "*cta*.tsx" -o -name "*section-header*.tsx" | grep -v "components/sections" | while read file; do
  filename=$(basename "$file")
  
  # Skip if the file already exists in the target directory
  if [ -f "components/sections/common/${filename}" ]; then
    echo -e "${YELLOW}File ${filename} already exists in components/sections/common, skipping...${NC}"
    continue
  fi
  
  # Copy the file to the target directory
  cp "$file" "components/sections/common/${filename}"
  echo -e "Migrated ${filename} to components/sections/common"
done

# Step 10: Create index files for each section directory
echo -e "${BLUE}Step 10: Creating index files for each section directory...${NC}"
bash scripts/create-section-indexes.sh

# Step 11: Update imports in the codebase
echo -e "${BLUE}Step 11: Updating imports in the codebase...${NC}"
bash scripts/update-section-imports.sh

echo -e "${GREEN}Phase 4 Migration complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Review the migrated files"
echo -e "2. Test your application"
echo -e "3. Commit your changes"
echo -e "4. Move on to Phase 5: Admin Components"

# Ask if the user wants to commit the changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 4: Migrate and organize section components"
  echo -e "${GREEN}Committed section component changes${NC}"
fi

echo -e "${GREEN}Phase 4 Migration complete!${NC}"

