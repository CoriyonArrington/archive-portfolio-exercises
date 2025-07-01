// lib/schemas/page.ts
import { z } from 'zod';
import type { Json } from '@/types/supabase'; // Import Supabase Json type

// Schema for the page content edit form
export const pageContentSchema = z.object({
  // The slug identifies the page being edited (passed separately or via hidden input)
  slug: z.string().min(1),
  // Content will be submitted as a string, needs validation as valid JSON
  content: z.string().min(1, "Content cannot be empty.")
    .refine((val) => {
        // Try parsing the string as JSON
        try {
            JSON.parse(val);
            return true; // It's valid JSON
        } catch (e) {
            return false; // Invalid JSON
        }
    }, { message: "Invalid JSON format." }),
});

// Type inferred from the schema for form values
export type PageContentFormValues = z.infer<typeof pageContentSchema>;

// Type for the server action state
export type PageContentState = {
    status: 'success' | 'error' | 'idle';
    message: string | null;
    errors?: {
        slug?: string[];
        content?: string[];
        _form?: string[];
    } | null;
    pageSlug?: string; // To know which page was processed
};

