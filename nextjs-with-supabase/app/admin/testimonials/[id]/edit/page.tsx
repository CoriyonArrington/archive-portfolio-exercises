// app/admin/testimonials/[id]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import TestimonialForm from '@/components/admin/testimonial-form';
import { editTestimonialAction } from '@/lib/actions/testimonial';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Testimonial } from '@/types/testimonials';
import type { TestimonialFormValues } from '@/lib/schemas/testimonial';

// --- Metadata Imports ---
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Generate Dynamic Metadata ---
type MetadataProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient();
  const id = params.id;

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .select('name')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching Testimonial for metadata:", error.message);
    return {
      title: 'Error Loading Testimonial Edit',
      description: 'Failed to load testimonial details for editing.',
      robots: { index: false, follow: false },
    };
  }

  if (!testimonial) {
    return {
      title: 'Testimonial Not Found',
      description: 'The requested testimonial could not be found for editing.',
      robots: { index: false, follow: false },
    };
  }

  const titleText = testimonial.name || `ID: ${id}`;

  return {
    title: `Edit Testimonial: ${titleText}`,
    description: `Edit details for testimonial by ${titleText}`,
    robots: { index: false, follow: false },
  };
}

// --- Data Fetching Function ---
async function getTestimonialById(id: string): Promise<Testimonial | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('testimonials')
        .select(`*`)
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching Testimonial with ID ${id}:`, error.message);
        return null;
    }
    return data as Testimonial | null;
}

// --- Page Component ---
interface EditTestimonialPageProps {
  params: {
    id: string;
  };
}

export default async function EditTestimonialPage({ params: { id: testimonialId } }: EditTestimonialPageProps) {

  const testimonialData = await getTestimonialById(testimonialId);

  if (!testimonialData) {
    notFound();
  }

  // Prepare default values - Removed project_id
  const defaultValues: Partial<TestimonialFormValues> & { id: string } = {
    id: testimonialData.id,
    name: testimonialData.name ?? "",
    role: testimonialData.role ?? "",
    quote: testimonialData.quote ?? "",
    featured: testimonialData.featured ?? false,
    // Removed: project_id: testimonialData.project_id ?? undefined,
    // Removed: sort_order: testimonialData.sort_order ?? 0,
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/testimonials">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Testimonials</span>
                </Link>
             </Button>
             <h1 className="text-lg font-semibold md:text-2xl truncate">
                Edit Testimonial: {testimonialData.name ? `"${testimonialData.name}"` : `ID ${testimonialData.id}`}
             </h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Testimonial Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* If your form needs to link to a project, you'll likely need to pass
                    project data separately, e.g., fetched projects list */}
                <TestimonialForm
                    action={editTestimonialAction}
                    defaultValues={defaultValues}
                    submitButtonText="Update Testimonial"
                    // Example: projects={listOfFetchedProjects}
                />
            </CardContent>
        </Card>
    </div>
  );
}