// app/admin/projects/new/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import ProjectForm from '@/components/admin/project-form';
import { addProjectAction } from '@/lib/actions/project';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Added static metadata export
export const metadata: Metadata = {
  title: `New Project | Admin | ${siteConfig.name}`,
  description: `Add a new project or case study.`,
  robots: { index: false, follow: false },
};

// This is a Server Component
export default async function AddNewProjectPage() {
  // No data fetching needed for the 'add' page itself

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             {/* Back button */}
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/projects">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Projects</span>
                </Link>
             </Button>
            <h1 className="text-lg font-semibold md:text-2xl">Add New Project</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the ProjectForm */}
                <ProjectForm
                    action={addProjectAction} // Pass the add action
                    submitButtonText="Add Project" // Set button text
                    // No defaultValues needed for adding
                />
            </CardContent>
        </Card>
    </div>
  );
}