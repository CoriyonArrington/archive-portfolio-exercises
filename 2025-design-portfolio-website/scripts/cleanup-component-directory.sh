#!/bin/bash

# Create backup directory
BACKUP_DIR=".backup/components-cleanup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "Creating backup of components directory..."
cp -r components "$BACKUP_DIR/"

echo "Creating necessary directories if they don't exist..."
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/sections/home
mkdir -p components/sections/about
mkdir -p components/sections/work
mkdir -p components/sections/services
mkdir -p components/sections/contact
mkdir -p components/admin
mkdir -p components/shared
mkdir -p components/providers

# Move footer components to layout
echo "Moving footer components to layout directory..."
[ -f components/footer.tsx ] && mv components/footer.tsx components/layout/
[ -f components/site-footer.tsx ] && mv components/site-footer.tsx components/layout/
[ -d components/footer ] && cp -r components/footer/* components/layout/ && rm -rf components/footer

# Move header components to layout
echo "Moving header components to layout directory..."
[ -d components/header ] && cp -r components/header/* components/layout/ && rm -rf components/header

# Move page-specific components to sections
echo "Moving page-specific components to sections directory..."
[ -d components/about ] && cp -r components/about/* components/sections/about/ && rm -rf components/about
[ -d components/contact ] && cp -r components/contact/* components/sections/contact/ && rm -rf components/contact
[ -d components/work ] && cp -r components/work/* components/sections/work/ && rm -rf components/work
[ -d components/services ] && cp -r components/services/* components/sections/services/ && rm -rf components/services
[ -d components/home ] && cp -r components/home/* components/sections/home/ && rm -rf components/home
[ -d components/process ] && cp -r components/process/* components/sections/process/ && rm -rf components/process

# Move admin components
echo "Moving admin components..."
[ -d components/admin ] && cp -r components/admin/* components/admin/ && rm -rf components/admin

# Move shared components
echo "Moving shared components..."
[ -d components/forms ] && cp -r components/forms/* components/shared/ && rm -rf components/forms
[ -d components/timeline ] && cp -r components/timeline/* components/shared/ && rm -rf components/timeline
[ -d components/testimonials ] && cp -r components/testimonials/* components/shared/ && rm -rf components/testimonials
[ -d components/quiz ] && cp -r components/quiz/* components/shared/ && rm -rf components/quiz
[ -d components/shared ] && cp -r components/shared/* components/shared/ && rm -rf components/shared

# Move provider components
echo "Moving provider components..."
[ -d components/providers ] && cp -r components/providers/* components/providers/ && rm -rf components/providers

# Clean up any remaining directories
echo "Cleaning up debug and other directories..."
[ -d components/debug ] && rm -rf components/debug
[ -d components/projects ] && cp -r components/projects/* components/admin/ && rm -rf components/projects

# Move index files
echo "Moving index files..."
[ -f components/index.ts ] && cp components/index.ts components/index.ts.bak

echo "Creating new index files for each directory..."
cat > components/index.ts << EOL
// Re-export components from subdirectories
export * from './ui';
export * from './layout';
export * from './shared';
export * from './providers';
// Sections are typically imported directly from their directories
EOL

echo "Components directory cleanup complete!"