#!/usr/bin/env bash
# File: scripts/generate-database-schema.sh
# Dumps the schema structure (no data) from the remote database using pg_dump.
# Requires pg_dump command-line tool to be installed and accessible in PATH.
# Requires DATABASE_URL or SUPABASE_DB_URL environment variable to be set.

set -euo pipefail # Exit on error, undefined variable, or pipe failure

# --- 1. Check for pg_dump dependency ---
if ! command -v pg_dump &> /dev/null; then
    echo "🚨 'pg_dump' command not found. Please install PostgreSQL client tools."
    echo "   See: https://www.postgresql.org/download/"
    exit 1
fi

# --- 2. Load local environment variables, if any ---
if [ -f .env.local ]; then
  echo "🌱 Sourcing .env.local"
  export $(grep -v '^#' .env.local | xargs)
fi

# --- 3. Determine database connection URL ---
# Use DATABASE_URL first, fallback to SUPABASE_DB_URL
DB_URL="${DATABASE_URL:-${SUPABASE_DB_URL:-}}"
if [ -z "$DB_URL" ]; then
  echo "⚠️ DATABASE_URL or SUPABASE_DB_URL environment variable not set."
  echo "   Skipping database schema dump."
  exit 0 # Exit gracefully
fi

# Mask password for logging if present in URL format: postgres://user:password@host...
DB_URL_LOG=$(echo "$DB_URL" | sed -E 's|://([^:]+):[^@]+@|://\1:********@|')
echo "🔧 Preparing to dump schema using pg_dump from $DB_URL_LOG"

# --- 4. Dump schema with pg_dump ---
SCHEMA_DIR="database/schemas" # Define output directory
TIMESTAMP="$(date +%Y-%m-%d-%H%M%S)" # Create timestamp
FILE="$SCHEMA_DIR/schema-$TIMESTAMP.sql" # Define output filename

# Ensure the output directory exists
mkdir -p "$SCHEMA_DIR"

echo "⏳ Dumping schema structure (this might take a moment)..."
# Use pg_dump with --schema-only flag
# The connection string (DB_URL) contains authentication details if needed.
if pg_dump --schema-only "$DB_URL" > "$FILE"; then
  echo "✅ Database schema saved to $FILE"
else
  # pg_dump returns non-zero exit code on failure
  echo "🚨 pg_dump failed. Check database connection string, network access, and permissions."
  # Optionally remove the potentially empty/incomplete file
  # rm -f "$FILE"
  exit 1 # Exit with error
fi

echo "✅ Schema dump complete."

