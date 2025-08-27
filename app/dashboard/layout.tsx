"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar, SidebarToggle } from "@/components/sidebar"
import { DashboardClient } from "@/components/dashboard-client"
import { DataSyncProvider } from "@/components/data-sync-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DataSyncProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center">
            <SidebarToggle onToggle={() => setSidebarOpen(true)} />
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>

        <DashboardClient />
      </div>
    </DataSyncProvider>
  )
}
