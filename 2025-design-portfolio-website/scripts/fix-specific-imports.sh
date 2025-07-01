#!/bin/bash

# Fix Specific Imports Script
# This script fixes specific import issues in app/page.tsx

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing specific import issues in app/page.tsx...${NC}"

if [ -f "./app/page.tsx" ]; then
  echo -e "${YELLOW}Backing up app/page.tsx...${NC}"
  cp "./app/page.tsx" "./app/page.tsx.bak"
  
  echo -e "${YELLOW}Fixing imports in app/page.tsx...${NC}"
  
  # Fix the specific imports mentioned in the error
  sed -i '' "s|import HomeHero from '@/components/sections/common/hero\"|import HomeHero from '@/components/sections/common/hero'|g" "./app/page.tsx"
  sed -i '' "s|import ClientProblems from '@/components/sections/home/client-problems\"|import ClientProblems from '@/components/sections/home/client-problems'|g" "./app/page.tsx"
  sed -i '' "s|import ServiceOverview from '@/components/sections/home/service-overview\"|import ServiceOverview from '@/components/sections/home/service-overview'|g" "./app/page.tsx"
  sed -i '' "s|import ProcessOverview from '@/components/sections/home/process-overview\"|import ProcessOverview from '@/components/sections/home/process-overview'|g" "./app/page.tsx"
  sed -i '' "s|import CalendlySection from '@/components/sections/home/calendly-section\"|import CalendlySection from '@/components/sections/home/calendly-section'|g" "./app/page.tsx"
  sed -i '' "s|import { SuccessStories } from '@/components/sections/home/success-stories\"|import { SuccessStories } from '@/components/sections/home/success-stories'|g" "./app/page.tsx"
  
  # Fix any other potential issues
  sed -i '' "s|from '@/components/[^']*\"|from '@/components/sections/common/hero'|g" "./app/page.tsx"
  
  echo -e "${GREEN}Fixed imports in app/page.tsx${NC}"
else
  echo -e "${RED}app/page.tsx not found!${NC}"
fi

echo -e "${GREEN}Specific import issues fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

