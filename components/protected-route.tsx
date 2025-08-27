"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "superadmin" | "admin" | "finance" | "mitra"
  allowedRoles?: ("superadmin" | "admin" | "finance" | "mitra")[] // ⬅️ tambahan
}

export function ProtectedRoute({ children, requiredRole, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-titipsini-green" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // ✅ Check role permissions
  if (requiredRole || allowedRoles) {
    const roleHierarchy: Record<string, number> = {
      mitra: 1,
      finance: 2,
      admin: 3,
      superadmin: 4,
    }

    const userLevel = roleHierarchy[user.role] || 0

    // Mode 1: pakai requiredRole (hierarki)
    if (requiredRole) {
      const requiredLevel = roleHierarchy[requiredRole] || 0
      if (userLevel < requiredLevel) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </div>
          </div>
        )
      }
    }

    // Mode 2: pakai allowedRoles (list spesifik)
    if (allowedRoles && !allowedRoles.includes(user.role as any)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
