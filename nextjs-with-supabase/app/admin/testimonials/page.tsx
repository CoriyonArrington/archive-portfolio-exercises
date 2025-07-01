// app/admin/testimonials/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import type { Testimonial } from '@/types/testimonials';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TestimonialTable from '@/components/admin/testimonial-table';

// Added static metadata export
export const metadata: Metadata = {
  title: `Manage Testimonials | Admin | ${siteConfig.name}`,
  description: `View, add, edit, and delete client testimonials.`,
  robots: { index: false, follow: false },
};

// Data fetching function
async function fetchTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('testimonials')
        .select(`*`)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error("Error fetching Testimonials:", error);
        return [];
    }
    return data as Testimonial[];
}

// Server Component page
export default async function AdminTestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Testimonials</h1>
         {/* UPDATE Button Link */}
        <Button size="sm" asChild>
           <Link href="/admin/testimonials/new"> {/* Link to the new page */}
             <PlusCircle className="h-4 w-4 mr-2" />
             Add New Testimonial
           </Link>
        </Button>
      </div>

      {/* Render the Client Component table */}
      <TestimonialTable testimonials={testimonials} />

    </div>
  );
}