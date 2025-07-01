// lib/schemas/project.ts
import { z } from 'zod';

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

export const projectSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().optional(), // Optional description
  // Slug is optional; if empty, we'll generate it from the title in the action
  slug: z.string().optional(),
  // Featured status - expecting 'on' or undefined from checkbox/switch
  featured: z.preprocess((val) => val === 'on' || val === true, z.boolean().default(false)),
  // Tags will be submitted as a single comma-separated string
  tags: z.string().optional(),
  // Content JSONB - omitted for now, can be added later
  // content: z.any().optional(),
  // ID for editing (optional for creation)
  id: z.string().uuid().optional(),
});

// Type inferred from the schema for form values
export type ProjectFormValues = z.infer<typeof projectSchema>;

// Type for the server action state
export type ProjectState = {
    status: 'success' | 'error' | 'idle';
    message: string | null;
    errors?: {
        title?: string[];
        description?: string[];
        slug?: string[];
        featured?: string[];
        tags?: string[];
        _form?: string[]; // General form errors
    } | null;
    projectId?: string; // To know which project was processed
};

// Export the slug generation function if needed elsewhere
export { generateSlug };

