// lib/schemas/testimonial.ts
import { z } from 'zod';

export const testimonialSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
  role: z.string().optional(), // Role is optional
  quote: z.string().min(1, { message: "Quote cannot be empty." }),
  // Use preprocess for boolean checkbox/switch
  featured: z.preprocess((val) => val === 'on' || val === true, z.boolean().default(false)),
  // sort_order: z.coerce.number().int().default(0), // REMOVED
  // ID for editing
  id: z.string().uuid().optional(),
});

// Type inferred from the schema for form values
export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

// Type for the server action state
export type TestimonialState = {
    status: 'success' | 'error' | 'idle';
    message: string | null;
    errors?: {
        name?: string[];
        role?: string[];
        quote?: string[];
        featured?: string[];
        // sort_order?: string[]; // REMOVED
        _form?: string[];
    } | null;
    testimonialId?: string;
};
