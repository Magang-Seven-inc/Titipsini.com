"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Users, Package, CreditCard } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import type { DateRange } from "react-day-picker"

const reportTypes = [
  { id: "transactions", label: "Laporan Transaksi", icon: <CreditCard className="h-4 w-4" /> },
  { id: "users", label: "Laporan Pengguna", icon: <Users className="h-4 w-4" /> },
  { id: "vendors", label: "Laporan Vendor", icon: <Package className="h-4 w-4" /> },
  { id: "financial", label: "Laporan Keuangan", icon: <FileText className="h-4 w-4" /> },
]

export default function ReportsExportPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleReportToggle = (reportId: string) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const generateReport = async () => {
    setIsGenerating(true)

    try {
      const reportData = {
        types: selectedReports,
        dateRange,
        format,
        generatedAt: new Date().toISOString(),
      }

      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create PDF content
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Laporan Titipsini - ${new Date().toLocaleDateString("id-ID")}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px; }
                .section { margin-bottom: 30px; }
                .section h2 { color: #22c55e; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #22c55e; color: white; }
                .summary { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Laporan Komprehensif Titipsini.Com</h1>
                <p>Periode: ${dateRange?.from?.toLocaleDateString("id-ID") || "Semua waktu"} - ${dateRange?.to?.toLocaleDateString("id-ID") || "Sekarang"}</p>
                <p>Dibuat pada: ${new Date().toLocaleDateString("id-ID")} ${new Date().toLocaleTimeString("id-ID")}</p>
              </div>

              ${
                selectedReports.includes("transactions")
                  ? `
                <div class="section">
                  <h2>📊 Laporan Transaksi</h2>
                  <div class="summary">
                    <strong>Ringkasan Transaksi:</strong><br>
                    • Total Transaksi: 1,234<br>
                    • Total Nilai: Rp 45.200.000<br>
                    • Rata-rata per Transaksi: Rp 175.000<br>
                    • Transaksi Berhasil: 98.5%
                  </div>
                  <table>
                    <thead>
                      <tr><th>ID</th><th>Tanggal</th><th>Customer</th><th>Vendor</th><th>Jumlah</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>TT001</td><td>15/01/2024</td><td>John Doe</td><td>Storage A</td><td>Rp 150.000</td><td>Selesai</td></tr>
                      <tr><td>TT002</td><td>14/01/2024</td><td>Jane Smith</td><td>Storage B</td><td>Rp 75.000</td><td>Selesai</td></tr>
                      <tr><td>TT003</td><td>13/01/2024</td><td>Bob Wilson</td><td>Storage C</td><td>Rp 200.000</td><td>Pending</td></tr>
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }

              ${
                selectedReports.includes("users")
                  ? `
                <div class="section">
                  <h2>👥 Laporan Pengguna</h2>
                  <div class="summary">
                    <strong>Statistik Pengguna:</strong><br>
                    • Total Customer: 2,456<br>
                    • Total Vendor: 145<br>
                    • Admin: 12<br>
                    • Finance: 5<br>
                    • Pengguna Aktif: 89%
                  </div>
                  <table>
                    <thead>
                      <tr><th>Role</th><th>Jumlah</th><th>Aktif</th><th>Terverifikasi</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Customer</td><td>2,456</td><td>2,187</td><td>2,301</td></tr>
                      <tr><td>Vendor</td><td>145</td><td>132</td><td>140</td></tr>
                      <tr><td>Admin</td><td>12</td><td>12</td><td>12</td></tr>
                      <tr><td>Finance</td><td>5</td><td>5</td><td>5</td></tr>
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }

              ${
                selectedReports.includes("vendors")
                  ? `
                <div class="section">
                  <h2>🏪 Laporan Vendor</h2>
                  <div class="summary">
                    <strong>Performa Vendor:</strong><br>
                    • Vendor Terverifikasi: 140/145<br>
                    • Rating Rata-rata: 4.7/5<br>
                    • Kapasitas Total: 15,000 slot<br>
                    • Tingkat Okupansi: 78%
                  </div>
                  <table>
                    <thead>
                      <tr><th>Nama Vendor</th><th>Lokasi</th><th>Kapasitas</th><th>Terisi</th><th>Rating</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Storage A</td><td>Jakarta</td><td>500</td><td>420</td><td>4.8</td><td>Aktif</td></tr>
                      <tr><td>Storage B</td><td>Bandung</td><td>300</td><td>245</td><td>4.6</td><td>Aktif</td></tr>
                      <tr><td>Storage C</td><td>Surabaya</td><td>400</td><td>312</td><td>4.7</td><td>Aktif</td></tr>
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }

              ${
                selectedReports.includes("financial")
                  ? `
                <div class="section">
                  <h2>💰 Laporan Keuangan</h2>
                  <div class="summary">
                    <strong>Ringkasan Keuangan:</strong><br>
                    • Total Pendapatan: Rp 45.200.000<br>
                    • Total Komisi: Rp 4.520.000<br>
                    • Pengembalian Dana: Rp 1.200.000<br>
                    • Penarikan Saldo: Rp 3.800.000<br>
                    • Saldo Tersedia: Rp 39.680.000
                  </div>
                  <table>
                    <thead>
                      <tr><th>Kategori</th><th>Jumlah Transaksi</th><th>Total Nilai</th><th>Persentase</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Penitipan</td><td>856</td><td>Rp 32.400.000</td><td>71.7%</td></tr>
                      <tr><td>Komisi</td><td>856</td><td>Rp 4.520.000</td><td>10.0%</td></tr>
                      <tr><td>Pengambilan</td><td>734</td><td>Rp 8.280.000</td><td>18.3%</td></tr>
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }

              <div class="footer">
                <p>Laporan ini dibuat secara otomatis oleh sistem Titipsini.Com</p>
                <p>© 2024 Titipsini.Com - Bingung Mau Nitip Barang Dimana?
Titipsini aja!</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["superadmin", "admin", "finance"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
            <p className="text-gray-600">Generate dan export laporan komprehensif</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Jenis Laporan</CardTitle>
              <CardDescription>Pilih laporan yang ingin Anda generate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportTypes.map((report) => (
                <div key={report.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={report.id}
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={() => handleReportToggle(report.id)}
                  />
                  <label
                    htmlFor={report.id}
                    className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {report.icon}
                    <span>{report.label}</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Laporan</CardTitle>
              <CardDescription>Atur periode dan format laporan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Periode Laporan</label>
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Format Export</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateReport}
                disabled={selectedReports.length === 0 || isGenerating}
                className="w-full bg-titipsini-green hover:bg-titipsini-green-dark"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Laporan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Laporan Terbaru</CardTitle>
            <CardDescription>Laporan yang telah dibuat sebelumnya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Laporan Transaksi Januari 2024", date: "2024-01-31", size: "2.3 MB" },
                { name: "Laporan Pengguna Q4 2023", date: "2024-01-01", size: "1.8 MB" },
                { name: "Laporan Keuangan Desember 2023", date: "2023-12-31", size: "3.1 MB" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-titipsini-green" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">
                        {report.date} • {report.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
