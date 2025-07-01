"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column {
  key: string
  label: string
  renderType?: "boolean" | "truncate" | "count" | "default"
  truncateLength?: number
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  entityName: string
  entityPath: string
  onDelete: (id: string) => Promise<void>
}

export function DataTable({ data, columns, entityName, entityPath, onDelete }: DataTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete this ${entityName.toLowerCase()}?`)) {
      setIsDeleting(id)
      try {
        await onDelete(id)
      } catch (error) {
        console.error(`Error deleting ${entityName.toLowerCase()}:`, error)
        alert(`Failed to delete ${entityName.toLowerCase()}: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  // Render function for the table
  const renderCell = (item: any, column: Column) => {
    const value = item[column.key]

    // Handle different render types
    switch (column.renderType) {
      case "boolean":
        return value ? "Yes" : "No"

      case "truncate":
        const length = column.truncateLength || 50
        return value ? (value.length > length ? `${value.substring(0, length)}...` : value) : ""

      case "count":
        return Array.isArray(value) ? `${value.length} items` : "0 items"

      default:
        return value
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{entityName} List</h2>
        <Link href={`/admin/${entityPath}/new`}>
          <Button>Add {entityName}</Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-4">
                  No {entityName.toLowerCase()}s found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={`${item.id}-${column.key}`}>{renderCell(item, column)}</TableCell>
                  ))}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/${entityPath}/${item.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                      >
                        {isDeleting === item.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
