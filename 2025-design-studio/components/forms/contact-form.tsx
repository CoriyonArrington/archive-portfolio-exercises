// components/forms/contact-form.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions/contact";

interface ContactFormProps {
  fields: [string, string, string];
}

export default function ContactForm({ fields }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success("Your message has been sent!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4"
    >
      <input
        name="name"
        type="text"
        placeholder={fields[0]}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder={fields[1]}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="message"
        placeholder={fields[2]}
        required
        rows={5}
        className="w-full p-2 border rounded"
      />

      {/* honeypot */}
      <input name="honeypot" type="text" hidden autoComplete="off" />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-500 text-white py-2 rounded disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
