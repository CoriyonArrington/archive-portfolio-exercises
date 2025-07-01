#!/usr/bin/env bash
set -euo pipefail

CSV_FILE="${1:-}"
if [[ -z "$CSV_FILE" || ! -f "$CSV_FILE" ]]; then
  echo "Usage: $0 <confirmed-tasks.csv>"
  exit 1
fi

# Skip header, then process each line
tail -n +2 "$CSV_FILE" \
| while IFS=, read -r PHASE PRIORITY TITLE BODY; do
  echo "Creating issue: $TITLE [$PHASE / $PRIORITY]"
  gh issue create \
    --title "$TITLE" \
    --body "$BODY" \
    --label roadmap,"$PHASE","$PRIORITY"
done
