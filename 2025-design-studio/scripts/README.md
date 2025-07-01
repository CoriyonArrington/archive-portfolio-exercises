# scripts

Welcome to the **scripts** folder! This directory contains internal scripts for development tasks and migrations.

## 📚 Table of Contents
No subdirectories available.

## 📖 Purpose of This Folder

Contains internal scripts for development tasks and migrations.

## 📜 Scripts Overview

| Script                          | Description                                                                             | Command                                   |
|---------------------------------|-----------------------------------------------------------------------------------------|-------------------------------------------|
| `generate-supabase-types.sh`    | Generates TypeScript types from your Supabase schema (`types/supabase.ts`).             | `npm run generate:types`                  |
| `check-schema-drift.sh`         | Checks for drift between checked-in types and the live schema.                          | `npm run check:schema`                    |
| `generate-routes-index.sh`      | Creates timestamped route indexes in Markdown, JSON, and Mermaid under `reports/api-routes/`. | `npm run generate:routes`                 |
| `generate-directory-structure.sh` | Outputs a timestamped Markdown tree of the project’s root directory to `reports/directory-structure/`. | `npm run generate:directory-structure`     |
| `v0-update.sh`                  | Performs version-0 update tasks or maintenance migrations.                              | `bash scripts/v0-update.sh`               |

## 🤝 How to Contribute

- Please adhere to established guidelines and naming conventions when adding or updating scripts.
- Ensure new scripts are executable (`chmod +x`) and include a descriptive header comment.
- Add an entry to this README and the `package.json` scripts section for any new utilities.
- For questions or suggestions, contact a project administrator.

Happy scripting!
