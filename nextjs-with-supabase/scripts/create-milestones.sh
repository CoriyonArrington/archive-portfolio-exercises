#!/usr/bin/env bash
set -euo pipefail

# Determine the absolute directory where this script resides
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Define the milestone file path relative to the project root (parent of script dir)
MILESTONE_FILE_NAME="milestones-with-dates.tsv"
MILESTONE_FILE_PATH="$SCRIPT_DIR/../$MILESTONE_FILE_NAME" # Construct absolute path

# --- Configuration ---
# Attempt to get default repo using 'gh repo view'
DEFAULT_REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "")
# Use first argument as repo if provided, otherwise use default, otherwise prompt
REPO=${1:-$DEFAULT_REPO}

if [[ -z "$REPO" ]]; then
  read -p "Enter GitHub repository (e.g., owner/repo): " REPO
  if [[ -z "$REPO" ]]; then
    echo "Error: Repository not provided."
    exit 1
  fi
fi
echo "Targeting repository: $REPO"
echo "Reading milestone data from: $MILESTONE_FILE_PATH"
# --- End Configuration ---

# Check if the milestone file exists
if [[ ! -f "$MILESTONE_FILE_PATH" ]]; then
  echo "Error: Milestone file '$MILESTONE_FILE_NAME' not found at expected location: $MILESTONE_FILE_PATH"
  echo "Please ensure '$MILESTONE_FILE_NAME' exists in the project root directory (parent directory of 'scripts')."
  # Show directory listing for debugging
  ls -l "$(dirname "$MILESTONE_FILE_PATH")"
  exit 1
fi

echo "Checking and creating milestones in '$REPO'..."
COUNT_CREATED=0
COUNT_EXISTED=0
COUNT_FAILED=0
COUNT_PROCESSED=0

# Check gh auth status first
if ! gh auth status > /dev/null 2>&1; then
    echo "Error: Not logged into GitHub CLI. Please run 'gh auth login'."
    exit 1
fi

# Get existing milestones once to avoid repeated API calls inside the loop
echo "Fetching existing milestones..."
EXISTING_MILESTONES=$(gh milestone list --repo "$REPO" --state all --json title --jq '.[] | .title' || echo "ERROR_FETCHING")

if [[ "$EXISTING_MILESTONES" == "ERROR_FETCHING" ]]; then
    echo "Error: Could not fetch existing milestones from '$REPO'. Please check repository name and permissions."
    exit 1
fi
echo "Existing milestones fetched."


# Read the TSV file, skipping the header row
# Use process substitution to feed `tail` output to `while read`
# tail -n +2 skips the first line (header)
while IFS=$'\t' read -r TITLE DESCRIPTION DUE_DATE || [[ -n "$TITLE" ]]; do
  ((COUNT_PROCESSED++))

  # Trim leading/trailing whitespace (optional but recommended)
  TITLE=$(echo "$TITLE" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  DESCRIPTION=$(echo "$DESCRIPTION" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  DUE_DATE=$(echo "$DUE_DATE" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

  # Skip empty lines or lines without a title (e.g., blank lines at end of file)
  if [[ -z "$TITLE" ]]; then
    echo "Skipping empty line (processed line: $COUNT_PROCESSED)."
    continue
  fi

  echo -n "Processing Milestone: '$TITLE'..."

  # Check if milestone title already exists in the fetched list (case-sensitive, exact match)
  if echo "$EXISTING_MILESTONES" | grep -q -x -F "$TITLE"; then
      echo " -> INFO: Already exists."
      ((COUNT_EXISTED++))
  else
      echo # Newline before creation attempt output
      echo " -> Attempting to create (Due: $DUE_DATE)..."

      # Prepare the command
      COMMAND=(gh milestone create --repo "$REPO" --title "$TITLE")
      # Add due date only if it's not empty and seems like a valid date format (simple check)
      if [[ -n "$DUE_DATE" && "$DUE_DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
        COMMAND+=(--due-date "$DUE_DATE")
      elif [[ -n "$DUE_DATE" ]]; then
          echo " -> WARNING: Due date '$DUE_DATE' format seems invalid, skipping --due-date flag."
      fi
      # Add description only if it's not empty
      if [[ -n "$DESCRIPTION" ]]; then
        COMMAND+=(--description "$DESCRIPTION")
      fi

      # Execute the command
      if OUTPUT=$("${COMMAND[@]}" 2>&1); then
          echo " -> SUCCESS: Created milestone '$TITLE'."
          # Add the newly created milestone to our list to avoid race conditions/re-checks
          EXISTING_MILESTONES+=$'\n'"$TITLE"
          ((COUNT_CREATED++))
      else
          echo " -> FAILED: Could not create milestone '$TITLE'. Error below:"
          echo "$OUTPUT"
          ((COUNT_FAILED++))
      fi
  fi
done < <(tail -n +2 "$MILESTONE_FILE_PATH") # Feed file content (minus header) into the loop


echo "----------------------------------------"
echo "Milestone Creation Summary:"
echo "  Processed lines from file: $COUNT_PROCESSED"
echo "  Created: $COUNT_CREATED"
echo "  Already Existed: $COUNT_EXISTED"
echo "  Failed: $COUNT_FAILED"
echo "----------------------------------------"

if [[ $COUNT_FAILED -gt 0 ]]; then
  echo "Check errors above. Failures might be due to permissions, rate limits, or invalid data."
  exit 1
fi

echo "Milestone processing complete."