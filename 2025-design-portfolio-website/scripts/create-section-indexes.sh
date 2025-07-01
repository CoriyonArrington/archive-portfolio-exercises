#!/bin/bash

# Create Section Indexes Script
# This script creates index files for each section directory

echo "Creating section index files..."

# Create index file for home sections
if [ -d "components/sections/home" ]; then
  echo "Creating index file for home sections..."
  
  # Get all component files in the home directory
  home_files=$(find ./components/sections/home -name "*.tsx" | sort)
  
  # Create the index file
  echo "// Home Section Components barrel export file" > components/sections/home/index.ts
  echo "// This file exports all home section components for easier imports" >> components/sections/home/index.ts
  echo "" >> components/sections/home/index.ts
  echo "// Export all home section components" >> components/sections/home/index.ts
  
  # Add export statements for each component
  for file in $home_files; do
    # Get the base filename without extension
    filename=$(basename "$file" .tsx)
    
    # Add export statement
    echo "export * from './$filename'" >> components/sections/home/index.ts
  done
  
  echo "Home sections index file created!"
fi

# Create index file for about sections
if [ -d "components/sections/about" ]; then
  echo "Creating index file for about sections..."
  
  # Get all component files in the about directory
  about_files=$(find ./components/sections/about -name "*.tsx" | sort)
  
  # Create the index file
  echo "// About Section Components barrel export file" > components/sections/about/index.ts
  echo "// This file exports all about section components for easier imports" >> components/sections/about/index.ts
  echo "" >> components/sections/about/index.ts
  echo "// Export all about section components" >> components/sections/about/index.ts
  
  # Add export statements for each component
  for file in $about_files; do
    # Get the base filename without extension
    filename=$(basename "$file" .tsx)
    
    # Add export statement
    echo "export * from './$filename'" >> components/sections/about/index.ts
  done
  
  echo "About sections index file created!"
fi

# Create index file for work sections
if [ -d "components/sections/work" ]; then
  echo "Creating index file for work sections..."
  
  # Get all component files in the work directory
  work_files=$(find ./components/sections/work -name "*.tsx" | sort)
  
  # Create the index file
  echo "// Work Section Components barrel export file" > components/sections/work/index.ts
  echo "// This file exports all work section components for easier imports" >> components/sections/work/index.ts
  echo "" >> components/sections/work/index.ts
  echo "// Export all work section components" >> components/sections/work/index.ts
  
  # Add export statements for each component
  for file in $work_files; do
    # Get the base filename without extension
    filename=$(basename "$file" .tsx)
    
    # Add export statement
    echo "export * from './$filename'" >> components/sections/work/index.ts
  done
  
  echo "Work sections index file created!"
fi

# Create index file for services sections
if [ -d "components/sections/services" ]; then
  echo "Creating index file for services sections..."
  
  # Get all component files in the services directory
  services_files=$(find ./components/sections/services -name "*.tsx" | sort)
  
  # Create the index file
  echo "// Services Section Components barrel export file" > components/sections/services/index.ts
  echo "// This file exports all services section components for easier imports" >> components/sections/services/index.ts
  echo "" >> components/sections/services/index.ts
  echo "// Export all services section components" >> components/sections/services/index.ts
  
  # Add export statements for each component
  for file in $services_files; do
    # Get the base filename without extension
    filename=$(basename "$file" .tsx)
    
    # Add export statement
    echo "export * from './$filename'" >> components/sections/services/index.ts
  done
  
  echo "Services sections index file created!"
fi

# Create index file for process sections
if [ -d "components/sections/process" ]; then
  echo "Creating index file for process sections..."
  
  # Get all component files in the process directory
  process_files=$(find ./components/sections/process -name "*.tsx" | sort)
  
  # Create the index file
  echo "// Process Section Components barrel export file" > components/sections/process/index.ts
  echo "// This file exports all process section components for easier imports" >> components/sections/process/index.ts
  echo "" >> components/sections/process/index.ts
  echo "// Export all process section components" >> components/sections/process/index.ts
  
  # Add export statements for each component
  for file in $process_files; do
    # Get the base filename without extension
    filename=$(basename "$file" .tsx)
    
    # Add export statement
    echo "export * from './$filename'" >> components/sections/process/index.ts
  done
  
  echo "Process sections index file created!"
fi

echo "Section index files created!"

