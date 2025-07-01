#!/bin/bash

# Switch to main branch
git checkout main

# Make sure main is up to date
git pull origin main

echo "Finding branches fully merged into main..."

# List merged branches (excluding main and current branch)
merged_branches=$(git branch --merged main | grep -v "^\*" | grep -v "main")

if [ -z "$merged_branches" ]; then
  echo "No branches to delete."
  exit 0
fi

echo "The following branches are fully merged into main and can be deleted:"
echo "$merged_branches"

read -p "Do you want to delete these local branches? (y/n): " confirm
if [[ "$confirm" == "y" ]]; then
  echo "$merged_branches" | xargs -n 1 git branch -d
else
  echo "No branches were deleted."
fi

# Ask about remote branches too
read -p "Do you want to delete these branches from origin as well? (y/n): " confirm_remote
if [[ "$confirm_remote" == "y" ]]; then
  echo "$merged_branches" | sed 's/^[ *]*//' | while read branch; do
    git push origin --delete "$branch"
  done
else
  echo "Remote branches were not deleted."
fi
