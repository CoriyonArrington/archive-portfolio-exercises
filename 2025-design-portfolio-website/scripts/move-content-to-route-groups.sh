#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p .backup/app-before-move

echo "Creating backup of current app directory..."
cp -R app/* .backup/app-before-move/

echo "Moving content from duplicate directories to route groups..."

# Function to move content from a source directory to a destination
move_content() {
  local src="$1"
  local dest="$2"
  
  if [ -d "$src" ]; then
    echo "Moving content from $src to $dest"
    
    # Create destination directory if it doesn't exist
    mkdir -p "$dest"
    
    # Copy files from source to destination
    if [ "$(ls -A "$src")" ]; then
      cp -R "$src"/* "$dest"/ 2>/dev/null || true
    fi
    
    # Create a backup of the source directory
    mkdir -p ".backup/$(dirname "$src")"
    cp -R "$src" ".backup/$src"
    
    # Remove the source directory
    rm -rf "$src"
    
    echo "Moved content from $src to $dest"
  else
    echo "Source directory $src does not exist, skipping"
  fi
}

# Map of source directories to destination directories
declare -A move_map
move_map["app/about"]="app/(main)/about"
move_map["app/contact"]="app/(main)/contact"
move_map["app/services"]="app/(main)/services"
move_map["app/work"]="app/(main)/work"
move_map["app/process"]="app/(main)/process"
move_map["app/admin"]="app/(admin)"
move_map["app/testimonials"]="app/(admin)/testimonials"
move_map["app/resume"]="app/(main)/resume"

# Move content according to the map
for src in "${!move_map[@]}"; do
  dest="${move_map[$src]}"
  move_content "$src" "$dest"
done

# Move API routes if they exist
if [ -d "app/api" ]; then
  echo "Preserving API routes"
  # API routes stay at the root level in app/api
fi

# Move actions to a lib directory if they exist
if [ -d "app/actions" ]; then
  echo "Moving actions to lib/actions"
  mkdir -p "lib/actions"
  cp -R "app/actions"/* "lib/actions"/ 2>/dev/null || true
  mkdir -p ".backup/app/actions"
  cp -R "app/actions" ".backup/app/"
  rm -rf "app/actions"
  echo "Moved actions to lib/actions"
fi

echo "Content has been moved to route groups!"
echo "Backup of original directories is stored in .backup/"
echo ""
echo "Next steps:"
echo "1. Check that all content has been moved correctly"
echo "2. Update imports in your code to reflect the new file locations"
echo "3. Test your application to ensure everything works correctly"

