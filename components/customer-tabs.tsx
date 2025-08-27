"use client"

import { useState } from "react"
import { CrudTable } from "@/components/crud-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "rejected"
  joinDate: string
  totalOrders: number
}

interface CustomerTabsProps {
  customers: Customer[]
  onAdd: (customer: Partial<Customer>) => void
  onEdit: (id: string, customer: Partial<Customer>) => void
  onDelete: (id: string) => void
}

export function CustomerTabs({ customers, onAdd, onEdit, onDelete }: CustomerTabsProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "rejected">("all")

  // Filter berdasarkan search + kategori tab
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)

    const matchesFilter =
      filter === "all" ? true : filter === "active" ? c.status === "active" : filter === "inactive" ? c.status === "inactive" : c.status === "rejected"

    return matchesSearch && matchesFilter
  })

  // Export CSV
  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Status", "Join Date", "Total Orders"]
    const rows = filteredCustomers.map((c) => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.status,
      c.joinDate,
      c.totalOrders,
    ])

    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += headers.join(",") + "\n"
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n"
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "customers_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const columns = [
    { 
      key: "id" as keyof Customer, 
      label: "ID",
      render: (id: string) => (
        <span className="px-2 py-1 rounded-md bg-green-100 text-green-800 font-medium">
          {id}
        </span>
      )
    },
    { key: "name" as keyof Customer, label: "Name" },
    { key: "email" as keyof Customer, label: "Email" },
    { key: "phone" as keyof Customer, label: "Phone" },
    {
      key: "status" as keyof Customer,
      label: "Status",
      render: (status: string) => (
        <Badge variant={status === "active" ? "default" : status === "inactive" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      ),
    },
    { key: "joinDate" as keyof Customer, label: "Join Date" },
    { key: "totalOrders" as keyof Customer, label: "Total Orders" },
  ]

  const addFields = [
    { key: "name" as keyof Customer, label: "Name", type: "text" as const, required: true },
    { key: "email" as keyof Customer, label: "Email", type: "email" as const, required: true },
    { key: "phone" as keyof Customer, label: "Phone", type: "text" as const, required: true },
    {
      key: "status" as keyof Customer,
      label: "Status",
      type: "select" as const,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Pendaftar
          </Button>
          <Button variant={filter === "inactive" ? "default" : "outline"} onClick={() => setFilter("inactive")}>
            Verifikasi Akun
          </Button>
          <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
            Akun Terverifikasi
          </Button>
          <Button variant={filter === "rejected" ? "destructive" : "outline"} onClick={() => setFilter("rejected")}>
            Ditolak
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Filter data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <CrudTable
        title="Customers"
        data={filteredCustomers}
        columns={columns}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        addFields={addFields}
      />
    </div>
  )
}
