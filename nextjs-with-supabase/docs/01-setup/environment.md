# Environment Variables

This project relies on environment variables for configuration, particularly for connecting to Supabase and setting deployment URLs.

## Configuration File

Copy the example environment file `.env.example` located in the project root to a new file named `.env.local`:

```bash
cp .env.example .env.local
Then, fill in the values in .env.local with your specific project credentials and settings. Never commit .env.local to version control.

Required Variables
Refer to the Environment Variables section in the root [invalid URL removed] for the list of required variables, such as:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
REVALIDATION_SECRET
DEBUG_API_KEY
Usage Notes
Variables prefixed with NEXT_PUBLIC_ are exposed to the browser (client-side).
Variables without the NEXT_PUBLIC_ prefix are only available server-side (e.g., in Server Components, API Routes, Server Actions).
Ensure Vercel deployment settings include the necessary production environment variables.
