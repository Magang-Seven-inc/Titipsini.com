"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RefundTransaction {
  id: string
  customerName: string
  amount: string
  date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  transactionId: string
}

const mockRefunds: RefundTransaction[] = [
  {
    id: "RF001",
    customerName: "Ahmad Rizki",
    amount: "Rp 150.000",
    date: "2024-01-15",
    reason: "Barang rusak",
    status: "pending",
    transactionId: "TRX001",
  },
  {
    id: "RF002",
    customerName: "Siti Nurhaliza",
    amount: "Rp 200.000",
    date: "2024-01-14",
    reason: "Tidak sesuai pesanan",
    status: "approved",
    transactionId: "TRX002",
  },
  {
    id: "RF003",
    customerName: "Budi Santoso",
    amount: "Rp 75.000",
    date: "2024-01-13",
    reason: "Terlambat pengiriman",
    status: "rejected",
    transactionId: "TRX003",
  },
]

export default function RefundsPage() {
  return (
    <ProtectedRoute>
      <RefundsContent />
    </ProtectedRoute>
  )
}

function RefundsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRefunds, setSelectedRefunds] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Menunggu", variant: "secondary" as const },
      approved: { label: "Disetujui", variant: "default" as const },
      rejected: { label: "Ditolak", variant: "destructive" as const },
    }
    return config[status as keyof typeof config] || config.pending
  }

  const handleRefundAction = (refundId: string, action: "approve" | "reject") => {
    console.log(`${action} refund ${refundId}`)
    // Implement refund approval/rejection logic
  }

  const handleBulkAction = (action: "approve" | "reject") => {
    console.log(`Bulk ${action} for refunds:`, selectedRefunds)
    // Implement bulk action logic
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengembalian Dana</h1>
        <p className="text-sm text-gray-600">Kelola permintaan pengembalian dana dari customer</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari transaksi pengembalian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {selectedRefunds.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">{selectedRefunds.length} item dipilih</span>
              <Button
                size="sm"
                className="bg-titipsini-green hover:bg-titipsini-green/90"
                onClick={() => handleBulkAction("approve")}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Setujui Semua
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction("reject")}>
                <XCircle className="h-4 w-4 mr-1" />
                Tolak Semua
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-titipsini-green hover:bg-titipsini-green">
                  <TableHead className="w-12 text-white">
                    <input
                      type="checkbox"
                      className="rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRefunds(mockRefunds.map((r) => r.id))
                        } else {
                          setSelectedRefunds([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="text-white">ID Refund</TableHead>
                  <TableHead className="text-white">Customer</TableHead>
                  <TableHead className="text-white">Jumlah</TableHead>
                  <TableHead className="text-white">Tanggal</TableHead>
                  <TableHead className="text-white">Alasan</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRefunds.map((refund) => (
                  <TableRow key={refund.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedRefunds.includes(refund.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRefunds([...selectedRefunds, refund.id])
                          } else {
                            setSelectedRefunds(selectedRefunds.filter((id) => id !== refund.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{refund.id}</TableCell>
                    <TableCell>{refund.customerName}</TableCell>
                    <TableCell className="font-semibold text-titipsini-green">{refund.amount}</TableCell>
                    <TableCell>{refund.date}</TableCell>
                    <TableCell className="max-w-xs truncate">{refund.reason}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(refund.status).variant}>
                        {getStatusBadge(refund.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {refund.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              onClick={() => handleRefundAction(refund.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleRefundAction(refund.id, "reject")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600">Total permintaan : 24 &nbsp;&nbsp; Total halaman : 3</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
