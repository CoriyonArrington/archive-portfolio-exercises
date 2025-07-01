// app/admin/projects/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import type { Project } from '@/types/project';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectTable from '@/components/admin/project-table';

// Added static metadata export
export const metadata: Metadata = {
  title: `Manage Projects | Admin | ${siteConfig.name}`,
  description: `View, add, edit, and delete projects/case studies.`,
  robots: { index: false, follow: false },
};

// Data fetching function (remains the same)
async function fetchProjects(): Promise<Project[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            project_tags ( tag )
        `)
        .order('sort_order', { ascending: true });

    if (error) {
        console.error("Error fetching Projects:", error);
        return [];
    }
    const projectsWithDefaults = data.map(proj => ({
        ...proj,
        project_tags: proj.project_tags ?? [],
    }));

    return projectsWithDefaults as Project[];
}

// Server Component page
export default async function AdminProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Projects</h1>
         {/* UPDATE Button Link */}
        <Button size="sm" asChild>
           <Link href="/admin/projects/new"> {/* Link to the new page */}
             <PlusCircle className="h-4 w-4 mr-2" />
             Add New Project
           </Link>
        </Button>
      </div>

      {/* Render the Client Component table */}
      <ProjectTable projects={projects} />

    </div>
  );
}