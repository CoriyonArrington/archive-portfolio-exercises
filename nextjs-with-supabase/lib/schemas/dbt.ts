// lib/schemas/dbt.ts
import { z, ZodFormattedError } from 'zod'; // Import ZodFormattedError

// Define the structure for an individual emotion object within the array
const emotionObjectSchema = z.object({
    emotionId: z.string().min(1, "Emotion ID is required."),
    intensity: z.number({ required_error: "Intensity is required." }).min(0).max(5, "Intensity must be between 0 and 5."),
});

// Define the structure for an individual skill object within the array
const skillObjectSchema = z.object({
    skillId: z.string().min(1, "Skill ID is required."),
});

// Define the structure for an individual urge object within the array
const urgeObjectSchema = z.object({
    urgeId: z.string().min(1, "Urge ID is required."),
    rating: z.number({ required_error: "Rating is required." }).min(0).max(5, "Rating must be between 0 and 5."),
});

// Define the structure for an individual custom field object within the array
const customFieldObjectSchema = z.object({
    fieldId: z.string().min(1, "Custom Field ID is required."),
    value: z.any().optional(), // Making value optional within the object as well, adjust if it's always required
});

// Main schema for the diary entry form
export const diaryEntryFormSchema = z.object({
    date: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        return arg; // Return arg if not string or Date to let Zod handle other types
    }, z.date({
        required_error: "Entry date is required.",
    })),
    wellnessRating: z.number({
        required_error: "Wellness rating is required.",
        invalid_type_error: "Wellness rating must be a number.",
    }).min(0, "Wellness rating must be at least 0.").max(5, "Wellness rating must be no more than 5."),
    notes: z.string().nullable().optional(),
    crisis: z.boolean().default(false),

    emotions: z.array(emotionObjectSchema)
        .default([])
        .optional(),

    skills: z.array(skillObjectSchema)
        .default([])
        .optional(), // Corrected chaining for optional

    urges: z.array(urgeObjectSchema)
        .default([])
        .optional(), // Corrected chaining for optional

    customFields: z.array(customFieldObjectSchema)
        .default([])
        .optional(), // Corrected chaining for optional
});

// Type for the form values, inferred from the schema
export type DiaryEntryFormValues = z.infer<typeof diaryEntryFormSchema>;

// Helper type for field errors, compatible with ZodFormattedError and general use
type FieldErrorsType = {
    [key: string]: string[] | undefined;
};

// Type for the server action result
export type DiaryEntryActionResult = {
    success: boolean;
    message: string;
    errors?: {
        formErrors?: string[];
        // Using ZodFormattedError<YourSchema>['fieldName']['_errors'] is usually how you get string[]
        // For a more generic approach that can hold Zod's structure or custom field errors:
        fieldErrors?: FieldErrorsType & Partial<ZodFormattedError<typeof diaryEntryFormSchema>>;
    };
    entry?: any; // Replace 'any' with your actual DiaryEntry database type if available
};