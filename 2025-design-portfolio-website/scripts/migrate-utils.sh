#!/bin/bash

# Create utils directory if it doesn't exist
mkdir -p lib/utils

# Create an index.ts file to re-export all utilities
cat > lib/utils/index.ts << 'EOF'
// Re-export all utilities
export * from './date-utils';
export * from './string-utils';
export * from './project-helpers';
export * from './accessibility';
export * from './responsive';
export * from './format-string';
export * from './fetch-helpers';
export * from './supabase-helpers';
export * from './process-array-data';
export * from './color-contrast';
export * from './focus-trap';
export * from './image-debug';
// Add more exports as you migrate utilities
EOF

# Copy utilities from their original locations
echo "Migrating utilities..."

# Check if lib/utils.ts exists and migrate it
if [ -f lib/utils.ts ]; then
  echo "Migrating lib/utils.ts to lib/utils/general-utils.ts"
  cp lib/utils.ts lib/utils/general-utils.ts
  # Update the index.ts file to include the new utility
  echo "export * from './general-utils';" >> lib/utils/index.ts
fi

# Check if lib/navigation.ts exists and migrate it
if [ -f lib/navigation.ts ]; then
  echo "Migrating lib/navigation.ts to lib/utils/navigation-utils.ts"
  cp lib/navigation.ts lib/utils/navigation-utils.ts
  # Update the index.ts file to include the new utility
  echo "export * from './navigation-utils';" >> lib/utils/index.ts
fi

# Check if lib/storage.ts exists and migrate it
if [ -f lib/storage.ts ]; then
  echo "Migrating lib/storage.ts to lib/utils/storage-utils.ts"
  cp lib/storage.ts lib/utils/storage-utils.ts
  # Update the index.ts file to include the new utility
  echo "export * from './storage-utils';" >> lib/utils/index.ts
fi

# Check if lib/monitoring.ts exists and migrate it
if [ -f lib/monitoring.ts ]; then
  echo "Migrating lib/monitoring.ts to lib/utils/monitoring-utils.ts"
  cp lib/monitoring.ts lib/utils/monitoring-utils.ts
  # Update the index.ts file to include the new utility
  echo "export * from './monitoring-utils';" >> lib/utils/index.ts
fi

# Check if lib/testimonials.ts exists and migrate it
if [ -f lib/testimonials.ts ]; then
  echo "Migrating lib/testimonials.ts to lib/data/testimonials.ts"
  mkdir -p lib/data
  cp lib/testimonials.ts lib/data/testimonials.ts
fi

# Check if lib/image-optimization.ts exists and migrate it
if [ -f lib/image-optimization.ts ]; then
  echo "Migrating lib/image-optimization.ts to lib/utils/image-optimization.ts"
  cp lib/image-optimization.ts lib/utils/image-optimization.ts
  # Update the index.ts file to include the new utility
  echo "export * from './image-optimization';" >> lib/utils/index.ts
fi

echo "Utilities migration complete!"

