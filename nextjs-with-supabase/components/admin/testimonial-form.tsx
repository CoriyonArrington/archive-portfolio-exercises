// components/admin/testimonial-form.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Import the UPDATED testimonial schema and types
import { testimonialSchema, type TestimonialFormValues, type TestimonialState } from "@/lib/schemas/testimonial";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface TestimonialFormProps {
  action: (prevState: TestimonialState | null, formData: FormData) => Promise<TestimonialState>;
  defaultValues?: Partial<TestimonialFormValues>;
  submitButtonText?: string;
}

export default function TestimonialForm({
  action,
  defaultValues,
  submitButtonText = "Submit"
}: TestimonialFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Define default values (excluding sort_order)
  const formDefaultValues: TestimonialFormValues = {
      name: defaultValues?.name ?? "",
      role: defaultValues?.role ?? "",
      quote: defaultValues?.quote ?? "",
      featured: defaultValues?.featured ?? false,
      // sort_order: defaultValues?.sort_order ?? 0, // Removed
      id: defaultValues?.id,
  };

  const form = useForm<TestimonialFormValues>({
    // @ts-ignore
    resolver: zodResolver(testimonialSchema),
    defaultValues: formDefaultValues,
    mode: "onChange",
  });

  // onSubmit handler
  async function onSubmit(values: TestimonialFormValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.role) formData.append("role", values.role);
    formData.append("quote", values.quote);
    if (values.featured === true) formData.append("featured", "on");
    // Removed sort_order from FormData
    // if (values.id) formData.append("sort_order", String(values.sort_order));
    if (values.id) formData.append("id", values.id);

    startTransition(async () => {
        const result = await action(null, formData);

        if (result?.status === 'success') {
            toast({ title: "Success!", description: result.message });
        } else if (result?.status === 'error') {
            toast({ title: "Error", description: result.message, variant: "destructive" });
            const fieldErrors = result.errors;
            if (fieldErrors) {
                if (fieldErrors._form) form.setError("root", { type: "manual", message: fieldErrors._form.join(', ') });
                if (fieldErrors.name) form.setError("name", { type: "server", message: fieldErrors.name.join(', ') });
                if (fieldErrors.role) form.setError("role", { type: "server", message: fieldErrors.role.join(', ') });
                if (fieldErrors.quote) form.setError("quote", { type: "server", message: fieldErrors.quote.join(', ') });
                if (fieldErrors.featured) form.setError("featured", { type: "server", message: fieldErrors.featured.join(', ') });
                // Removed sort_order error setting
                // if (fieldErrors.sort_order) form.setError("sort_order", { type: "server", message: fieldErrors.sort_order.join(', ') });
            }
        } else if (!result && result?.status !== 'success') {
             toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        }
    });
  }

  return (
    <Form {...form}>
      {/* @ts-ignore */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formDefaultValues.id && (
            <input type="hidden" {...form.register("id")} value={formDefaultValues.id} />
        )}

        {/* Name Field */}
        <FormField
          // @ts-ignore
          control={form.control}
          name="name"
          render={({ field }) => (
             <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the person's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role / Title (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., CEO, Founder, Product Manager" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quote Field */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="quote"
          render={({ field }) => (
             <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the testimonial quote"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* REMOVED Sort Order Field */}
        {/* {formDefaultValues.id && ( ... )} */}


        {/* Featured Field (Using Switch) */}
        <FormField
           // @ts-ignore
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                 <FormLabel className="text-base">Featured Testimonial</FormLabel>
                 <FormDescription>
                    Display this testimonial prominently (e.g., on the homepage).
                 </FormDescription>
              </div>
              <FormControl>
                 <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                 />
              </FormControl>
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
