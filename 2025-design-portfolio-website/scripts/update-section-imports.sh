#!/bin/bash

# Update Section Imports Script
# This script updates import statements for section components throughout the codebase

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Updating section component imports...${NC}"

# Function to update imports for a specific section
update_section_imports() {
  local section_name=$1
  local old_path=$2
  local new_path="@/components/sections/${section_name}"
  
  echo -e "${BLUE}Updating imports for ${section_name} section components...${NC}"
  
  # Find all files that import from the old path
  find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from ['\"]${old_path}" | grep -v "node_modules" | while read file; do
    # Update the import statements
    sed -i '' "s|from ['\"]${old_path}|from '${new_path}|g" "$file"
    echo -e "Updated imports in ${file}"
  done
}

# Update imports for home section components
update_section_imports "home" "@/components/home"

# Update imports for about section components
update_section_imports "about" "@/components/about"

# Update imports for work section components
update_section_imports "work" "@/components/work"

# Update imports for services section components
update_section_imports "services" "@/components/services"

# Update imports for process section components
update_section_imports "process" "@/components/process"

# Update imports for testimonial section components
update_section_imports "testimonials" "@/components/testimonials"

# Update imports for common section components
# This is more complex as they could be imported from various locations
echo -e "${BLUE}Updating imports for common section components...${NC}"

# Update hero component imports
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from ['\"]@/components/.*hero" | grep -v "node_modules" | while read file; do
  # Update the import statements
  sed -i '' "s|from ['\"]@/components/.*hero|from '@/components/sections/common/hero|g" "$file"
  echo -e "Updated hero imports in ${file}"
done

# Update CTA component imports
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from ['\"]@/components/.*cta" | grep -v "node_modules" | while read file; do
  # Update the import statements
  sed -i '' "s|from ['\"]@/components/.*cta|from '@/components/sections/common/cta|g" "$file"
  echo -e "Updated CTA imports in ${file}"
done

# Update section header component imports
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from ['\"]@/components/.*section-header" | grep -v "node_modules" | while read file; do
  # Update the import statements
  sed -i '' "s|from ['\"]@/components/.*section-header|from '@/components/sections/common/section-header|g" "$file"
  echo -e "Updated section header imports in ${file}"
done

echo -e "${GREEN}Section component imports updated successfully!${NC}"

