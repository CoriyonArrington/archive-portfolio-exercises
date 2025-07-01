#!/bin/bash

# Script to assist with migrating utility functions to the new structure

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting utility migration process...${NC}"

# Create index files for utility directories
echo -e "${YELLOW}Creating index files for utility directories...${NC}"

# Create lib/utils/index.ts
cat > lib/utils/index.ts << 'EOL'
/**
 * Utility functions index
 * 
 * This file exports all utility functions from the utils directory
 * to provide a centralized import point.
 */

// Re-export utility functions
export * from './date-utils';
export * from './string-utils';
export * from './format-utils';
export * from './validation-utils';
// Add more exports as you migrate utilities
EOL

# Create lib/hooks/index.ts
cat > lib/hooks/index.ts << 'EOL'
/**
 * Custom hooks index
 * 
 * This file exports all custom hooks from the hooks directory
 * to provide a centralized import point.
 */

// Re-export hooks
export * from './use-media-query';
export * from './use-local-storage';
// Add more exports as you migrate hooks
EOL

# Create lib/supabase/index.ts
cat > lib/supabase/index.ts << 'EOL'
/**
 * Supabase client and helpers index
 * 
 * This file exports the Supabase client and helper functions
 * to provide a centralized import point.
 */

// Re-export Supabase client and helpers
export * from './client';
export * from './helpers';
// Add more exports as you migrate Supabase utilities
EOL

# Create types/index.ts
cat > types/index.ts << 'EOL'
/**
 * Type definitions index
 * 
 * This file exports all type definitions to provide a centralized import point.
 */

// Re-export type definitions
export * from './project-types';
export * from './testimonial-types';
export * from './service-types';
// Add more exports as you migrate type definitions
EOL

echo -e "${GREEN}Created index files for utility directories${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Migrate utility functions to lib/utils/"
echo "2. Migrate custom hooks to lib/hooks/"
echo "3. Migrate Supabase client and helpers to lib/supabase/"
echo "4. Migrate type definitions to types/"
echo ""
echo -e "${YELLOW}Example migration commands:${NC}"
echo "cp path/to/original/date-utils.ts lib/utils/date-utils.ts"
echo "cp path/to/original/use-media-query.ts lib/hooks/use-media-query.ts"
echo ""
echo -e "${GREEN}Utility migration setup complete!${NC}"

