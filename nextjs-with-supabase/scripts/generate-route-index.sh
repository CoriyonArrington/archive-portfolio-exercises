#!/usr/bin/env bash
# File: scripts/generate-route-index.sh
# Generates Markdown, JSON, and Mermaid files listing application routes.

set -e # Exit immediately if a command exits with a non-zero status.
echo "🔄 Generating ROUTE index…"

# --- 1. Prepare output folder and timestamp ---
ROUTES_DIR="reports/app-routes" # Changed directory name slightly
mkdir -p "$ROUTES_DIR"
# Remove old runs so only the new one remains
rm -f "$ROUTES_DIR"/ROUTES-*.md "$ROUTES_DIR"/ROUTES-*.json "$ROUTES_DIR"/ROUTES-*.mmd

NOW=$(date '+%Y-%m-%d-%H%M%S')
BASE_NAME="ROUTES-${NOW}"

# Export variables for Node script
export ROUTES_DIR BASE_NAME

# --- 2. Build files via Node ---
node << 'EOF'
const fs   = require('fs');
const path = require('path');

// --- UPDATE THIS ARRAY with your actual application routes ---
const routes = [
  // Main Pages
  { route: "/", category: "main", title: "Homepage", description: "Main landing page." },
  { route: "/about", category: "main", title: "About Page", description: "Information about the studio/individual." },
  { route: "/services", category: "main", title: "Services Page", description: "Details about offered services." },
  { route: "/projects", category: "main", title: "Projects Listing", description: "Portfolio overview page." },
  { route: "/projects/[slug]", category: "main", title: "Project Detail", description: "Individual project case study page (dynamic)." },
  { route: "/contact", category: "main", title: "Contact Page", description: "Contact form and information." },

  // Resource Pages
  { route: "/process", category: "resources", title: "Process Page", description: "Details about the work process." },
  { route: "/faq", category: "resources", title: "FAQ Page", description: "Frequently Asked Questions." }, // Assuming you have/will have this
  { route: "/feedback", category: "resources", title: "Feedback Page", description: "Page for submitting feedback." }, // Assuming you have this

  // Admin Pages (Example)
  { route: "/admin", category: "admin", title: "Admin Dashboard", description: "Main admin area (requires auth)." },
  { route: "/admin/pages", category: "admin", title: "Admin - Pages", description: "Manage static page content." },
  { route: "/admin/projects", category: "admin", title: "Admin - Projects", description: "Manage project entries." },
  { route: "/admin/services", category: "admin", title: "Admin - Services", description: "Manage service entries." },
  { route: "/admin/testimonials", category: "admin", title: "Admin - Testimonials", description: "Manage testimonials." },
  { route: "/admin/faqs", category: "admin", title: "Admin - FAQs", description: "Manage FAQ entries." },
  // Add other admin routes as needed

  // API Routes (Example - if you have any)
  // { route: "/api/some-endpoint", category: "api", title: "API Endpoint", description: "Example API route." },

  // Miscellaneous
  { route: "/_not-found", category: "misc", title: "Not Found", description: "Default 404 page." },
];
// --- END OF ROUTE UPDATES ---


// Group routes by category for structured output
const grouped = routes.reduce((acc,r) => {
  // Ensure category exists
  acc[r.category] = acc[r.category] || [];
  acc[r.category].push(r);
  return acc;
}, {});

// Define labels for categories (adjust as needed)
const labels = {
  main:      "## 🏠 Main Pages",
  resources: "## 📚 Resource Pages",
  admin:     "## 🔒 Admin Section",
  api:       "## ⚙️ API Routes",
  misc:      "## 📁 Miscellaneous",
  // Add other categories if used
};

// --- Build Markdown Output ---
let md = `# 📘 Application Route Index\n\nGenerated: ${new Date().toISOString()}\n\n`;
const categories = ['main', 'resources', 'admin', 'api', 'misc']; // Define order

categories.forEach(cat => {
    if (grouped[cat] && grouped[cat].length > 0) {
        md += (labels[cat] || `## ${cat.charAt(0).toUpperCase() + cat.slice(1)}`) + "\n\n"; // Use label or default title case
        for (const {route, title, description} of grouped[cat]) {
            // Create a relative link suitable for Markdown preview
            const link = route.startsWith('/_') || route === '/' ? route : `.${route}`;
            md += `- [\`${route}\`](${link}) – ${title} ${description ? '('+description+')' : ''}\n`;
        }
        md += "\n";
    }
});
fs.writeFileSync(path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.md`), md.trim());

// --- Write JSON Output ---
fs.writeFileSync(
  path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.json`),
  JSON.stringify(routes, null, 2) // Pretty-print JSON
);

// --- Build Mermaid Diagram Output ---
let mmd = "graph TD\n    subgraph Main Site\n"; // Start subgraph
// Add nodes for main categories
Object.keys(labels).forEach(cat => {
    if (grouped[cat] && grouped[cat].length > 0) {
        mmd += `        ${cat}((${labels[cat].replace('## ', '')}))\n`; // Category node
    }
});

// Add routes linked from categories
Object.keys(grouped).forEach(cat => {
    if (grouped[cat] && grouped[cat].length > 0) {
        grouped[cat].forEach(({route, title}) => {
            // Create a unique ID for each route node
            const nodeId = route === "/" ? "home" : route.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^_|_$/g, ''); // Sanitize ID
            mmd += `        ${cat} --> ${nodeId}["${title}<br>(\`${route}\`)"]\n`; // Link category to route node
        });
    }
});
mmd += "    end" // End subgraph
fs.writeFileSync(path.join(process.env.ROUTES_DIR, `${process.env.BASE_NAME}.mmd`), mmd.trim());

console.log(`✅ ROUTES files saved as ${process.env.BASE_NAME}.* in ${process.env.ROUTES_DIR}/`);
EOF

