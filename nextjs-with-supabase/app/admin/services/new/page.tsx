// app/admin/services/new/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import ServiceForm from '@/components/admin/service-form';
import { addServiceAction } from '@/lib/actions/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Added static metadata export
export const metadata: Metadata = {
  title: `New Service | Admin | ${siteConfig.name}`,
  description: `Add a new service offering.`,
  robots: { index: false, follow: false },
};

// This is a Server Component
export default async function AddNewServicePage() {
  // No data fetching needed for the 'add' page

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             {/* Back button */}
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Services</span>
                </Link>
             </Button>
            <h1 className="text-lg font-semibold md:text-2xl">Add New Service</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the ServiceForm */}
                <ServiceForm
                    action={addServiceAction} // Pass the add action
                    submitButtonText="Add Service" // Set button text
                    // No defaultValues needed for adding
                />
            </CardContent>
        </Card>
    </div>
  );
}