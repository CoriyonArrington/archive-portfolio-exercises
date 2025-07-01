#!/usr/bin/env bash
# File: scripts/generate-routes-index.sh

set -e
echo "🔄 Generating ROUTE index…"

# 1. Prepare output folder and timestamp
ROUTES_DIR="reports/api-routes"
mkdir -p "$ROUTES_DIR"
# Remove old runs so only the new one remains
rm -f "$ROUTES_DIR"/ROUTES-*.md "$ROUTES_DIR"/ROUTES-*.json "$ROUTES_DIR"/ROUTES-*.mmd

NOW=$(date '+%Y-%m-%d-%H%M%S')
BASE_NAME="ROUTES-${NOW}"

export ROUTES_DIR BASE_NAME

# 2. Build files via Node
node << 'EOF'
const fs   = require('fs');
const path = require('path');

// Your routes array
const routes = [
  { route: "/", category: "misc", title: "/", description: "Root route" },
  /* …rest of your routes… */
];

// Group by category
const grouped = routes.reduce((acc,r) => {
  (acc[r.category] = acc[r.category]||[]).push(r);
  return acc;
}, {});

// Human‑readable labels
const labels = {
  community: "## 🌐 Community",
  main:      "## 🏠 Main",
  playground:"## 🧩 Playground",
  resources: "## 📚 Resources",
  solutions: "## 💡 UX Solutions",
  misc:      "## 📁 Miscellaneous",
};

// Build Markdown with a template literal (backticks)
let md = `# 📘 ROUTE INDEX

`;
for (const cat of Object.keys(grouped)) {
  md += labels[cat] + "\n";
  for (const {route,title} of grouped[cat]) {
    md += `- [\`${route}\`](/${route.replace(/^\//,'')}) – ${title}\n`;
  }
  md += "\n";
}
fs.writeFileSync(path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.md`), md.trim());

// Write JSON
fs.writeFileSync(
  path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.json`),
  JSON.stringify(routes, null, 2)
);

// Build Mermaid
let mmd = "graph TD\n";
routes.forEach(({route,title}) => {
  const id = route === "/" ? "home" : route.slice(1).replace(/[:/]/g, "_");
  mmd += `    home --> ${id}["${title}"]\n`;
});
fs.writeFileSync(path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.mmd`), mmd.trim());

console.log(`✅ ROUTES files saved as ${process.env.BASE_NAME}.* in ${process.env.ROUTES_DIR}/`);
EOF
