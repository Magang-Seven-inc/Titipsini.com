// Authentication context and utilities for multi-role system
export type UserRole = "superadmin" | "admin" | "finance" | "mitra" | "customer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user data for demonstration
const mockUsers: Record<string, User> = {
  "superadmin@titipsini.com": {
    id: "1",
    email: "superadmin@titipsini.com",
    name: "Super Admin",
    role: "superadmin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "admin@titipsini.com": {
    id: "2",
    email: "admin@titipsini.com",
    name: "Admin User",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "finance@titipsini.com": {
    id: "3",
    email: "finance@titipsini.com",
    name: "Yusuf Siregar",
    role: "finance",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "mitra@titipsini.com": {
    id: "4",
    email: "mitra@titipsini.com",
    name: "Mitra Partner",
    role: "mitra",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "customer@titipsini.com": {
    id: "5",
    email: "customer@titipsini.com",
    name: "Customer User",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers[email]
  if (!user || password !== "password123") {
    throw new Error("Invalid credentials")
  }

  // Store in localStorage for persistence
  localStorage.setItem("titipsini_user", JSON.stringify(user))
  return user
}

export const logout = async (): Promise<void> => {
  localStorage.removeItem("titipsini_user")
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("titipsini_user")
  return stored ? JSON.parse(stored) : null
}

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    customer: 0,
    mitra: 1,
    finance: 2,
    admin: 3,
    superadmin: 4,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const canAccessFeature = (userRole: UserRole, feature: string): boolean => {
  const featurePermissions: Record<string, UserRole[]> = {
    "user-management": ["superadmin", "admin"],
    "financial-reports": ["superadmin", "admin", "finance"],
    "vendor-management": ["superadmin", "admin"],
    "customer-transactions": ["superadmin", "admin", "finance"],
    "refund-management": ["superadmin", "admin", "finance"],
    "withdrawal-management": ["superadmin", "admin", "finance"],
    "system-settings": ["superadmin", "admin"],
    "export-data": ["superadmin", "admin", "finance"],
    "create-users": ["superadmin"],
    "delete-users": ["superadmin"],
    "approve-transactions": ["superadmin", "admin", "finance"],
    "manage-all-cities": ["superadmin"],
    "manage-own-city": ["admin", "finance"],
  }

  return featurePermissions[feature]?.includes(userRole) || false
}

export const getDataScope = (
  userRole: UserRole,
): { canViewAllCities: boolean; canManageAllUsers: boolean; canApproveTransactions: boolean } => {
  switch (userRole) {
    case "superadmin":
      return {
        canViewAllCities: true,
        canManageAllUsers: true,
        canApproveTransactions: true,
      }
    case "admin":
      return {
        canViewAllCities: false,
        canManageAllUsers: false,
        canApproveTransactions: true,
      }
    case "finance":
      return {
        canViewAllCities: false,
        canManageAllUsers: false,
        canApproveTransactions: true,
      }
    default:
      return {
        canViewAllCities: false,
        canManageAllUsers: false,
        canApproveTransactions: false,
      }
  }
}
