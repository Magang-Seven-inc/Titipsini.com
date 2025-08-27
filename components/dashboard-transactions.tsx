import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Package, CreditCard } from "lucide-react"
import type { UserRole } from "@/lib/auth"

interface Transaction {
  id: string
  type: string
  amount: string
  date: string
  status: "success" | "pending" | "failed"
  icon: React.ReactNode
  color: string
}

interface DashboardTransactionsProps {
  userRole: UserRole
}

export function DashboardTransactions({ userRole }: DashboardTransactionsProps) {
  const getTransactionsForRole = (role: UserRole): Transaction[] => {
    switch (role) {
      case "finance":
        return [
          {
            id: "1",
            type: "Komisi Vendor",
            amount: "Rp 200.000",
            date: "06 April 2023",
            status: "failed",
            icon: <TrendingDown className="h-4 w-4" />,
            color: "text-red-600",
          },
          {
            id: "2",
            type: "Penitipan Barang",
            amount: "Rp 240.000",
            date: "05 April 2023",
            status: "success",
            icon: <TrendingUp className="h-4 w-4" />,
            color: "text-green-600",
          },
          {
            id: "3",
            type: "Komisi Barang",
            amount: "Rp 450.000",
            date: "05 April 2023",
            status: "failed",
            icon: <TrendingDown className="h-4 w-4" />,
            color: "text-red-600",
          },
          {
            id: "4",
            type: "Penitipan Kendaraan",
            amount: "Rp 760.000",
            date: "05 April 2023",
            status: "success",
            icon: <TrendingUp className="h-4 w-4" />,
            color: "text-green-600",
          },
          {
            id: "5",
            type: "Komisi Vendor",
            amount: "Rp 540.000",
            date: "05 April 2023",
            status: "failed",
            icon: <TrendingDown className="h-4 w-4" />,
            color: "text-red-600",
          },
        ]
      case "superadmin":
      case "admin":
        return [
          {
            id: "1",
            type: "New User Registration",
            amount: "+125",
            date: "2 hours ago",
            status: "success",
            icon: <TrendingUp className="h-4 w-4" />,
            color: "text-green-600",
          },
          {
            id: "2",
            type: "Storage Order",
            amount: "Rp 450.000",
            date: "4 hours ago",
            status: "pending",
            icon: <Package className="h-4 w-4" />,
            color: "text-blue-600",
          },
          {
            id: "3",
            type: "Partner Payout",
            amount: "Rp 1.200.000",
            date: "6 hours ago",
            status: "success",
            icon: <CreditCard className="h-4 w-4" />,
            color: "text-green-600",
          },
        ]
      case "mitra":
        return [
          {
            id: "1",
            type: "Storage Fee",
            amount: "Rp 150.000",
            date: "2 hours ago",
            status: "success",
            icon: <TrendingUp className="h-4 w-4" />,
            color: "text-green-600",
          },
          {
            id: "2",
            type: "New Item Stored",
            amount: "+1 item",
            date: "4 hours ago",
            status: "success",
            icon: <Package className="h-4 w-4" />,
            color: "text-blue-600",
          },
          {
            id: "3",
            type: "Monthly Payout",
            amount: "Rp 850.000",
            date: "1 day ago",
            status: "pending",
            icon: <CreditCard className="h-4 w-4" />,
            color: "text-yellow-600",
          },
        ]
      default:
        return []
    }
  }

  const transactions = getTransactionsForRole(userRole)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transaksi</CardTitle>
          <CardDescription>Recent activity and transactions</CardDescription>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Pilih Waktu</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 ${transaction.color}`}>{transaction.icon}</div>
                <div>
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${transaction.color}`}>{transaction.amount}</span>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
