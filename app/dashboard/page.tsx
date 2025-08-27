"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardTransactions } from "@/components/dashboard-transactions"
import { RoleBasedWrapper } from "@/components/role-based-wrapper"
import { useDataSync } from "@/components/data-sync-provider"
import { Button } from "@/components/ui/button"
import { RefreshCw, Users, Package, CreditCard, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user } = useAuth()
  const { refreshData, lastUpdated, isRefreshing } = useDataSync()

  if (!user) return null

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          )}
        </div>

        <RoleBasedWrapper requiredRole="superadmin">
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </RoleBasedWrapper>
      </div>

      <DashboardStats userRole={user.role} />

      <RoleBasedWrapper requiredRole="superadmin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/dashboard/users/customers">
            <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-titipsini-green" />
                <div>
                  <p className="text-sm text-gray-600">Manage</p>
                  <p className="font-semibold">Users</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/vendors">
            <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-titipsini-green" />
                <div>
                  <p className="text-sm text-gray-600">Manage</p>
                  <p className="font-semibold">Vendors</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/transactions/customers">
            <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-titipsini-green" />
                <div>
                  <p className="text-sm text-gray-600">View</p>
                  <p className="font-semibold">Transactions</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/reports/export">
            <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-titipsini-green" />
                <div>
                  <p className="text-sm text-gray-600">Generate</p>
                  <p className="font-semibold">Reports</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </RoleBasedWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardChart userRole={user.role} />
        <DashboardTransactions userRole={user.role} />
      </div>
    </div>
  )
}
