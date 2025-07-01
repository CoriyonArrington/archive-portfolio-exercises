#!/usr/bin/env bash
# File: scripts/generate-supabase-types.sh

set -euo pipefail

# ——————————————————————————————
# 1. Load local environment variables, if any
# ——————————————————————————————
if [ -f .env.local ]; then
  echo "🌱 Sourcing .env.local"
  # Export all KEY=VALUE lines, ignoring comments
  export $(grep -v '^#' .env.local | xargs)
fi

# ——————————————————————————————
# 2. Establish SUPABASE_ACCESS_TOKEN
# ——————————————————————————————
if [ -n "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  echo "🔑 Using existing SUPABASE_ACCESS_TOKEN"
elif [ -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
  echo "🔑 Exporting SUPABASE_SERVICE_ROLE_KEY as SUPABASE_ACCESS_TOKEN"
  export SUPABASE_ACCESS_TOKEN="$SUPABASE_SERVICE_ROLE_KEY"
else
  echo "⚠️  No Supabase token found; skipping types generation."
  exit 0
fi

# ——————————————————————————————
# 3. Generate the TypeScript definitions
# ——————————————————————————————
echo "🛠️  Generating Supabase types from REMOTE..."
npx supabase gen types typescript \
  --project-id bmkezkovrcocmmqupifp \
  --schema public > types/supabase.ts

echo "✅ types/supabase.ts updated."
