#!/bin/bash

# Fix Section Indexes Script
# This script fixes the index.ts files for section components

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing section index files...${NC}"

# Function to create a simple index file for a section directory
create_simple_index() {
  local section_dir=$1
  local section_name=$(basename "$section_dir")
  
  echo -e "${BLUE}Creating simple index file for ${section_name} section...${NC}"
  
  # Create a simple index file that exports all components in the directory
  cat > "${section_dir}/index.ts" << EOF
// Export all ${section_name} section components

// Import and export all components from this directory
$(find "${section_dir}" -maxdepth 1 -name "*.tsx" | while read file; do
  component_name=$(basename "$file" .tsx)
  echo "export { default as ${component_name^} } from './${component_name}';"
done)
EOF

  echo -e "Created simple index file for ${section_name} section"
}

# Create simple index files for each section directory
create_simple_index "components/sections/home"
create_simple_index "components/sections/about"
create_simple_index "components/sections/work"
create_simple_index "components/sections/services"
create_simple_index "components/sections/process"
create_simple_index "components/sections/contact"
create_simple_index "components/sections/testimonials"
create_simple_index "components/sections/common"

# Create main sections index file
cat > "components/sections/index.ts" << EOF
// Export all section components

// Home sections
export * from './home';

// About sections
export * from './about';

// Work sections
export * from './work';

// Services sections
export * from './services';

// Process sections
export * from './process';

// Contact sections
export * from './contact';

// Testimonial sections
export * from './testimonials';

// Common sections
export * from './common';
EOF

echo -e "${GREEN}Section index files fixed successfully!${NC}"

