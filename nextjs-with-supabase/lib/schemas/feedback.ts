// lib/schemas/feedback.ts
import { z } from "zod";

// Define and export the schema here
export const feedbackSchema = z.object({
  clarity_rating: z.coerce.number().min(1, "Rating required").max(5),
  usefulness_rating: z.coerce.number().min(1, "Rating required").max(5),
  comments: z.string().min(10, "Please provide at least 10 characters.").max(1000),
  // Keep optional fields if they are part of your form/DB logic
  source_url: z.string().optional(),
  user_agent: z.string().optional(),
});

// Define and export related types here
export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export type FeedbackState = {
  message: string;
  status: "success" | "error";
} | null;