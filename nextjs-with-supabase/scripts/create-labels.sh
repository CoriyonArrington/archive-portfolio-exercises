#!/usr/bin/env bash
set -euo pipefail

# Determine the absolute directory where this script resides
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Define the label file path relative to the project root (parent of script dir)
# Using kebab-case as preferred
LABEL_FILE_NAME="labels-with-desc.tsv"
LABEL_FILE_PATH="$SCRIPT_DIR/../$LABEL_FILE_NAME" # Construct absolute path

# Add this debug line:
echo "DEBUG: Script located at: $SCRIPT_DIR/$(basename "$0")"
echo "DEBUG: Script Directory determined as: $SCRIPT_DIR"
echo "DEBUG: Expecting label file name: $LABEL_FILE_NAME"
echo "DEBUG: Checking for label file at absolute path: $LABEL_FILE_PATH"

if [[ ! -f "$LABEL_FILE_PATH" ]]; then
  # Error message updated
  echo "Error: Label file '$LABEL_FILE_NAME' not found at expected location: $LABEL_FILE_PATH"
  echo "Please ensure '$LABEL_FILE_NAME' exists in the project root directory (the parent directory of 'scripts')."
  ls -l "$(dirname "$LABEL_FILE_PATH")" # List contents of the expected directory for debugging
  exit 1
fi

echo "Creating labels with descriptions from $LABEL_FILE_PATH..."
COUNT_CREATED=0
COUNT_FAILED=0

# Read file line by line, splitting by Tab character
while IFS=$'\t' read -r label_name label_desc || [[ -n "$label_name" ]]; do
  # Trim leading/trailing whitespace (optional but good practice)
  label_name=$(echo "$label_name" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  label_desc=$(echo "$label_desc" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

  # Skip empty lines or lines without a label name
  if [[ -z "$label_name" ]]; then
    continue
  fi

  # Assign a default color (e.g., light gray) - You might want specific colors later
  DEFAULT_COLOR="ededed"
  # Example: Assign colors based on type prefix
  COLOR="$DEFAULT_COLOR"
  if [[ "$label_name" == Type:* ]]; then COLOR="d73a4a"; # Red
  elif [[ "$label_name" == Phase:* ]]; then COLOR="0075ca"; # Blue
  elif [[ "$label_name" == Area:* ]]; then COLOR="cfd3d7"; # Light Gray
  elif [[ "$label_name" == Priority:* ]]; then COLOR="f9d0c4"; # Peach
  elif [[ "$label_name" == Epic:* ]]; then COLOR="7057ff"; # Purple
  elif [[ "$label_name" == Feature:* ]]; then COLOR="0e8a16"; # Green
  fi

  echo "Attempting to create/update label: '$label_name'"
  # Use --force to update description/color if label already exists
  if OUTPUT=$(gh label create "$label_name" --color "$COLOR" --description "$label_desc" --force 2>&1); then
      echo " -> SUCCESS: Label '$label_name' created or updated."
      ((COUNT_CREATED++))
  else
      # Capture actual failures (network, auth, invalid name etc.)
      # Check if it's just saying "already exists" which isn't really a failure for --force
      if [[ "$OUTPUT" == *"already exists"* ]]; then
          echo " -> INFO: Label '$label_name' already exists, ensured description/color are up-to-date."
          ((COUNT_CREATED++)) # Count it as processed successfully
      else
          echo " -> FAILED: Could not create/update label '$label_name'. Error below:"
          echo "$OUTPUT"
          ((COUNT_FAILED++))
      fi
  fi

done < "$LABEL_FILE_PATH" # Read from the calculated absolute file path

echo "----------------------------------------"
echo "Label Creation/Update Summary:"
echo "  Processed/Updated: $COUNT_CREATED"
echo "  Failed: $COUNT_FAILED"
echo "----------------------------------------"

if [[ $COUNT_FAILED -gt 0 ]]; then
  echo "Check errors above. Failures might be due to permissions, API rate limits, or unexpected issues."
  exit 1
fi

echo "Label creation/update process complete."