# scripts/v0-update.sh
#!/bin/bash
# File: scripts/v0-update.sh

set -e  # Exit on any error

# Default values
V0_PATH=${1:-"$HOME/Downloads/v0-download"}
PR_TITLE=${2:-"Update codebase with v0 generated code"}
BRANCH_NAME="v0-update-$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$HOME/backup-configs"
TEMP_DIR="/tmp/v0-extract-$(date +%s)"

# (omitted header color setup and git checks for brevity…)

echo "Step 1: Checking v0 download..."

mkdir -p "$TEMP_DIR"

if [[ "$V0_PATH" == *.zip ]]; then
  echo "Found zip file, extracting..."
  unzip -q "$V0_PATH" -d "$TEMP_DIR"
  V0_PATH="$TEMP_DIR"
elif [[ -d "$V0_PATH" ]]; then
  ZIP_FILE=$(find "$V0_PATH" -maxdepth 1 -name "*.zip" | head -n 1)
  if [[ -n "$ZIP_FILE" ]]; then
    echo "Found zip file in directory, extracting..."
    unzip -q "$ZIP_FILE" -d "$TEMP_DIR"
    V0_PATH="$TEMP_DIR"
  fi
else
  echo "⚠️ $V0_PATH is not a valid directory or zip file; skipping v0 update."
  exit 0
fi

# …the rest of your existing v0-update logic unchanged…
