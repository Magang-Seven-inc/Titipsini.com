"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Edit, Info, Trash2, MapPin, Star, Package } from "lucide-react"

interface Vendor {
  id: string
  name: string
  ownerName: string
  phone: string
  email: string
  address: string
  city: string
  rating: number
  totalOrders: number
  status: "active" | "inactive" | "suspended" | "pending"
  joinDate: string
  storageCapacity: number
  availableSpace: number
  services: string[]
}

const mockVendors: Vendor[] = [
  {
    id: "VE1234",
    name: "Toko Aman Sentosa",
    ownerName: "Ahmad Wijaya",
    phone: "08812345678",
    email: "ahmad@tokoaman.com",
    address: "Jl. Malioboro No. 123",
    city: "Yogyakarta",
    rating: 4.8,
    totalOrders: 156,
    status: "active",
    joinDate: "2023-01-15",
    storageCapacity: 100,
    availableSpace: 45,
    services: ["Penyimpanan Barang", "Pengiriman", "Asuransi"],
  },
  {
    id: "VE1235",
    name: "Storage Plus",
    ownerName: "Siti Rahayu",
    phone: "08812345679",
    email: "siti@storageplus.com",
    address: "Jl. Dago No. 456",
    city: "Bandung",
    rating: 4.6,
    totalOrders: 89,
    status: "active",
    joinDate: "2023-02-10",
    storageCapacity: 75,
    availableSpace: 20,
    services: ["Penyimpanan Barang", "Keamanan 24 Jam"],
  },
  {
    id: "VE1236",
    name: "Safe Box Surabaya",
    ownerName: "Budi Santoso",
    phone: "08812345680",
    email: "budi@safebox.com",
    address: "Jl. Pemuda No. 789",
    city: "Surabaya",
    rating: 4.2,
    totalOrders: 234,
    status: "pending",
    joinDate: "2023-03-05",
    storageCapacity: 150,
    availableSpace: 80,
    services: ["Penyimpanan Barang", "Climate Control"],
  },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || vendor.status === selectedStatus
    const matchesCity = selectedCity === "all" || vendor.city === selectedCity
    return matchesSearch && matchesStatus && matchesCity
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Tidak Aktif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Ditangguhkan</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu Verifikasi</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleUpdateStatus = (vendorId: string, newStatus: string) => {
    setVendors(vendors.map((vendor) => (vendor.id === vendorId ? { ...vendor, status: newStatus as any } : vendor)))
  }

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(vendors.filter((vendor) => vendor.id !== vendorId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Vendor</h1>
          <p className="text-gray-600">Kelola semua vendor penyimpanan</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="pending">Menunggu Verifikasi</SelectItem>
                <SelectItem value="suspended">Ditangguhkan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kota</SelectItem>
                <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                <SelectItem value="Bandung">Bandung</SelectItem>
                <SelectItem value="Surabaya">Surabaya</SelectItem>
                <SelectItem value="Jakarta">Jakarta</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-titipsini-green text-white">
              <div className="grid grid-cols-8 gap-4 p-4 font-medium">
                <div>ID Vendor</div>
                <div>Nama Toko</div>
                <div>Pemilik</div>
                <div>Kota</div>
                <div>Rating</div>
                <div>Kapasitas</div>
                <div>Status</div>
                <div>Aksi</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50">
                  <div className="font-medium">{vendor.id}</div>
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-gray-500">{vendor.phone}</div>
                  </div>
                  <div>{vendor.ownerName}</div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {vendor.city}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {vendor.rating}
                  </div>
                  <div>
                    <div className="text-sm">
                      {vendor.availableSpace}/{vendor.storageCapacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-titipsini-green h-2 rounded-full"
                        style={{ width: `${(vendor.availableSpace / vendor.storageCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>{getStatusBadge(vendor.status)}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedVendor(vendor)
                        setIsDetailDialogOpen(true)
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteVendor(vendor.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-sm text-gray-600">...</span>
            </div>
            <div className="text-sm text-gray-600">Total vendor: {filteredVendors.length} • Total halaman: 1</div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detail Vendor</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informasi</TabsTrigger>
                <TabsTrigger value="services">Layanan</TabsTrigger>
                <TabsTrigger value="orders">Pesanan</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">ID Vendor</label>
                    <p className="font-medium">{selectedVendor.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nama Toko</label>
                    <p className="font-medium">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Pemilik</label>
                    <p>{selectedVendor.ownerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{selectedVendor.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telepon</label>
                    <p>{selectedVendor.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Alamat</label>
                    <p>
                      {selectedVendor.address}, {selectedVendor.city}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Rating</label>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedVendor.rating}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Pesanan</label>
                    <p className="font-medium">{selectedVendor.totalOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Kapasitas Penyimpanan</label>
                    <p>{selectedVendor.storageCapacity} unit</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ruang Tersedia</label>
                    <p>{selectedVendor.availableSpace} unit</p>
                  </div>
                </div>
                {selectedVendor.status === "pending" && (
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => {
                        handleUpdateStatus(selectedVendor.id, "active")
                        setIsDetailDialogOpen(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Verifikasi Vendor
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleUpdateStatus(selectedVendor.id, "suspended")
                        setIsDetailDialogOpen(false)
                      }}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Tolak Verifikasi
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="services" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Layanan yang Tersedia</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedVendor.services.map((service, index) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="orders" className="space-y-4">
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Data pesanan akan ditampilkan di sini</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
