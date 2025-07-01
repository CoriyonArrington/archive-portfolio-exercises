// components/forms/feedback-form.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitFeedback } from "@/lib/actions/feedback";

interface FeedbackFormProps {
  formFields: [string, string, string];
}

export default function FeedbackForm({ formFields }: FeedbackFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const [clarity, usefulness, comments] = formFields;

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await submitFeedback(formData);
      toast.success("Feedback recorded, thanks!");
    } catch (err) {
      console.error(err);
      toast.error("Unable to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-4"
    >
      <div>
        <label htmlFor="clarity" className="block font-medium">
          {clarity}
        </label>
        <select
          id="clarity"
          name="clarity"
          required
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="">— Select —</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="usefulness" className="block font-medium">
          {usefulness}
        </label>
        <select
          id="usefulness"
          name="usefulness"
          required
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="">— Select —</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="comments" className="block font-medium">
          {comments}
        </label>
        <textarea
          id="comments"
          name="comments"
          required
          rows={4}
          placeholder={`Your ${comments.toLowerCase()}…`}
          className="mt-1 w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-500 text-white py-2 rounded disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit Feedback"}
      </button>
    </form>
  );
}
