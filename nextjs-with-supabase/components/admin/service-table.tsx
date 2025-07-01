// components/admin/service-table.tsx
"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Service } from '@/types/services';
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
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteServiceAction } from '@/lib/actions/service';

interface ServiceTableProps {
  services: Service[];
}

export default function ServiceTable({ services }: ServiceTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

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
        router.replace('/admin/services', { scroll: false });
    }
  }, [searchParams, toast, router]);

  // Delete handlers
  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!serviceToDelete) return;
    startDeleteTransition(async () => {
        const result = await deleteServiceAction(serviceToDelete.id);
        if (result.status === 'success') {
            toast({ title: "Success!", description: result.message });
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
        setShowDeleteDialog(false);
        setServiceToDelete(null);
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
              <TableHead className="hidden sm:table-cell">Slug</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Featured</TableHead>
              {/* REMOVED Order Column Header */}
              {/* <TableHead className="hidden sm:table-cell text-center">Order</TableHead> */}
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                {/* Adjusted colSpan */}
                <TableCell colSpan={5} className="h-24 text-center">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {service.title ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">
                    {service.description ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">
                    {service.slug ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center">
                    {service.featured ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                  {/* REMOVED Order Column Cell */}
                  {/* <TableCell className="hidden sm:table-cell text-center">
                    {service.sort_order ?? '-'}
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
                          <Link href={`/admin/services/${service.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            onSelect={() => handleDeleteClick(service)}
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
              This action cannot be undone. This will permanently delete the service:
              <br />
              <strong className="block truncate mt-2">"{serviceToDelete?.title}"</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPendingDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={confirmDelete}
                disabled={isPendingDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPendingDelete ? "Deleting..." : "Yes, delete service"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
