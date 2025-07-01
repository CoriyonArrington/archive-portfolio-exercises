#!/bin/bash

# Fix specific files with known import quote issues
# This script directly fixes the files mentioned in the error messages

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting fix for specific files with import quote issues...${NC}"

# List of specific files to fix
specific_files=(
  "./app/work/page.tsx"
  "./app/services/components/services-page-content.tsx"
  "./app/about/about-page-client.tsx"
  "./app/process/page.tsx"
)

for file in "${specific_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${YELLOW}Fixing ${file}...${NC}"
    
    # Create a backup
    cp "$file" "${file}.bak"
    
    # Fix work/page.tsx
    if [[ "$file" == "./app/work/page.tsx" ]]; then
      # Fix ProjectGrid import
      sed -i '' "s|import { ProjectGrid } from '@/components/sections/work/project-grid\"|import { ProjectGrid } from '@/components/sections/work/project-grid'|g" "$file"
    fi
    
    # Fix services/components/services-page-content.tsx
    if [[ "$file" == "./app/services/components/services-page-content.tsx" ]]; then
      # Fix ServiceSolutions import
      sed -i '' "s|import ServiceSolutions from '@/components/sections/services/service-solutions\"|import ServiceSolutions from '@/components/sections/services/service-solutions'|g" "$file"
      # Fix EngagementModels import
      sed -i '' "s|import EngagementModels from '@/components/sections/services/engagement-models\"|import EngagementModels from '@/components/sections/services/engagement-models'|g" "$file"
      # Fix ServicesFAQ import
      sed -i '' "s|import ServicesFAQ from '@/components/sections/services/services-faq\"|import ServicesFAQ from '@/components/sections/services/services-faq'|g" "$file"
      # Fix ServicesCTA import
      sed -i '' "s|import ServicesCTA from '@/components/sections/common/cta\"|import ServicesCTA from '@/components/sections/common/cta'|g" "$file"
    fi
    
    # Fix about/about-page-client.tsx
    if [[ "$file" == "./app/about/about-page-client.tsx" ]]; then
      # Fix CTASection import
      sed -i '' "s|import { CTASection } from '@/components/sections/common/cta-section\"|import { CTASection } from '@/components/sections/common/cta-section'|g" "$file"
    fi
    
    # Fix process/page.tsx
    if [[ "$file" == "./app/process/page.tsx" ]]; then
      # Fix ProcessSteps import
      sed -i '' "s|import { ProcessSteps } from '@/components/sections/process/process-steps\"|import { ProcessSteps } from '@/components/sections/process/process-steps'|g" "$file"
      # Fix ProcessHero import
      sed -i '' "s|import { ProcessHero } from '@/components/sections/common/hero\"|import { ProcessHero } from '@/components/sections/common/hero'|g" "$file"
      # Fix ProcessCaseStudies import
      sed -i '' "s|import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies\"|import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies'|g" "$file"
    fi
    
    echo -e "${GREEN}Fixed ${file}${NC}"
  else
    echo -e "${RED}File ${file} not found!${NC}"
  fi
done

echo -e "${GREEN}All specific files have been fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

