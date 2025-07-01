#!/usr/bin/env bash
# File: scripts/generate-supabase-types.sh
# Generates TypeScript types from the linked Supabase project schema.
# Relies on user being logged in via 'supabase login'.

set -euo pipefail # Exit on error, undefined variable, or pipe failure

# --- Project Reference ID ---
# Ensure this matches your Supabase project ref
SUPABASE_PROJECT_REF="lwanuwbdwxlcbnwiricu"

# --- 1. Check Supabase CLI login status (Optional but helpful) ---
# (Optional check remains commented out)

# --- 2. Generate the TypeScript definitions ---
echo "🛠️ Generating Supabase types from REMOTE project $SUPABASE_PROJECT_REF..."

OUTPUT_FILE="types/supabase.ts"
# Ensure the output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Run the Supabase CLI command
# Explicitly providing --project-id to avoid interactive prompts
# Relies on CLI login state for authentication.
if supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" --schema public > "$OUTPUT_FILE"; then
  echo "✅ Types saved to $OUTPUT_FILE"
else
  # Added project ref to error message for clarity
  echo "🚨 Failed to generate Supabase types for project $SUPABASE_PROJECT_REF."
  echo "   Check CLI login ('supabase login'), network connection, and project status on Supabase dashboard."
  exit 1 # Exit with error if generation fails
fi

echo "✅ Supabase types generation complete for project $SUPABASE_PROJECT_REF."