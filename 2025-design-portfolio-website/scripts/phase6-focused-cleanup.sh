#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Phase 6 Focused Cleanup${NC}"

# Step 1: Move remaining components from root to appropriate directories
echo -e "${BLUE}Step 1: Moving components from root directory...${NC}"

# Create directories if they don't exist
mkdir -p components/sections/common
mkdir -p components/layout/navigation
mkdir -p components/shared
mkdir -p components/providers

# Move components to appropriate directories
echo "Moving components from root to appropriate directories..."

# Navigation components
if [ -f "components/main-nav.tsx" ]; then
  mv components/main-nav.tsx components/layout/navigation/
  echo "Moved main-nav.tsx to layout/navigation"
fi

if [ -f "components/mobile-nav.tsx" ]; then
  mv components/mobile-nav.tsx components/layout/navigation/
  echo "Moved mobile-nav.tsx to layout/navigation"
fi

if [ -f "components/nav.tsx" ]; then
  mv components/nav.tsx components/layout/navigation/
  echo "Moved nav.tsx to layout/navigation"
fi

# Layout components
if [ -f "components/footer.tsx" ]; then
  mv components/footer.tsx components/layout/footer/
  echo "Moved footer.tsx to layout/footer"
fi

if [ -f "components/site-footer.tsx" ]; then
  mv components/site-footer.tsx components/layout/footer/
  echo "Moved site-footer.tsx to layout/footer"
fi

if [ -f "components/container.tsx" ]; then
  mv components/container.tsx components/layout/
  echo "Moved container.tsx to layout"
fi

# Common section components
if [ -f "components/section-header.tsx" ]; then
  mv components/section-header.tsx components/sections/common/
  echo "Moved section-header.tsx to sections/common"
fi

if [ -f "components/browser-mockup.tsx" ]; then
  mv components/browser-mockup.tsx components/sections/common/
  echo "Moved browser-mockup.tsx to sections/common"
fi

if [ -f "components/project-card.tsx" ]; then
  mv components/project-card.tsx components/sections/common/
  echo "Moved project-card.tsx to sections/common"
fi

if [ -f "components/project-grid.tsx" ]; then
  mv components/project-grid.tsx components/sections/common/
  echo "Moved project-grid.tsx to sections/common"
fi

if [ -f "components/project-nav.tsx" ]; then
  mv components/project-nav.tsx components/sections/common/
  echo "Moved project-nav.tsx to sections/common"
fi

if [ -f "components/featured-projects.tsx" ]; then
  mv components/featured-projects.tsx components/sections/common/
  echo "Moved featured-projects.tsx to sections/common"
fi

if [ -f "components/testimonials.tsx" ]; then
  mv components/testimonials.tsx components/sections/common/
  echo "Moved testimonials.tsx to sections/common"
fi

if [ -f "components/testimonials-section.tsx" ]; then
  mv components/testimonials-section.tsx components/sections/common/
  echo "Moved testimonials-section.tsx to sections/common"
fi

if [ -f "components/client-problems.tsx" ]; then
  mv components/client-problems.tsx components/sections/common/
  echo "Moved client-problems.tsx to sections/common"
fi

if [ -f "components/hero-showcase-wrapper.tsx" ]; then
  mv components/hero-showcase-wrapper.tsx components/sections/common/
  echo "Moved hero-showcase-wrapper.tsx to sections/common"
fi

if [ -f "components/testimonial-card.tsx" ]; then
  mv components/testimonial-card.tsx components/sections/common/
  echo "Moved testimonial-card.tsx to sections/common"
fi

# Provider components
if [ -f "components/theme-provider.tsx" ]; then
  mv components/theme-provider.tsx components/providers/
  echo "Moved theme-provider.tsx to providers"
fi

# Shared components
if [ -f "components/error-boundary.tsx" ]; then
  mv components/error-boundary.tsx components/shared/
  echo "Moved error-boundary.tsx to shared"
fi

if [ -f "components/active-visitors.tsx" ]; then
  mv components/active-visitors.tsx components/shared/
  echo "Moved active-visitors.tsx to shared"
fi

if [ -f "components/timeline.tsx" ]; then
  mv components/timeline.tsx components/shared/
  echo "Moved timeline.tsx to shared"
fi

if [ -f "components/feedback-modal.tsx" ]; then
  mv components/feedback-modal.tsx components/shared/
  echo "Moved feedback-modal.tsx to shared"
fi

if [ -f "components/mode-toggle.tsx" ]; then
  mv components/mode-toggle.tsx components/shared/
  echo "Moved mode-toggle.tsx to shared"
fi

if [ -f "components/recharts-wrapper.tsx" ]; then
  mv components/recharts-wrapper.tsx components/shared/
  echo "Moved recharts-wrapper.tsx to shared"
fi

if [ -f "components/health-progress-tracker.tsx" ]; then
  mv components/health-progress-tracker.tsx components/shared/
  echo "Moved health-progress-tracker.tsx to shared"
fi

if [ -f "components/feedback-modal-fallback.tsx" ]; then
  mv components/feedback-modal-fallback.tsx components/shared/
  echo "Moved feedback-modal-fallback.tsx to shared"
fi

if [ -f "components/home-page-content.tsx" ]; then
  mv components/home-page-content.tsx components/sections/home/
  echo "Moved home-page-content.tsx to sections/home"
fi

# Step 2: Create missing index files
echo -e "${BLUE}Step 2: Creating missing index files...${NC}"

# Function to create index file for a directory
create_index_file() {
  local dir=$1
  local name=$(basename "$dir")
  
  # Skip if index file already exists
  if [ -f "$dir/index.ts" ] || [ -f "$dir/index.tsx" ]; then
    return
  fi
  
  echo "// Export all components from $name directory" > "$dir/index.ts"
  echo "" >> "$dir/index.ts"
  
  # Add exports for each component
  for file in "$dir"/*.tsx; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "index.tsx" ]; then
      component_name=$(basename "$file" .tsx)
      echo "export * from './$component_name';" >> "$dir/index.ts"
    fi
  done
  
  echo "Created index file for $dir"
}

# Create index files for directories missing them
for dir in components/contact components/forms components/testimonials components/projects components/admin/form components/quiz components/about components/work components/services components/process components/debug; do
  if [ -d "$dir" ]; then
    create_index_file "$dir"
  fi
done

# Step 3: Handle duplicate components
echo -e "${BLUE}Step 3: Handling duplicate components...${NC}"

echo "Creating a report of duplicate components..."
mkdir -p reports

# Create report file
REPORT_FILE="reports/duplicate_components.md"
echo "# Duplicate Components Report" > $REPORT_FILE
echo "" >> $REPORT_FILE
echo "Generated on: $(date)" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "This report lists components with the same filename in multiple locations." >> $REPORT_FILE
echo "Review these files to determine which ones should be kept and which should be removed." >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Find duplicate component files and add to report
echo "## Duplicate Components" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Create a temporary file to store component paths
TEMP_FILE=$(mktemp)

# Find all component files
find components -name "*.tsx" -o -name "*.ts" | grep -v "index.ts" | grep -v "index.tsx" | sort > $TEMP_FILE

# Extract base names and find duplicates
cat $TEMP_FILE | xargs -I{} basename {} | sort | uniq -d > reports/duplicate_names.txt

# For each duplicate, list all instances
while read -r filename; do
  echo "### $filename" >> $REPORT_FILE
  echo "" >> $REPORT_FILE
  grep "/$filename$" $TEMP_FILE | sed 's/^/- /' >> $REPORT_FILE
  echo "" >> $REPORT_FILE
done < reports/duplicate_names.txt

# Clean up temp files
rm $TEMP_FILE
rm reports/duplicate_names.txt

echo -e "${GREEN}Created duplicate components report at $REPORT_FILE${NC}"

# Step 4: Complete the component usage report
echo -e "${BLUE}Step 4: Generating component usage report...${NC}"

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

# Final message
echo -e "${GREEN}Phase 6 Focused Cleanup complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review the duplicate components report in reports/duplicate_components.md"
echo "2. Review the component usage report in reports/component_usage_report.md"
echo "3. Test your application thoroughly"
echo "4. Commit your changes"
echo "5. Congratulations on completing the codebase reorganization!"

# Ask if user wants to commit changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 6: Focused cleanup and component organization"
  echo -e "${GREEN}Changes committed!${NC}"
else
  echo -e "${YELLOW}Phase 6 Focused Cleanup complete!${NC}"
fi

