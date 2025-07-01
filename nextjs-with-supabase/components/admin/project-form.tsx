// components/admin/project-form.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues, type ProjectState } from "@/lib/schemas/project";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// Removed Checkbox import
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
// Import Switch
import { Switch } from "@/components/ui/switch";

interface ProjectFormProps {
  action: (prevState: ProjectState | null, formData: FormData) => Promise<ProjectState>;
  defaultValues?: Partial<ProjectFormValues>;
  submitButtonText?: string;
}

export default function ProjectForm({
  action,
  defaultValues,
  submitButtonText = "Submit"
}: ProjectFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const formDefaultValues: ProjectFormValues = {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      slug: defaultValues?.slug ?? "",
      featured: defaultValues?.featured ?? false,
      tags: defaultValues?.tags ?? "",
      id: defaultValues?.id,
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: formDefaultValues,
    mode: "onChange",
  });

  // Client-side onSubmit handler
  async function onSubmit(values: ProjectFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.slug) formData.append("slug", values.slug);
    // Switch sends boolean directly, schema handles it
    // But FormData needs 'on' or nothing for boolean mapping in action
    if (values.featured === true) formData.append("featured", "on");
    if (values.tags) formData.append("tags", values.tags);
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
                if (fieldErrors.title) form.setError("title", { type: "server", message: fieldErrors.title.join(', ') });
                if (fieldErrors.description) form.setError("description", { type: "server", message: fieldErrors.description.join(', ') });
                if (fieldErrors.slug) form.setError("slug", { type: "server", message: fieldErrors.slug.join(', ') });
                if (fieldErrors.featured) form.setError("featured", { type: "server", message: fieldErrors.featured.join(', ') });
                if (fieldErrors.tags) form.setError("tags", { type: "server", message: fieldErrors.tags.join(', ') });
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

        {/* Title Field */}
        <FormField
          // @ts-ignore
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                  placeholder="Enter a short description of the project"
                  className="min-h-[80px]"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                <Input placeholder="e.g., my-awesome-project" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                Unique identifier for the URL. Leave blank to auto-generate from title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          // @ts-ignore
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UX Design, Web App, Case Study" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormDescription>
                Enter tags separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Featured Field (Using Switch) */}
        <FormField
          // @ts-ignore
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                 <FormLabel className="text-base">Featured Project</FormLabel>
                 <FormDescription>
                    Display this project prominently (e.g., on the homepage).
                 </FormDescription>
              </div>
              <FormControl>
                 {/* Use Switch component */}
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
