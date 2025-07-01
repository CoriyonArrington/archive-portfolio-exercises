// lib/schemas/faq.ts
import { z } from 'zod';

export const faqSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty." }),
  answer: z.string().min(1, { message: "Answer cannot be empty." }),
  // Use preprocess to ensure the input is treated as an array
  // If input is not an array (e.g., undefined/null from form), default to empty array []
  // Then validate that the result is indeed an array of strings.
  page_slugs: z.preprocess(
      (val) => (Array.isArray(val) ? val : []),
      z.array(z.string())
    ),
  id: z.string().uuid().optional(),
});

// Type inferred from the schema for form values
// page_slugs should be string[] due to the preprocess/array validation
export type FaqFormValues = z.infer<typeof faqSchema>;

// Type for the server action state (remains the same)
export type FaqState = {
    status: 'success' | 'error' | 'idle';
    message: string | null;
    errors?: {
        question?: string[];
        answer?: string[];
        page_slugs?: string[]; // Keep this for potential array-level errors
        _form?: string[];
    } | null;
    faqId?: string;
};
