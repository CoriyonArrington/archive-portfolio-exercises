#!/bin/bash

# v0-update.sh - Comprehensive script for updating codebase with v0 downloads
# Usage: ./v0-update.sh [path-to-v0-download] [pr-title]

set -e  # Exit on any error

# Default values
V0_PATH=${1:-"$HOME/Downloads/v0-download"}
PR_TITLE=${2:-"Update codebase with v0 generated code"}
BRANCH_NAME="v0-update-$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$HOME/backup-configs"
TEMP_DIR="/tmp/v0-extract-$(date +%s)"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
  echo -e "${2}${1}${NC}"
}

print_message "Starting v0 update process..." "$BLUE"

# Check if git is installed
if ! command -v git &> /dev/null; then
  print_message "Error: git is not installed. Please install git and try again." "$RED"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  print_message "Error: Not in a git repository. Please run this script from the root of your git repository." "$RED"
  exit 1
fi

# Check if the working directory is clean
if [[ -n $(git status --porcelain) ]]; then
  print_message "Warning: You have uncommitted changes. It's recommended to commit or stash them before running this script." "$YELLOW"
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_message "Operation cancelled." "$YELLOW"
    exit 1
  fi
fi

# Step 1: Find and extract v0 download if needed
print_message "Step 1: Checking v0 download..." "$BLUE"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Check if V0_PATH is a zip file
if [[ "$V0_PATH" == *.zip ]]; then
  print_message "Found zip file, extracting..." "$GREEN"
  unzip -q "$V0_PATH" -d "$TEMP_DIR"
  # Update V0_PATH to point to the extracted directory
  V0_PATH="$TEMP_DIR"
elif [[ -d "$V0_PATH" ]]; then
  # Check if there's a zip file inside the directory
  ZIP_FILE=$(find "$V0_PATH" -maxdepth 1 -name "*.zip" | head -n 1)
  if [[ -n "$ZIP_FILE" ]]; then
    print_message "Found zip file in directory, extracting..." "$GREEN"
    unzip -q "$ZIP_FILE" -d "$TEMP_DIR"
    V0_PATH="$TEMP_DIR"
  fi
else
  print_message "Error: $V0_PATH is not a valid directory or zip file." "$RED"
  exit 1
fi

# Try to find the app directory
if [[ ! -d "$V0_PATH/app" ]]; then
  # Look for subdirectories that might contain the app directory
  SUBDIRS=$(find "$V0_PATH" -type d -maxdepth 2)
  for DIR in $SUBDIRS; do
    if [[ -d "$DIR/app" ]]; then
      print_message "Found app directory in $DIR" "$GREEN"
      V0_PATH="$DIR"
      break
    fi
  done
fi

# Final check for app directory
if [[ ! -d "$V0_PATH/app" ]]; then
  print_message "Warning: Could not find app directory in $V0_PATH" "$YELLOW"
  print_message "Available directories:" "$YELLOW"
  find "$V0_PATH" -type d -maxdepth 2 | sort
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_message "Operation cancelled." "$YELLOW"
    exit 1
  fi
fi

# Step 2: Backup important configuration files
print_message "Step 2: Backing up configuration files..." "$BLUE"
mkdir -p "$BACKUP_DIR"

# List of files to backup
CONFIG_FILES=(".env.local" ".gitignore" ".eslintrc.json" ".eslintignore" "next-env.d.ts" "tsconfig.json" "package.json" "package-lock.json" "tailwind.config.js" "postcss.config.js")

for FILE in "${CONFIG_FILES[@]}"; do
  if [[ -f "$FILE" ]]; then
    cp "$FILE" "$BACKUP_DIR/" 
    print_message "Backed up $FILE" "$GREEN"
  fi
done

# Step 3: Create a new git branch
print_message "Step 3: Creating new git branch: $BRANCH_NAME..." "$BLUE"
git checkout -b "$BRANCH_NAME"

# Step 4: Selectively copy files
print_message "Step 4: Copying files from v0 download..." "$BLUE"

# Create directories if they don't exist
mkdir -p app components lib hooks utils types public

# Function to copy files with rsync if available, otherwise use cp
copy_files() {
  local src="$1"
  local dest="$2"
  local exclude="$3"
  
  if [[ -d "$src" ]]; then
    if command -v rsync &> /dev/null; then
      if [[ -n "$exclude" ]]; then
        rsync -av --exclude="$exclude" "$src/" "$dest/"
      else
        rsync -av "$src/" "$dest/"
      fi
    else
      if [[ -n "$exclude" ]]; then
        find "$src" -type f -not -name "$exclude" -exec cp {} "$dest/" \;
      else
        cp -r "$src"/* "$dest"/ 2>/dev/null || true
      fi
    fi
    print_message "Copied files from $src to $dest" "$GREEN"
  else
    print_message "Directory $src not found, skipping" "$YELLOW"
  fi
}

# Copy directories
copy_files "$V0_PATH/app" "./app" "layout.tsx"
copy_files "$V0_PATH/components" "./components" ""
copy_files "$V0_PATH/lib" "./lib" ""
copy_files "$V0_PATH/hooks" "./hooks" ""
copy_files "$V0_PATH/utils" "./utils" ""
copy_files "$V0_PATH/types" "./types" ""
copy_files "$V0_PATH/public" "./public" ""

# Step 5: Restore configuration files
print_message "Step 5: Restoring configuration files..." "$BLUE"
for FILE in "${CONFIG_FILES[@]}"; do
  if [[ -f "$BACKUP_DIR/$FILE" ]]; then
    cp "$BACKUP_DIR/$FILE" "./" 
    print_message "Restored $FILE" "$GREEN"
  fi
done

# Step 6: Handle package.json and dependencies
print_message "Step 6: Handling package.json and dependencies..." "$BLUE"

# Create a Node.js script to merge package.json files while preserving React version
cat > merge-package.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Get paths from command line arguments
const backupPath = process.argv[2];
const v0Path = process.argv[3];

// Read the package.json files
const originalPackagePath = path.join(backupPath, 'package.json');
const v0PackagePath = path.join(v0Path, 'package.json');

if (!fs.existsSync(originalPackagePath)) {
  console.error(`Error: Original package.json not found at ${originalPackagePath}`);
  process.exit(1);
}

if (!fs.existsSync(v0PackagePath)) {
  console.error(`Error: v0 package.json not found at ${v0PackagePath}`);
  process.exit(1);
}

const originalPackage = JSON.parse(fs.readFileSync(originalPackagePath, 'utf8'));
const v0Package = JSON.parse(fs.readFileSync(v0PackagePath, 'utf8'));

// Get the original React versions
const reactVersion = originalPackage.dependencies.react || '^18.0.0';
const reactDomVersion = originalPackage.dependencies['react-dom'] || '^18.0.0';

// Merge dependencies
const mergedDependencies = {
  ...originalPackage.dependencies,
  ...v0Package.dependencies,
  // Preserve original React versions
  react: reactVersion,
  'react-dom': reactDomVersion
};

// Create the merged package.json
const mergedPackage = {
  ...originalPackage,
  dependencies: mergedDependencies
};

// Write the merged package.json
fs.writeFileSync('package.json', JSON.stringify(mergedPackage, null, 2));
console.log('Successfully merged package.json files while preserving React version');

// Generate a report of new dependencies
const newDeps = {};
for (const [key, value] of Object.entries(v0Package.dependencies)) {
  if (!originalPackage.dependencies[key]) {
    newDeps[key] = value;
  }
}

if (Object.keys(newDeps).length > 0) {
  console.log('\nNew dependencies added:');
  for (const [key, value] of Object.entries(newDeps)) {
    console.log(`- ${key}: ${value}`);
  }
}
EOF

# Run the merge script
print_message "Merging package.json files..." "$BLUE"
node merge-package.js "$BACKUP_DIR" "$V0_PATH"

# Step 7: Install dependencies and perform cleanup
print_message "Step 7: Installing dependencies and performing cleanup..." "$BLUE"

# Install dependencies
npm install

# Install dependency analysis tools
print_message "Installing dependency analysis tools locally..." "$BLUE"
npm install --no-save npm-check depcheck

# Analyze dependencies
print_message "Analyzing dependencies..." "$BLUE"
DEPENDENCY_REPORT="dependency-report-$(date +%Y%m%d).md"

echo "# Dependency Analysis Report" > "$DEPENDENCY_REPORT"
echo "Generated on $(date)" >> "$DEPENDENCY_REPORT"
echo "" >> "$DEPENDENCY_REPORT"

# Check for problematic dependencies
echo "## Problematic Dependencies" >> "$DEPENDENCY_REPORT"
npm ls react >> "$DEPENDENCY_REPORT" 2>&1
echo "" >> "$DEPENDENCY_REPORT"

# Check for unused dependencies
echo "## Unused Dependencies" >> "$DEPENDENCY_REPORT"
npx depcheck --json | node -e "
const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
console.log('### Unused Dependencies:');
if (data.dependencies.length > 0) {
  data.dependencies.forEach(dep => console.log('- ' + dep));
} else {
  console.log('No unused dependencies found.');
}
console.log('\n### Unused Dev Dependencies:');
if (data.devDependencies.length > 0) {
  data.devDependencies.forEach(dep => console.log('- ' + dep));
} else {
  console.log('No unused dev dependencies found.');
}
" >> "$DEPENDENCY_REPORT"

print_message "Dependency analysis saved to $DEPENDENCY_REPORT" "$GREEN"

# Step 8: Generate a changelog
print_message "Step 8: Generating changelog..." "$BLUE"
CHANGELOG="changelog-$(date +%Y%m%d).md"

echo "# Changes in this Update" > "$CHANGELOG"
echo "Generated on $(date)" >> "$CHANGELOG"
echo "" >> "$CHANGELOG"

# List new and modified files
echo "## New and Modified Files" >> "$CHANGELOG"
git status --porcelain | grep -v "$DEPENDENCY_REPORT" | grep -v "$CHANGELOG" >> "$CHANGELOG"
echo "" >> "$CHANGELOG"

# Include dependency report
echo "## Dependency Changes" >> "$CHANGELOG"
cat "$DEPENDENCY_REPORT" | grep -A 100 "New dependencies added:" >> "$CHANGELOG" 2>/dev/null || echo "No new dependencies added." >> "$CHANGELOG"

print_message "Changelog saved to $CHANGELOG" "$GREEN"

# NEW SECTION: Step 9: Run pre-deployment checks
print_message "Step 9: Running pre-deployment checks..." "$BLUE"

# Create a report file for pre-deployment checks
CHECKS_REPORT="pre-deployment-checks-$(date +%Y%m%d).md"
echo "# Pre-Deployment Checks" > "$CHECKS_REPORT"
echo "Generated on $(date)" >> "$CHECKS_REPORT"
echo "" >> "$CHECKS_REPORT"

# Function to run a check and record results
run_check() {
  local check_name="$1"
  local check_command="$2"
  
  echo "## $check_name" >> "$CHECKS_REPORT"
  echo '```' >> "$CHECKS_REPORT"
  
  print_message "Running $check_name..." "$BLUE"
  
  # Run the command and capture output and exit status
  OUTPUT=$(eval "$check_command" 2>&1)
  EXIT_STATUS=$?
  
  # Write output to report
  echo "$OUTPUT" >> "$CHECKS_REPORT"
  echo '```' >> "$CHECKS_REPORT"
  
  # Add status
  if [ $EXIT_STATUS -eq 0 ]; then
    echo "✅ **PASSED**" >> "$CHECKS_REPORT"
    print_message "$check_name: PASSED" "$GREEN"
  else
    echo "❌ **FAILED**" >> "$CHECKS_REPORT"
    print_message "$check_name: FAILED" "$RED"
    
    # Ask user if they want to continue despite failure
    read -p "This check failed. Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      print_message "Operation cancelled due to failed check." "$YELLOW"
      exit 1
    fi
  fi
  
  echo "" >> "$CHECKS_REPORT"
}

# Run TypeScript type checking
run_check "TypeScript Type Checking" "npx tsc --noEmit"

# Run linting
run_check "ESLint" "npx next lint"

# Test the build process
run_check "Build Process" "npm run build"

print_message "Pre-deployment checks completed and saved to $CHECKS_REPORT" "$GREEN"

# Include checks in changelog
echo "## Pre-Deployment Checks" >> "$CHANGELOG"
echo "See detailed report in $CHECKS_REPORT" >> "$CHANGELOG"

# Step 10: Commit changes
print_message "Step 10: Committing changes..." "$BLUE"
git add .
git commit -m "$PR_TITLE"

# Step 11: Push to GitHub and prepare PR
print_message "Step 11: Pushing to GitHub..." "$BLUE"
git push -u origin "$BRANCH_NAME"

# Generate PR description
PR_DESCRIPTION=$(cat "$CHANGELOG")

# Create GitHub PR using gh CLI if available
if command -v gh &> /dev/null; then
  print_message "Creating GitHub PR using gh CLI..." "$BLUE"
  gh pr create --title "$PR_TITLE" --body "$PR_DESCRIPTION" --base main
else
  print_message "GitHub CLI (gh) not found. Please create a PR manually using this URL:" "$YELLOW"
  echo "https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:\/]$$.*$$\.git/\1/')/pull/new/$BRANCH_NAME"
  echo ""
  print_message "Use this as the PR description:" "$YELLOW"
  echo "$PR_DESCRIPTION"
fi

# Clean up
print_message "Cleaning up temporary files..." "$BLUE"
rm -rf "$TEMP_DIR"

print_message "v0 update process completed successfully!" "$GREEN"
print_message "Branch: $BRANCH_NAME" "$GREEN"
print_message "Changelog: $CHANGELOG" "$GREEN"
print_message "Dependency Report: $DEPENDENCY_REPORT" "$GREEN"
print_message "Pre-Deployment Checks: $CHECKS_REPORT" "$GREEN"