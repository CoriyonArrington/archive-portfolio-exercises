#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting migration process...${NC}"

# Check if we're on the correct branch
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" != "refactor/codebase-reorganization-2025" ]]; then
  echo -e "${YELLOW}Warning: You are not on the recommended branch 'refactor/codebase-reorganization-2025'${NC}"
  read -p "Would you like to create and checkout this branch? (y/n) " CREATE_BRANCH
  if [[ "$CREATE_BRANCH" == "y" ]]; then
    git checkout -b refactor/codebase-reorganization-2025
    echo -e "${GREEN}Created and checked out branch 'refactor/codebase-reorganization-2025'${NC}"
  fi
fi

# Run the directory setup script
echo -e "${YELLOW}Setting up directory structure...${NC}"
bash scripts/setup-directory-structure.sh

# Ask to commit the changes
read -p "Would you like to commit the directory structure? (y/n) " COMMIT_CHANGES
if [[ "$COMMIT_CHANGES" == "y" ]]; then
  git add .
  git commit -m "Create new directory structure for codebase reorganization"
  echo -e "${GREEN}Committed directory structure changes${NC}"
fi

echo -e "${GREEN}Directory structure setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review the MIGRATION-GUIDE.md file"
echo "2. Begin migrating files to the new structure"
echo "3. Consolidate duplicate components"
echo "4. Update imports in existing files"

echo -e "${GREEN}Migration process initialized successfully!${NC}"

