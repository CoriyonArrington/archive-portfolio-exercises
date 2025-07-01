# Server Actions Conventions (Optional)

This document outlines conventions and best practices for using Next.js Server Actions in this project. Server Actions are the primary way to handle form submissions and data mutations securely on the server.

## Location

-   Server Actions are typically defined in `/lib/actions/*.ts` files, grouped by feature or resource (e.g., `contact.ts`, `project.ts`).
-   They can also be defined directly within Server Components if they are highly specific to that component, but placing them in `/lib/actions` promotes reusability.

## Naming

-   Use descriptive names indicating the action performed (e.g., `createProject`, `updateUserSettings`, `submitContactForm`).

## Input Validation

-   **ALWAYS** validate input data within the Server Action using a library like [Zod](https://zod.dev/). Define reusable schemas in `/lib/schemas/*.ts`.
-   Return structured error messages if validation fails, allowing the client-side form to display specific errors.

## Authentication & Authorization

-   Retrieve the current user session within the action using the server Supabase client (`@/utils/supabase/server`).
-   Check if the user is authenticated and authorized to perform the action based on their role or ownership, especially for protected operations.
-   **NEVER** trust data coming directly from the client without server-side validation and authorization checks.

## Database Interaction

-   Use the appropriate Supabase client (server client for user context, service role client *only* when necessary to bypass RLS - see `../05-reference/known-issues.md`).
-   Handle potential database errors gracefully.

## Return Values

-   Return clear success or error states, potentially including data or specific error messages. Example structure:
    \`\`\`typescript
    type ActionResult = {
      success: boolean;
      message?: string;
      errors?: Record<string, string[]>; // For field-specific validation errors
      data?: any;
    }
    \`\`\`

## Error Handling

-   Use `try...catch` blocks to handle unexpected errors during execution.
-   Log errors server-side for debugging.
-   Return user-friendly error messages to the client.

## Revalidation

-   Use `revalidatePath` or `revalidateTag` after successful data mutations to ensure cached data is updated and the UI reflects the changes.

## Client-Side Usage

-   Forms typically call Server Actions via the `action` prop or programmatically using `startTransition` from `useTransition` to handle pending states without blocking the UI.
-   Use the return value of the Server Action to display success/error messages or update UI state.