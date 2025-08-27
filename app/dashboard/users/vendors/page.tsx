"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Info, Trash2, Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react"

interface Vendor {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pendaftar" | "verifikasi" | "terverifikasi" | "ditolak" | "ditangguhkan"
}

const mockVendors: Vendor[] = [
  {
    id: "VE1234",
    name: "Cintia Putri",
    phone: "08812345678",
    email: "cintia@gmail.com",
    location: "Kab. Bantul",
    status: "ditangguhkan",
  },
  {
    id: "VE1235",
    name: "Dimas Sutejo",
    phone: "08812345678",
    email: "dim@gmail.com",
    location: "Kab. Bantul",
    status: "terverifikasi",
  },
  {
    id: "VE1234",
    name: "Egy",
    phone: "08812345678",
    email: "egy@gmail.com",
    location: "Kab. Bantul",
    status: "pendaftar",
  },
  {
    id: "VE1235",
    name: "Abdul Rahman",
    phone: "08812345678",
    email: "abdul@gmail.com",
    location: "Kab. Bantul",
    status: "verifikasi",
  },
  {
    id: "VE1234",
    name: "Baldeo Singh",
    phone: "08812345678",
    email: "baldeo@gmail.com",
    location: "Kab. Bantul",
    status: "ditolak",
  },
]

export default function VendorsPage() {
  return (
    <ProtectedRoute>
      <VendorsContent />
    </ProtectedRoute>
  )
}

function VendorsContent() {
  const [activeTab, setActiveTab] = useState<string>("ditangguhkan")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendaftar: { label: "Pendaftar", variant: "secondary" as const },
      verifikasi: { label: "Verifikasi Akun", variant: "default" as const },
      terverifikasi: { label: "Akun Terverifikasi", variant: "default" as const },
      ditolak: { label: "Ditolak", variant: "destructive" as const },
      ditangguhkan: { label: "Ditangguhkan", variant: "default" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pendaftar
  }

  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.status === activeTab &&
      (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span>Vendor</span>
          <span className="mx-2">&gt;</span>
          <span>Akun Vendor</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900 font-medium">Ditangguhkan</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Akun Vendor</h1>
      </div>

      <Card>
        <CardHeader className="pb-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { key: "pendaftar", label: "Pendaftar" },
              { key: "verifikasi", label: "Verifikasi Akun" },
              { key: "terverifikasi", label: "Akun Terverifikasi" },
              { key: "ditolak", label: "Ditolak" },
              { key: "ditangguhkan", label: "Ditangguhkan" },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className={activeTab === tab.key ? "bg-titipsini-green hover:bg-titipsini-green/90" : ""}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-titipsini-green hover:bg-titipsini-green">
                  <TableHead className="w-12 text-white">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">No Telepon</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Wilayah</TableHead>
                  <TableHead className="text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor, index) => (
                  <TableRow key={`${vendor.id}-${index}`} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="bg-titipsini-green hover:bg-titipsini-green/90">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <span className="text-sm text-gray-600">...</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600">Total pesanan : 84 &nbsp;&nbsp; Total halaman : 6</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
