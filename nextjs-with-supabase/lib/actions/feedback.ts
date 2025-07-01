// lib/actions/feedback.ts - Updated imports, only exports async function
"use server";

// Import schema and type from the new location
import { feedbackSchema, type FeedbackState } from "@/lib/schemas/feedback";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
// Removed z import as schema comes from schema file

export async function submitFeedbackAction(
  formData: FormData,
): Promise<FeedbackState> {
  console.log("Server Action: submitFeedbackAction called."); // Keep logs for now

  const supabase = await createClient();

  const validatedFields = feedbackSchema.safeParse({
    clarity_rating: formData.get("clarity_rating"),
    usefulness_rating: formData.get("usefulness_rating"),
    comments: formData.get("comments"),
    // source_url: formData.get('source_url'),
    // user_agent: formData.get('user_agent'),
  });
  console.log("Server Action: Validation result:", validatedFields);

  if (!validatedFields.success) {
    console.error("Server Action: Validation failed:", validatedFields.error.flatten().fieldErrors);
    return { message: "Invalid form data provided.", status: "error" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  const dataToInsert = {
    ...validatedFields.data,
    user_id: user?.id,
  };
  console.log("Server Action: Data to insert:", dataToInsert);

  const { error } = await supabase
    .from("feedback_submissions")
    .insert(dataToInsert);
  console.log("Server Action: Supabase insert error:", error);

  if (error) {
    console.error("Server Action: Supabase feedback insertion error details:", error);
    return { message: "Database error: Failed to submit feedback.", status: "error" };
  }

  console.log("Server Action: Feedback submitted successfully.");
  // Optional: revalidatePath('/some/path');
  return { message: "Feedback submitted successfully!", status: "success" };
}

// feedbackSchema and FeedbackState are NO LONGER defined or exported here