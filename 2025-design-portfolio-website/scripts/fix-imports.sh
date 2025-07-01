#!/bin/bash

echo "Fixing import paths..."

# Update the import for mode-toggle in all files
grep -r "import.*from.*@/components/mode-toggle" --include="*.tsx" --include="*.ts" . | cut -d: -f1 | while read -r file; do
  echo "Updating imports in $file"
  sed -i 's|import { ModeToggle } from "@/components/mode-toggle"|import { ModeToggle } from "@/components/shared/mode-toggle"|g' "$file"
done

# Check for other potential import issues
echo "Checking for other potential import issues..."

# List of components that might have moved
components=(
  "mode-toggle"
  "health-progress-tracker"
  "browser-mockup"
)

for component in "${components[@]}"; do
  echo "Checking imports for $component..."
  grep -r "import.*from.*@/components/$component" --include="*.tsx" --include="*.ts" . || echo "No direct imports found for $component"
done

echo "Import fixes complete!"

