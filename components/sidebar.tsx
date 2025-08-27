"use client"

import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
  MapPin,
  UserCheck,
  Wallet,
  BarChart3,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import type { UserRole } from "@/lib/auth"

interface MenuItem {
  title: string
  href?: string
  icon: React.ReactNode
  children?: MenuItem[]
  roles: UserRole[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance", "mitra"],
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: <UserCheck className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance", "mitra"],
  },
  {
    title: "Kota",
    href: "/dashboard/cities",
    icon: <MapPin className="h-5 w-5" />,
    roles: ["superadmin", "admin"],
  },
  {
    title: "User",
    icon: <Users className="h-5 w-5" />,
    roles: ["superadmin", "admin"],
    children: [
      {
        title: "Customer",
        href: "/dashboard/users/customers",
        icon: <Users className="h-4 w-4" />,
        roles: ["superadmin", "admin"],
      },
      {
        title: "Vendor",
        href: "/dashboard/users/vendors",
        icon: <Users className="h-4 w-4" />,
        roles: ["superadmin", "admin"],
      },
      {
        title: "Finance",
        href: "/dashboard/users/finance",
        icon: <Users className="h-4 w-4" />,
        roles: ["superadmin"],
      },
      {
        title: "Admin",
        href: "/dashboard/users/admin",
        icon: <Users className="h-4 w-4" />,
        roles: ["superadmin"],
      },
      {
        title: "Tambah Akun",
        href: "/dashboard/users/create",
        icon: <Users className="h-4 w-4" />,
        roles: ["superadmin"],
      },
    ],
  },
  {
    title: "Transaksi customer",
    href: "/dashboard/transactions/customers",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance"],
  },
  {
    title: "Data Vendor",
    href: "/dashboard/vendors",
    icon: <Package className="h-5 w-5" />,
    roles: ["superadmin", "admin"],
  },
  {
    title: "Layanan",
    icon: <Package className="h-5 w-5" />,
    roles: ["superadmin", "admin", "mitra"],
    children: [
      {
        title: "Pesanan",
        href: "/dashboard/services/orders",
        icon: <Package className="h-4 w-4" />,
        roles: ["superadmin", "admin", "mitra"],
      },
    ],
  },
  {
    title: "Pengembalian Dana",
    href: "/dashboard/refunds",
    icon: <Wallet className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance"],
  },
  {
    title: "Penarikan Saldo",
    href: "/dashboard/withdrawals",
    icon: <Wallet className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance"],
  },
  {
    title: "Total Transaksi",
    href: "/dashboard/transactions/total",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance"],
  },
  {
    title: "Laporan",
    icon: <FileText className="h-5 w-5" />,
    roles: ["superadmin", "admin", "finance"],
    children: [
      {
        title: "Keluar",
        href: "/dashboard/reports/export",
        icon: <FileText className="h-4 w-4" />,
        roles: ["superadmin", "admin", "finance"],
      },
    ],
  },
  {
    title: "Pengaturan",
    icon: <Settings className="h-5 w-5" />,
    roles: ["superadmin", "admin"],
    children: [
      {
        title: "General",
        href: "/dashboard/settings/general",
        icon: <Settings className="h-4 w-4" />,
        roles: ["superadmin", "admin"],
      },
      {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: <Settings className="h-4 w-4" />,
        roles: ["superadmin", "admin"],
      },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<string[]>([])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const hasPermission = (roles: UserRole[]) =>
    user && roles.includes(user.role)

  const filteredMenuItems = menuItems.filter((item) =>
    hasPermission(item.roles)
  )

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (!hasPermission(item.roles)) return null

    const isActive = pathname === item.href
    const isOpen = openItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleItem(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start px-4 py-2 h-auto ${
                level > 0 ? "pl-8" : ""
              } hover:bg-titipsini-green-light hover:text-titipsini-green`}
            >
              {item.icon}
              <span className="ml-3 flex-1 text-left">{item.title}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map((child) =>
              renderMenuItem(child, level + 1)
            )}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link key={item.title} href={item.href || "#"} onClick={onClose}>
        <Button
          variant="ghost"
          className={`w-full justify-start px-4 py-2 h-auto ${
            level > 0 ? "pl-8" : ""
          } ${
            isActive
              ? "bg-titipsini-green text-white hover:bg-titipsini-green-dark"
              : "hover:bg-titipsini-green-light hover:text-titipsini-green"
          }`}
        >
          {item.icon}
          <span className="ml-3">{item.title}</span>
        </Button>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-titipsini-green text-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-titipsini-green-dark">
  <div className="flex items-center space-x-2">
    {/* Logo Sidebar */}
    <div className="w-8 h-8 flex items-center justify-center">
      <Image
        src="/logo sidebar.png"
        alt="Titipsini Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    </div>

    {/* Title + Subtitle */}
    <div>
      <h1 className="text-lg font-bold">Titipsini.Com</h1>
      <p className="text-xs opacity-80">
        Bingung Mau Nitip Barang Dimana? Titipsini aja!
      </p>
    </div>
  </div>

  {/* Tombol Close (Mobile) */}
  <Button
    variant="ghost"
    size="sm"
    onClick={onClose}
    className="lg:hidden text-white hover:bg-titipsini-green-dark"
  >
    <X className="h-5 w-5" />
  </Button>
</div>

        {/* City selector */}
        <div className="p-4 border-b border-titipsini-green-dark">
          {hasPermission(["superadmin", "admin"]) ? (
            <Link href="/dashboard/cities">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-titipsini-green-dark"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Kota
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          ) : (
            <div className="flex items-center text-white px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {user?.city || "Jakarta"}
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => renderMenuItem(item))}
          </nav>
        </ScrollArea>

        {/* Logout button */}
        <div className="p-4 border-t border-titipsini-green-dark">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-white hover:bg-red-600"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Keluar
          </Button>
        </div>
      </div>
    </>
  )
}

export function SidebarToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
// Note: The text "Bingung Mau Nitip Barang Dimana? Titipsini aja!" has been added or updated in multiple places for branding consistency.
// It appears in the sidebar header, city selector, footer, and login page.