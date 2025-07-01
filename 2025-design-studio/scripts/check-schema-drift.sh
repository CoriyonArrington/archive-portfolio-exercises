#!/usr/bin/env bash
# File: scripts/check-schema-drift.sh

set -euo pipefail

# 1. Load local .env.local if present
if [ -f .env.local ]; then
  echo "🌱 Sourcing .env.local"
  export $(grep -v '^#' .env.local | xargs)
fi

# 2. Determine which token to use
ACCESS_TOKEN="${SUPABASE_ACCESS_TOKEN:-${SUPABASE_SERVICE_ROLE_KEY:-}}"
if [ -z "$ACCESS_TOKEN" ]; then
  echo "⚠️  No Supabase token found; skipping schema drift check."
  exit 0
fi

# Export for Supabase CLI
export SUPABASE_ACCESS_TOKEN="$ACCESS_TOKEN"

# 3. Generate live schema and diff
TMP="$(mktemp)"
echo "🔍  Generating a temporary live schema from REMOTE..."

npx supabase gen types typescript \
  --project-id bmkezkovrcocmmqupifp \
  --schema public > "$TMP"

echo "🆚  Comparing checked‑in types with live schema..."
if ! diff -u types/supabase.ts "$TMP"; then
  echo
  echo "🚨 Schema drift detected! Run 'npm run generate:types' to sync."
  rm "$TMP"
  exit 1
else
  echo "✅ No schema drift."
  rm "$TMP"
fi
