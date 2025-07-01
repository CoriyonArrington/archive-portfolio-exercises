// components/admin/page-table.tsx
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link'; // Ensure Link is imported
import { useSearchParams, useRouter } from 'next/navigation';
import type { Database } from '@/types/supabase';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PageRow = Database['public']['Tables']['pages']['Row'];

interface PageTableProps {
  pages: PageRow[];
}

export default function PageTable({ pages }: PageTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Effect to show toast based on search params from redirect
  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    if (status && message) {
        if (status === 'success') {
            toast({ title: "Success!", description: decodeURIComponent(message) });
        } else if (status === 'error') {
            toast({ title: "Error", description: decodeURIComponent(message), variant: "destructive" });
        }
        router.replace('/admin/pages', { scroll: false });
    }
  }, [searchParams, toast, router]);

  return (
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No pages found.
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    {page.title ?? 'N/A'}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {page.slug ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell capitalize">
                     {page.type ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs">
                    {page.updated_at ? new Date(page.updated_at).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Edit Button - UPDATE LINK */}
                    {/* Only show button if slug exists */}
                    {page.slug && (
                        <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/pages/${page.slug}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Content
                        </Link>
                        </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
  );
}
