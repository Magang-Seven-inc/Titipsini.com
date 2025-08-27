import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Users, Package, CreditCard } from "lucide-react"
import type { UserRole } from "@/lib/auth"

interface StatCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down"
  icon: React.ReactNode
  color?: string
}

function StatCard({ title, value, change, trend, icon, color = "bg-titipsini-green" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center mt-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trend === "up" ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {change}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <div className="text-white">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardStatsProps {
  userRole: UserRole
}

export function DashboardStats({ userRole }: DashboardStatsProps) {
  // Different stats based on user role
  const getStatsForRole = (role: UserRole) => {
    switch (role) {
      case "superadmin":
        return [
          {
            title: "Total Saldo",
            value: "Rp 3.000.000",
            change: "+12.5%",
            trend: "up" as const,
            icon: <Wallet className="h-6 w-6" />,
            color: "bg-titipsini-green",
          },
          {
            title: "Total Users",
            value: "15,234",
            change: "+8.2%",
            trend: "up" as const,
            icon: <Users className="h-6 w-6" />,
            color: "bg-blue-500",
          },
          {
            title: "Active Partners",
            value: "1,456",
            change: "+15.3%",
            trend: "up" as const,
            icon: <Package className="h-6 w-6" />,
            color: "bg-purple-500",
          },
          {
            title: "Total Transactions",
            value: "28,890",
            change: "+5.7%",
            trend: "up" as const,
            icon: <CreditCard className="h-6 w-6" />,
            color: "bg-orange-500",
          },
        ]
      case "finance":
        return [
          {
            title: "Total Saldo",
            value: "Rp 3.000.000",
            change: "+2.5%",
            trend: "up" as const,
            icon: <Wallet className="h-6 w-6" />,
            color: "bg-titipsini-green",
          },
          {
            title: "Transaksi Masuk",
            value: "300.000",
            change: "+12%",
            trend: "up" as const,
            icon: <TrendingUp className="h-6 w-6" />,
            color: "bg-green-500",
          },
          {
            title: "Transaksi Keluar",
            value: "300.000",
            change: "-5%",
            trend: "down" as const,
            icon: <TrendingDown className="h-6 w-6" />,
            color: "bg-red-500",
          },
          {
            title: "Pending Payments",
            value: "45",
            icon: <CreditCard className="h-6 w-6" />,
            color: "bg-yellow-500",
          },
        ]
      case "admin":
        return [
          {
            title: "Active Users",
            value: "2,456",
            change: "+8.2%",
            trend: "up" as const,
            icon: <Users className="h-6 w-6" />,
            color: "bg-blue-500",
          },
          {
            title: "Total Orders",
            value: "1,234",
            change: "+15.3%",
            trend: "up" as const,
            icon: <Package className="h-6 w-6" />,
            color: "bg-purple-500",
          },
          {
            title: "Partners",
            value: "89",
            change: "+3.1%",
            trend: "up" as const,
            icon: <Users className="h-6 w-6" />,
            color: "bg-titipsini-green",
          },
          {
            title: "Support Tickets",
            value: "23",
            icon: <Package className="h-6 w-6" />,
            color: "bg-orange-500",
          },
        ]
      case "mitra":
        return [
          {
            title: "My Earnings",
            value: "Rp 850.000",
            change: "+18.2%",
            trend: "up" as const,
            icon: <Wallet className="h-6 w-6" />,
            color: "bg-titipsini-green",
          },
          {
            title: "Storage Items",
            value: "156",
            change: "+12%",
            trend: "up" as const,
            icon: <Package className="h-6 w-6" />,
            color: "bg-blue-500",
          },
          {
            title: "Customers",
            value: "89",
            change: "+5.7%",
            trend: "up" as const,
            icon: <Users className="h-6 w-6" />,
            color: "bg-purple-500",
          },
          {
            title: "Capacity Used",
            value: "78%",
            icon: <Package className="h-6 w-6" />,
            color: "bg-orange-500",
          },
        ]
      default:
        return []
    }
  }

  const stats = getStatsForRole(userRole)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
