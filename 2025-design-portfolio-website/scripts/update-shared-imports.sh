#!/bin/bash

# Update Shared Imports Script
# This script updates import statements throughout the codebase to use the new component structure

echo "Updating import statements..."

# Function to update imports in a file
update_imports() {
  local file=$1
  
  # Update UI component imports
  sed -i '' 's|from "@/components/ui/button"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/card"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/dropdown-menu"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/input"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/loading-fallbacks"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/page-loader"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/typography"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/loading-projects"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/placeholder"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/image"|from "@/components/ui"|g' "$file"
  sed -i '' 's|from "@/components/ui/advanced-loader"|from "@/components/ui"|g' "$file"
  
  # Update shared component imports
  sed -i '' 's|from "@/components/shared/skip-to-content"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/tag-list"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/image-card"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/section-heading"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/page-header"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/cta-section"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/accessible-tabs"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/shared/accessible-accordion"|from "@/components/shared"|g' "$file"
  
  # Update old paths to shared components
  sed -i '' 's|from "@/components/skip-to-content"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/tag-list"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/image-card"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/section-heading"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/page-header"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/cta-section"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/accessible-tabs"|from "@/components/shared"|g' "$file"
  sed -i '' 's|from "@/components/accessible-accordion"|from "@/components/shared"|g' "$file"
  
  # Update provider component imports
  sed -i '' 's|from "@/components/providers/toast-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/providers/search-params-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/providers/loader-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/providers/theme-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/providers/feedback-provider"|from "@/components/providers"|g' "$file"
  
  # Update old paths to provider components
  sed -i '' 's|from "@/components/toast-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/search-params-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/loader-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/theme-provider"|from "@/components/providers"|g' "$file"
  sed -i '' 's|from "@/components/feedback-provider"|from "@/components/providers"|g' "$file"
  
  # Update section component imports
  sed -i '' 's|from "@/components/home/|from "@/components/sections/home/|g' "$file"
  sed -i '' 's|from "@/components/about/|from "@/components/sections/about/|g' "$file"
  sed -i '' 's|from "@/components/work/|from "@/components/sections/work/|g' "$file"
  sed -i '' 's|from "@/components/services/|from "@/components/sections/services/|g' "$file"
  sed -i '' 's|from "@/components/process/|from "@/components/sections/process/|g' "$file"
  
  # Update mode-toggle import
  sed -i '' 's|from "@/components/mode-toggle"|from "@/components/shared/mode-toggle"|g' "$file"
  
  # Update feedback-modal import
  sed -i '' 's|from "@/components/feedback-modal"|from "@/components/shared/feedback-modal"|g' "$file"
  
  # Update browser-mockup import
  sed -i '' 's|from "@/components/browser-mockup"|from "@/components/shared/browser-mockup"|g' "$file"
  
  # Update testimonial-card import
  sed -i '' 's|from "@/components/testimonial-card"|from "@/components/sections/testimonials/testimonial-card"|g' "$file"
  
  # Update project-grid import
  sed -i '' 's|from "@/components/project-grid"|from "@/components/sections/projects/project-grid"|g' "$file"
}

# Find all TypeScript and TSX files
files=$(find . -type f $$ -name "*.ts" -o -name "*.tsx" $$ -not -path "./node_modules/*" -not -path "./.next/*")

# Update imports in each file
for file in $files; do
  echo "Updating imports in $file..."
  update_imports "$file"
done

echo "Import statements updated!"

