"use client"

import { useAuth } from "@/contexts/auth-context"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardTransactions } from "@/components/dashboard-transactions"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export function DashboardClient() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const statsContainer = document.getElementById("dashboard-stats")
    const chartContainer = document.getElementById("dashboard-chart")
    const transactionsContainer = document.getElementById("dashboard-transactions")

    return () => {
      // Cleanup if needed
    }
  }, [user])

  if (!user) return null

  return (
    <>
      {typeof window !== "undefined" &&
        document.getElementById("dashboard-stats") &&
        createPortal(<DashboardStats userRole={user.role} />, document.getElementById("dashboard-stats")!)}
      {typeof window !== "undefined" &&
        document.getElementById("dashboard-chart") &&
        createPortal(<DashboardChart userRole={user.role} />, document.getElementById("dashboard-chart")!)}
      {typeof window !== "undefined" &&
        document.getElementById("dashboard-transactions") &&
        createPortal(
          <DashboardTransactions userRole={user.role} />,
          document.getElementById("dashboard-transactions")!,
        )}
    </>
  )
}
