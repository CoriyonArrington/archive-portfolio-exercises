# Technical Debt / Known Issues

This document tracks known technical issues and workarounds currently present in the application. Updated: May 7, 2025.

## Diary Entry Edit Form Rendering Instability (`React.Children.only` Error)

**Status: Resolved**

**Issue:**
The Diary Entry Edit Form (`/dbt-diary-card/entries/[id]/edit`) experienced a persistent `React.Children.only expected to receive a single React element child` runtime error when rendering multiple sections that utilize `react-hook-form`'s `useFieldArray` hook alongside nested/conditional form controls (e.g., Emotions intensity, Urges rating, Custom Fields). The error consistently pointed to an issue within `shadcn/ui`'s `<FormControl>` component, likely related to its internal use of Radix UI's `<Slot>` primitive.

**Troubleshooting Performed:**
* Extensive debugging involving isolating sections, simplifying rendering logic within maps, trying different RHF patterns (`FormField` vs. `<Controller>`), componentization, and clean builds.
* Identified that the error was triggered by the cumulative complexity of rendering multiple field arrays with RHF-connected inputs simultaneously.
* Found that initializing the form with simple empty arrays (`[]`) for field arrays and populating via `useEffect` + `form.reset()` stabilized the initial load but initially caused issues with field array sections rendering correctly (due to sync issues with `useFieldArray`'s `fields` state).
* Further identified that rendering complex custom field inputs (`Switch`, `DatePicker`) directly within `<FormControl>` contributed to the instability. Using RHF's `<Controller>` component for nested inputs (intensity/rating) within mapped arrays also seemed necessary for stability in this context.

**Resolution:**
The final stable solution involved several key changes:
1.  **Initialization:** The form uses the `useEffect` + `form.reset()` pattern. `useForm` is initialized with empty arrays for `emotions`, `skills`, `urges`, and `customFields`. `useEffect` calculates the correct default values from props (`entryData`, `customFieldDefs`) and calls `form.reset()` after the initial mount to populate the state.
2.  **Nested Inputs (Emotions/Urges):** The intensity/rating inputs are rendered using RHF's `<Controller>` component directly, placed *outside* of a `<FormControl>` wrapper to avoid the `<Slot>` conflict. The rendering logic maps over available definitions and checks the watched RHF state (`form.watch`) to determine selection and the correct index for the `<Controller>`.
3.  **Custom Fields Rendering:** The rendering logic iterates over `customFieldDefs`. For simple types (`TEXT`, `TEXTAREA`, `NUMBER`), the corresponding input is rendered within `<FormControl>`. For complex types (`BOOLEAN`, `DATE`), the `Switch` or `DatePicker` component is rendered directly as a child of `<FormItem>`, **outside** of the `<FormControl>` wrapper, passing the `field` props from the parent `FormField`'s render prop.
4.  **State Synchronization:** Rendering logic for field arrays relies on mapping the definition arrays (`availableEmotions`, etc.) and checking the current form state via `form.watch()` or `form.getValues()` to determine selection status and indices, rather than solely relying on the potentially out-of-sync `fields` array from `useFieldArray` immediately after a `reset`.

**Impact:**
* The edit form now loads, renders all sections correctly with initial data, and functions reliably without the `React.Children.only` runtime error.
* All field types, including custom fields like Booleans (Switch) and Dates (DatePicker), are rendered using their appropriate input components.

**Next Steps:**
* Monitor form stability. If the error resurfaces under different conditions, further investigation into library interactions might be needed. Consider the alternative refactor (separating selection/input state) if instability returns.

## React.Children.only Error with Button asChild + Link

**Issue:**

Using the standard Shadcn UI pattern `<Button asChild><Link href="...">...</Link></Button>` intermittently causes a `React.Children.only expected to receive a single React element child` runtime error during development (`npm run dev`). This error is not consistent but seems sensitive to the component's structure and surrounding elements.

**Troubleshooting Performed:**

* The error was initially diagnosed and fixed in `CTASection` by ensuring the button didn't render with zero children due to empty props.
* The error reappeared in `HeroSection` after refactoring a sibling element (changing `<P>` to `<Lead>`), even though the conditional rendering logic for the button (`hasValidCta`) was correct. Commenting out the non-related `<Lead>` component temporarily resolved the error. Simplifying the button to remove `asChild` also resolved it.
* The error reappeared again in `WhyUXSection` after moving the `<Button asChild><Link>...</Link>` block to a different location within the component structure.
* In both `HeroSection` and `WhyUXSection`, replacing `<Button asChild><Link>...</Link>` with a `<Link>` styled using `buttonVariants` resolved the error permanently.

**Likely Cause:**

The exact root cause is unclear but appears to be a subtle hydration issue or rendering bug within React/Next.js or potentially `@radix-ui/react-slot` (which powers `asChild`). It seems particularly sensitive to how `<Button asChild>` interacts with its direct `<Link>` child, especially when conditionally rendered or placed near other specific sibling components or conditional blocks. The error occurs even when the props (`cta`, `href`) are valid and the `<Link>` is technically a single child.

**Current Workaround:**

* **Avoid `<Button asChild><Link>...</Link>` for simple link CTAs.** Instead, style the Next.js `<Link>` component directly to look like a button using the `buttonVariants` utility exported from `@/components/ui/button`.

* **Example Implementation:**
  ```tsx
  import { buttonVariants } from "@/components/ui/button";
  import Link from "next/link";
  import { cn } from "@/lib/utils";

  // ... inside component ...
  {hasValidCta && ( // Still use conditional rendering check
      <Link
          href={href} // Use the correct href
          className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))} // Apply desired size/variant
      >
          {cta}
      </Link>
  )}

## ts-prune JSON Output Issue

**Issue:**

The `ts-prune` tool, when executed with the `--json` flag (`npx ts-prune --project tsconfig.json --json`), fails to produce JSON output for this project. Instead, it consistently outputs a plain text list of unused exports, regardless of the `--json` flag. Other flags like `-v` also fail to produce their expected output, suggesting an early initialization error.

**Initial Troubleshooting Performed:**

* Verified `ts-prune` is installed locally (`0.10.3` initially, later updated to latest).
* Tested ignoring problematic files (e.g., `middleware.ts`) via both inline comments (`// ts-prune-ignore`) and a `.tsprunerc` configuration file; neither method prevented the files from appearing in the text output nor enabled JSON output.
* Tested changing `compilerOptions.moduleResolution` in `tsconfig.json` from `"node"` to `"bundler"` with no effect on `ts-prune`'s output format.
* Reinstalled `node_modules`.
* Reviewed `tsconfig.json` for obvious configuration errors.

**Likely Cause:**

The root cause appears to be an incompatibility or parsing issue between `ts-prune` (even recent versions) and this specific project's configuration as defined in `tsconfig.json`. The failure likely occurs during the initial project analysis phase, preventing `ts-prune` from correctly processing command-line flags like `--json` or respecting its ignore configurations. Potential triggers might include interactions with path aliases, specific TypeScript features used, or files intended for different runtimes (like `middleware.ts`).

**Current Workaround:**

* The API route responsible for running the component audit (`app/api/run-audit/route.ts`) includes a modified helper function (`runTsPrune`) that specifically parses the **plain text output** of `ts-prune` using regular expressions.
* This allows the "Unused Components" list in the `/admin/component-audit` dashboard to be populated functionally, despite the tool not providing the expected JSON.

**Impact:**

* The audit tool's "Unused Components" feature works correctly based on the parsed text.
* The workaround is less robust than parsing native JSON; future changes to `ts-prune`'s text output format could break the parsing logic.

**Next Steps:**

* Accept the text-parsing workaround for now to maintain audit tool functionality.
* Further investigation could involve:
    * Deeper debugging of `ts-prune` with specific `tsconfig.json` options.
    * Filing an issue with the `ts-prune` repository if a specific bug is suspected.
    * Evaluating alternative tools like `knip` for detecting unused exports in the future.

---

## Contact Form RLS Workaround

**Issue:**

Submissions from the public contact form (`/contact`) consistently fail with a Row Level Security error (`42501: new row violates row-level security policy`) when using the standard Supabase server client (`@/utils/supabase/server`) for the `anon` role, despite correct table-level configuration. This appears to be a **project-wide issue** affecting anonymous inserts via the standard client.

**Initial Troubleshooting Performed:**

* Verified user role ('authenticated' initially, later focused on 'anon' for public form).
* Verified `GRANT INSERT` permission for the relevant role on the target table(s).
* Attempted various permissive RLS policies (TO public, TO authenticated, `WITH CHECK (true)`).
* Verified no triggers on target tables.
* Confirmed insert **SUCCEEDS** using Service Role Client (bypassing RLS).
* Error (`42501`) returns immediately when reverting to standard client.

**Exhaustive RLS Debugging (Attempting to Fix Properly - See [GitHub Issue #1](https://github.com/CoriyonArrington/nextjs-with-supabase/issues/1) for full details):**

* Focused on `anon` role and standard client (`createClient` from `@/utils/supabase/server`).
* Verified `GRANT INSERT ON TABLE <table_name> TO anon;` -> TRUE.
* Verified `GRANT USAGE ON SCHEMA public TO anon;` -> TRUE.
* Ensured RLS enabled on the target table(s).
* Explicitly set simplest policy: `CREATE POLICY ... ON <table_name> FOR INSERT TO anon WITH CHECK (true);`
* Verified **NO** `RESTRICTIVE` policies exist on the target table(s) via `pg_policies`.
* **Table Recreation (`contact_submissions`):** Dropped, recreated from scratch, reapplied grants/policy. -> **Still Failed RLS (`42501`)**.
* **Minimal Test Table (`test_inserts`):** Created `test_inserts` with identical setup. -> **Passed RLS Check** initially (proving role/policy/client could work).
* **Rename 'Working' Structure to Problem Names:** Renamed `test_inserts` structure through `contact_submissions` -> `contact_submission` -> `public_messages`. -> **All Failed RLS (`42501`)**. This initially suggested a name-specific issue.
* **Created *Brand New* Table (`inquiry_submissions`):** Created `inquiry_submissions` from scratch, applied identical grants/RLS enabled/policy (`... ON inquiry_submissions FOR INSERT TO anon WITH CHECK (true)`). -> **Still Failed RLS (`42501`)**.

**Likely Cause:**

The root cause is **conclusively NOT standard table-specific RLS configuration**. The failure occurs even on brand new tables with correct grants and simple permissive policies. It appears to be a **project-wide issue within this Supabase project** specifically preventing the `anon` role from inserting data via the standard Supabase client when RLS is enabled on a table. This suggests an overriding restrictive mechanism (e.g., related to default privileges, role configuration, function interference, platform state) is blocking standard RLS behavior for anonymous inserts. The issue might stem from remnants of an initial "admin-only RLS for all tables" setup or another project-level configuration.

**Current Workaround (Necessary due to Unresolved RLS Bug):**

* The server action `lib/actions/contact.ts` **must currently use** a Supabase client initialized with the `SUPABASE_SERVICE_ROLE_KEY` specifically for the insert operation (currently targeting `public_messages` or another designated table).
* This bypasses the inexplicable RLS blockage, ensuring the contact form remains functional for all users. Data validation via Zod and a honeypot field remain in place.

**Security Consideration:**

Using the service role key bypasses RLS for this operation. While mitigated for this public insert action, it's not ideal RLS practice and is only in place due to the unresolved underlying project-level issue.

**Next Steps:**

* **[Tracked in GitHub Issue #1](https://github.com/CoriyonArrington/nextjs-with-supabase/issues/1)** - Exhaustive troubleshooting detailed, including final test confirming project-wide issue.
* **Awaiting Resolution from Supabase Support:** Issue escalated (or ready to be escalated) to Supabase Support, providing evidence of failure even on newly created tables, indicating a project-level RLS enforcement problem for the `anon` role.
* **Maintain Service Key Workaround:** Continue using `SUPABASE_SERVICE_ROLE_KEY` in `lib/actions/contact.ts` for form functionality as standard RLS is currently non-functional for `anon` inserts in this project.
* Once the underlying platform/project issue is resolved by Supabase, revert `lib/actions/contact.ts` to use the standard server client (`@/utils/supabase/server`).