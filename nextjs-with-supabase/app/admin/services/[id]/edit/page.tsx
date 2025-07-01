// app/admin/services/[id]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ServiceForm from '@/components/admin/service-form';
import { editServiceAction } from '@/lib/actions/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Service } from '@/types/services'; // Import Service type
import type { ServiceFormValues } from '@/lib/schemas/service';

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

  const { data: service, error } = await supabase
    .from('services')
    .select('title')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching Service for metadata:", error.message);
    return {
      title: 'Error Loading Service Edit',
      description: 'Failed to load service details for editing.',
      robots: { index: false, follow: false },
    };
  }

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found for editing.',
      robots: { index: false, follow: false },
    };
  }

  const titleText = service.title || `ID: ${id}`;

  return {
    title: `Edit Service: ${titleText}`,
    description: `Edit details for service: ${titleText}`,
    robots: { index: false, follow: false },
  };
}

// --- Data Fetching Function ---
async function getServiceById(id: string): Promise<Service | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('services')
        .select(`*`)
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching Service with ID ${id}:`, error.message);
        return null;
    }
    return data as Service | null;
}

// --- Page Component ---
interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function EditServicePage({ params: { id: serviceId } }: EditServicePageProps) {

  const serviceData = await getServiceById(serviceId);

  if (!serviceData) {
    notFound();
  }

  // Prepare default values for the form - Removed icon_name and sort_order
  const defaultValues: Partial<ServiceFormValues> & { id: string } = {
    id: serviceData.id,
    title: serviceData.title ?? "",
    description: serviceData.description ?? "",
    slug: serviceData.slug ?? "",
    featured: serviceData.featured ?? false,
    // Removed: sort_order: serviceData.sort_order ?? 0,
    // Removed: icon_name: serviceData.icon_name ?? "",
    // content: serviceData.content ? JSON.stringify(serviceData.content, null, 2) : "", // Keep if needed
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Services</span>
                </Link>
             </Button>
             <h1 className="text-lg font-semibold md:text-2xl truncate">
                Edit Service: {serviceData.title ? `"${serviceData.title}"` : `ID ${serviceData.id}`}
             </h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ServiceForm
                    action={editServiceAction}
                    defaultValues={defaultValues}
                    submitButtonText="Update Service"
                />
            </CardContent>
        </Card>
    </div>
  );
}