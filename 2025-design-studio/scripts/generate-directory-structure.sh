#!/usr/bin/env bash
# File: scripts/generate-directory-structure.sh

set -e
echo "🔄 Generating full directory structure…"

# 1. Prepare output folder and remove old files
REPORTS_DIR="reports/directory-structure"
mkdir -p "$REPORTS_DIR"
rm -f "$REPORTS_DIR"/directory-structure-*.md

# 2. Build new filename with timestamp
NOW=$(date '+%Y-%m-%d-%H%M%S')
FILENAME="directory-structure-${NOW}.md"
FILEPATH="$REPORTS_DIR/$FILENAME"

# 3. Write header and opening code fence
cat > "$FILEPATH" << 'EOF'
# 📂 Directory Structure

This Markdown document provides a dynamically generated tree view of the project’s root folder along with inline comments explaining the purpose of key directories and files.

\`\`\`
EOF

# 4. Generate the tree using embedded Node and append to the file
node >> "$FILEPATH" << 'NODE'
const fs = require('fs');
const path = require('path');

const rootMapping = {
  app: "Contains the main routed pages and backend APIs (Next.js App Router).",
  components: "Reusable UI components, forms, and layout wrappers.",
  docs: "Project documentation, guides, and manuals.",
  public: "Static assets, images, and icons.",
  scripts: "Internal scripts for development tasks and migrations.",
  styles: "Tailwind CSS setup and global styles."
};

const subMapping = {
  admin: "Internal CMS dashboard (protected).",
  common: "Common UI components shared across the app.",
  ui: "UI primitives and base components.",
  forms: "Form components and related validations."
};

const exclude = new Set(["node_modules", ".git", "reports"]);

function generateTree(rootDir) {
  let tree = "";
  const items = fs.readdirSync(rootDir, { withFileTypes: true });
  const dirs = items
    .filter(i => i.isDirectory() && !exclude.has(i.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  dirs.forEach((dir, i) => {
    const branch = i === dirs.length - 1 ? "└── " : "├── ";
    const comment = rootMapping[dir.name] ? ` # ${rootMapping[dir.name]}` : "";
    tree += `${branch}${dir.name}/ ${comment}
`;

    const subItems = fs
      .readdirSync(path.join(rootDir, dir.name), { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));

    subItems.forEach((sub, j) => {
      const subBranch = j === subItems.length - 1 ? "    └── " : "    ├── ";
      const subName = sub.name;
      const subComment = sub.isDirectory()
        ? subMapping[subName.replace(/[()]/g, "")] || "Subfolder containing related resources or assets."
        : "Individual file resource.";
      tree += `${subBranch}${subName} # ${subComment}
`;
    });
  });

  return tree;
}

process.stdout.write(generateTree(process.cwd()));
NODE

# 5. Write closing fence
cat >> "$FILEPATH" << 'EOF'
\`\`\`
EOF

echo "✅ Directory structure saved as $FILENAME in $REPORTS_DIR/"
