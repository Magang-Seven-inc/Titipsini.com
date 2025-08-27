"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getDataScope } from "@/lib/auth"

interface DataState {
  users: any[]
  transactions: any[]
  vendors: any[]
  refunds: any[]
  withdrawals: any[]
  reports: any[]
}

interface InterconnectedDataContextType {
  data: DataState
  updateUserStatus: (userId: string, status: string) => void
  approveTransaction: (transactionId: string) => void
  processRefund: (refundId: string, action: "approve" | "reject") => void
  processWithdrawal: (withdrawalId: string, action: "approve" | "reject") => void
  exportData: (type: string, filters?: any) => Promise<Blob>
  isLoading: boolean
  error: string | null
}

const InterconnectedDataContext = createContext<InterconnectedDataContextType | undefined>(undefined)

export function InterconnectedDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [data, setData] = useState<DataState>({
    users: [],
    transactions: [],
    vendors: [],
    refunds: [],
    withdrawals: [],
    reports: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateUserStatus = (userId: string, status: string) => {
    if (!user || user.role !== "superadmin") return

    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === userId ? { ...u, status, updatedAt: new Date() } : u)),
    }))

    // Trigger related data updates
    if (status === "verified") {
      // Update related transactions, vendor applications, etc.
      setData((prev) => ({
        ...prev,
        transactions: prev.transactions.map((t) => (t.userId === userId ? { ...t, userVerified: true } : t)),
      }))
    }
  }

  const approveTransaction = (transactionId: string) => {
    const scope = getDataScope(user?.role || "customer")
    if (!scope.canApproveTransactions) return

    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.id === transactionId ? { ...t, status: "approved", approvedAt: new Date(), approvedBy: user?.id } : t,
      ),
    }))
  }

  const processRefund = (refundId: string, action: "approve" | "reject") => {
    const scope = getDataScope(user?.role || "customer")
    if (!scope.canApproveTransactions) return

    setData((prev) => ({
      ...prev,
      refunds: prev.refunds.map((r) =>
        r.id === refundId
          ? {
              ...r,
              status: action === "approve" ? "approved" : "rejected",
              processedAt: new Date(),
              processedBy: user?.id,
            }
          : r,
      ),
    }))
  }

  const processWithdrawal = (withdrawalId: string, action: "approve" | "reject") => {
    const scope = getDataScope(user?.role || "customer")
    if (!scope.canApproveTransactions) return

    setData((prev) => ({
      ...prev,
      withdrawals: prev.withdrawals.map((w) =>
        w.id === withdrawalId
          ? {
              ...w,
              status: action === "approve" ? "approved" : "rejected",
              processedAt: new Date(),
              processedBy: user?.id,
            }
          : w,
      ),
    }))
  }

  const exportData = async (type: string, filters?: any): Promise<Blob> => {
    // Simulate PDF generation
    const content = JSON.stringify(data[type as keyof DataState], null, 2)
    return new Blob([content], { type: "application/pdf" })
  }

  return (
    <InterconnectedDataContext.Provider
      value={{
        data,
        updateUserStatus,
        approveTransaction,
        processRefund,
        processWithdrawal,
        exportData,
        isLoading,
        error,
      }}
    >
      {children}
    </InterconnectedDataContext.Provider>
  )
}

export function useInterconnectedData() {
  const context = useContext(InterconnectedDataContext)
  if (context === undefined) {
    throw new Error("useInterconnectedData must be used within an InterconnectedDataProvider")
  }
  return context
}
