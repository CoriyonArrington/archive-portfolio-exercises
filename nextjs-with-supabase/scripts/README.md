# 🛠️ Scripts Folder

Welcome to the `scripts` folder! This directory contains internal shell and Python scripts used for various development tasks, documentation generation, database management, and project setup automation.

## 📖 Purpose of This Folder

This folder centralizes utility scripts to automate common development workflows, ensure consistency, and aid in project maintenance, including interactions with Supabase and GitHub.

## ❗ Important Dependencies

Many scripts in this folder rely on external command-line tools. Ensure the following are installed and configured:

- **Node.js & npm**: Required for running `package.json` scripts and some documentation scripts.
- **Supabase CLI**: Required for `generate-supabase-types.sh` and `check-schema-drift.sh`. Ensure you are logged in (`supabase login`) and the project is linked (`supabase link`).
- **PostgreSQL Client Tools (`pg_dump`)**: Required for `generate-database-schema.sh`.
- **GitHub CLI (`gh`)**: Required for `create-labels.sh`, `create-milestones.sh`, `create-issues.py`, and `generate-roadmap.sh`. Ensure you are authenticated (`gh auth login`).
- **Python 3**: Required for `create-issues.py`.
- **jq**: Required for `generate-roadmap.sh` (JSON processor).

## 📜 Scripts Overview

### Database & Types

#### `generate-supabase-types.sh`
- **Description**: Generates TypeScript type definitions based on your remote Supabase database schema (specifically the `public` schema). Ensures type safety.
- **Command**: `npm run types:generate`
- **Output**: Overwrites the existing `types/supabase.ts` file.
- **Dependencies**: Supabase CLI.

#### `check-schema-drift.sh`
- **Description**: Compares `local types/supabase.ts` against the live remote Supabase schema to detect outdated types.
- **Command**: `npm run types:check`
- **Output**: Status messages to the terminal. Exits with error if drift is detected.
- **Dependencies**: Supabase CLI.

#### `generate-database-schema.sh`
- **Description**: Uses `pg_dump` to export the remote database structure (schema only, no data). Useful for tracking history.
- **Command**: `npm run db:schema:dump`
- **Output**: Creates a timestamped `.sql` file in `database/schemas/`.
- **Dependencies**: `pg_dump`, `DATABASE_URL` in `.env.local`.

### Documentation Generation

#### `generate-directory-structure.sh`
- **Description**: Generates a Markdown tree view of the project's folder structure.
- **Command**: `npm run docs:structure`
- **Output**: Creates a timestamped `.md` file in `reports/directory-structure/`.
- **Dependencies**: Node.js.

#### `generate-route-index.sh`
- **Description**: Generates documentation listing application routes defined within the script.
- **Command**: `npm run docs:routes`
- **Output**: Creates timestamped `.md`, `.json`, and `.mmd` files in `reports/app-routes/`.
- **Dependencies**: Node.js. Requires manual updates to the script's routes array.

#### `generate-roadmap.sh`
- **Description**: Fetches issues with a specific label (e.g., `Roadmap`) from the GitHub repository and generates a formatted Markdown roadmap document.
- **Command**: `./scripts/generate-roadmap.sh`
- **Output**: Creates a timestamped `roadmap-YYYY-MM-DD-HHMMSS.md` file in `reports/roadmap/` and updates the `ROADMAP.md` symlink in the project root.
- **Dependencies**: GitHub CLI (`gh`), `jq`, `curl`. Requires issues to have the label specified in the script (default: Roadmap).

### GitHub Project Setup

#### `create-labels.sh`
- **Description**: Bulk creates or updates labels in your GitHub repository based on a predefined TSV file (`labels-with-desc.tsv`). Uses `gh label create --force`.
- **Command**: `./scripts/create-labels.sh`
- **Input File**: Reads label names and descriptions from `labels-with-desc.tsv` located in the project root (or adjust `LABEL_FILE` path).
- **Dependencies**: GitHub CLI (`gh`), `labels-with-desc.tsv`.

#### `create-milestones.sh` (Example)
- **Description**: Bulk creates milestones in your GitHub repository based on a predefined TSV file (`milestones.tsv`).
- **Command**: `./scripts/create-milestones.sh`
- **Input File**: Reads milestone titles, descriptions, and due dates from `milestones.tsv` in the project root.
- **Dependencies**: GitHub CLI (`gh`), `milestones.tsv`.

#### `create-issues.py`
- **Description**: Bulk creates issues in your GitHub repository based on a roadmap defined in a CSV file. Skips rows marked 'Completed' by default.
- **Command**: `python3 scripts/create-issues.py project-planning/roadmap_epics.csv`
- **Input File**: Reads issue details (Title, Description, Labels, Milestone, etc.) from the specified CSV file.
- **Configuration**: Edit the script to set the correct `GITHUB_REPO` variable.
- **Dependencies**: Python 3, GitHub CLI (`gh`), roadmap CSV file. Requires GitHub labels and milestones to exist beforehand.

> **Note:** Ensure environment variables (`.env.local`) are correctly set up before running scripts that depend on them. Restart terminals/servers after modifying `.env.local`.

## 🤝 How to Contribute

- Use Bash for POSIX-compatible scripts, or Python for more complex tasks.  
- Ensure new scripts are executable (`chmod +x script-name.sh`).  
- Include a descriptive header comment explaining purpose and dependencies.  
- Add or update entries in this README's **Scripts Overview** section.  
- If runnable via `npm`, add the corresponding command to `scripts` in `package.json`.  

For questions or suggestions, refer to the project documentation or contact a maintainer.

Happy scripting!
