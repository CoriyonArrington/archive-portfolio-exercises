#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting route group reorganization...${NC}"

# 1. Create the new admin directory if it doesn't exist
mkdir -p app/admin
echo -e "${GREEN}Created app/admin directory${NC}"

# 2. Move all files from app/(admin) to app/admin
if [ -d "app/(admin)" ]; then
  echo -e "${YELLOW}Moving files from app/(admin) to app/admin...${NC}"
  
  # First, copy all files to ensure we don't lose anything
  cp -r app/$$admin$$/* app/admin/
  
  # Check if copy was successful
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully copied files to app/admin${NC}"
    
    # Now remove the original directory
    rm -rf app/$$admin$$
    echo -e "${GREEN}Removed app/(admin) directory${NC}"
  else
    echo -e "${RED}Error copying files. Please check permissions and try again.${NC}"
    exit 1
  fi
else
  echo -e "${YELLOW}app/(admin) directory not found. Skipping move operation.${NC}"
fi

# 3. Update import paths in all TypeScript/JavaScript files
echo -e "${YELLOW}Updating import paths in files...${NC}"

# Find all TypeScript and JavaScript files
FILES=$(find . -type f $$ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" $$ -not -path "./node_modules/*")

# Update import paths from (admin) to admin
for FILE in $FILES; do
  # Use sed to replace import paths
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS requires an empty string for -i
    sed -i '' 's|from "app/(admin)|from "app/admin|g' "$FILE"
    sed -i '' "s|from 'app/(admin)|from 'app/admin|g" "$FILE"
    sed -i '' 's|from "@/app/(admin)|from "@/app/admin|g' "$FILE"
    sed -i '' "s|from '@/app/(admin)|from '@/app/admin|g" "$FILE"
    sed -i '' 's|import("app/(admin)|import("app/admin|g' "$FILE"
    sed -i '' "s|import('app/(admin)|import('app/admin|g" "$FILE"
  else
    # Linux version
    sed -i 's|from "app/(admin)|from "app/admin|g' "$FILE"
    sed -i "s|from 'app/(admin)|from 'app/admin|g" "$FILE"
    sed -i 's|from "@/app/(admin)|from "@/app/admin|g' "$FILE"
    sed -i "s|from '@/app/(admin)|from '@/app/admin|g" "$FILE"
    sed -i 's|import("app/(admin)|import("app/admin|g' "$FILE"
    sed -i "s|import('app/(admin)|import('app/admin|g" "$FILE"
  fi
done

echo -e "${GREEN}Updated import paths in all files${NC}"

# 4. Update the README.md file
echo -e "${YELLOW}Updating app/README.md...${NC}"

# Create the updated README content
cat > app/README.md << 'EOL'
# App Directory Structure

This directory contains the Next.js App Router pages and routes for the portfolio website.

## Route Structure

The app uses a combination of route groups and real paths to organize the application:

- `(main)/` - Route group for public-facing pages (doesn't affect URL)
  - `page.tsx` - Home page (/)
  - `about/` - About page (/about)
  - `contact/` - Contact page (/contact)
  - `work/` - Portfolio work (/work)
  - `services/` - Services offered (/services)
  - `process/` - Process explanation (/process)
  - `resume/` - Resume page (/resume)

- `admin/` - Real path for admin dashboard and management interfaces
  - `page.tsx` - Admin dashboard (/admin)
  - `projects/` - Project management (/admin/projects)
  - `testimonials/` - Testimonial management (/admin/testimonials)
  - `services/` - Services management (/admin/services)
  - `component-audit/` - Component audit tools (/admin/component-audit)

## API Routes

- `api/` - API routes for server-side functionality
  - `projects/` - Project-related endpoints
  - `testimonials/` - Testimonial-related endpoints
  - `services/` - Service-related endpoints
  - `revalidate/` - Cache revalidation endpoints
  - `feedback/` - Feedback submission endpoints
  - `auth/` - Authentication endpoints

## Root Files

- `layout.tsx` - Root layout with providers and global elements
- `not-found.tsx` - 404 page
- `globals.css` - Global CSS styles
- `icon.tsx` - Favicon component
- `apple-icon.tsx` - Apple device icon

## Route Organization Benefits

1. **Clear URL Structure**
   - Public pages are at root paths (/, /about, etc.)
   - Admin pages are under /admin path for clear separation

2. **Multiple Root Layouts**
   - The (main) route group can have its own layout
   - The admin section has a different layout

3. **Code Organization**
   - Keeps related routes together
   - Makes it easier to manage permissions and layouts

## File Organization

- Page components are named `page.tsx`
- Layout components are named `layout.tsx`
- Loading states are in `loading.tsx`
- Error handling in `error.tsx`
- Page-specific components should be in `app/(main)/[route]/components/` or `app/admin/[route]/components/`
- Shared components should be in `/components/` at the root

## Best Practices

- Keep page components lightweight
- Extract complex logic to separate files
- Use server components by default
- Only add 'use client' when necessary
- Follow the naming conventions consistently
EOL

echo -e "${GREEN}Updated app/README.md${NC}"

# 5. Final message
echo -e "${GREEN}Route group reorganization complete!${NC}"
echo -e "${YELLOW}Please check your application to ensure everything is working correctly.${NC}"
echo -e "${YELLOW}You may need to restart your development server.${NC}"