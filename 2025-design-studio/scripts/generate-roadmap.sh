#!/usr/bin/env bash
set -euo pipefail

OWNER="coriyonarrington"
REPO="2025-design-studio"
API="https://api.github.com"

# Ensure we have a token
if [ -z "${GITHUB_TOKEN:-}" ]; then
  GITHUB_TOKEN="$(gh auth token 2>/dev/null || true)"
  if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ No GITHUB_TOKEN found. Please run 'export GITHUB_TOKEN=…' or 'gh auth login'." >&2
    exit 1
  fi
fi

# Timestamp
TS=$(date +'%Y-%m-%d-%H%M%S')
OUT_DIR="reports/roadmap"
OUT_FILE="$OUT_DIR/roadmap-$TS.md"
SYMLINK="ROADMAP.md"

mkdir -p "$OUT_DIR"

# Remove any older roadmap files
rm -f "$OUT_DIR"/roadmap-*.md

# Write header
{
  echo "# Roadmap (generated at $TS)"
  echo
  echo "_Auto‑generated — do not edit directly_"
  echo
} > "$OUT_FILE"

# Fetch & append issues
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "$API/repos/$OWNER/$REPO/issues?state=all&labels=roadmap&per_page=200" \
| jq -r '
    try sort_by(.number) catch []         # if response isn’t an array, fallback to empty
    | .[]
    |
    ( if .state=="closed" then "✅ Completed"
      elif (.assignees|length>0) then "🚧 In Progress"
      else "⏳ Pending" end ) as $status
    |
    ( .labels | map(.name | select(test("^Phase"))) | .[0] // "Phase X" ) as $phase
    |
    ( .labels | map(.name | select(.=="Critical" or .=="Recommended" or .=="Optional")) | .[0] // "" ) as $prio
    |
    "- [" + $status + "] **" + $phase + "**: [" + .title + "](" + .html_url + ")" 
    + ( if $prio!="" then " (" + $prio + ")" else "" end )
  ' >> "$OUT_FILE"

# Refresh symlink
ln -sf "$OUT_FILE" "$SYMLINK"

echo "✅ Generated: $OUT_FILE"
echo "🔗 Symlinked to $SYMLINK"
