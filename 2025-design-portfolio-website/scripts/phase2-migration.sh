#!/bin/bash

echo "Starting Phase 2 Migration: Layout Components"

# Step 1: Identify layout components
echo "Step 1: Identifying layout components..."

# Create layout component directories if they don't exist
mkdir -p components/layout/header
mkdir -p components/layout/footer
mkdir -p components/layout/navigation
mkdir -p components/layout/container

# Step 2: Migrate header components
echo "Step 2: Migrating header components..."

# Check if header components exist and migrate them
if [ -d "components/header" ]; then
  cp -r components/header/* components/layout/header/
  echo "Migrated components/header to components/layout/header/"
fi

# Check if individual header files exist and migrate them
if [ -f "components/main-nav.tsx" ]; then
  cp components/main-nav.tsx components/layout/navigation/main-nav.tsx
  echo "Migrated components/main-nav.tsx to components/layout/navigation/main-nav.tsx"
fi

if [ -f "components/mobile-nav.tsx" ]; then
  cp components/mobile-nav.tsx components/layout/navigation/mobile-nav.tsx
  echo "Migrated components/mobile-nav.tsx to components/layout/navigation/mobile-nav.tsx"
fi

if [ -f "components/nav.tsx" ]; then
  cp components/nav.tsx components/layout/navigation/nav.tsx
  echo "Migrated components/nav.tsx to components/layout/navigation/nav.tsx"
fi

# Step 3: Migrate footer components
echo "Step 3: Migrating footer components..."

# Check if footer components exist and migrate them
if [ -d "components/footer" ]; then
  cp -r components/footer/* components/layout/footer/
  echo "Migrated components/footer to components/layout/footer/"
fi

# Check if individual footer files exist and migrate them
if [ -f "components/site-footer.tsx" ]; then
  cp components/site-footer.tsx components/layout/footer/site-footer.tsx
  echo "Migrated components/site-footer.tsx to components/layout/footer/site-footer.tsx"
fi

if [ -f "components/footer.tsx" ]; then
  cp components/footer.tsx components/layout/footer/footer.tsx
  echo "Migrated components/footer.tsx to components/layout/footer/footer.tsx"
fi

# Step 4: Migrate container components
echo "Step 4: Migrating container components..."

# Check if container components exist and migrate them
if [ -f "components/container.tsx" ]; then
  cp components/container.tsx components/layout/container/container.tsx
  echo "Migrated components/container.tsx to components/layout/container/container.tsx"
fi

# Step 5: Create index files
echo "Step 5: Creating index files..."

# Create header index file
cat > components/layout/header/index.ts << EOF
export * from './nav-links';
export * from './mobile-nav';
// Add other exports as needed
EOF
echo "Created components/layout/header/index.ts"

# Create footer index file
cat > components/layout/footer/index.ts << EOF
export * from './footer-bottom';
export * from './footer-social';
export * from './footer-nav';
export * from './footer-logo';
export * from './footer-contact';
// Add other exports as needed
EOF
echo "Created components/layout/footer/index.ts"

# Create navigation index file
cat > components/layout/navigation/index.ts << EOF
export * from './main-nav';
export * from './mobile-nav';
export * from './nav';
// Add other exports as needed
EOF
echo "Created components/layout/navigation/index.ts"

# Create container index file
cat > components/layout/container/index.ts << EOF
export * from './container';
// Add other exports as needed
EOF
echo "Created components/layout/container/index.ts"

# Create main layout index file
cat > components/layout/index.ts << EOF
export * from './header';
export * from './footer';
export * from './navigation';
export * from './container';
// Add other exports as needed
EOF
echo "Created components/layout/index.ts"

# Step 6: Update imports
echo "Step 6: Updating imports..."

# Find files that import from the old locations and update them
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/header" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/header|from '@/components/layout/header|g" "$file"
  echo "Updated header imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/footer" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/footer|from '@/components/layout/footer|g" "$file"
  echo "Updated footer imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/main-nav" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/main-nav|from '@/components/layout/navigation/main-nav|g" "$file"
  echo "Updated main-nav imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/mobile-nav" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/mobile-nav|from '@/components/layout/navigation/mobile-nav|g" "$file"
  echo "Updated mobile-nav imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/nav" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/nav|from '@/components/layout/navigation/nav|g" "$file"
  echo "Updated nav imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/site-footer" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/site-footer|from '@/components/layout/footer/site-footer|g" "$file"
  echo "Updated site-footer imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/footer" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/footer|from '@/components/layout/footer|g" "$file"
  echo "Updated footer imports in $file"
done

find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/container" | grep -v "node_modules" | while read file; do
  sed -i '' "s|from ['\"].*components/container|from '@/components/layout/container/container|g" "$file"
  echo "Updated container imports in $file"
done

echo "Phase 2 Migration complete!"
echo "Next steps:"
echo "1. Review the migrated files"
echo "2. Test your application"
echo "3. Commit your changes"
echo "4. Move on to Phase 3: Shared Components"

# Ask if the user wants to commit the changes
read -p "Would you like to commit the changes? (y/n) " commit_changes

if [ "$commit_changes" = "y" ]; then
  git add .
  git commit -m "Phase 2: Migrate layout components to new structure"
  echo "Committed layout component changes"
fi

