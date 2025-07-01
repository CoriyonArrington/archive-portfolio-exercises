#!/bin/bash

echo "Starting route group reorganization..."

# Create the new admin directory if it doesn't exist
if [ ! -d "app/admin" ]; then
  mkdir -p app/admin
  echo "Created app/admin directory"
fi

# Check if the source directory exists
if [ ! -d "app/(admin)" ]; then
  echo "Error: Source directory app/(admin) not found"
  exit 1
fi

echo "Moving files from app/(admin) to app/admin..."

# List all files in the source directory
echo "Files in source directory:"
ls -la "app/(admin)"

# Copy files instead of moving to prevent issues
cp -r "app/(admin)"/* app/admin/ 2>/dev/null
if [ $? -ne 0 ]; then
  echo "Error copying files. Trying alternative method..."
  
  # Alternative method using find
  find "app/(admin)" -type f -exec cp {} app/admin/ \;
  find "app/(admin)" -type d -not -path "app/(admin)" -exec mkdir -p app/admin/{} \;
  
  # Check if any files were copied
  if [ "$(ls -A app/admin)" ]; then
    echo "Files copied successfully using alternative method"
  else
    echo "Error: Failed to copy files. Please copy manually from app/(admin) to app/admin"
    exit 1
  fi
else
  echo "Files copied successfully"
fi

# Update import paths in all files
echo "Updating import paths..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs grep -l "(admin)" | while read file; do
  echo "Updating file: $file"
  sed -i.bak "s|app/(admin)|app/admin|g" "$file"
  sed -i.bak "s|/(admin)|/admin|g" "$file"
  rm -f "$file.bak"
done

# Update README.md
echo "Updating README.md..."
if [ -f "app/README.md" ]; then
  # Create backup
  cp app/README.md app/README.md.bak
  
  # Update content
  sed -i.bak 's|`(admin)/`|`admin/`|g' app/README.md
  sed -i.bak 's|`/(admin)/page`|`/admin/page`|g' app/README.md
  sed -i.bak 's|(admin)/|admin/|g' app/README.md
  
  # Remove backup
  rm -f app/README.md.bak
  
  echo "README.md updated"
else
  echo "README.md not found. Creating new one..."
  
  # Create new README.md with updated structure
  cat > app/README.md << 'EOF'
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

- `admin/` - Admin dashboard and management interfaces (real path)
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
   - The main section can have its own layout
   - The admin section can have a different layout

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
EOF

  echo "New README.md created"
fi

echo "Reorganization complete!"
echo "Please restart your development server and test the application."
echo "The admin section should now be accessible at /admin"