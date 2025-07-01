// components/forms/feedback-form.tsx - Updated imports
"use client";

import React, { useState } from 'react'; // Import React
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Removed z import, schema and type come from schema file
import { useToast } from "@/hooks/use-toast";
import { submitFeedbackAction } from "@/lib/actions/feedback"; // Import only the action
// Import schema and type from the new location
import { feedbackSchema, type FeedbackFormValues } from "@/lib/schemas/feedback";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFormProps {
  formFields: [string, string, string]; // Labels: [Clarity, Usefulness, Comments]
}

export default function FeedbackForm({ formFields }: FeedbackFormProps) {
  const { toast } = useToast();
  const [clarityLabel, usefulnessLabel, commentsLabel] = formFields;
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FeedbackFormValues>({ // Use imported type
    resolver: zodResolver(feedbackSchema), // Use imported schema
    defaultValues: {
      clarity_rating: undefined,
      usefulness_rating: undefined,
      comments: "",
      source_url: undefined,
      user_agent: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  async function onSubmit(values: FeedbackFormValues) { // Use imported type
    console.log("Client: onSubmit function called with values:", values);
    setIsPending(true);

    const formData = new FormData();
    formData.append("clarity_rating", String(values.clarity_rating ?? ''));
    formData.append("usefulness_rating", String(values.usefulness_rating ?? ''));
    formData.append("comments", values.comments);
    if (values.source_url) formData.append("source_url", values.source_url);
    if (values.user_agent) formData.append("user_agent", values.user_agent);

    console.log("Client: Calling submitFeedbackAction...");
    // Result type should implicitly be Promise<FeedbackState | null>
    const result = await submitFeedbackAction(formData);
    console.log("Client: Server Action returned:", result);

    setIsPending(false);

    if (result) {
      if (result.status === "success") {
        toast({ title: "Success!", description: result.message });
        form.reset();
      } else if (result.status === "error") {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
    } else {
      console.error("Client: Received null or undefined result from server action");
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Client: RHF validation errors", errors))} className="space-y-6">
        {/* Clarity Rating Field */}
        <FormField
          control={form.control}
          name="clarity_rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{clarityLabel}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                value={field.value !== undefined ? String(field.value) : undefined}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Usefulness Rating Field */}
        <FormField
          control={form.control}
          name="usefulness_rating"
          render={({ field }) => (
             <FormItem>
              <FormLabel>{usefulnessLabel}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                value={field.value !== undefined ? String(field.value) : undefined}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Comments Field */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commentsLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Your ${commentsLabel.toLowerCase()}…`}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Submitting…" : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
}