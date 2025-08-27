"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { CrudTable } from "@/components/crud-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

type CustomerStatus = "pendaftar" | "verifikasi" | "terverifikasi" | "ditolak"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: CustomerStatus
  joinDate: string
  totalOrders: number
}

const mockCustomers: Customer[] = [
  {
    id: "CU1234",
    name: "Cintia Putri",
    email: "cintia@gmail.com",
    phone: "088123456789",
    status: "pendaftar",
    joinDate: "2023-09-11",
    totalOrders: 12,
  },
  {
    id: "CU1235",
    name: "Dimas Sutejo",
    email: "Dim@gmail.com",
    phone: "088123456789",
    status: "verifikasi",
    joinDate: "2023-09-11",
    totalOrders: 8,
  },
  {
    id: "CU1236",
    name: "Egy",
    email: "egy@gmail.com",
    phone: "088123456789",
    status: "terverifikasi",
    joinDate: "2023-09-11",
    totalOrders: 3,
  },
  {
    id: "CU1237",
    name: "Sinta",
    email: "sinta@gmail.com",
    phone: "088123456789",
    status: "ditolak",
    joinDate: "2023-09-11",
    totalOrders: 1,
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<CustomerStatus | "all">("all")

  const handleAdd = (customer: Partial<Customer>) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      status: (customer.status as CustomerStatus) || "pendaftar",
      joinDate: new Date().toISOString().split("T")[0],
      totalOrders: 0,
    }
    setCustomers([...customers, newCustomer])
  }

  const handleEdit = (id: string, updatedCustomer: Partial<Customer>) => {
    setCustomers(customers.map((customer) => (customer.id === id ? { ...customer, ...updatedCustomer } : customer)))
  }

  const handleDelete = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  // Filter data berdasarkan search + status
  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)

    const matchStatus = filterStatus === "all" ? true : c.status === filterStatus

    return matchSearch && matchStatus
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
      ),
    },
    { key: "name" as keyof Customer, label: "Name" },
    { key: "email" as keyof Customer, label: "Email" },
    { key: "phone" as keyof Customer, label: "Phone" },
    {
      key: "status" as keyof Customer,
      label: "Status",
      render: (status: CustomerStatus) => {
        const variants: Record<CustomerStatus, string> = {
          pendaftar: "bg-yellow-100 text-yellow-800",
          verifikasi: "bg-blue-100 text-blue-800",
          terverifikasi: "bg-green-100 text-green-800",
          ditolak: "bg-red-100 text-red-800",
        }
        return (
          <span className={`px-2 py-1 rounded-md font-medium ${variants[status]}`}>
            {status}
          </span>
        )
      },
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
        { value: "pendaftar", label: "Pendaftar" },
        { value: "verifikasi", label: "Verifikasi Akun" },
        { value: "terverifikasi", label: "Akun Terverifikasi" },
        { value: "ditolak", label: "Ditolak" },
      ],
    },
  ]

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-6 space-y-6">
        {/* Header actions */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
          <div className="flex gap-2">
            <Button onClick={() => setFilterStatus("pendaftar")}>Pendaftar</Button>
            <Button onClick={() => setFilterStatus("verifikasi")}>Verifikasi Akun</Button>
            <Button onClick={() => setFilterStatus("terverifikasi")}>Akun Terverifikasi</Button>
            <Button variant="destructive" onClick={() => setFilterStatus("ditolak")}>Ditolak</Button>
            <Button variant="outline" onClick={() => setFilterStatus("all")}>Semua</Button>
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
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addFields={addFields}
        />
      </div>
    </ProtectedRoute>
  )
}
