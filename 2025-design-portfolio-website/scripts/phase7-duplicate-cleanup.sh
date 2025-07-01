#!/bin/bash

# Phase 7: Duplicate Component Cleanup
# This script resolves duplicate components by keeping the ones in the preferred directories
# and updating imports to reference the correct components.

set -e

echo "Starting Phase 7: Duplicate Component Cleanup"

# Create reports directory if it doesn't exist
mkdir -p reports

# Function to determine the preferred location for a component
get_preferred_location() {
  local component=$1
  local locations=("${@:2}")
  
  # Preferred directory order (most preferred first)
  local preferred_dirs=(
    "components/sections/"
    "components/admin/"
    "components/ui/"
    "components/shared/"
    "components/layout/"
  )
  
  # Check if any location matches our preferred directories in order
  for preferred in "${preferred_dirs[@]}"; do
    for location in "${locations[@]}"; do
      if [[ $location == $preferred* ]]; then
        echo "$location"
        return
      fi
    done
  done
  
  # If no preferred location found, use the first one
  echo "${locations[0]}"
}

# Function to update imports in a file
update_imports() {
  local file=$1
  local old_path=$2
  local new_path=$3
  local component=$(basename "$old_path" .tsx)
  
  # Skip if file doesn't exist
  if [ ! -f "$file" ]; then
    return
  fi
  
  # Check if the file imports the component
  if grep -q "from ['\"].*$old_path['\"]" "$file" || grep -q "from ['\"].*/$component['\"]" "$file"; then
    # Update the import
    sed -i.bak "s|from ['\"].*$old_path['\"]|from '$new_path'|g" "$file"
    sed -i.bak "s|from ['\"].*/$component['\"]|from '$new_path'|g" "$file"
    echo "Updated imports in $file"
    rm -f "$file.bak"
  fi
}

# Read the duplicate components report
echo "Step 1: Analyzing duplicate components..."
duplicate_report="reports/duplicate_components.md"

# Create a log file for the changes
changes_log="reports/duplicate_cleanup_changes.md"
echo "# Duplicate Component Cleanup Changes" > "$changes_log"
echo "" >> "$changes_log"
echo "Generated on: $(date)" >> "$changes_log"
echo "" >> "$changes_log"
echo "This report lists the changes made to resolve duplicate components." >> "$changes_log"
echo "" >> "$changes_log"
echo "## Components Kept" >> "$changes_log"
echo "" >> "$changes_log"
echo "| Component | Kept Location | Removed Locations |" >> "$changes_log"
echo "|-----------|---------------|-------------------|" >> "$changes_log"

# Process each duplicate component
current_component=""
component_locations=()

# Count variables
total_duplicates=0
total_removed=0

while IFS= read -r line; do
  # Check if this is a component header line
  if [[ $line =~ ^###\ (.+)$ ]]; then
    # If we have a previous component to process
    if [ ! -z "$current_component" ]; then
      # Determine the preferred location
      preferred=$(get_preferred_location "$current_component" "${component_locations[@]}")
      
      # Log the decision
      removed_locations=()
      for location in "${component_locations[@]}"; do
        if [ "$location" != "$preferred" ]; then
          removed_locations+=("$location")
        fi
      done
      
      # Format the removed locations for the log
      removed_formatted=$(printf "%s<br>" "${removed_locations[@]}")
      echo "| $current_component | $preferred | ${removed_formatted} |" >> "$changes_log"
      
      # Update imports in all files to reference the preferred location
      echo "Processing $current_component..."
      for location in "${removed_locations[@]}"; do
        # Find all files that import this component
        find . -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
          update_imports "$file" "$location" "$preferred"
        done
        
        # Remove the duplicate component
        if [ -f "$location" ]; then
          rm -f "$location"
          echo "Removed duplicate: $location"
          ((total_removed++))
        fi
      done
      
      ((total_duplicates++))
    fi
    
    # Start tracking a new component
    current_component="${BASH_REMATCH[1]}"
    component_locations=()
  elif [[ $line =~ ^-\ (.+)$ ]]; then
    # This is a location line
    location="${BASH_REMATCH[1]}"
    component_locations+=("$location")
  fi
done < <(grep -A 2 "^###" "$duplicate_report" | grep -v "^--$")

# Process the last component
if [ ! -z "$current_component" ]; then
  preferred=$(get_preferred_location "$current_component" "${component_locations[@]}")
  
  removed_locations=()
  for location in "${component_locations[@]}"; do
    if [ "$location" != "$preferred" ]; then
      removed_locations+=("$location")
    fi
  done
  
  removed_formatted=$(printf "%s<br>" "${removed_locations[@]}")
  echo "| $current_component | $preferred | ${removed_formatted} |" >> "$changes_log"
  
  echo "Processing $current_component..."
  for location in "${removed_locations[@]}"; do
    find . -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
      update_imports "$file" "$location" "$preferred"
    done
    
    if [ -f "$location" ]; then
      rm -f "$location"
      echo "Removed duplicate: $location"
      ((total_removed++))
    fi
  done
  
  ((total_duplicates++))
fi

echo "" >> "$changes_log"
echo "## Summary" >> "$changes_log"
echo "" >> "$changes_log"
echo "- Total duplicate components processed: $total_duplicates" >> "$changes_log"
echo "- Total duplicate files removed: $total_removed" >> "$changes_log"

echo "Step 2: Updating index files..."
# Update index files to ensure they export the correct components
find components -type d | while read -r dir; do
  if [ -d "$dir" ]; then
    # Skip the root components directory
    if [ "$dir" == "components" ]; then
      continue
    fi
    
    # Create or update the index file
    index_file="$dir/index.ts"
    echo "// Generated index file for $dir" > "$index_file"
    echo "" >> "$index_file"
    
    # Add exports for all .tsx files in the directory
    find "$dir" -maxdepth 1 -name "*.tsx" | sort | while read -r component; do
      component_name=$(basename "$component" .tsx)
      echo "export * from './$component_name'" >> "$index_file"
    done
    
    echo "Updated index file for $dir"
  fi
done

echo "Step 3: Final validation..."
# Check for any remaining issues
remaining_duplicates=$(find components -name "*.tsx" | sort | uniq -d -f1)
if [ ! -z "$remaining_duplicates" ]; then
  echo "Warning: Some duplicate filenames still exist:"
  echo "$remaining_duplicates"
  echo "These may be in different directories and not actual duplicates."
fi

echo "Phase 7: Duplicate Component Cleanup complete!"
echo "Next steps:"
echo "1. Review the changes log in reports/duplicate_cleanup_changes.md"
echo "2. Test your application thoroughly"
echo "3. Commit your changes"
echo "4. Congratulations on completing the codebase reorganization!"

read -p "Would you like to commit the changes? (y/n) " commit_changes
if [ "$commit_changes" == "y" ]; then
  git add .
  git commit -m "Phase 7: Resolve duplicate components"
  echo "Changes committed!"
else
  echo "Phase 7: Duplicate Component Cleanup complete!"
fi

