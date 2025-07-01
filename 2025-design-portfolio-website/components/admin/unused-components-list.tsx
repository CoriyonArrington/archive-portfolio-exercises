"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"

interface UnusedComponent {
  path: string
  name: string
  type: string
  status: string
}

interface UnusedComponentsListProps {
  components: UnusedComponent[]
}

export function UnusedComponentsList({ components }: UnusedComponentsListProps) {
  if (!components || components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <div className="rounded-full bg-green-200 p-2">
            <Eye className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No unused components found</h3>
        <p className="text-sm text-muted-foreground mt-1">All components in your codebase are being used. Great job!</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Path</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((component, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{component.name}</TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">{component.path}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
