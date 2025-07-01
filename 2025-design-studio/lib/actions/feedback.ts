// lib/actions/feedback.ts
"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/utils/supabaseClient";

export async function submitFeedback(formData: FormData) {
  // pull out your 3 fields
  const clarity = Number(formData.get("clarity"));
  const usefulness = Number(formData.get("usefulness"));
  const comments = formData.get("comments")?.toString() ?? "";

  // insert into the renamed table
  const { error } = await supabase
    .from("feedback_submissions")
    .insert([{ clarity_rating: clarity, usefulness_rating: usefulness, comments }]);

  // redirect with a query‑param for the modal
  if (error) {
    redirect(`/feedback?error=${encodeURIComponent(error.message)}`);
  } else {
    redirect("/feedback?success=1");
  }
}
