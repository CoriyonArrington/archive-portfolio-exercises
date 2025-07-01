// components/admin/testimonial-table.tsx
"use client";

import React, { useEffect, useState, useTransition } from 'react'; // Added useState, useTransition
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Testimonial } from '@/types/testimonials';
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
} from "@/components/ui/alert-dialog"; // Import AlertDialog
import { MoreHorizontal, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Import the delete action
import { deleteTestimonialAction } from '@/lib/actions/testimonial';

interface TestimonialTableProps {
  testimonials: Testimonial[];
}

export default function TestimonialTable({ testimonials }: TestimonialTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  // State for delete confirmation
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);

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
        router.replace('/admin/testimonials', { scroll: false });
    }
  }, [searchParams, toast, router]);

  // Function to handle opening the delete confirmation dialog
  const handleDeleteClick = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteDialog(true);
  };

  // Function to handle the actual deletion after confirmation
  const confirmDelete = () => {
    if (!testimonialToDelete) return;

    startDeleteTransition(async () => {
        const result = await deleteTestimonialAction(testimonialToDelete.id); // Call delete action

        if (result.status === 'success') {
            toast({ title: "Success!", description: result.message });
            // Revalidation should handle UI update
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
        // Close dialog regardless of outcome
        setShowDeleteDialog(false);
        setTestimonialToDelete(null);
    });
  };

  return (
    <>
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden sm:table-cell">Quote (Excerpt)</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Featured</TableHead>
              {/* <TableHead className="hidden sm:table-cell text-center">Order</TableHead> */}
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center"> {/* Adjusted colSpan */}
                  No testimonials found.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {testimonial.name ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {testimonial.role ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell max-w-sm truncate">
                    {testimonial.quote ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center">
                    {testimonial.featured ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                  {/* <TableCell className="hidden sm:table-cell text-center">
                    {testimonial.sort_order ?? '-'}
                  </TableCell> */}
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
                          <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {/* Updated Delete Item */}
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            onSelect={() => handleDeleteClick(testimonial)} // Open dialog
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
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
              This action cannot be undone. This will permanently delete the testimonial from:
              <br />
              <strong className="block truncate mt-2">"{testimonialToDelete?.name}"</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPendingDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={confirmDelete}
                disabled={isPendingDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90" // Destructive style
            >
              {isPendingDelete ? "Deleting..." : "Yes, delete testimonial"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
