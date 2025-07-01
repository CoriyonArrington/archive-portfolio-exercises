#!/bin/bash

# Fix All Imports Script
# This script fixes all import issues after the migration

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting comprehensive import fix...${NC}"

# Step 1: Fix mismatched quotes
echo -e "${YELLOW}Step 1: Fixing mismatched quotes in import statements...${NC}"
bash scripts/fix-import-quotes.sh

# Step 2: Fix missing files
echo -e "${YELLOW}Step 2: Checking for missing imported files...${NC}"

# Find all TypeScript and TSX files
find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "./node_modules/*" | while read -r file; do
  # Extract all import paths
  grep -o "from '[^']*'" "$file" | sed "s/from '//g" | sed "s/'$//g" | while read -r import_path; do
    # Skip node_modules and relative imports that don't start with @/
    if [[ "$import_path" == \@/* ]]; then
      # Convert @/ path to actual file path
      actual_path=$(echo "$import_path" | sed 's/@\//.\//g')
      
      # Check if the file exists with .ts or .tsx extension
      if [[ ! -f "${actual_path}.ts" ]] && [[ ! -f "${actual_path}.tsx" ]] && [[ ! -f "${actual_path}/index.ts" ]] && [[ ! -f "${actual_path}/index.tsx" ]]; then
        echo -e "${RED}Missing import in ${file}: ${import_path}${NC}"
        
        # Try to find the file in the new structure
        possible_file=$(find . -path "*${import_path##*/}*" -name "*.tsx" -o -name "*.ts" | grep -v "node_modules" | head -n 1)
        
        if [[ -n "$possible_file" ]]; then
          new_import=$(echo "$possible_file" | sed 's/^\.\//\@\//g' | sed 's/\.[^.]*$//')
          echo -e "${GREEN}Replacing with: ${new_import}${NC}"
          
          # Replace the import
          sed -i '' "s|from '[^']*${import_path##*/}'|from '${new_import}'|g" "$file"
        fi
      fi
    fi
  done
done

# Step 3: Fix barrel imports
echo -e "${YELLOW}Step 3: Updating to use barrel imports where possible...${NC}"

# Update to use barrel imports for sections
find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "./node_modules/*" | while read -r file; do
  # Replace specific section imports with barrel imports
  sed -i '' "s|from '@/components/sections/home/[^']*'|from '@/components/sections/home'|g" "$file"
  sed -i '' "s|from '@/components/sections/about/[^']*'|from '@/components/sections/about'|g" "$file"
  sed -i '' "s|from '@/components/sections/work/[^']*'|from '@/components/sections/work'|g" "$file"
  sed -i '' "s|from '@/components/sections/services/[^']*'|from '@/components/sections/services'|g" "$file"
  sed -i '' "s|from '@/components/sections/process/[^']*'|from '@/components/sections/process'|g" "$file"
  sed -i '' "s|from '@/components/sections/common/[^']*'|from '@/components/sections/common'|g" "$file"
done

echo -e "${GREEN}All import issues fixed!${NC}"
echo -e "${BLUE}Now run 'npm run dev' to test your application.${NC}"

