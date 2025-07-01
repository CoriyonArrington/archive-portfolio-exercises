// app/admin/services/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import type { Service } from '@/types/services'; // Ensure correct Service type import
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ServiceTable from '@/components/admin/service-table';

// Added static metadata export
export const metadata: Metadata = {
  title: `Manage Services | Admin | ${siteConfig.name}`,
  description: `View, add, edit, and delete services offered.`,
  robots: { index: false, follow: false },
};

// Data fetching function
async function fetchServices(): Promise<Service[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('services')
        .select(`*`) // Select all columns for now
        .order('sort_order', { ascending: true }); // Order by sort_order

    if (error) {
        console.error("Error fetching Services:", error);
        return [];
    }
    return data as Service[]; // Type assertion
}

// Server Component page
export default async function AdminServicesPage() {
  // Fetch data directly here
  const services = await fetchServices();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Services</h1>
         {/* CORRECTED Button Link */}
        <Button size="sm" asChild>
           <Link href="/admin/services/new"> {/* Corrected Link */}
             <PlusCircle className="h-4 w-4 mr-2" />
             Add New Service
           </Link>
        </Button>
      </div>

      {/* Render the Client Component table, passing fetched data */}
      <ServiceTable services={services} />

    </div>
  );
}