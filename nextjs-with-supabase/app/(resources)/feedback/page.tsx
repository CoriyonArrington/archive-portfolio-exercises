// app/(resources)/feedback/page.tsx - Final Version
import type { Metadata } from 'next'; // Added import
import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/components/ui/section";
import FeedbackForm from "@/components/forms/feedback-form";
import { Database, type Json } from '@/types/supabase';
import { siteConfig } from '@/config/site'; // Added import

// Added static metadata export
export const metadata: Metadata = {
  title: `Feedback | ${siteConfig.name}`, // Specific title
  description: `Provide feedback to help improve ${siteConfig.name}.` || siteConfig.description, // Specific description with fallback
};

// Define expected content structure for type safety
type FeedbackPageContent = {
  hero?: {
    headline?: string | null;
    body?: string | null;
  } | null;
  location?: {
    body?: string | null;
  } | null;
  formFields?: (string | null)[] | null;
} | null;


export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const supabase = await createClient();

  // Fetch CMS page content for 'feedback' page
  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "feedback")
    .maybeSingle();

  if (pageError) {
    console.error("Error fetching feedback page content:", pageError.message);
    // Handle error - provide default content or show error message
  }

  // Safely parse and access content, providing defaults
  const content: FeedbackPageContent = pageData?.content as FeedbackPageContent ?? null;

  const heroHeadline = content?.hero?.headline ?? "Help us get better"; // Default from SQL
  const heroBody = content?.hero?.body ?? "Your feedback matters—please rate clarity and usefulness, and let us know any thoughts."; // Default from SQL
  const locationText = content?.location?.body ?? ""; // Default from SQL

  // Extract form field labels, providing defaults based on SQL
  const rawFields = content?.formFields ?? ["Clarity", "Usefulness", "Comments"];
  const formFields: [string, string, string] = [
      rawFields[0] ?? "Clarity",
      rawFields[1] ?? "Usefulness",
      rawFields[2] ?? "Comments"
  ];

  // Note: Notification logic is now handled within FeedbackForm via useToast + Server Action result

  return (
    <>
      {/* Hero Section */}
      <Section id="feedback-hero" background="muted" padding="md">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">{heroHeadline}</h1>
          {heroBody && (
             <p className="mt-2 text-lg text-muted-foreground">{heroBody}</p>
          )}
        </div>
      </Section>

      {/* Feedback Form Section */}
      <Section id="feedback-form" padding="md">
         {/* Center the form using mx-auto on a container */}
         <div className="max-w-xl mx-auto">
            {/* Render the refactored form, passing the labels */}
            <FeedbackForm formFields={formFields} />
         </div>
      </Section>

      {/* Optional Location Text Section */}
      {locationText && (
        <Section id="location-info" padding="sm">
           <p className="text-center text-sm text-muted-foreground">
              {locationText}
            </p>
        </Section>
      )}
    </>
  );
}