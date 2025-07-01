// components/admin/unused-components-list.tsx (Updated Interface)
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"

// --- MODIFIED INTERFACE ---
interface UnusedComponent {
  path: string
  name: string
  type?: string | null // Make optional (allow undefined or null)
  status?: string | null // Make optional (allow undefined or null)
}
// --- End Modification ---

interface UnusedComponentsListProps {
  components: UnusedComponent[]
}

export function UnusedComponentsList({ components }: UnusedComponentsListProps) {
  if (!components || components.length === 0) {
    return ( // --- Empty state remains the same ---
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4 dark:bg-green-900/30">
          <div className="rounded-full bg-green-200 p-2 dark:bg-green-800/40">
            <Eye className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No unused components found</h3>
        <p className="text-sm text-muted-foreground mt-1">All components in your codebase appear to be used. Great job!</p>
      </div>
    )
  }

  return ( // --- Table rendering remains the same ---
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Path</TableHead>
          {/* Optional: Add Type/Status columns if needed */}
          {/* <TableHead>Type</TableHead> */}
          {/* <TableHead>Status</TableHead> */}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((component, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{component.name ?? 'N/A'}</TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">{component.path ?? 'N/A'}</TableCell>
            {/* Optional: Render type/status */}
            {/* <TableCell>{component.type ?? 'N/A'}</TableCell> */}
            {/* <TableCell>{component.status ?? 'N/A'}</TableCell> */}
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {/* Note: Remove action likely needs backend integration */}
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove?
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}