import Link from "next/link"
import type { Service } from "@/types/services"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, TrashIcon } from "lucide-react"

interface ServicesListProps {
  services: Service[]
}

export default function ServicesList({ services }: ServicesListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No services found. Create your first service to get started.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.display_order}</TableCell>
            <TableCell className="font-medium">{service.title}</TableCell>
            <TableCell className="hidden md:table-cell">
              {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Link href={`/admin/services/${service.id}/edit`}>
                  <Button size="sm" variant="outline">
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <Link href={`/admin/services/${service.id}/delete`}>
                  <Button size="sm" variant="outline" className="text-red-500">
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
  )
}
