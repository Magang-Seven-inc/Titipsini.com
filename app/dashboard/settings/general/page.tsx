"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Globe, Shield, Bell, Database } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { useToast } from "@/hooks/use-toast"

export default function GeneralSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "Titipsini.Com",
    siteDescription: "Tempat Yang Aman Untuk Barang Berharga Anda",
    contactEmail: "admin@titipsini.com",
    supportPhone: "+62 812-3456-7890",
    defaultLanguage: "id",
    timezone: "Asia/Jakarta",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    autoApproveVendors: false,
    maxStorageDays: 30,
    commissionRate: 10,
    minWithdrawal: 50000,
    maxRefundDays: 7,
  })

  const handleSave = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan umum telah berhasil diperbarui.",
    })
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Umum</h1>
            <p className="text-gray-600">Kelola konfigurasi dasar platform</p>
          </div>
          <Button onClick={handleSave} className="bg-titipsini-green hover:bg-titipsini-green-dark">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Informasi Situs
              </CardTitle>
              <CardDescription>Konfigurasi dasar informasi situs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Nama Situs</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Deskripsi Situs</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Kontak</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="supportPhone">Telepon Support</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => handleInputChange("supportPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Konfigurasi Sistem
              </CardTitle>
              <CardDescription>Pengaturan teknis platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultLanguage">Bahasa Default</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleInputChange("defaultLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                    <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                    <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Mode Maintenance</Label>
                  <p className="text-sm text-gray-500">Aktifkan untuk maintenance situs</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Manajemen Pengguna
              </CardTitle>
              <CardDescription>Pengaturan registrasi dan verifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registrationEnabled">Registrasi Terbuka</Label>
                  <p className="text-sm text-gray-500">Izinkan registrasi pengguna baru</p>
                </div>
                <Switch
                  id="registrationEnabled"
                  checked={settings.registrationEnabled}
                  onCheckedChange={(checked) => handleInputChange("registrationEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailVerificationRequired">Verifikasi Email Wajib</Label>
                  <p className="text-sm text-gray-500">Wajibkan verifikasi email</p>
                </div>
                <Switch
                  id="emailVerificationRequired"
                  checked={settings.emailVerificationRequired}
                  onCheckedChange={(checked) => handleInputChange("emailVerificationRequired", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApproveVendors">Auto Approve Vendor</Label>
                  <p className="text-sm text-gray-500">Otomatis setujui vendor baru</p>
                </div>
                <Switch
                  id="autoApproveVendors"
                  checked={settings.autoApproveVendors}
                  onCheckedChange={(checked) => handleInputChange("autoApproveVendors", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Aturan Bisnis
              </CardTitle>
              <CardDescription>Konfigurasi aturan operasional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxStorageDays">Maksimal Hari Penyimpanan</Label>
                <Input
                  id="maxStorageDays"
                  type="number"
                  value={settings.maxStorageDays}
                  onChange={(e) => handleInputChange("maxStorageDays", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="commissionRate">Rate Komisi (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  value={settings.commissionRate}
                  onChange={(e) => handleInputChange("commissionRate", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="minWithdrawal">Minimal Penarikan (Rp)</Label>
                <Input
                  id="minWithdrawal"
                  type="number"
                  value={settings.minWithdrawal}
                  onChange={(e) => handleInputChange("minWithdrawal", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="maxRefundDays">Maksimal Hari Refund</Label>
                <Input
                  id="maxRefundDays"
                  type="number"
                  value={settings.maxRefundDays}
                  onChange={(e) => handleInputChange("maxRefundDays", Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
