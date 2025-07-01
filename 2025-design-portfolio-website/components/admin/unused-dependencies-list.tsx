"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink } from "lucide-react"

interface UnusedDependency {
  name: string
  type: string
  status: string
  devDependency: boolean
}

interface UnusedDependenciesListProps {
  dependencies: UnusedDependency[]
}

export function UnusedDependenciesList({ dependencies }: UnusedDependenciesListProps) {
  if (!dependencies || dependencies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <div className="rounded-full bg-green-200 p-2">
            <ExternalLink className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No unused dependencies found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          All dependencies in your package.json are being used. Great job!
        </p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Package</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dependencies.map((dependency, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{dependency.name}</TableCell>
            <TableCell>
              <Badge variant={dependency.devDependency ? "secondary" : "default"}>
                {dependency.devDependency ? "devDependency" : "dependency"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.npmjs.com/package/${dependency.name}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  NPM
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
