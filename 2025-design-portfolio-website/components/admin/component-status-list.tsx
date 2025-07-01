"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface ComponentStatus {
  name: string
  location: string
  status: string
  usageCount: number
  notes: string
}

interface ComponentStatusListProps {
  components: ComponentStatus[]
  onUpdateComponent: (index: number, field: string, value: string | number) => void
}

export function ComponentStatusList({ components, onUpdateComponent }: ComponentStatusListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingNotes, setEditingNotes] = useState("")

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditingNotes(components[index].notes)
  }

  const saveNotes = (index: number) => {
    onUpdateComponent(index, "notes", editingNotes)
    setEditingIndex(null)
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  if (!components || components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-amber-100 p-3 mb-4">
          <div className="rounded-full bg-amber-200 p-2">
            <Eye className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No components found</h3>
        <p className="text-sm text-muted-foreground mt-1">Add components to track their implementation status</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Usage Count</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((component, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{component.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground max-w-[200px] truncate">
                {component.location}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={component.status}
                  onValueChange={(value) => onUpdateComponent(index, "status", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          component.status === "Standardized"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : component.status === "Needs Review"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {component.status}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standardized">Standardized</SelectItem>
                    <SelectItem value="Needs Review">Needs Review</SelectItem>
                    <SelectItem value="Deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{component.usageCount}</TableCell>
              <TableCell className="max-w-[200px]">
                {editingIndex === index ? (
                  <Input value={editingNotes} onChange={(e) => setEditingNotes(e.target.value)} className="w-full" />
                ) : (
                  <span className="line-clamp-2">{component.notes || "—"}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {editingIndex === index ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => saveNotes(index)}>
                        <Check className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEditing}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => startEditing(index)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
