"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface CodeDuplication {
  sourceFile: string
  targetFile: string
  lines: number
  tokens: number
}

interface CodeDuplicationListProps {
  duplications: CodeDuplication[]
}

export function CodeDuplicationList({ duplications }: CodeDuplicationListProps) {
  if (!duplications || duplications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <div className="rounded-full bg-green-200 p-2">
            <Eye className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No code duplication found</h3>
        <p className="text-sm text-muted-foreground mt-1">Your codebase has minimal duplication. Great job!</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source File</TableHead>
          <TableHead>Target File</TableHead>
          <TableHead>Duplicated Lines</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {duplications.map((duplication, index) => (
          <TableRow key={index}>
            <TableCell className="font-mono text-xs">
              {duplication.sourceFile.split("/").pop()}
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">{duplication.sourceFile}</div>
            </TableCell>
            <TableCell className="font-mono text-xs">
              {duplication.targetFile.split("/").pop()}
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">{duplication.targetFile}</div>
            </TableCell>
            <TableCell>{duplication.lines} lines</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Compare
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

