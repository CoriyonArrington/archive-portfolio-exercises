// app/admin/testimonials/new/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import TestimonialForm from '@/components/admin/testimonial-form';
import { addTestimonialAction } from '@/lib/actions/testimonial';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Added static metadata export
export const metadata: Metadata = {
  title: `New Testimonial | Admin | ${siteConfig.name}`,
  description: `Add a new client testimonial.`,
  robots: { index: false, follow: false },
};

// This is a Server Component
export default async function AddNewTestimonialPage() {
  // No data fetching needed for the 'add' page

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             {/* Back button */}
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/testimonials">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Testimonials</span>
                </Link>
             </Button>
            <h1 className="text-lg font-semibold md:text-2xl">Add New Testimonial</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Testimonial Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the TestimonialForm */}
                <TestimonialForm
                    action={addTestimonialAction} // Pass the add action
                    submitButtonText="Add Testimonial" // Set button text
                    // No defaultValues needed for adding
                />
            </CardContent>
        </Card>
    </div>
  );
}