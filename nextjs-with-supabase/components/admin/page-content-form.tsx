// components/admin/page-content-form.tsx
"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Import the page schema and types
import { pageContentSchema, type PageContentFormValues, type PageContentState } from "@/lib/schemas/page";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface PageContentFormProps {
  // Server action (editPageContentAction)
  action: (prevState: PageContentState | null, formData: FormData) => Promise<PageContentState>;
  // Default values (slug and stringified content)
  defaultValues: PageContentFormValues; // Requires slug and content string
  // Button text
  submitButtonText?: string;
}

export default function PageContentForm({
  action,
  defaultValues,
  submitButtonText = "Update Content"
}: PageContentFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PageContentFormValues>({
    // Use the page content schema resolver
    // @ts-ignore - Ignoring potential resolver type mismatch if errors persist
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
        slug: defaultValues.slug, // Slug is required
        // Content needs to be stringified for the textarea
        content: defaultValues.content, // Already stringified by the page component
    },
    mode: "onChange",
  });

  // Client-side onSubmit handler
  async function onSubmit(values: PageContentFormValues) {
    // Create FormData
    const formData = new FormData();
    formData.append("slug", values.slug); // Include slug
    formData.append("content", values.content); // Content is already a string

    startTransition(async () => {
        // Pass null for prevState as we handle state client-side
        const result = await action(null, formData);

        if (result?.status === 'success') {
            toast({ title: "Success!", description: result.message });
            // Redirect is handled by server action
            // Optionally reset form if needed, but redirect makes it less necessary
            // form.reset(values); // Reset to current values after successful save
        } else if (result?.status === 'error') {
            toast({ title: "Error", description: result.message, variant: "destructive" });
            const fieldErrors = result.errors;
            if (fieldErrors) {
                // Set form errors based on server validation response
                if (fieldErrors._form) form.setError("root", { type: "manual", message: fieldErrors._form.join(', ') });
                if (fieldErrors.slug) form.setError("slug", { type: "server", message: fieldErrors.slug.join(', ') });
                if (fieldErrors.content) form.setError("content", { type: "server", message: fieldErrors.content.join(', ') });
            }
        } else if (!result && result?.status !== 'success') {
             toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        }
    });
  }

  return (
    <Form {...form}>
      {/* @ts-ignore - Ignoring potential onSubmit type mismatch */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden input for slug */}
        <input type="hidden" {...form.register("slug")} value={defaultValues.slug} />

        {/* Content JSON Field */}
        <FormField
          // @ts-ignore - Ignoring potential control type mismatch
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Content (JSON)</FormLabel>
              <FormControl>
                {/* Use a large textarea for JSON editing */}
                <Textarea
                  placeholder='Enter the page content as valid JSON...'
                  className="min-h-[400px] font-mono text-sm" // Set height and monospace font
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Edit the raw JSON content for this page. Ensure the structure is valid.
                You can use an online JSON validator/formatter to help.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitButtonText}
        </Button>

         {/* Display general form errors */}
         {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
         )}

      </form>
    </Form>
  );
}
