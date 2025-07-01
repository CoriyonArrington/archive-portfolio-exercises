# Data Flow Overview (Optional)

This document outlines the primary ways data flows through the application, from user interaction to database operations and back.

## Key Patterns

1.  **Server Components (RSC) Reading Data:**
    -   Server Components directly `await` data fetching functions (e.g., using the Supabase client initialized in `@/utils/supabase/server`).
    -   Data is fetched server-side during the rendering process.
    -   Fetched data is passed down as props to other Server or Client Components.

2.  **Client Components Reading Data:**
    -   Typically fetch data via:
        -   **Server Actions:** Calling functions exported from `/lib/actions/*` (often triggered by user events or `useEffect`). Recommended for mutations and some queries.
        -   **API Routes:** Using `fetch` or libraries like SWR/React Query to call custom API routes (e.g., `/api/...`). Less common in this starter unless needed for specific integrations.
    -   Handle loading and error states within the component.

3.  **Mutating Data (Create, Update, Delete):**
    -   Primarily handled via **Server Actions**.
    -   Forms in Client Components often trigger Server Actions on submit.
    -   Server Actions use the Supabase client (server or service role, depending on RLS needs - see `../05-reference/known-issues.md`) to interact with the database.
    -   Server Actions can use `revalidatePath` or `revalidateTag` to update cached data after mutations.

4.  **Authentication Flow:**
    -   Handled by Supabase Auth helpers (`@supabase/ssr`).
    -   Middleware (`middleware.ts`) intercepts requests to refresh sessions using cookies.
    -   Server Components check auth state using the server Supabase client.
    -   Client Components can access auth state via context or helper hooks if needed, or rely on server-side redirection.

## Example Diagram (Mermaid Placeholder)

[TODO: Create a Mermaid diagram illustrating a common flow, e.g., user submits form -> Client Component calls Server Action -> Server Action updates Supabase -> Server Action revalidates data -> UI updates]

\`\`\`mermaid
sequenceDiagram
    participant User
    participant ClientComp as Client Component
    participant ServerAction as Server Action
    participant Supabase
    participant Middleware

    User->>ClientComp: Submits Form Data
    ClientComp->>ServerAction: Calls action(formData)
    ServerAction->>Supabase: Updates Database (e.g., INSERT)
    Supabase-->>ServerAction: Success/Error
    ServerAction->>ServerAction: revalidatePath('/page')
    ServerAction-->>ClientComp: Returns Result
    ClientComp->>User: Shows Success/Error Message
    User->>ClientComp: Navigates (or page reloads/updates)
    Middleware->>Supabase: (Implicit Session Refresh)
    ClientComp->>Supabase: (RSC fetches updated data on next render)

\`\`\`

*This is a simplified overview. Specific flows may vary.*