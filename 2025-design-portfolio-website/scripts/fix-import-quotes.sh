#!/bin/bash

# Fix Import Quotes Script
# This script fixes mismatched quotes in import statements

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing mismatched quotes in import statements...${NC}"

# Find all TypeScript and TSX files
find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "./node_modules/*" | while read -r file; do
  # Check if the file contains mismatched quotes in import statements
  if grep -q "from ['\"][^'\"]*['\"]" "$file"; then
    echo -e "${YELLOW}Fixing quotes in ${file}${NC}"
    
    # Fix single quotes at start, double quotes at end
    sed -i '' "s/from '[^']*\"/from '&'/g" "$file"
    
    # Fix double quotes at start, single quotes at end
    sed -i '' 's/from "[^"]*'"'"'/from "&"/g' "$file"
    
    # Normalize all imports to use single quotes consistently
    sed -i '' 's/from "$$[^"]*$$"/from '"'"'\1'"'"'/g' "$file"
    
    # Fix any remaining issues with quotes
    sed -i '' 's/from '"'"'$$[^'"'"']*$$"$/from '"'"'\1'"'"'/g' "$file"
    sed -i '' 's/from "$$[^"]*$$'"'"'$/from "\1"/g' "$file"
    
    echo -e "${GREEN}Fixed quotes in ${file}${NC}"
  fi
done

# Specifically fix the app/page.tsx file which has the most issues
if [ -f "./app/page.tsx" ]; then
  echo -e "${YELLOW}Fixing quotes in app/page.tsx${NC}"
  
  # Replace all mismatched quotes in import statements
  sed -i '' "s/from '@\/components\/[^']*\"/from '&'/g" "./app/page.tsx"
  sed -i '' 's/from "@\/components\/[^"]*'"'"'/from "&"/g' "./app/page.tsx"
  
  # Fix specific patterns found in the error message
  sed -i '' "s/from '@\/components\/sections\/common\/hero\"/from '@\/components\/sections\/common\/hero'/g" "./app/page.tsx"
  sed -i '' "s/from '@\/components\/sections\/home\/client-problems\"/from '@\/components\/sections\/home\/client-problems'/g" "./app/page.tsx"
  sed -i '' "s/from '@\/components\/sections\/home\/service-overview\"/from '@\/components\/sections\/home\/service-overview'/g" "./app/page.tsx"
  sed -i '' "s/from '@\/components\/sections\/home\/process-overview\"/from '@\/components\/sections\/home\/process-overview'/g" "./app/page.tsx"
  sed -i '' "s/from '@\/components\/sections\/home\/calendly-section\"/from '@\/components\/sections\/home\/calendly-section'/g" "./app/page.tsx"
  sed -i '' "s/from '@\/components\/sections\/home\/success-stories\"/from '@\/components\/sections\/home\/success-stories'/g" "./app/page.tsx"
  
  echo -e "${GREEN}Fixed quotes in app/page.tsx${NC}"
fi

echo -e "${GREEN}All import quote issues fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

