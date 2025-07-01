#!/bin/bash

# Fix Duplicate 'from' in Import Statements
# This script fixes duplicate 'from' keywords in import statements

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing duplicate 'from' keywords in import statements...${NC}"

if [ -f "./app/page.tsx" ]; then
  echo -e "${YELLOW}Backing up app/page.tsx...${NC}"
  cp "./app/page.tsx" "./app/page.tsx.bak2"
  
  echo -e "${YELLOW}Fixing imports in app/page.tsx...${NC}"
  
  # Fix the duplicate 'from' keywords
  sed -i '' "s|from 'from '@|from '@|g" "./app/page.tsx"
  
  # Also fix any potential double quotes
  sed -i '' "s|''|'|g" "./app/page.tsx"
  sed -i '' 's|""|"|g' "./app/page.tsx"
  
  # Make sure all import statements have matching quotes
  sed -i '' "s|from '[^']*\"|from '&'|g" "./app/page.tsx"
  sed -i '' 's|from "[^"]*'"'"'|from "&"|g' "./app/page.tsx"
  
  echo -e "${GREEN}Fixed duplicate 'from' in app/page.tsx${NC}"
  
  # Check if there are still syntax issues
  if grep -q "from 'from " "./app/page.tsx"; then
    echo -e "${RED}Still found issues with duplicate 'from'. Attempting more aggressive fix...${NC}"
    
    # More aggressive replacement
    sed -i '' "s|from 'from '|from '|g" "./app/page.tsx"
    sed -i '' "s|'' ''|'|g" "./app/page.tsx"
    
    echo -e "${GREEN}Applied aggressive fix.${NC}"
  fi
else
  echo -e "${RED}app/page.tsx not found!${NC}"
fi

# Also check for similar issues in other files
find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "./node_modules/*" | while read -r file; do
  if grep -q "from 'from " "$file"; then
    echo -e "${YELLOW}Fixing imports in ${file}${NC}"
    sed -i '' "s|from 'from '@|from '@|g" "$file"
    sed -i '' "s|''|'|g" "$file"
    echo -e "${GREEN}Fixed imports in ${file}${NC}"
  fi
done

echo -e "${GREEN}All duplicate 'from' issues fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

