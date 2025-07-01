#!/bin/bash

# Phase 5 Migration: Admin Components (FIXED VERSION)
# This script organizes admin-specific components into a more structured format

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Phase 5 Migration: Admin Components${NC}"

# Create necessary directories if they don't exist
echo -e "${BLUE}Step 1: Creating admin component directories...${NC}"
mkdir -p components/admin/dashboard
mkdir -p components/admin/projects
mkdir -p components/admin/testimonials
mkdir -p components/admin/services
mkdir -p components/admin/process
mkdir -p components/admin/faqs
mkdir -p components/admin/images
mkdir -p components/admin/auth
mkdir -p components/admin/layout
mkdir -p components/admin/common

# Function to migrate admin components by pattern
migrate_admin_components_by_pattern() {
  local source_dir=$1
  local target_dir=$2
  local pattern=$3
  
  echo -e "${BLUE}Migrating ${pattern} admin components to ${target_dir}...${NC}"
  
  # Find all components matching the pattern
  find ${source_dir} -type f -name "${pattern}" | while read file; do
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

# Step 2: Migrate admin components by category
echo -e "${BLUE}Step 2: Migrating admin components by category...${NC}"

# Project admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/projects" "*project*.tsx"

# Testimonial admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/testimonials" "*testimonial*.tsx"

# Service admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/services" "*service*.tsx"

# Process admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/process" "*process*.tsx"

# FAQ admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/faqs" "*faq*.tsx"

# Image admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/images" "*image*.tsx"

# Auth admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/auth" "*login*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/auth" "*logout*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/auth" "*auth*.tsx"

# Layout admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/layout" "*sidebar*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/layout" "*layout*.tsx"

# Dashboard admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/dashboard" "*dashboard*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/dashboard" "*health-score*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/dashboard" "*component-status*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/dashboard" "*implementation-checklist*.tsx"

# Common admin components
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*data-table*.tsx"
migrate_admin_components_by_pattern "components/admin/form" "components/admin/common" "*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*audit-skeleton*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*unused-components*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*unused-dependencies*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*code-duplication*.tsx"
migrate_admin_components_by_pattern "components/admin" "components/admin/common" "*supabase-debug*.tsx"

# Step 3: Create index files for each admin directory
echo -e "${BLUE}Step 3: Creating index files for each admin directory...${NC}"

# Create main admin index file
cat > components/admin/index.ts << 'EOL'
// Admin Components barrel export file
// This file exports all admin components for easier imports

// Export admin components by category
export * from './projects';
export * from './testimonials';
export * from './services';
export * from './process';
export * from './faqs';
export * from './images';
export * from './auth';
export * from './layout';
export * from './common';
export * from './dashboard';
EOL
echo -e "Created components/admin/index.ts"

# Create index files for each admin subdirectory
create_index_file() {
  local dir=$1
  
  # Get all component files in the directory
  files=$(find "components/admin/${dir}" -name "*.tsx" 2>/dev/null)
  
  if [ -n "$files" ]; then
    # Create the index file
    echo "// ${dir} admin components barrel export file" > "components/admin/${dir}/index.ts"
    echo "// This file exports all ${dir} admin components for easier imports" >> "components/admin/${dir}/index.ts"
    echo "" >> "components/admin/${dir}/index.ts"
    
    # Add exports for each component
    for file in $files; do
      filename=$(basename "$file" .tsx)
      echo "export * from './${filename}';" >> "components/admin/${dir}/index.ts"
    done
    
    echo -e "Created components/admin/${dir}/index.ts"
  else
    echo -e "${YELLOW}No components found in components/admin/${dir}, skipping index file creation${NC}"
  fi
}

# Create index files for each admin subdirectory
create_index_file "projects"
create_index_file "testimonials"
create_index_file "services"
create_index_file "process"
create_index_file "faqs"
create_index_file "images"
create_index_file "auth"
create_index_file "layout"
create_index_file "common"
create_index_file "dashboard"

# Step 4: Update imports in the codebase
echo -e "${BLUE}Step 4: Updating imports in the codebase...${NC}"

# Create a script to update admin component imports
cat > scripts/update-admin-imports.sh << 'EOL'
#!/bin/bash

# Update imports for admin components
find app -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/admin" | while read file; do
  # Update project admin component imports
  sed -i '' "s|from ['\"].*components/admin/project-|from '@/components/admin/projects/project-|g" "$file"
  
  # Update testimonial admin component imports
  sed -i '' "s|from ['\"].*components/admin/testimonial-|from '@/components/admin/testimonials/testimonial-|g" "$file"
  
  # Update service admin component imports
  sed -i '' "s|from ['\"].*components/admin/service-|from '@/components/admin/services/service-|g" "$file"
  
  # Update process admin component imports
  sed -i '' "s|from ['\"].*components/admin/process-|from '@/components/admin/process/process-|g" "$file"
  
  # Update faq admin component imports
  sed -i '' "s|from ['\"].*components/admin/faq-|from '@/components/admin/faqs/faq-|g" "$file"
  
  # Update image admin component imports
  sed -i '' "s|from ['\"].*components/admin/image-|from '@/components/admin/images/image-|g" "$file"
  
  # Update login/auth admin component imports
  sed -i '' "s|from ['\"].*components/admin/login-|from '@/components/admin/auth/login-|g" "$file"
  sed -i '' "s|from ['\"].*components/admin/logout-|from '@/components/admin/auth/logout-|g" "$file"
  
  # Update layout admin component imports
  sed -i '' "s|from ['\"].*components/admin/sidebar|from '@/components/admin/layout/sidebar|g" "$file"
  
  echo "Updated admin imports in $file"
done
EOL

# Make the script executable
chmod +x scripts/update-admin-imports.sh

# Run the script to update imports
bash scripts/update-admin-imports.sh

echo -e "${GREEN}Phase 5 Migration complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Review the migrated files"
echo -e "2. Test your application"
echo -e "3. Commit your changes"
echo -e "4. Move on to Phase 6: Final Cleanup"

# Ask if the user wants to commit the changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 5: Migrate and organize admin components"
  echo -e "${GREEN}Committed admin component changes${NC}"
fi

echo -e "${GREEN}Phase 5 Migration complete!${NC}"

