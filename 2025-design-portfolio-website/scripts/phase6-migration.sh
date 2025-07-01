#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Phase 6 Migration: Final Cleanup and Validation${NC}"

# Step 1: Create comprehensive index files for all component directories
echo -e "${BLUE}Step 1: Creating comprehensive index files...${NC}"

# Create main components index.ts
echo "// Main components index file - exports all component categories" > components/index.ts
echo "" >> components/index.ts
echo "// Layout components" >> components/index.ts
echo "export * from './layout';" >> components/index.ts
echo "" >> components/index.ts
echo "// UI components" >> components/index.ts
echo "export * from './ui';" >> components/index.ts
echo "" >> components/index.ts
echo "// Shared components" >> components/index.ts
echo "export * from './shared';" >> components/index.ts
echo "" >> components/index.ts
echo "// Section components" >> components/index.ts
echo "export * from './sections';" >> components/index.ts
echo "" >> components/index.ts
echo "// Provider components" >> components/index.ts
echo "export * from './providers';" >> components/index.ts
echo "" >> components/index.ts
echo "// Admin components" >> components/index.ts
echo "export * from './admin';" >> components/index.ts

echo "Created comprehensive components/index.ts"

# Create sections index.ts
if [ -d "components/sections" ]; then
  echo "// Sections index file - exports all section categories" > components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Home sections" >> components/sections/index.ts
  echo "export * from './home';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// About sections" >> components/sections/index.ts
  echo "export * from './about';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Work sections" >> components/sections/index.ts
  echo "export * from './work';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Services sections" >> components/sections/index.ts
  echo "export * from './services';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Process sections" >> components/sections/index.ts
  echo "export * from './process';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Contact sections" >> components/sections/index.ts
  echo "export * from './contact';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Testimonial sections" >> components/sections/index.ts
  echo "export * from './testimonials';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Project sections" >> components/sections/index.ts
  echo "export * from './projects';" >> components/sections/index.ts
  echo "" >> components/sections/index.ts
  echo "// Common sections" >> components/sections/index.ts
  echo "export * from './common';" >> components/sections/index.ts
  
  echo "Created comprehensive components/sections/index.ts"
fi

# Create lib index.ts
if [ -d "lib" ]; then
  echo "// Lib index file - exports all utility categories" > lib/index.ts
  echo "" >> lib/index.ts
  echo "// Utils" >> lib/index.ts
  echo "export * from './utils';" >> lib/index.ts
  echo "" >> lib/index.ts
  echo "// Hooks" >> lib/index.ts
  echo "export * from './hooks';" >> lib/index.ts
  echo "" >> lib/index.ts
  echo "// Supabase" >> lib/index.ts
  echo "export * from './supabase';" >> lib/index.ts
  
  echo "Created comprehensive lib/index.ts"
fi

# Step 2: Validate component structure
echo -e "${BLUE}Step 2: Validating component structure...${NC}"

# Check for any components still in the root components directory
ROOT_COMPONENTS=$(find components -maxdepth 1 -name "*.tsx" | wc -l)
if [ $ROOT_COMPONENTS -gt 0 ]; then
  echo -e "${YELLOW}Warning: Found $ROOT_COMPONENTS component(s) still in the root components directory.${NC}"
  echo "These components should be moved to appropriate subdirectories:"
  find components -maxdepth 1 -name "*.tsx" -exec basename {} \;
else
  echo -e "${GREEN}✓ No components found in the root components directory.${NC}"
fi

# Check for missing index files
MISSING_INDEX=0
for DIR in $(find components -type d | grep -v "node_modules"); do
  if [ "$DIR" != "components" ] && [ ! -f "$DIR/index.ts" ] && [ ! -f "$DIR/index.tsx" ]; then
    echo -e "${YELLOW}Warning: Missing index file in $DIR${NC}"
    MISSING_INDEX=$((MISSING_INDEX + 1))
  fi
done

if [ $MISSING_INDEX -eq 0 ]; then
  echo -e "${GREEN}✓ All component directories have index files.${NC}"
else
  echo -e "${YELLOW}Found $MISSING_INDEX directories missing index files.${NC}"
fi

# Step 3: Check for duplicate components
echo -e "${BLUE}Step 3: Checking for duplicate components...${NC}"

# Create a temporary file to store component names
TEMP_FILE=$(mktemp)

# Find all component files and extract base names
find components -name "*.tsx" -o -name "*.ts" | grep -v "index.ts" | grep -v "index.tsx" | xargs -I{} basename {} | sort > $TEMP_FILE

# Check for duplicates
DUPLICATES=$(cat $TEMP_FILE | sort | uniq -d)
if [ -z "$DUPLICATES" ]; then
  echo -e "${GREEN}✓ No duplicate component filenames found.${NC}"
else
  echo -e "${YELLOW}Warning: Found duplicate component filenames:${NC}"
  echo "$DUPLICATES"
  echo "You may want to check these files to ensure they're not duplicates:"
  for DUP in $DUPLICATES; do
    find components -name "$DUP" | xargs echo "  "
  done
fi

# Clean up temp file
rm $TEMP_FILE

# Step 4: Update import statements in the codebase
echo -e "${BLUE}Step 4: Updating import statements to use new structure...${NC}"

# Find all TypeScript and TypeScript JSX files
TS_FILES=$(find . -type f -name "*.ts" -o -name "*.tsx" | grep -v "node_modules" | grep -v ".next")

# Count of updated files
UPDATED_COUNT=0

for FILE in $TS_FILES; do
  # Skip index files
  if [[ $(basename "$FILE") == "index.ts" || $(basename "$FILE") == "index.tsx" ]]; then
    continue
  fi
  
  # Check if file contains direct imports from components directory
  if grep -q "from '@/components/[^/]" "$FILE"; then
    # Update imports to use the new structure
    sed -i.bak -E 's|from '"'"'@/components/([^/]+)'"'"'|from '"'"'@/components'"'"'|g' "$FILE"
    UPDATED_COUNT=$((UPDATED_COUNT + 1))
    echo "Updated imports in $FILE"
  fi
done

# Remove backup files
find . -name "*.bak" -type f -delete

if [ $UPDATED_COUNT -eq 0 ]; then
  echo -e "${GREEN}✓ No files needed import updates.${NC}"
else
  echo -e "${GREEN}Updated imports in $UPDATED_COUNT files.${NC}"
fi

# Step 5: Generate component usage report
echo -e "${BLUE}Step 5: Generating component usage report...${NC}"

# Create report directory if it doesn't exist
mkdir -p reports

# Generate report file
REPORT_FILE="reports/component_usage_report.md"
echo "# Component Usage Report" > $REPORT_FILE
echo "" >> $REPORT_FILE
echo "Generated on: $(date)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Count components by category
echo "## Component Count by Category" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "| Category | Count |" >> $REPORT_FILE
echo "|----------|-------|" >> $REPORT_FILE

# Loop through main component directories
for DIR in $(find components -maxdepth 1 -type d | sort | grep -v "^components$"); do
  DIR_NAME=$(basename "$DIR")
  COUNT=$(find "$DIR" -name "*.tsx" -o -name "*.ts" | grep -v "index.ts" | grep -v "index.tsx" | wc -l)
  echo "| $DIR_NAME | $COUNT |" >> $REPORT_FILE
done

echo "" >> $REPORT_FILE

# List most imported components
echo "## Most Used Components" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "| Component | Import Count |" >> $REPORT_FILE
echo "|-----------|--------------|" >> $REPORT_FILE

# Find all component files
COMPONENT_FILES=$(find components -name "*.tsx" -o -name "*.ts" | grep -v "index.ts" | grep -v "index.tsx")

# For each component, count how many times it's imported
for COMP in $COMPONENT_FILES; do
  COMP_NAME=$(basename "$COMP" | sed 's/\.[^.]*$//')
  IMPORT_COUNT=$(grep -r "import.*$COMP_NAME" --include="*.ts" --include="*.tsx" . | grep -v "node_modules" | grep -v ".next" | wc -l)
  
  # Only include components with at least one import
  if [ $IMPORT_COUNT -gt 0 ]; then
    echo "$COMP_NAME,$IMPORT_COUNT" >> reports/temp_comp_usage.csv
  fi
done

# Sort by import count (descending) and take top 20
if [ -f reports/temp_comp_usage.csv ]; then
  sort -t, -k2 -nr reports/temp_comp_usage.csv | head -20 | while IFS=, read -r COMP COUNT; do
    echo "| $COMP | $COUNT |" >> $REPORT_FILE
  done
  rm reports/temp_comp_usage.csv
else
  echo "| No data available | - |" >> $REPORT_FILE
fi

echo -e "${GREEN}Generated component usage report at $REPORT_FILE${NC}"

# Step 6: Final cleanup
echo -e "${BLUE}Step 6: Performing final cleanup...${NC}"

# Remove any empty directories
find components -type d -empty -delete
echo "Removed empty directories"

# Final message
echo -e "${GREEN}Phase 6 Migration complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review the component usage report in reports/component_usage_report.md"
echo "2. Test your application thoroughly"
echo "3. Commit your changes"
echo "4. Congratulations on completing the codebase reorganization!"

# Ask if user wants to commit changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 6: Final cleanup and validation"
  echo -e "${GREEN}Changes committed!${NC}"
else
  echo -e "${YELLOW}Phase 6 Migration complete!${NC}"
fi

