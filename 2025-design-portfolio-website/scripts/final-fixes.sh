#!/bin/bash

# Final fixes script for the codebase reorganization
echo "Starting final fixes..."

# 1. Remove the duplicate about-cta.tsx file
echo "Removing duplicate about-cta.tsx file..."
rm -f components/about/about-cta.tsx

# 2. Fix the import path for health-progress-tracker in hero-showcase.tsx
echo "Fixing import path for health-progress-tracker in hero-showcase.tsx..."
sed -i '' 's|import HealthProgressTracker from "@/components/health-progress-tracker"|import { HealthProgressTracker } from "@/components/shared"|g' components/home/hero-showcase.tsx

# 3. Fix the import path for browser-mockup in hero-showcase.tsx
echo "Fixing import path for browser-mockup in hero-showcase.tsx..."
sed -i '' 's|import BrowserMockup from "@/components/browser-mockup"|import { BrowserMockup } from "@/components/sections/common"|g' components/home/hero-showcase.tsx

# 4. Update index files to ensure components are properly exported
echo "Updating index files..."
# Add export for health-progress-tracker to shared/index.ts
if ! grep -q "health-progress-tracker" components/shared/index.ts; then
  echo "export * from './health-progress-tracker'" >> components/shared/index.ts
fi

# Add export for browser-mockup to sections/common/index.ts
if ! grep -q "browser-mockup" components/sections/common/index.ts; then
  echo "export * from './browser-mockup'" >> components/sections/common/index.ts
fi

echo "Final fixes completed!"

