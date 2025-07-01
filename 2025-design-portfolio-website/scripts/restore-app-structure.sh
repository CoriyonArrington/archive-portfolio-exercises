#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p .backup/app-restore

echo "Creating backup of current app directory..."
cp -R app/* .backup/app-restore/

# Define the intended structure
echo "Setting up the intended directory structure..."

# Create main route group if it doesn't exist
if [ ! -d "app/(main)" ]; then
  echo "Creating app/(main) route group..."
  mkdir -p "app/(main)"
  
  # Move relevant pages to (main) if they exist at root level
  for page in about contact work services process; do
    if [ -d "app/$page" ]; then
      echo "Moving app/$page to app/(main)/$page"
      mkdir -p "app/(main)/$page"
      cp -R "app/$page"/* "app/(main)/$page/"
    fi
  done
  
  # If root page.tsx exists, move it to (main)
  if [ -f "app/page.tsx" ]; then
    echo "Moving app/page.tsx to app/(main)/page.tsx"
    cp "app/page.tsx" "app/(main)/page.tsx"
  fi
fi

# Create admin route group if it doesn't exist
if [ ! -d "app/(admin)" ]; then
  echo "Creating app/(admin) route group..."
  mkdir -p "app/(admin)"
  
  # Move relevant admin pages if they exist
  if [ -d "app/admin" ]; then
    for page in projects testimonials services component-audit; do
      if [ -d "app/admin/$page" ]; then
        echo "Moving app/admin/$page to app/(admin)/$page"
        mkdir -p "app/(admin)/$page"
        cp -R "app/admin/$page"/* "app/(admin)/$page/"
      fi
    done
    
    # If admin page.tsx exists, move it to (admin)
    if [ -f "app/admin/page.tsx" ]; then
      echo "Moving app/admin/page.tsx to app/(admin)/page.tsx"
      cp "app/admin/page.tsx" "app/(admin)/page.tsx"
    fi
  fi
fi

# Ensure API directory exists and is properly structured
if [ ! -d "app/api" ]; then
  echo "Creating app/api directory..."
  mkdir -p "app/api"
fi

# Create necessary API subdirectories
for api_dir in projects testimonials services; do
  if [ ! -d "app/api/$api_dir" ]; then
    echo "Creating app/api/$api_dir directory..."
    mkdir -p "app/api/$api_dir"
  fi
done

echo "App directory structure has been restored according to the intended organization."
echo "You may need to manually move specific files and update imports."
echo "A backup of the previous state is available in .backup/app-restore/"

