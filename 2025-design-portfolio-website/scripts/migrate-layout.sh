#!/bin/bash

# Script to assist with migrating layout components

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting layout component migration...${NC}"

# Create directories for layout components
mkdir -p components/layout/header
mkdir -p components/layout/footer
mkdir -p components/layout/navigation

# Create index files for layout directories
echo -e "${YELLOW}Creating index files for layout directories...${NC}"

# Create components/layout/header/index.tsx
cat > components/layout/header/index.tsx << 'EOL'
/**
 * Header components index
 * 
 * This file exports all header components to provide a centralized import point.
 */

export * from './header';
// Add more exports as you migrate header components
EOL

# Create components/layout/footer/index.tsx
cat > components/layout/footer/index.tsx << 'EOL'
/**
 * Footer components index
 * 
 * This file exports all footer components to provide a centralized import point.
 */

export * from './footer';
// Add more exports as you migrate footer components
EOL

# Create components/layout/navigation/index.tsx
cat > components/layout/navigation/index.tsx << 'EOL'
/**
 * Navigation components index
 * 
 * This file exports all navigation components to provide a centralized import point.
 */

export * from './main-nav';
export * from './mobile-nav';
// Add more exports as you migrate navigation components
EOL

# Create components/layout/index.tsx
cat > components/layout/index.tsx << 'EOL'
/**
 * Layout components index
 * 
 * This file exports all layout components to provide a centralized import point.
 */

export * from './header';
export * from './footer';
export * from './navigation';
// Add more exports as you migrate layout components
EOL

echo -e "${GREEN}Created index files for layout directories${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Identify all header components in your codebase"
echo "2. Migrate header components to components/layout/header/"
echo "3. Identify all footer components in your codebase"
echo "4. Migrate footer components to components/layout/footer/"
echo "5. Identify all navigation components in your codebase"
echo "6. Migrate navigation components to components/layout/navigation/"
echo ""
echo -e "${YELLOW}Example migration commands:${NC}"
echo "cp path/to/original/header.tsx components/layout/header/header.tsx"
echo "cp path/to/original/footer.tsx components/layout/footer/footer.tsx"
echo "cp path/to/original/nav.tsx components/layout/navigation/main-nav.tsx"
echo ""
echo -e "${GREEN}Layout component migration setup complete!${NC}"

