"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Mail, MessageSquare, Bell, Smartphone } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { useToast } from "@/hooks/use-toast"

export default function NotificationSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    whatsappNotifications: false,
    newUserRegistration: true,
    newVendorApplication: true,
    transactionCompleted: true,
    refundRequested: true,
    withdrawalRequested: true,
    systemMaintenance: true,
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    smsProvider: "twilio",
    smsApiKey: "",
    whatsappApiKey: "",
    emailTemplate:
      "Halo {{name}},\n\nTerima kasih telah menggunakan layanan Titipsini.\n\n{{message}}\n\nSalam,\nTim Titipsini",
  })

  const handleSave = () => {
    toast({
      title: "Pengaturan Notifikasi Disimpan",
      description: "Konfigurasi notifikasi telah berhasil diperbarui.",
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
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Notifikasi</h1>
            <p className="text-gray-600">Kelola konfigurasi sistem notifikasi</p>
          </div>
          <Button onClick={handleSave} className="bg-titipsini-green hover:bg-titipsini-green-dark">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Saluran Notifikasi
              </CardTitle>
              <CardDescription>Aktifkan/nonaktifkan saluran notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <div>
                    <Label htmlFor="emailNotifications">Email</Label>
                    <p className="text-sm text-gray-500">Kirim notifikasi via email</p>
                  </div>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <div>
                    <Label htmlFor="smsNotifications">SMS</Label>
                    <p className="text-sm text-gray-500">Kirim notifikasi via SMS</p>
                  </div>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <Label htmlFor="pushNotifications">Push Notification</Label>
                    <p className="text-sm text-gray-500">Notifikasi push browser</p>
                  </div>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <div>
                    <Label htmlFor="whatsappNotifications">WhatsApp</Label>
                    <p className="text-sm text-gray-500">Kirim notifikasi via WhatsApp</p>
                  </div>
                </div>
                <Switch
                  id="whatsappNotifications"
                  checked={settings.whatsappNotifications}
                  onCheckedChange={(checked) => handleInputChange("whatsappNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Events */}
          <Card>
            <CardHeader>
              <CardTitle>Event Notifikasi</CardTitle>
              <CardDescription>Pilih event yang akan mengirim notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newUserRegistration">Registrasi Pengguna Baru</Label>
                  <p className="text-sm text-gray-500">Notifikasi saat ada pengguna baru</p>
                </div>
                <Switch
                  id="newUserRegistration"
                  checked={settings.newUserRegistration}
                  onCheckedChange={(checked) => handleInputChange("newUserRegistration", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newVendorApplication">Aplikasi Vendor Baru</Label>
                  <p className="text-sm text-gray-500">Notifikasi saat ada vendor baru</p>
                </div>
                <Switch
                  id="newVendorApplication"
                  checked={settings.newVendorApplication}
                  onCheckedChange={(checked) => handleInputChange("newVendorApplication", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="transactionCompleted">Transaksi Selesai</Label>
                  <p className="text-sm text-gray-500">Notifikasi saat transaksi selesai</p>
                </div>
                <Switch
                  id="transactionCompleted"
                  checked={settings.transactionCompleted}
                  onCheckedChange={(checked) => handleInputChange("transactionCompleted", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="refundRequested">Permintaan Refund</Label>
                  <p className="text-sm text-gray-500">Notifikasi saat ada permintaan refund</p>
                </div>
                <Switch
                  id="refundRequested"
                  checked={settings.refundRequested}
                  onCheckedChange={(checked) => handleInputChange("refundRequested", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="withdrawalRequested">Permintaan Penarikan</Label>
                  <p className="text-sm text-gray-500">Notifikasi saat ada permintaan penarikan</p>
                </div>
                <Switch
                  id="withdrawalRequested"
                  checked={settings.withdrawalRequested}
                  onCheckedChange={(checked) => handleInputChange("withdrawalRequested", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Konfigurasi Email
              </CardTitle>
              <CardDescription>Pengaturan SMTP untuk email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.smtpHost}
                  onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleInputChange("smtpPort", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  value={settings.smtpUsername}
                  onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Template Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Template Email</CardTitle>
              <CardDescription>Kustomisasi template email notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emailTemplate">Template Email</Label>
                <Textarea
                  id="emailTemplate"
                  value={settings.emailTemplate}
                  onChange={(e) => handleInputChange("emailTemplate", e.target.value)}
                  rows={8}
                  placeholder="Gunakan {{name}} untuk nama pengguna, {{email}} untuk email pengguna, {{message}} untuk pesan, {{date}} untuk tanggal, dan {{amount}} untuk jumlah (untuk transaksi)"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Variabel yang tersedia:</strong>
                </p>
                <ul className="list-disc list-inside mt-1">
                  <li>{"{{name}}"} - Nama pengguna</li>
                  <li>{"{{email}}"} - Email pengguna</li>
                  <li>{"{{message}}"} - Pesan notifikasi</li>
                  <li>{"{{date}}"} - Tanggal</li>
                  <li>{"{{amount}}"} - Jumlah (untuk transaksi)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
