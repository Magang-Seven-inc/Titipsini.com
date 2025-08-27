"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Download, Eye, RefreshCw } from "lucide-react"

interface CustomerTransaction {
  id: string
  customerId: string
  customerName: string
  type: "deposit" | "storage" | "withdrawal" | "refund"
  amount: number
  status: "pending" | "completed" | "failed" | "processing"
  date: string
  description: string
  vendorName?: string
}

const mockTransactions: CustomerTransaction[] = [
  {
    id: "TXN001",
    customerId: "CU1234",
    customerName: "Ahmad Rizki",
    type: "deposit",
    amount: 500000,
    status: "completed",
    date: "2024-01-20",
    description: "Deposit saldo untuk penyimpanan barang",
    vendorName: "Toko Aman Sentosa",
  },
  {
    id: "TXN002",
    customerId: "CU1235",
    customerName: "Siti Nurhaliza",
    type: "storage",
    amount: 150000,
    status: "processing",
    date: "2024-01-19",
    description: "Biaya penyimpanan 1 bulan",
    vendorName: "Storage Plus",
  },
  {
    id: "TXN003",
    customerId: "CU1236",
    customerName: "Budi Santoso",
    type: "refund",
    amount: 200000,
    status: "pending",
    date: "2024-01-18",
    description: "Pengembalian dana pembatalan layanan",
  },
]

export default function CustomerTransactionsPage() {
  const [transactions, setTransactions] = useState<CustomerTransaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedTransaction, setSelectedTransaction] = useState<CustomerTransaction | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Diproses</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Gagal</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "deposit":
        return <Badge className="bg-green-100 text-green-800">Deposit</Badge>
      case "storage":
        return <Badge className="bg-blue-100 text-blue-800">Penyimpanan</Badge>
      case "withdrawal":
        return <Badge className="bg-orange-100 text-orange-800">Penarikan</Badge>
      case "refund":
        return <Badge className="bg-purple-100 text-purple-800">Refund</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleUpdateStatus = (transactionId: string, newStatus: string) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, status: newStatus as any } : transaction,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaksi Customer</h1>
          <p className="text-gray-600">Kelola semua transaksi customer</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipe Transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="storage">Penyimpanan</SelectItem>
                <SelectItem value="withdrawal">Penarikan</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
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
                <div>ID Transaksi</div>
                <div>Customer</div>
                <div>Tipe</div>
                <div>Jumlah</div>
                <div>Status</div>
                <div>Tanggal</div>
                <div>Vendor</div>
                <div>Aksi</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50">
                  <div className="font-medium">{transaction.id}</div>
                  <div>
                    <div className="font-medium">{transaction.customerName}</div>
                    <div className="text-sm text-gray-500">{transaction.customerId}</div>
                  </div>
                  <div>{getTypeBadge(transaction.type)}</div>
                  <div className="font-medium">{formatCurrency(transaction.amount)}</div>
                  <div>{getStatusBadge(transaction.status)}</div>
                  <div className="text-sm">{new Date(transaction.date).toLocaleDateString("id-ID")}</div>
                  <div className="text-sm">{transaction.vendorName || "-"}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTransaction(transaction)
                        setIsDetailDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {transaction.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(transaction.id, "processing")}
                        className="text-blue-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
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
            <div className="text-sm text-gray-600">
              Total transaksi: {filteredTransactions.length} • Total halaman: 1
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Transaksi</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Transaksi</label>
                  <p className="font-medium">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal</label>
                  <p>{new Date(selectedTransaction.date).toLocaleDateString("id-ID")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Customer</label>
                  <p className="font-medium">{selectedTransaction.customerName}</p>
                  <p className="text-sm text-gray-500">{selectedTransaction.customerId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipe Transaksi</label>
                  <div className="mt-1">{getTypeBadge(selectedTransaction.type)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Jumlah</label>
                  <p className="font-medium text-lg">{formatCurrency(selectedTransaction.amount)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Deskripsi</label>
                <p>{selectedTransaction.description}</p>
              </div>
              {selectedTransaction.vendorName && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Vendor</label>
                  <p>{selectedTransaction.vendorName}</p>
                </div>
              )}
              {selectedTransaction.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleUpdateStatus(selectedTransaction.id, "completed")
                      setIsDetailDialogOpen(false)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Setujui Transaksi
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateStatus(selectedTransaction.id, "failed")
                      setIsDetailDialogOpen(false)
                    }}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Tolak Transaksi
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
