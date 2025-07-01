#!/bin/bash

echo "Starting Phase 1 Migration: Foundation"

# Make scripts executable
chmod +x scripts/migrate-hooks.sh
chmod +x scripts/migrate-utils.sh
chmod +x scripts/migrate-supabase.sh
chmod +x scripts/migrate-types.sh

# Run migration scripts
echo "Step 1: Migrating hooks..."
bash scripts/migrate-hooks.sh

echo "Step 2: Migrating utilities..."
bash scripts/migrate-utils.sh

echo "Step 3: Migrating Supabase utilities..."
bash scripts/migrate-supabase.sh

echo "Step 4: Creating type definitions..."
bash scripts/migrate-types.sh

echo "Phase 1 Migration complete!"
echo "Next steps:"
echo "1. Review the migrated files"
echo "2. Update imports in your codebase"
echo "3. Test your application"
echo "4. Commit your changes"

echo "Would you like to commit the changes? (y/n)"
read -r commit_changes

if [ "$commit_changes" = "y" ]; then
  git add .
  git commit -m "Phase 1: Migrate utility functions, hooks, and types to new structure"
  echo "Changes committed!"
else
  echo "Changes not committed. You can commit them manually when ready."
fi

