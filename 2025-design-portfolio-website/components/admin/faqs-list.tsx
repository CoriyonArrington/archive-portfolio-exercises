"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react"
import type { FAQ } from "@/types/faqs"

interface FAQsListProps {
  faqs: FAQ[]
}

export function FAQsList({ faqs }: FAQsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/admin/faqs/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New FAQ
          </Button>
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No FAQs found. Create your first one!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell>{faq.display_order}</TableCell>
                <TableCell className="font-medium">{faq.question}</TableCell>
                <TableCell>{faq.category || "General"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/faqs/${faq.id}/edit`}>
                      <Button variant="outline" size="icon">
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Link href={`/admin/faqs/${faq.id}/delete`}>
                      <Button variant="destructive" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
