#!/bin/bash

# Phase 3 Migration: Shared Components
# This script migrates and consolidates shared components to the new directory structure

echo "Starting Phase 3 Migration: Shared Components"

# Create necessary directories if they don't exist
mkdir -p components/shared
mkdir -p components/ui
mkdir -p components/sections/home
mkdir -p components/sections/about
mkdir -p components/sections/work
mkdir -p components/sections/services
mkdir -p components/providers

# Step 1: Migrate UI components
echo "Step 1: Migrating UI components..."

# Check if components/ui directory exists and has files
if [ -d "components/ui" ] && [ "$(ls -A components/ui)" ]; then
  echo "UI components directory already exists and has files. Skipping migration."
else
  # Find and migrate UI components
  echo "Migrating UI components..."
  
  # List of UI components to migrate
  ui_components=(
    "button"
    "card"
    "dropdown-menu"
    "input"
    "loading-fallbacks"
    "page-loader"
    "typography"
    "loading-projects"
    "placeholder"
    "image"
    "advanced-loader"
  )
  
  # Migrate each UI component
  for component in "${ui_components[@]}"; do
    # Find the component file
    component_file=$(find . -path "./components/${component}.tsx" -o -path "./components/ui/${component}.tsx" | head -n 1)
    
    if [ -n "$component_file" ]; then
      # Create the destination directory if it doesn't exist
      mkdir -p "components/ui"
      
      # Copy the component to the new location
      cp "$component_file" "components/ui/$(basename "$component_file")"
      echo "Migrated $component_file to components/ui/$(basename "$component_file")"
    else
      echo "Component $component not found, skipping."
    fi
  done
  
  echo "UI components migration complete!"
fi

# Step 2: Migrate shared components
echo "Step 2: Migrating shared components..."

# Check if components/shared directory exists and has files
if [ -d "components/shared" ] && [ "$(ls -A components/shared)" ]; then
  echo "Shared components directory already exists and has files. Skipping migration."
else
  # Find and migrate shared components
  echo "Migrating shared components..."
  
  # List of shared components to migrate
  shared_components=(
    "skip-to-content"
    "tag-list"
    "image-card"
    "section-heading"
    "page-header"
    "cta-section"
    "accessible-tabs"
    "accessible-accordion"
  )
  
  # Migrate each shared component
  for component in "${shared_components[@]}"; do
    # Find the component file
    component_file=$(find . -path "./components/${component}.tsx" -o -path "./components/shared/${component}.tsx" | head -n 1)
    
    if [ -n "$component_file" ]; then
      # Create the destination directory if it doesn't exist
      mkdir -p "components/shared"
      
      # Copy the component to the new location
      cp "$component_file" "components/shared/$(basename "$component_file")"
      echo "Migrated $component_file to components/shared/$(basename "$component_file")"
    else
      echo "Component $component not found, skipping."
    fi
  done
  
  echo "Shared components migration complete!"
fi

# Step 3: Migrate section components
echo "Step 3: Migrating section components..."

# Home sections
echo "Migrating home sections..."
for component_file in $(find ./components/home -name "*.tsx" 2>/dev/null); do
  cp "$component_file" "components/sections/home/$(basename "$component_file")"
  echo "Migrated $component_file to components/sections/home/$(basename "$component_file")"
done

# About sections
echo "Migrating about sections..."
for component_file in $(find ./components/about -name "*.tsx" 2>/dev/null); do
  cp "$component_file" "components/sections/about/$(basename "$component_file")"
  echo "Migrated $component_file to components/sections/about/$(basename "$component_file")"
done

# Work sections
echo "Migrating work sections..."
for component_file in $(find ./components/work -name "*.tsx" 2>/dev/null); do
  cp "$component_file" "components/sections/work/$(basename "$component_file")"
  echo "Migrated $component_file to components/sections/work/$(basename "$component_file")"
done

# Process sections
echo "Migrating process sections..."
for component_file in $(find ./components/process -name "*.tsx" 2>/dev/null); do
  cp "$component_file" "components/sections/process/$(basename "$component_file")"
  echo "Migrated $component_file to components/sections/process/$(basename "$component_file")"
done

echo "Section components migration complete!"

# Step 4: Migrate provider components
echo "Step 4: Migrating provider components..."

# Check if components/providers directory exists and has files
if [ -d "components/providers" ] && [ "$(ls -A components/providers)" ]; then
  echo "Provider components directory already exists and has files. Skipping migration."
else
  # Find and migrate provider components
  echo "Migrating provider components..."
  
  # List of provider components to migrate
  provider_components=(
    "toast-provider"
    "search-params-provider"
    "loader-provider"
    "theme-provider"
    "feedback-provider"
  )
  
  # Migrate each provider component
  for component in "${provider_components[@]}"; do
    # Find the component file
    component_file=$(find . -path "./components/${component}.tsx" -o -path "./components/providers/${component}.tsx" | head -n 1)
    
    if [ -n "$component_file" ]; then
      # Create the destination directory if it doesn't exist
      mkdir -p "components/providers"
      
      # Copy the component to the new location
      cp "$component_file" "components/providers/$(basename "$component_file")"
      echo "Migrated $component_file to components/providers/$(basename "$component_file")"
    else
      echo "Component $component not found, skipping."
    fi
  done
  
  echo "Provider components migration complete!"
fi

# Step 5: Create index files
echo "Step 5: Creating index files..."

# Create UI components index file
echo "Creating components/ui/index.ts..."
cat > components/ui/index.ts << 'EOL'
// UI Components barrel export file
// This file exports all UI components for easier imports

// Export all UI components
export * from './button'
export * from './card'
export * from './dropdown-menu'
export * from './input'
export * from './loading-fallbacks'
export * from './page-loader'
export * from './typography'
export * from './loading-projects'
export * from './placeholder'
export * from './image'
export * from './advanced-loader'
EOL

# Create shared components index file
echo "Creating components/shared/index.ts..."
cat > components/shared/index.ts << 'EOL'
// Shared Components barrel export file
// This file exports all shared components for easier imports

// Export all shared components
export * from './skip-to-content'
export * from './tag-list'
export * from './image-card'
export * from './section-heading'
export * from './page-header'
export * from './cta-section'
export * from './accessible-tabs'
export * from './accessible-accordion'
EOL

# Create sections index file
echo "Creating components/sections/index.ts..."
cat > components/sections/index.ts << 'EOL'
// Section Components barrel export file
// This file exports all section components for easier imports

// Export home sections
export * from './home'

// Export about sections
export * from './about'

// Export work sections
export * from './work'

// Export services sections
export * from './services'
EOL

# Create providers index file
echo "Creating components/providers/index.ts..."
cat > components/providers/index.ts << 'EOL'
// Provider Components barrel export file
// This file exports all provider components for easier imports

// Export all provider components
export * from './toast-provider'
export * from './search-params-provider'
export * from './loader-provider'
export * from './theme-provider'
export * from './feedback-provider'
EOL

echo "Index files created!"

# Step 6: Run specialized consolidation scripts
echo "Step 6: Running specialized consolidation scripts..."

# Run testimonial consolidation script
if [ -f "scripts/consolidate-testimonials.sh" ]; then
  echo "Running testimonial consolidation script..."
  bash scripts/consolidate-testimonials.sh
else
  echo "Testimonial consolidation script not found, skipping."
fi

# Run project consolidation script
if [ -f "scripts/consolidate-projects.sh" ]; then
  echo "Running project consolidation script..."
  bash scripts/consolidate-projects.sh
else
  echo "Project consolidation script not found, skipping."
fi

echo "Specialized consolidation complete!"

# Step 7: Update imports
echo "Step 7: Updating imports..."

# Run import update script
if [ -f "scripts/update-shared-imports.sh" ]; then
  echo "Running import update script..."
  bash scripts/update-shared-imports.sh
else
  echo "Import update script not found, skipping."
fi

echo "Phase 3 Migration complete!"
echo "Next steps:"
echo "1. Review the migrated files"
echo "2. Test your application"
echo "3. Commit your changes"
echo "4. Move on to Phase 4: Section Components"

# Ask if the user wants to commit the changes
read -p "Would you like to commit the changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Phase 3: Migrate and consolidate shared components"
  echo "Committed changes!"
fi

echo "Phase 3 Migration completed successfully!"

