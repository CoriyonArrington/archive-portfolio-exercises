// components/admin/service-form.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Import the service schema and types
import { serviceSchema, type ServiceFormValues, type ServiceState } from "@/lib/schemas/service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface ServiceFormProps {
  action: (prevState: ServiceState | null, formData: FormData) => Promise<ServiceState>;
  defaultValues?: Partial<ServiceFormValues>;
  submitButtonText?: string;
}

export default function ServiceForm({
  action,
  defaultValues,
  submitButtonText = "Submit"
}: ServiceFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const formDefaultValues: ServiceFormValues = {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      slug: defaultValues?.slug ?? "",
      featured: defaultValues?.featured ?? false,
      // sort_order field removed from schema/defaults
      id: defaultValues?.id,
  };

  const form = useForm<ServiceFormValues>({
    // @ts-ignore - Ignoring potential resolver type mismatch if errors persist
    resolver: zodResolver(serviceSchema),
    defaultValues: formDefaultValues,
    mode: "onChange",
  });

  // onSubmit handler
  async function onSubmit(values: ServiceFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.slug) formData.append("slug", values.slug);
    if (values.featured === true) formData.append("featured", "on");
    if (values.id) formData.append("id", values.id);

    startTransition(async () => {
        const result = await action(null, formData);

        if (result?.status === 'success') {
            toast({ title: "Success!", description: result.message });
            // Redirect is handled by server action
        } else if (result?.status === 'error') {
            toast({ title: "Error", description: result.message, variant: "destructive" });
            const fieldErrors = result.errors;
            if (fieldErrors) {
                if (fieldErrors._form) form.setError("root", { type: "manual", message: fieldErrors._form.join(', ') });
                if (fieldErrors.title) form.setError("title", { type: "server", message: fieldErrors.title.join(', ') });
                if (fieldErrors.description) form.setError("description", { type: "server", message: fieldErrors.description.join(', ') });
                if (fieldErrors.slug) form.setError("slug", { type: "server", message: fieldErrors.slug.join(', ') });
                if (fieldErrors.featured) form.setError("featured", { type: "server", message: fieldErrors.featured.join(', ') });
                // Removed sort_order error setting
            }
        } else if (!result && result?.status !== 'success') {
             toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        }
    });
  }

  return (
    // Root Form provider from Shadcn/react-hook-form
    <Form {...form}>
      {/* Standard HTML form tag with submit handler */}
      {/* @ts-ignore - Ignoring potential onSubmit type mismatch */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Hidden input for ID if editing */}
        {formDefaultValues.id && (
            <input type="hidden" {...form.register("id")} value={formDefaultValues.id} />
        )}

        {/* Title Field */}
        <FormField
          // @ts-ignore - Ignoring potential control type mismatch
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter service title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} // Ensure closing parenthesis and brace are correct
        />

        {/* Description Field */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a short description of the service"
                  className="min-h-[80px]"
                  {...field}
                  value={field.value ?? ''} // Handle potential null
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} // Ensure closing parenthesis and brace are correct
        />

        {/* Slug Field */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ux-research" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                Unique identifier for the URL. Leave blank to auto-generate from title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} // Ensure closing parenthesis and brace are correct
        />

        {/* Featured Field (Using Switch) */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                 <FormLabel className="text-base">Featured Service</FormLabel>
                 <FormDescription>
                    Display this service prominently (e.g., on the homepage).
                 </FormDescription>
              </div>
              <FormControl>
                 <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                 />
              </FormControl>
              {/* FormMessage often not needed for Switch/Checkbox unless specific validation */}
            </FormItem>
          )} // Ensure closing parenthesis and brace are correct
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
