
## Import Fixing Script

Here's a script to help fix imports after reorganization:

```bash
#!/bin/bash

echo "Scanning for potential broken imports..."

# Find all TypeScript and TSX files
FILES=$(find . -type f -name "*.ts" -o -name "*.tsx" | grep -v "node_modules" | grep -v ".next")

# Common import patterns that might need updating
echo "Checking for component imports that need updating..."

for FILE in $FILES; do
  # Check for imports from old locations
  if grep -q "from ['\"]@/components/footer" "$FILE"; then
    echo "Found potential broken import in $FILE: footer component"
    echo "  Consider changing to: @/components/layout/footer"
  fi
  
  if grep -q "from ['\"]@/components/header" "$FILE"; then
    echo "Found potential broken import in $FILE: header component"
    echo "  Consider changing to: @/components/layout/header"
  fi
  
  if grep -q "from ['\"]@/components/about" "$FILE"; then
    echo "Found potential broken import in $FILE: about component"
    echo "  Consider changing to: @/components/sections/about"
  fi
  
  # Add more patterns as needed
done

echo "Import check complete. Please review the suggested changes."