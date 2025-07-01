// components/admin/project-table.tsx
"use client";

import React, { useEffect, useState, useTransition } from 'react'; // Added useState, useTransition
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Project } from '@/types/project';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog" // Import AlertDialog
import { MoreHorizontal, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Import the delete action
import { deleteProjectAction } from '@/lib/actions/project';

interface ProjectTableProps {
  projects: Project[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Effect for add/edit toasts
  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    if (status && message) {
        if (status === 'success') {
            toast({ title: "Success!", description: decodeURIComponent(message) });
        } else if (status === 'error') {
            toast({ title: "Error", description: decodeURIComponent(message), variant: "destructive" });
        }
        // Clear search params after showing toast
        router.replace('/admin/projects', { scroll: false });
    }
  }, [searchParams, toast, router]);

  // Handle opening delete dialog
  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  // Handle confirming deletion
  const confirmDelete = () => {
    if (!projectToDelete) return;

    startDeleteTransition(async () => {
        const result = await deleteProjectAction(projectToDelete.id); // Call delete action

        if (result.status === 'success') {
            toast({ title: "Success!", description: result.message });
            // Revalidation should handle UI update, router.refresh() might not be needed
            // router.refresh();
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
        setShowDeleteDialog(false);
        setProjectToDelete(null);
    });
  };

  return (
    <>
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden sm:table-cell">Tags</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Featured</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => {
                const tags = project.project_tags?.map(pt => pt.tag) ?? [];
                return (
                    <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                        {project.title ?? 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm truncate">
                        {project.description ?? 'N/A'}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                            {tags.length > 0 ? (
                                tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                            )}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                        {project.featured ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                        )}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/projects/${project.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {/* Updated Delete Item */}
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onSelect={() => handleDeleteClick(project)} // Open dialog
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project:
              <br />
              <strong className="block truncate mt-2">"{projectToDelete?.title}"</strong>
              <br />
              This will also delete all associated tags.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPendingDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={confirmDelete}
                disabled={isPendingDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPendingDelete ? "Deleting..." : "Yes, delete project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
