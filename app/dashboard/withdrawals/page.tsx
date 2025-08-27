"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WithdrawalRequest {
  id: string
  partnerName: string
  amount: string
  date: string
  bankAccount: string
  status: "pending" | "processing" | "completed" | "rejected"
  requestDate: string
}

const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: "WD001",
    partnerName: "Toko Sari Roti",
    amount: "Rp 1.500.000",
    date: "2024-01-15",
    bankAccount: "BCA - 1234567890",
    status: "pending",
    requestDate: "2024-01-15 10:30",
  },
  {
    id: "WD002",
    partnerName: "Warung Makan Sederhana",
    amount: "Rp 850.000",
    date: "2024-01-14",
    bankAccount: "Mandiri - 0987654321",
    status: "processing",
    requestDate: "2024-01-14 14:20",
  },
  {
    id: "WD003",
    partnerName: "Toko Elektronik Jaya",
    amount: "Rp 2.200.000",
    date: "2024-01-13",
    bankAccount: "BNI - 1122334455",
    status: "completed",
    requestDate: "2024-01-13 09:15",
  },
  {
    id: "WD004",
    partnerName: "Bengkel Motor Sejahtera",
    amount: "Rp 650.000",
    date: "2024-01-12",
    bankAccount: "BRI - 5566778899",
    status: "rejected",
    requestDate: "2024-01-12 16:45",
  },
]

export default function WithdrawalsPage() {
  return (
    <ProtectedRoute>
      <WithdrawalsContent />
    </ProtectedRoute>
  )
}

function WithdrawalsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWithdrawals, setSelectedWithdrawals] = useState<string[]>([])

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Menunggu", variant: "secondary" as const, icon: Clock },
      processing: { label: "Diproses", variant: "default" as const, icon: Clock },
      completed: { label: "Selesai", variant: "default" as const, icon: CheckCircle },
      rejected: { label: "Ditolak", variant: "destructive" as const, icon: XCircle },
    }
    return config[status as keyof typeof config] || config.pending
  }

  const handleWithdrawalAction = (withdrawalId: string, action: "approve" | "reject" | "process") => {
    console.log(`${action} withdrawal ${withdrawalId}`)
    // Implement withdrawal action logic
  }

  const handleBulkAction = (action: "approve" | "reject") => {
    console.log(`Bulk ${action} for withdrawals:`, selectedWithdrawals)
    // Implement bulk action logic
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Penarikan Saldo</h1>
        <p className="text-sm text-gray-600">Kelola permintaan penarikan saldo dari mitra</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari penarikan saldo..."
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

          {selectedWithdrawals.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">{selectedWithdrawals.length} item dipilih</span>
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
                          setSelectedWithdrawals(mockWithdrawals.map((w) => w.id))
                        } else {
                          setSelectedWithdrawals([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="text-white">ID Penarikan</TableHead>
                  <TableHead className="text-white">Nama Mitra</TableHead>
                  <TableHead className="text-white">Jumlah</TableHead>
                  <TableHead className="text-white">Rekening Tujuan</TableHead>
                  <TableHead className="text-white">Tanggal Permintaan</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedWithdrawals.includes(withdrawal.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedWithdrawals([...selectedWithdrawals, withdrawal.id])
                          } else {
                            setSelectedWithdrawals(selectedWithdrawals.filter((id) => id !== withdrawal.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{withdrawal.id}</TableCell>
                    <TableCell>{withdrawal.partnerName}</TableCell>
                    <TableCell className="font-semibold text-titipsini-green">{withdrawal.amount}</TableCell>
                    <TableCell>{withdrawal.bankAccount}</TableCell>
                    <TableCell>{withdrawal.requestDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(withdrawal.status).variant}>
                        {getStatusBadge(withdrawal.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {withdrawal.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                              onClick={() => handleWithdrawalAction(withdrawal.id, "process")}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              onClick={() => handleWithdrawalAction(withdrawal.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleWithdrawalAction(withdrawal.id, "reject")}
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
            <div className="text-sm text-gray-600">Total permintaan : 18 &nbsp;&nbsp; Total halaman : 3</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
