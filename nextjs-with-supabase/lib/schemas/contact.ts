// lib/schemas/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(1, { message: "Message is required." }),
  // --- Allow string, undefined, OR null for honeypot ---
  honeypot: z.string().nullable().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Optional: Define a type for the server action's return value
export interface ContactActionResult {
    status: 'success' | 'error';
    message: string;
    errors?: Record<string, string[] | undefined>; // Zod error format
}

// Adjust field errors type if using flatten().fieldErrors
// export interface ContactActionResult {
//     status: 'success' | 'error';
//     message: string;
//     errors?: Record<keyof ContactFormValues, string[] | undefined>;
// }