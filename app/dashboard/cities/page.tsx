"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Plus, Search, Edit, Trash2, Users, Building } from "lucide-react"
import { toast } from "sonner"

interface City {
  id: string
  name: string
  province: string
  status: "active" | "inactive"
  adminCount: number
  vendorCount: number
  customerCount: number
  description?: string
}

const mockCities: City[] = [
  {
    id: "1",
    name: "Jakarta",
    province: "DKI Jakarta",
    status: "active",
    adminCount: 5,
    vendorCount: 120,
    customerCount: 1500,
  },
  {
    id: "2",
    name: "Bandung",
    province: "Jawa Barat",
    status: "active",
    adminCount: 3,
    vendorCount: 85,
    customerCount: 980,
  },
  {
    id: "3",
    name: "Surabaya",
    province: "Jawa Timur",
    status: "active",
    adminCount: 4,
    vendorCount: 95,
    customerCount: 1200,
  },
  {
    id: "4",
    name: "Yogyakarta",
    province: "DI Yogyakarta",
    status: "active",
    adminCount: 2,
    vendorCount: 45,
    customerCount: 650,
  },
  {
    id: "5",
    name: "Medan",
    province: "Sumatera Utara",
    status: "inactive",
    adminCount: 1,
    vendorCount: 25,
    customerCount: 300,
  },
]

export default function CitiesPage() {
  const { user } = useAuth()
  const [cities, setCities] = useState<City[]>(mockCities)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [newCity, setNewCity] = useState({ name: "", province: "", description: "" })

  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.province.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || city.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddCity = () => {
    if (!newCity.name || !newCity.province) {
      toast.error("Nama kota dan provinsi harus diisi")
      return
    }

    const city: City = {
      id: Date.now().toString(),
      name: newCity.name,
      province: newCity.province,
      status: "active",
      adminCount: 0,
      vendorCount: 0,
      customerCount: 0,
      description: newCity.description,
    }

    setCities([...cities, city])
    setNewCity({ name: "", province: "", description: "" })
    setIsAddDialogOpen(false)
    toast.success("Kota berhasil ditambahkan")
  }

  const handleEditCity = (city: City) => {
    setEditingCity(city)
    setNewCity({ name: city.name, province: city.province, description: city.description || "" })
  }

  const handleUpdateCity = () => {
    if (!editingCity || !newCity.name || !newCity.province) return

    setCities(
      cities.map((city) =>
        city.id === editingCity.id
          ? { ...city, name: newCity.name, province: newCity.province, description: newCity.description }
          : city,
      ),
    )
    setEditingCity(null)
    setNewCity({ name: "", province: "", description: "" })
    toast.success("Kota berhasil diperbarui")
  }

  const handleToggleStatus = (cityId: string) => {
    setCities(
      cities.map((city) =>
        city.id === cityId ? { ...city, status: city.status === "active" ? "inactive" : "active" } : city,
      ),
    )
    toast.success("Status kota berhasil diubah")
  }

  const handleDeleteCity = (cityId: string) => {
    setCities(cities.filter((city) => city.id !== cityId))
    toast.success("Kota berhasil dihapus")
  }

  const canManageCities = user?.role === "superadmin"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Kota</h1>
          <p className="text-muted-foreground">Kelola kota dan wilayah operasional</p>
        </div>
        {canManageCities && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kota
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kota Baru</DialogTitle>
                <DialogDescription>Tambahkan kota baru ke dalam sistem</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cityName">Nama Kota</Label>
                  <Input
                    id="cityName"
                    value={newCity.name}
                    onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                    placeholder="Masukkan nama kota"
                  />
                </div>
                <div>
                  <Label htmlFor="province">Provinsi</Label>
                  <Input
                    id="province"
                    value={newCity.province}
                    onChange={(e) => setNewCity({ ...newCity, province: e.target.value })}
                    placeholder="Masukkan nama provinsi"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi (Opsional)</Label>
                  <Textarea
                    id="description"
                    value={newCity.description}
                    onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
                    placeholder="Deskripsi kota"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddCity}>Tambah Kota</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari kota atau provinsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <Card key={city.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-titipsini-green" />
                  <CardTitle className="text-lg">{city.name}</CardTitle>
                </div>
                <Badge variant={city.status === "active" ? "default" : "secondary"}>
                  {city.status === "active" ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
              <CardDescription>{city.province}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {city.description && <p className="text-sm text-muted-foreground">{city.description}</p>}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-blue-500">{city.adminCount}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Building className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-500">{city.vendorCount}</p>
                  <p className="text-xs text-muted-foreground">Vendor</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-purple-500">{city.customerCount}</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>

              {canManageCities && (
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditCity(city)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleToggleStatus(city.id)} className="flex-1">
                    {city.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCity(city.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCity} onOpenChange={() => setEditingCity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kota</DialogTitle>
            <DialogDescription>Perbarui informasi kota</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editCityName">Nama Kota</Label>
              <Input
                id="editCityName"
                value={newCity.name}
                onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                placeholder="Masukkan nama kota"
              />
            </div>
            <div>
              <Label htmlFor="editProvince">Provinsi</Label>
              <Input
                id="editProvince"
                value={newCity.province}
                onChange={(e) => setNewCity({ ...newCity, province: e.target.value })}
                placeholder="Masukkan nama provinsi"
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Deskripsi (Opsional)</Label>
              <Textarea
                id="editDescription"
                value={newCity.description}
                onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
                placeholder="Deskripsi kota"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCity(null)}>
              Batal
            </Button>
            <Button onClick={handleUpdateCity}>Perbarui</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
