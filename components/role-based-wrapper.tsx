"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { canAccessFeature, type UserRole } from "@/lib/auth"

interface RoleBasedWrapperProps {
  children: React.ReactNode
  requiredFeature?: string
  requiredRole?: UserRole
  fallback?: React.ReactNode
}

export function RoleBasedWrapper({ children, requiredFeature, requiredRole, fallback = null }: RoleBasedWrapperProps) {
  const { user } = useAuth()

  if (!user) {
    return <>{fallback}</>
  }

  // Check feature-based permission
  if (requiredFeature && !canAccessFeature(user.role, requiredFeature)) {
    return <>{fallback}</>
  }

  // Check role-based permission
  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      customer: 0,
      mitra: 1,
      finance: 2,
      admin: 3,
      superadmin: 4,
    }

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}
