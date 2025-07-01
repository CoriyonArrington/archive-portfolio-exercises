// lib/schemas/service.ts
import { z } from 'zod';
import { generateSlug } from './project'; // Reuse slug generator

export const serviceSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().optional(),
  slug: z.string().optional(),
  featured: z.preprocess((val) => val === 'on' || val === true, z.boolean().default(false)),
  // sort_order: z.coerce.number().int().default(0), // REMOVED sort_order field
  id: z.string().uuid().optional(),
});

// Type inferred from the schema for form values
export type ServiceFormValues = z.infer<typeof serviceSchema>;

// Type for the server action state
export type ServiceState = {
    status: 'success' | 'error' | 'idle';
    message: string | null;
    errors?: {
        title?: string[];
        description?: string[];
        slug?: string[];
        featured?: string[];
        // sort_order?: string[]; // REMOVED
        _form?: string[];
    } | null;
    serviceId?: string;
};

