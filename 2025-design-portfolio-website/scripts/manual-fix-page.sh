#!/bin/bash

# Manual Fix for app/page.tsx
# This script manually corrects the import statements in app/page.tsx

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Manually fixing import statements in app/page.tsx...${NC}"

if [ -f "./app/page.tsx" ]; then
  echo -e "${YELLOW}Backing up app/page.tsx...${NC}"
  cp "./app/page.tsx" "./app/page.tsx.bak3"
  
  echo -e "${YELLOW}Creating fixed version of app/page.tsx...${NC}"
  
  # Extract the content of page.tsx
  content=$(cat "./app/page.tsx")
  
  # Replace the first part of the file with correct imports
  corrected_imports='import type { Metadata } from "next"

// Page sections
import HomeHero from "@/components/sections/common/hero"
import ClientProblems from "@/components/sections/home/client-problems"
import ServiceOverview from "@/components/sections/home/service-overview"
import ProcessOverview from "@/components/sections/home/process-overview"
import FeaturedProjects from "@/components/projects/featured-projects"
import CalendlySection from "@/components/sections/home/calendly-section"
import { SuccessStories } from "@/components/sections/home/success-stories"

// Loading fallbacks'
  
  # Replace the beginning of the file up to "// Loading fallbacks"
  new_content=$(echo "$content" | sed -n '/Loading fallbacks/,$p')
  new_content="$corrected_imports

$new_content"
  
  # Write the corrected content back to the file
  echo "$new_content" > "./app/page.tsx"
  
  echo -e "${GREEN}Manually fixed imports in app/page.tsx${NC}"
else
  echo -e "${RED}app/page.tsx not found!${NC}"
fi

echo -e "${GREEN}Manual fix complete!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

