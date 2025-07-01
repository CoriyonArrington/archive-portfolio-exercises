# Environment Variables

## Required Variables
- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for your Supabase project (optional for some features)
- `VERCEL_URL`: Automatically provided by Vercel
- `REVALIDATION_SECRET`: Secret key for revalidation endpoints
- `NEXT_PUBLIC_SITE_URL`: Public URL of the site
- `VERCEL_DEPLOY_HOOK_URL`: URL for triggering Vercel deployments

## Development Setup
Create a `.env.local` file in the root directory with the required variables.

## Environment Variable Validation
The application validates environment variables at build time using the `env-validation.ts` utility to ensure all required variables are present.

## Usage in Components
- Server Components: Access directly via `process.env.VARIABLE_NAME`
- Client Components: Only access variables prefixed with `NEXT_PUBLIC_` via `process.env.NEXT_PUBLIC_VARIABLE_NAME`

## Security Considerations
- Never expose sensitive keys in client-side code
- Use the service role key only in server-side code
- Revalidation secrets should only be used in server components or API routes
- Rotate keys periodically for security
