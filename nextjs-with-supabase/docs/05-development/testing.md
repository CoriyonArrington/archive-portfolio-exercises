# Testing Strategy (Optional)

This document outlines the approach to testing in this project.

## Tools

-   **Testing Framework:** [Vitest](https://vitest.dev/) (as indicated by `package.json` script `npm run test`).
-   **UI Testing Library:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (commonly used with Vitest/Jest for React).
-   **[TODO: Specify End-to-End testing tool if used, e.g., Playwright, Cypress]**

## Conventions

-   **File Location:** Place test files alongside the component or utility they are testing (e.g., `component.tsx` and `component.test.tsx`) or in a dedicated `__tests__` folder.
-   **File Naming:** Use `.test.ts` or `.test.tsx` suffix.
-   **Focus:**
    -   Prioritize testing utility functions, hooks, and complex logic.
    -   Write integration tests for components that involve multiple parts or user interactions.
    -   Focus on testing behavior from the user's perspective rather than implementation details.
-   **[TODO: Add specific examples or guidelines for mocking Supabase calls or Server Actions if necessary].**

## Running Tests

```bash
npm run test

Refer to the official Vitest and React Testing Library documentation for detailed API usage.