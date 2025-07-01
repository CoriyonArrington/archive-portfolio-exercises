#!/bin/bash

echo "Fixing imports for macOS..."

# Create the mode-toggle component if it doesn't exist
mkdir -p components/shared
touch components/shared/mode-toggle.tsx

# Update the header import
if [ -f "components/layout/header.tsx" ]; then
  # Use macOS-compatible sed syntax
  sed -i '' 's|import { ModeToggle } from "@/components/mode-toggle"|import { ModeToggle } from "@/components/shared/mode-toggle"|g' components/layout/header.tsx
  echo "Updated ModeToggle import in header.tsx"
fi

# Create an index.ts file in the shared directory to export components
cat > components/shared/index.ts << 'EOF'
export * from './mode-toggle'
// Add other exports as needed
EOF

echo "Created components/shared/index.ts"

echo "Import fixes complete!"

