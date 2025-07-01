#!/bin/bash

# Consolidate Testimonials Script
# This script consolidates testimonial components into a unified system

echo "Consolidating testimonial components..."

# Create testimonials directory if it doesn't exist
mkdir -p components/sections/testimonials

# Find all testimonial-related components
testimonial_files=$(find ./components -name "*testimonial*.tsx" -o -name "*Testimonial*.tsx")

# Copy testimonial components to the testimonials directory
for file in $testimonial_files; do
  # Get the base filename
  filename=$(basename "$file")
  
  # Copy the file to the testimonials directory
  cp "$file" "components/sections/testimonials/$filename"
  echo "Copied $file to components/sections/testimonials/$filename"
done

# Create index file for testimonials
echo "Creating index file for testimonials..."
cat > components/sections/testimonials/index.ts << 'EOL'
// Testimonial Components barrel export file
// This file exports all testimonial components for easier imports

// Export all testimonial components
export * from './testimonial-card'
export * from './testimonial-section'
export * from './testimonial-preview'
export * from './featured-testimonials'
export * from './featured-testimonials-wrapper'
EOL

echo "Testimonial components consolidated!"

