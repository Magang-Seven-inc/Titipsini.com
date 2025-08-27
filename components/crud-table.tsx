"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface CrudTableProps<T> {
  title: string
  data: T[]
  columns: {
    key: keyof T
    label: string
    render?: (value: any, item: T) => React.ReactNode
  }[]
  onAdd?: (item: Partial<T>) => void
  onEdit?: (id: string, item: Partial<T>) => void
  onDelete?: (id: string) => void
  searchable?: boolean
  addFields?: {
    key: keyof T
    label: string
    type: "text" | "email" | "select" | "number"
    options?: { value: string; label: string }[]
    required?: boolean
  }[]
}

export function CrudTable<T extends { id: string }>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  searchable = true,
  addFields = [],
}: CrudTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState<Partial<T>>({})

  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : data

  const handleAdd = () => {
    if (onAdd) {
      onAdd(formData)
      setFormData({})
      setIsAddDialogOpen(false)
    }
  }

  const handleEdit = (item: T) => {
    setEditingItem(item)
    setFormData(item)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (onEdit && editingItem) {
      onEdit(editingItem.id, formData)
      setFormData({})
      setEditingItem(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDelete = (id: string) => {
    if (onDelete && confirm("Are you sure you want to delete this item?")) {
      onDelete(id)
    }
  }

  const renderFormField = (field: any) => {
    const value = formData[field.key] || ""

    switch (field.type) {
      case "select":
        return (
          <Select value={String(value)} onValueChange={(val) => setFormData({ ...formData, [field.key]: val })}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return (
          <Input
            type={field.type}
            value={String(value)}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            required={field.required}
          />
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onAdd && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-titipsini-green hover:bg-titipsini-green-dark">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
                <DialogDescription>Fill in the details to create a new entry.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {addFields.map((field) => (
                  <div key={String(field.key)} className="space-y-2">
                    <Label htmlFor={String(field.key)}>{field.label}</Label>
                    {renderFormField(field)}
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="bg-titipsini-green hover:bg-titipsini-green-dark">
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {searchable && (
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.label}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {onEdit && (
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {title.slice(0, -1)}</DialogTitle>
            <DialogDescription>Update the details for this entry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {addFields.map((field) => (
              <div key={String(field.key)} className="space-y-2">
                <Label htmlFor={String(field.key)}>{field.label}</Label>
                {renderFormField(field)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-titipsini-green hover:bg-titipsini-green-dark">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
