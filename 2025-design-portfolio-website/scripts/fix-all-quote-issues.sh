#!/bin/bash

# Comprehensive Fix for All Import Quote Issues
# This script fixes mismatched quotes in import statements across the entire project

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting comprehensive fix for all import quote issues...${NC}"

# Create a list of files with potential issues
echo -e "${YELLOW}Finding files with potential import issues...${NC}"
find_output=$(find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "*/node_modules/*" -not -path "*/.next/*")

# Process each file
echo -e "${YELLOW}Processing files...${NC}"
count=0
fixed=0

for file in $find_output; do
  count=$((count + 1))
  
  # Check if file contains mismatched quotes in imports
  if grep -q "from '[^']*\"" "$file" || grep -q "from \"[^\"]*'" "$file"; then
    echo -e "${YELLOW}Fixing quotes in ${file}${NC}"
    
    # Create a backup
    cp "$file" "${file}.bak"
    
    # Fix single quotes at start, double quotes at end
    sed -i '' "s/from '$$[^']*$$\"/from '\1'/g" "$file"
    
    # Fix double quotes at start, single quotes at end
    sed -i '' "s/from \"$$[^\"]*$$'/from \"\1\"/g" "$file"
    
    fixed=$((fixed + 1))
  fi
done

# List of specific files to check based on errors
specific_files=(
  "./app/work/page.tsx"
  "./app/services/components/services-page-content.tsx"
  "./app/about/about-page-client.tsx"
  "./app/process/page.tsx"
)

echo -e "${YELLOW}Checking specific files that had errors...${NC}"

for file in "${specific_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${YELLOW}Manually fixing ${file}...${NC}"
    
    # Create a backup
    cp "$file" "${file}.manual_fix.bak"
    
    # Replace problematic import lines with fixed versions
    case "$file" in
      "./app/work/page.tsx")
        sed -i '' "s|import { ProjectGrid } from '@/components/sections/work/project-grid\"|import { ProjectGrid } from '@/components/sections/work/project-grid'|g" "$file"
        ;;
      "./app/services/components/services-page-content.tsx")
        sed -i '' "s|import ServiceSolutions from '@/components/sections/services/service-solutions\"|import ServiceSolutions from '@/components/sections/services/service-solutions'|g" "$file"
        sed -i '' "s|import EngagementModels from '@/components/sections/services/engagement-models\"|import EngagementModels from '@/components/sections/services/engagement-models'|g" "$file"
        sed -i '' "s|import ServicesFAQ from '@/components/sections/services/services-faq\"|import ServicesFAQ from '@/components/sections/services/services-faq'|g" "$file"
        sed -i '' "s|import ServicesCTA from '@/components/sections/common/cta\"|import ServicesCTA from '@/components/sections/common/cta'|g" "$file"
        ;;
      "./app/about/about-page-client.tsx")
        sed -i '' "s|import { CTASection } from '@/components/sections/common/cta-section\"|import { CTASection } from '@/components/sections/common/cta-section'|g" "$file"
        ;;
      "./app/process/page.tsx")
        sed -i '' "s|import { ProcessSteps } from '@/components/sections/process/process-steps\"|import { ProcessSteps } from '@/components/sections/process/process-steps'|g" "$file"
        sed -i '' "s|import { ProcessHero } from '@/components/sections/common/hero\"|import { ProcessHero } from '@/components/sections/common/hero'|g" "$file"
        sed -i '' "s|import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies\"|import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies'|g" "$file"
        ;;
    esac
    
    echo -e "${GREEN}Manually fixed ${file}${NC}"
  else
    echo -e "${RED}File ${file} not found!${NC}"
  fi
done

echo -e "${GREEN}Processed ${count} files and fixed ${fixed} files with quote issues!${NC}"
echo -e "${GREEN}Additionally manually fixed the specific files that had errors.${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

