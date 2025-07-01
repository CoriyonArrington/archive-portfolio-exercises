# Lib Directory Structure

This directory contains utility functions, hooks, and other reusable code for the portfolio website.

## Directory Structure

- `actions/` - Server actions for form submissions and data mutations
- `auth/` - Authentication utilities and helpers
- `cache/` - Cache management and revalidation utilities
- `config/` - Configuration files and constants
- `data/` - Data fetching, transformation, and management
- `hooks/` - Custom React hooks
- `pdf/` - PDF generation utilities
- `storage/` - File storage utilities
- `supabase/` - Supabase client and database helpers
- `utils/` - General utility functions
- `validation/` - Form and data validation utilities

## Organization Principles

1. **Modularity**
   - Each utility should have a single responsibility
   - Group related utilities in appropriate directories

2. **Naming Conventions**
   - Use descriptive names for files and functions
   - Use kebab-case for file names
   - Use camelCase for function and variable names

3. **Exports**
   - Use named exports for better import statements
   - Create index.ts files for directories to simplify imports

4. **TypeScript**
   - Use proper TypeScript types for all functions
   - Create separate type files when appropriate

## Best Practices

- Keep utility functions pure when possible
- Document complex functions with comments
- Use TypeScript for type safety
- Test utilities with unit tests
- Avoid circular dependencies

