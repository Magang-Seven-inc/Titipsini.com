"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface DataSyncContextType {
  refreshData: () => void
  lastUpdated: Date | null
  isRefreshing: boolean
}

const DataSyncContext = createContext<DataSyncContextType | undefined>(undefined)

export function DataSyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  // Auto-refresh data every 5 minutes for superadmin
  useEffect(() => {
    if (user?.role === "superadmin") {
      const interval = setInterval(refreshData, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [user])

  return (
    <DataSyncContext.Provider value={{ refreshData, lastUpdated, isRefreshing }}>{children}</DataSyncContext.Provider>
  )
}

export function useDataSync() {
  const context = useContext(DataSyncContext)
  if (context === undefined) {
    throw new Error("useDataSync must be used within a DataSyncProvider")
  }
  return context
}
