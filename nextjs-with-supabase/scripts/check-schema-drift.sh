#!/usr/bin/env bash
# File: scripts/check-schema-drift.sh
# Checks if the local Supabase types file matches the remote schema.
# Relies on user being logged in via 'supabase login'.

set -euo pipefail # Exit on error, undefined variable, or pipe failure

# --- Project Reference ID ---
# Ensure this matches your Supabase project ref
SUPABASE_PROJECT_REF="lwanuwbdwxlcbnwiricu"

# --- 1. Check Supabase CLI login status (Optional) ---
# (Optional check remains commented out)

# --- 2. Define local types file path ---
LOCAL_TYPES_FILE="types/supabase.ts"

if [ ! -f "$LOCAL_TYPES_FILE" ]; then
    echo "🚨 Local types file not found at '$LOCAL_TYPES_FILE'. Cannot check for drift."
    exit 1
fi

# --- 3. Generate live schema to temporary file and diff ---
TMP_TYPES_FILE="$(mktemp)"
# Ensure temp file is cleaned up on script exit (success or failure)
trap 'rm -f "$TMP_TYPES_FILE"' EXIT

echo "🔍 Generating temporary live schema types from REMOTE project $SUPABASE_PROJECT_REF..."

# Generate types from remote schema into the temporary file
# Explicitly providing --project-id to avoid interactive prompts
# Removed 'npx' - uses the globally installed/PATH available 'supabase' command.
# Relies on CLI login state for authentication.
if ! supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" --schema public > "$TMP_TYPES_FILE"; then
  # Added project ref to error message for clarity
  echo "🚨 Failed to generate types from remote schema for project $SUPABASE_PROJECT_REF."
  echo "   Check CLI login ('supabase login'), network connection, and project status on Supabase dashboard."
  exit 1
fi

echo "🆚 Comparing checked-in types ($LOCAL_TYPES_FILE) with live schema..."

# Compare the local file with the temporary file generated from remote
# The '-u' flag provides a unified diff format, which is standard
if ! diff -u "$LOCAL_TYPES_FILE" "$TMP_TYPES_FILE"; then
  # Differences found
  echo # Add a newline for spacing before the error message
  echo "🚨 Schema drift detected!"
  echo "   The checked-in types in '$LOCAL_TYPES_FILE' do not match the live database schema for project $SUPABASE_PROJECT_REF."
  echo "   Run 'npm run types:generate' to update '$LOCAL_TYPES_FILE'."
  exit 1 # Exit with error code to indicate drift
else
  # No differences
  echo "✅ No schema drift detected for project $SUPABASE_PROJECT_REF."
  exit 0 # Exit successfully
fi