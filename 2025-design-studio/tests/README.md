# tests

[![Run Tests](https://github.com/CoriyonArrington/2025-design-studio/actions/workflows/tests.yml/badge.svg)](https://github.com/CoriyonArrington/2025-design-studio/actions/workflows/tests.yml)

Welcome to the **tests** folder! This directory contains automated tests including unit and integration suites.

## 📚 Table of Contents
- **unit**: Smoke tests for six automation scripts.  
- **integration**: End‑to‑end and API‑route tests (currently empty—add as you go).

## 📖 Purpose of This Folder

Contains automated tests to verify your scripts and full‑stack workflows.

## 🧪 Tests Overview

### unit
- **Tests Included**  
  - `generate-routes-index.test.ts`  
  - `generate-database-schema.test.ts`  
  - `generate-directory-structure.test.ts`  
  - `generate-supabase-types.test.ts`  
  - `check-schema-drift.test.ts`  
  - `v0-update.test.ts`  
- **Command**  
  ```bash
  npm run test:unit
