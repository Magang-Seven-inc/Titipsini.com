"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Search, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const totalTransactionData = [
  {
    id: "TT001",
    date: "2024-01-15",
    type: "Penitipan",
    amount: 150000,
    status: "completed",
    customer: "John Doe",
    vendor: "Storage A",
  },
  {
    id: "TT002",
    date: "2024-01-14",
    type: "Pengambilan",
    amount: 75000,
    status: "completed",
    customer: "Jane Smith",
    vendor: "Storage B",
  },
  {
    id: "TT003",
    date: "2024-01-13",
    type: "Penitipan",
    amount: 200000,
    status: "pending",
    customer: "Bob Wilson",
    vendor: "Storage C",
  },
  {
    id: "TT004",
    date: "2024-01-12",
    type: "Komisi",
    amount: 50000,
    status: "completed",
    customer: "Alice Brown",
    vendor: "Storage A",
  },
  {
    id: "TT005",
    date: "2024-01-11",
    type: "Refund",
    amount: 100000,
    status: "processing",
    customer: "Charlie Davis",
    vendor: "Storage D",
  },
]

const stats = [
  { title: "Total Transaksi Hari Ini", value: "Rp 2.450.000", change: "+12%", trend: "up" },
  { title: "Total Transaksi Bulan Ini", value: "Rp 45.200.000", change: "+8%", trend: "up" },
  { title: "Rata-rata per Transaksi", value: "Rp 175.000", change: "-2%", trend: "down" },
  { title: "Jumlah Transaksi", value: "1,234", change: "+15%", trend: "up" },
]

export default function TotalTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const exportToPDF = () => {
    const printContent = document.getElementById("transactions-table")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Total Transaksi - Titipsini</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #22c55e; color: white; }
                .header { text-align: center; margin-bottom: 20px; }
                .stats { display: flex; justify-content: space-around; margin-bottom: 20px; }
                .stat-card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Laporan Total Transaksi</h1>
                <p>Titipsini.Com - ${new Date().toLocaleDateString("id-ID")}</p>
              </div>
              ${printContent.outerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const filteredData = totalTransactionData.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <ProtectedRoute allowedRoles={["superadmin", "admin", "finance"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Total Transaksi</h1>
            <p className="text-gray-600">Kelola dan pantau semua transaksi platform</p>
          </div>
          <Button onClick={exportToPDF} className="bg-titipsini-green hover:bg-titipsini-green-dark">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="ml-1">dari bulan lalu</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari berdasarkan ID, customer, atau vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Diproses</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="Penitipan">Penitipan</SelectItem>
                  <SelectItem value="Pengambilan">Pengambilan</SelectItem>
                  <SelectItem value="Komisi">Komisi</SelectItem>
                  <SelectItem value="Refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Transaksi</CardTitle>
            <CardDescription>
              Menampilkan {filteredData.length} dari {totalTransactionData.length} transaksi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div id="transactions-table" className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID Transaksi</th>
                    <th className="text-left p-2">Tanggal</th>
                    <th className="text-left p-2">Tipe</th>
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Vendor</th>
                    <th className="text-left p-2">Jumlah</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{transaction.id}</td>
                      <td className="p-2">{new Date(transaction.date).toLocaleDateString("id-ID")}</td>
                      <td className="p-2">{transaction.type}</td>
                      <td className="p-2">{transaction.customer}</td>
                      <td className="p-2">{transaction.vendor}</td>
                      <td className="p-2">Rp {transaction.amount.toLocaleString("id-ID")}</td>
                      <td className="p-2">
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {transaction.status === "completed"
                            ? "Selesai"
                            : transaction.status === "pending"
                              ? "Pending"
                              : "Diproses"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
