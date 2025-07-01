#!/bin/bash

# Create hooks directory if it doesn't exist
mkdir -p lib/hooks

# Create an index.ts file to re-export all hooks
cat > lib/hooks/index.ts << 'EOF'
// Re-export all hooks
export * from './use-media-query';
export * from './use-local-storage';
export * from './use-mobile';
export * from './use-responsive';
// Add more exports as you migrate hooks
EOF

# Copy hooks from their original locations
echo "Migrating hooks..."

# Check if hooks/use-mobile.tsx exists and migrate it
if [ -f hooks/use-mobile.tsx ]; then
  echo "Migrating hooks/use-mobile.tsx to lib/hooks/use-mobile.ts"
  cp hooks/use-mobile.tsx lib/hooks/use-mobile.ts
fi

# Check if hooks/use-media-query.ts exists and migrate it
if [ -f hooks/use-media-query.ts ]; then
  echo "Migrating hooks/use-media-query.ts to lib/hooks/use-media-query.ts"
  cp hooks/use-media-query.ts lib/hooks/use-media-query.ts
fi

# Check if hooks/use-responsive.ts exists and migrate it
if [ -f hooks/use-responsive.ts ]; then
  echo "Migrating hooks/use-responsive.ts to lib/hooks/use-responsive.ts"
  cp hooks/use-responsive.ts lib/hooks/use-responsive.ts
fi

# Check if hooks/use-mobile-viewport.tsx exists and migrate it
if [ -f hooks/use-mobile-viewport.tsx ]; then
  echo "Migrating hooks/use-mobile-viewport.tsx to lib/hooks/use-mobile-viewport.ts"
  cp hooks/use-mobile-viewport.tsx lib/hooks/use-mobile-viewport.ts
fi

# Check if components/ui/use-mobile.tsx exists and migrate it
if [ -f components/ui/use-mobile.tsx ]; then
  echo "Migrating components/ui/use-mobile.tsx to lib/hooks/use-mobile-ui.ts"
  cp components/ui/use-mobile.tsx lib/hooks/use-mobile-ui.ts
  # Update the index.ts file to include the new hook
  echo "export * from './use-mobile-ui';" >> lib/hooks/index.ts
fi

echo "Hooks migration complete!"

