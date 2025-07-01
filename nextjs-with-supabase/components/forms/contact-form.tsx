// components/forms/contact-form.tsx
"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Assuming schema is now in lib/schemas/contact.ts
import { contactFormSchema, type ContactFormValues, type ContactActionResult } from "@/lib/schemas/contact";
import { useToast } from "@/hooks/use-toast";
// Assuming action is now in lib/actions/contact.ts
import { submitContactForm } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactFormProps {
  // Expects labels for Name, Email, Message placeholders passed from page.tsx
  fields: [string, string, string];
}

export default function ContactForm({ fields }: ContactFormProps) {
  const { toast } = useToast();
  const [namePlaceholder, emailPlaceholder, messagePlaceholder] = fields;
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "", // Default value is empty string
    },
    mode: 'onSubmit', // Validate on submit
  });

  async function onSubmit(values: ContactFormValues) {
    console.log("Client: onSubmit called with values:", values);
    // Prevent submission if honeypot field is filled
    if (values.honeypot) {
      console.log("Honeypot field filled, blocking submission.");
      toast({ title: "Success!", description: "Your message has been sent!" });
      form.reset();
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);
    // Append honeypot value (will be "" or null/undefined from form state if empty)
    formData.append("honeypot", values.honeypot || "");


    console.log("Client: Calling submitContactForm...");
    try {
      const result: ContactActionResult | null = await submitContactForm(formData);
      console.log("Client: Server Action returned:", result);

      if (result?.status === "success") {
        toast({ title: "Success!", description: result.message });
        form.reset();
      } else if (result?.status === "error") {
        // Check if there are specific field errors from Zod
        let errorMessage = result.message;
        // Example: if (result.errors?.email) errorMessage += ` Email: ${result.errors.email.join(', ')}`;
        toast({ variant: "destructive", title: "Error", description: errorMessage });
      } else {
         console.error("Client: Received unexpected result from server action:", result);
         toast({ variant: "destructive", title: "Error", description: "An unexpected server error occurred." });
      }
    } catch (error) {
       console.error("Client: Error submitting form:", error);
       toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
    } finally {
       setIsPending(false);
    }
  }

  // Handle RHF errors for debugging
  const handleFormError = (errors: any) => {
     console.error("Client: RHF validation errors", errors);
  };

  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Name</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder={namePlaceholder}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Email</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder={emailPlaceholder}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      id={field.name}
                      placeholder={messagePlaceholder}
                      required
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honeypot Field (Hidden) */}
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                 <FormItem className="absolute w-0 h-0 overflow-hidden"> {/* Visually hide */}
                    <FormLabel htmlFor={field.name}>Leave blank</FormLabel>
                    <FormControl>
                       <Input
                         id={field.name}
                         autoComplete="off"
                         tabIndex={-1}
                         // Spread other necessary field props
                         {...field}
                         // Ensure value is never null/undefined for the Input component
                         value={field.value ?? ""} // Use nullish coalescing operator
                       />
                    </FormControl>
                    {/* No FormMessage needed for hidden field */}
                 </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}