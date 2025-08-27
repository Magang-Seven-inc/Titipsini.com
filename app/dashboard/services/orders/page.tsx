"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Download, Eye, Package, Clock, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: string
  customerId: string
  customerName: string
  vendorId: string
  vendorName: string
  itemName: string
  itemDescription: string
  storageType: string
  duration: number
  amount: number
  status: "pending" | "active" | "completed" | "cancelled"
  startDate: string
  endDate: string
  createdAt: string
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerId: "CU1234",
    customerName: "Ahmad Rizki",
    vendorId: "VE1234",
    vendorName: "Toko Aman Sentosa",
    itemName: "Dokumen Penting",
    itemDescription: "Sertifikat tanah dan dokumen legal lainnya",
    storageType: "Dokumen",
    duration: 6,
    amount: 300000,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    createdAt: "2024-01-10",
  },
  {
    id: "ORD002",
    customerId: "CU1235",
    customerName: "Siti Nurhaliza",
    vendorId: "VE1235",
    vendorName: "Storage Plus",
    itemName: "Barang Elektronik",
    itemDescription: "Laptop, kamera, dan peralatan elektronik",
    storageType: "Elektronik",
    duration: 3,
    amount: 450000,
    status: "pending",
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    createdAt: "2024-01-18",
  },
  {
    id: "ORD003",
    customerId: "CU1236",
    customerName: "Budi Santoso",
    vendorId: "VE1236",
    vendorName: "Safe Box Surabaya",
    itemName: "Perhiasan",
    itemDescription: "Emas dan perhiasan berharga",
    storageType: "Perhiasan",
    duration: 12,
    amount: 1200000,
    status: "completed",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    createdAt: "2023-05-25",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Package className="h-3 w-3 mr-1" />
            Aktif
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Selesai
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as any } : order)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pesanan</h1>
          <p className="text-gray-600">Layanan &gt; Pesanan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pesanan</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-titipsini-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pesanan Aktif</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "active").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menunggu Konfirmasi</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selesai</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "completed").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pesanan..."
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
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
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
                <div>ID Pesanan</div>
                <div>Customer</div>
                <div>Vendor</div>
                <div>Item</div>
                <div>Durasi</div>
                <div>Nilai</div>
                <div>Status</div>
                <div>Aksi</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50">
                  <div className="font-medium">{order.id}</div>
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerId}</div>
                  </div>
                  <div>
                    <div className="font-medium">{order.vendorName}</div>
                    <div className="text-sm text-gray-500">{order.vendorId}</div>
                  </div>
                  <div>
                    <div className="font-medium">{order.itemName}</div>
                    <div className="text-sm text-gray-500">{order.storageType}</div>
                  </div>
                  <div>{order.duration} bulan</div>
                  <div className="font-medium">{formatCurrency(order.amount)}</div>
                  <div>{getStatusBadge(order.status)}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order)
                        setIsDetailDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
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
            <div className="text-sm text-gray-600">Total pesanan: {filteredOrders.length} • Total halaman: 1</div>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pesanan</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Pesanan</label>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Customer</label>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.customerId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vendor</label>
                  <p className="font-medium">{selectedOrder.vendorName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.vendorId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Item</label>
                  <p className="font-medium">{selectedOrder.itemName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.storageType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Durasi</label>
                  <p>{selectedOrder.duration} bulan</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Periode Penyimpanan</label>
                  <p>
                    {new Date(selectedOrder.startDate).toLocaleDateString("id-ID")} -{" "}
                    {new Date(selectedOrder.endDate).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nilai Pesanan</label>
                  <p className="font-medium text-lg">{formatCurrency(selectedOrder.amount)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Deskripsi Item</label>
                <p>{selectedOrder.itemDescription}</p>
              </div>
              {selectedOrder.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, "active")
                      setIsDetailDialogOpen(false)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Konfirmasi Pesanan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, "cancelled")
                      setIsDetailDialogOpen(false)
                    }}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Tolak Pesanan
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
