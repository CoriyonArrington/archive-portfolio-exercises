#!/usr/bin/env bash
# File: scripts/generate-database-schema.sh

set -euo pipefail

# 1. Load local .env.local if present
if [ -f .env.local ]; then
  echo "🌱 Sourcing .env.local"
  export $(grep -v '^#' .env.local | xargs)
fi

# 2. Determine database connection URL
DB_URL="${DATABASE_URL:-${SUPABASE_DB_URL:-}}"
if [ -z "$DB_URL" ]; then
  echo "⚠️  DATABASE_URL / SUPABASE_DB_URL not set; skipping database schema dump."
  exit 0
fi

# 3. Dump schema with pg_dump
echo "🔧 Using pg_dump to dump schema from $DB_URL"
SCHEMA_DIR="database/schemas"
TIMESTAMP="$(date +%Y-%m-%d-%H%M%S)"
FILE="$SCHEMA_DIR/schema-$TIMESTAMP.sql"

mkdir -p "$SCHEMA_DIR"
if pg_dump --schema-only "$DB_URL" > "$FILE"; then
  echo "✅ Database schema saved to $FILE"
else
  echo "⚠️  pg_dump failed (network or auth issue); skipping schema dump."
  exit 0
fi
