// components/admin/faq-table.tsx
"use client";

import React, { useEffect, useState, useTransition } from 'react'; // Added useState, useTransition
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; // Added useRouter
import type { Database } from '@/types/supabase';
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
  // AlertDialogTrigger, // We trigger it manually
} from "@/components/ui/alert-dialog" // Import AlertDialog components
import { MoreHorizontal, Trash2 } from "lucide-react"; // Added Trash2 icon
import { useToast } from "@/hooks/use-toast";
import { deleteFaqAction } from '@/lib/actions/faq'; // Import the delete action

type FaqWithPages = Database['public']['Tables']['faqs']['Row'] & {
  faq_page_slugs: { page_slug: string }[];
};

interface FaqTableProps {
  faqs: FaqWithPages[];
}

export default function FaqTable({ faqs }: FaqTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter(); // For potentially refreshing data without full redirect
  const { toast } = useToast();
  const [isPendingDelete, startDeleteTransition] = useTransition(); // Pending state for delete
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FaqWithPages | null>(null);

  // Effect to show toast based on search params from redirect (Add/Edit)
  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (status === 'success' && message) {
      toast({ title: "Success!", description: decodeURIComponent(message) });
      // Clear search params after showing toast to prevent re-showing on refresh
      // Using router.replace to clear params without adding to history
      router.replace('/admin/faqs', { scroll: false });
    } else if (status === 'error' && message) {
         toast({ title: "Error", description: decodeURIComponent(message), variant: "destructive" });
         router.replace('/admin/faqs', { scroll: false });
    }
  }, [searchParams, toast, router]);

  // Function to handle opening the delete confirmation dialog
  const handleDeleteClick = (faq: FaqWithPages) => {
    setFaqToDelete(faq);
    setShowDeleteDialog(true);
  };

  // Function to handle the actual deletion after confirmation
  const confirmDelete = () => {
    if (!faqToDelete) return;

    startDeleteTransition(async () => {
        const result = await deleteFaqAction(faqToDelete.id);

        if (result.status === 'success') {
            toast({ title: "Success!", description: result.message });
            // Optionally force a refresh of the data if revalidatePath isn't enough
            // router.refresh(); // Uncomment if list doesn't update automatically
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
        // Close dialog regardless of outcome
        setShowDeleteDialog(false);
        setFaqToDelete(null);
    });
  };

  return (
    <>
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead className="hidden md:table-cell">Answer (Excerpt)</TableHead>
              <TableHead className="hidden sm:table-cell">Pages</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No FAQs found. Have you added any yet?
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((faq) => {
                const uniquePageSlugs = Array.from(new Set(faq.faq_page_slugs.map(link => link.page_slug)));
                return (
                    <TableRow key={faq.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                        {faq.question ?? 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm truncate">
                        {faq.answer ?? 'N/A'}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                            {uniquePageSlugs.length > 0 ? (
                                uniquePageSlugs.map(slug => (
                                    <Badge key={slug} variant="secondary">{slug}</Badge>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                            )}
                        </div>
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
                              <Link href={`/admin/faqs/${faq.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            {/* Updated Delete Item */}
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onSelect={() => handleDeleteClick(faq)} // Open dialog on select
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
              This action cannot be undone. This will permanently delete the FAQ:
              <br />
              <strong className="block truncate mt-2">"{faqToDelete?.question}"</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPendingDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={confirmDelete}
                disabled={isPendingDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90" // Destructive style
            >
              {isPendingDelete ? "Deleting..." : "Yes, delete FAQ"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
