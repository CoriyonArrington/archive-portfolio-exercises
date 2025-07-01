#!/bin/bash

# Manual fix for import quotes in specific files
# This script completely rewrites the import sections of problematic files

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting manual fix for import quotes in specific files...${NC}"

# Fix app/work/page.tsx
if [ -f "./app/work/page.tsx" ]; then
  echo -e "${YELLOW}Fixing ./app/work/page.tsx...${NC}"
  
  # Create a backup
  cp "./app/work/page.tsx" "./app/work/page.tsx.bak"
  
  # Create a temporary file with the corrected imports
  cat > ./temp_imports.txt << 'EOL'
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { createServerClient } from "@/lib/supabase/server"
import { ProjectGrid } from '@/components/sections/work/project-grid'
import { SectionHeading } from "@/components/shared/section-heading"
EOL

  # Get the rest of the file (after the imports)
  tail -n +7 "./app/work/page.tsx" > ./temp_rest.txt
  
  # Combine the corrected imports with the rest of the file
  cat ./temp_imports.txt ./temp_rest.txt > "./app/work/page.tsx"
  
  # Clean up temporary files
  rm ./temp_imports.txt ./temp_rest.txt
  
  echo -e "${GREEN}Fixed ./app/work/page.tsx${NC}"
else
  echo -e "${RED}File ./app/work/page.tsx not found!${NC}"
fi

# Fix app/services/components/services-page-content.tsx
if [ -f "./app/services/components/services-page-content.tsx" ]; then
  echo -e "${YELLOW}Fixing ./app/services/components/services-page-content.tsx...${NC}"
  
  # Create a backup
  cp "./app/services/components/services-page-content.tsx" "./app/services/components/services-page-content.tsx.bak"
  
  # Create a temporary file with the corrected imports
  cat > ./temp_imports.txt << 'EOL'
/**
 * Services Page Content Component
 * 
 * This component renders the main content for the services page.
 * 
 * Features:
 * - Service solutions section
 * - Engagement models
 * - FAQ section
 * - CTA section
 * - Clear content organization
 */
import { Suspense } from "react"
import ServiceSolutions from '@/components/sections/services/service-solutions'
import EngagementModels from '@/components/sections/services/engagement-models'
import ServicesFAQ from '@/components/sections/services/services-faq'
import ServicesCTA from '@/components/sections/common/cta'
import { getServices } from "@/lib/data/services"
import { Skeleton } from "@/components/ui/skeleton"
EOL

  # Get the rest of the file (after the imports)
  tail -n +18 "./app/services/components/services-page-content.tsx" > ./temp_rest.txt
  
  # Combine the corrected imports with the rest of the file
  cat ./temp_imports.txt ./temp_rest.txt > "./app/services/components/services-page-content.tsx"
  
  # Clean up temporary files
  rm ./temp_imports.txt ./temp_rest.txt
  
  echo -e "${GREEN}Fixed ./app/services/components/services-page-content.tsx${NC}"
else
  echo -e "${RED}File ./app/services/components/services-page-content.tsx not found!${NC}"
fi

# Fix app/about/about-page-client.tsx
if [ -f "./app/about/about-page-client.tsx" ]; then
  echo -e "${YELLOW}Fixing ./app/about/about-page-client.tsx...${NC}"
  
  # Create a backup
  cp "./app/about/about-page-client.tsx" "./app/about/about-page-client.tsx.bak"
  
  # Get the line number of the problematic import
  line_num=$(grep -n "import { CTASection } from" "./app/about/about-page-client.tsx" | cut -d':' -f1)
  
  if [ -n "$line_num" ]; then
    # Fix the specific line
    sed -i '' "${line_num}s|import { CTASection } from '@/components/sections/common/cta-section\"|import { CTASection } from '@/components/sections/common/cta-section'|" "./app/about/about-page-client.tsx"
    echo -e "${GREEN}Fixed ./app/about/about-page-client.tsx${NC}"
  else
    echo -e "${RED}Could not find the problematic import in ./app/about/about-page-client.tsx${NC}"
  fi
else
  echo -e "${RED}File ./app/about/about-page-client.tsx not found!${NC}"
fi

# Fix app/process/page.tsx
if [ -f "./app/process/page.tsx" ]; then
  echo -e "${YELLOW}Fixing ./app/process/page.tsx...${NC}"
  
  # Create a backup
  cp "./app/process/page.tsx" "./app/process/page.tsx.bak"
  
  # Create a temporary file with the corrected imports
  cat > ./temp_imports.txt << 'EOL'
import type { Metadata } from "next"
import { ProcessSteps } from '@/components/sections/process/process-steps'
import { ProcessHero } from '@/components/sections/common/hero'
import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies'
EOL

  # Get the rest of the file (after the imports)
  tail -n +5 "./app/process/page.tsx" > ./temp_rest.txt
  
  # Combine the corrected imports with the rest of the file
  cat ./temp_imports.txt ./temp_rest.txt > "./app/process/page.tsx"
  
  # Clean up temporary files
  rm ./temp_imports.txt ./temp_rest.txt
  
  echo -e "${GREEN}Fixed ./app/process/page.tsx${NC}"
else
  echo -e "${RED}File ./app/process/page.tsx not found!${NC}"
fi

echo -e "${GREEN}All files have been manually fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

