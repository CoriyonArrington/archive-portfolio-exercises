// app/admin/projects/[id]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ProjectForm from '@/components/admin/project-form';
import { editProjectAction } from '@/lib/actions/project';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Database } from '@/types/supabase';
import type { Project } from '@/types/project'; // Import Project type
import type { ProjectFormValues } from '@/lib/schemas/project';

// --- Metadata Imports ---
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Define Types ---

// Note: FaqWithPages type seems unused in this file, but kept as per original
type FaqWithPages = Database['public']['Tables']['faqs']['Row'] & {
  faq_page_slugs: { page_slug: string }[];
};

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

  // Fetch only the necessary data for metadata (e.g., title)
  const { data: project, error } = await supabase
    .from('projects')
    .select('title') // Select minimal data needed for title
    .eq('id', id)
    .maybeSingle();

  // Handle errors during fetch
  if (error) {
    console.error("Error fetching Project for metadata:", error.message);
    return {
      title: 'Error Loading Project Edit',
      description: 'Failed to load project details for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing on error
    };
  }

  // Handle Project not found
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing for not found
    };
  }

  // Construct dynamic title - use project title or ID as fallback
  const titleText = project.title || `ID: ${id}`;

  return {
    title: `Edit Project: ${titleText}`, // Title uses template from layout/siteConfig
    description: `Edit details for project: ${titleText}`, // Simple description
    robots: { index: false, follow: false }, // IMPORTANT: Disallow indexing for admin pages
    // OpenGraph and Twitter metadata usually omitted for non-indexed admin pages
  };
}


// --- Data Fetching Function ---

// Function to fetch a single project by ID including tags (for the form)
async function getProjectById(id: string): Promise<Project | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            project_tags ( tag )
        `)
        .eq('id', id)
        .single(); // Use single, assuming ID is unique and should exist

    if (error) {
        console.error(`Error fetching Project with ID ${id}:`, error.message);
        // Return null to allow the page component to trigger notFound()
        return null;
    }

    // Ensure project_tags is always an array, even if null from DB
    // Type assertion might be needed depending on strictness/Supabase type generation
    return {
        ...data,
        project_tags: data.project_tags ?? [],
    } as Project;
}

// Function to fetch distinct page slugs (if needed for project form later)
// async function getAvailablePageSlugs(): Promise<string[]> { ... }


// --- Page Component ---

// Define props for the page component, including URL params
interface EditProjectPageProps {
  params: {
    id: string; // The Project ID from the URL segment [id]
  };
}

// Destructure params directly in the function signature for projectId
export default async function EditProjectPage({ params: { id: projectId } }: EditProjectPageProps) {

  // Fetch existing project data using the destructured projectId
  const projectData = await getProjectById(projectId);
  // Fetch available page slugs if needed for the form later
  // const availablePageSlugs = await getAvailablePageSlugs();

  // If project data not found (getProjectById returned null), show 404 page
  if (!projectData) {
    notFound();
  }

  // Prepare default values for the form
  const defaultValues: Partial<ProjectFormValues> & { id: string } = {
    id: projectData.id, // Ensure ID is included for the edit action
    title: projectData.title ?? "",
    description: projectData.description ?? "",
    slug: projectData.slug ?? "",
    featured: projectData.featured ?? false,
    // Handle potential null tags and join them safely
    tags: projectData.project_tags?.map(pt => pt.tag).filter(Boolean).join(', ') ?? "",
    // Stringify content if it exists and needs to be editable in the form
    // Add this line if your ProjectForm includes a 'content' field:
    // content: projectData.content ? JSON.stringify(projectData.content, null, 2) : "",
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/projects">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Projects</span>
                </Link>
             </Button>
            {/* Display project title being edited or ID */}
            <h1 className="text-lg font-semibold md:text-2xl truncate">
                Edit Project: {projectData.title ? `"${projectData.title}"` : `ID ${projectData.id}`}
            </h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ProjectForm
                    action={editProjectAction}
                    defaultValues={defaultValues}
                    submitButtonText="Update Project"
                    // Pass availablePageSlugs here if needed by the form
                />
            </CardContent>
        </Card>
    </div>
  );
}