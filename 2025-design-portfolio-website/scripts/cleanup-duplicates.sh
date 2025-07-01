#!/bin/bash

echo "Starting cleanup of duplicate files..."

# Function to find and handle duplicates
find_and_handle_duplicates() {
  local dir=$1
  local pattern=$2
  local preferred_location=$3
  
  echo "Checking for duplicates in $dir matching $pattern..."
  
  # Find all files matching the pattern
  files=$(find $dir -name "$pattern" | sort)
  
  # If no files found, exit
  if [ -z "$files" ]; then
    echo "No files found matching $pattern in $dir"
    return
  fi
  
  # Count unique base filenames
  unique_basenames=$(echo "$files" | xargs -n1 basename | sort | uniq)
  
  # For each unique basename
  for basename in $unique_basenames; do
    # Find all instances of this file
    instances=$(find $dir -name "$basename" | sort)
    instance_count=$(echo "$instances" | wc -l)
    
    # If more than one instance, we have duplicates
    if [ $instance_count -gt 1 ]; then
      echo "Found $instance_count instances of $basename:"
      echo "$instances"
      
      # Determine which one to keep based on preferred location
      keep_file=$(echo "$instances" | grep -E "$preferred_location" | head -n1)
      
      # If no file matches preferred location, keep the first one
      if [ -z "$keep_file" ]; then
        keep_file=$(echo "$instances" | head -n1)
      fi
      
      echo "Keeping: $keep_file"
      
      # Remove other instances
      for file in $instances; do
        if [ "$file" != "$keep_file" ]; then
          echo "Removing duplicate: $file"
          rm -f "$file"
          
          # Create directory for the file if it doesn't exist
          mkdir -p $(dirname "$keep_file")
          
          # Update imports in all files
          find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs grep -l "$(basename $file .tsx)" | while read -r source_file; do
            # Get the relative path from source file to the kept file
            source_dir=$(dirname "$source_file")
            relative_path=$(realpath --relative-to="$source_dir" "$keep_file")
            
            # Remove leading ./ if present
            relative_path=$(echo "$relative_path" | sed 's|^\./||')
            
            # Update import paths
            sed -i "s|from ['\"].*$(basename $file .tsx)['\"]|from \"$relative_path\"|g" "$source_file"
            sed -i "s|from ['\"].*$(basename $file .ts)['\"]|from \"$relative_path\"|g" "$source_file"
            sed -i "s|from ['\"].*$(basename $file .js)['\"]|from \"$relative_path\"|g" "$source_file"
            sed -i "s|from ['\"].*$(basename $file .jsx)['\"]|from \"$relative_path\"|g" "$source_file"
            
            # Update @/ imports
            module_name=$(basename $file | sed 's/\.[^.]*$//')
            sed -i "s|from ['\"]@/.*/$module_name['\"]|from \"@/$(echo $keep_file | sed 's|^./||' | sed 's|\.tsx$||' | sed 's|\.ts$||' | sed 's|\.jsx$||' | sed 's|\.js$||')\"|g" "$source_file"
          done
        fi
      done
    fi
  done
}

# Clean up lib directory
echo "Cleaning up /lib directory..."
find_and_handle_duplicates "./lib" "*.ts" "lib/utils"

# Clean up app directory
echo "Cleaning up /app directory..."
find_and_handle_duplicates "./app" "*.tsx" "app/components"
find_and_handle_duplicates "./app" "*.ts" "app/api"

echo "Cleanup complete!"

