"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { UserRole } from "@/lib/auth"

const chartData = [
  { month: "Januari", income: 2400, expense: 1800, orders: 120 },
  { month: "Februari", income: 1398, expense: 2200, orders: 98 },
  { month: "Maret", income: 3800, expense: 1900, orders: 156 },
  { month: "April", income: 3908, expense: 2100, orders: 189 },
  { month: "Mei", income: 4800, expense: 2300, orders: 234 },
  { month: "Juni", income: 3490, expense: 2000, orders: 198 },
  { month: "Juli", income: 4300, expense: 2400, orders: 267 },
  { month: "Agustus", income: 3200, expense: 1900, orders: 201 },
  { month: "September", income: 4100, expense: 2200, orders: 245 },
]

const chartConfig = {
  income: {
    label: "Pemasukan",
    color: "var(--color-titipsini-green)",
  },
  expense: {
    label: "Pengeluaran",
    color: "#ef4444",
  },
  orders: {
    label: "Pesanan",
    color: "#3b82f6",
  },
}

interface DashboardChartProps {
  userRole: UserRole
}

export function DashboardChart({ userRole }: DashboardChartProps) {
  const getChartTitle = (role: UserRole) => {
    switch (role) {
      case "finance":
        return "Catatan Keuangan"
      case "superadmin":
        return "Revenue Overview"
      case "admin":
        return "Platform Analytics"
      case "mitra":
        return "Partner Performance"
      default:
        return "Analytics"
    }
  }

  const getChartDescription = (role: UserRole) => {
    switch (role) {
      case "finance":
        return "Pembayaran Berdasarkan Layanan"
      case "superadmin":
        return "Monthly revenue and expense tracking"
      case "admin":
        return "User activity and order trends"
      case "mitra":
        return "Your earnings and storage utilization"
      default:
        return "Monthly statistics"
    }
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{getChartTitle(userRole)}</CardTitle>
          <CardDescription>{getChartDescription(userRole)}</CardDescription>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Bulanan</SelectItem>
            <SelectItem value="yearly">Tahunan</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {userRole === "finance" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-titipsini-green)"
                    strokeWidth={2}
                    name="Pemasukan"
                  />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" />
                </>
              )}
              {(userRole === "admin" || userRole === "superadmin") && (
                <>
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-titipsini-green)"
                    strokeWidth={2}
                    name="Revenue"
                  />
                </>
              )}
              {userRole === "mitra" && (
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--color-titipsini-green)"
                  strokeWidth={2}
                  name="Earnings"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
