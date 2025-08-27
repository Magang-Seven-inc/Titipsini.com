"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Edit, Info, Trash2, Plus } from "lucide-react"

interface AdminUser {
  id: string
  name: string
  phone: string
  email: string
  city: string
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastLogin: string
}

const mockAdminUsers: AdminUser[] = [
  {
    id: "AD1234",
    name: "Cintia Putri",
    phone: "08812345678",
    email: "cintia@gmail.com",
    city: "Yogyakarta",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: "AD1235",
    name: "Dimas Sutejo",
    phone: "08812345679",
    email: "dim@gmail.com",
    city: "Bandung",
    status: "active",
    joinDate: "2023-02-10",
    lastLogin: "2024-01-19",
  },
  {
    id: "AD1236",
    name: "Egy",
    phone: "08812345680",
    email: "egy@gmail.com",
    city: "Solo",
    status: "inactive",
    joinDate: "2023-03-05",
    lastLogin: "2024-01-18",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateUser = (formData: FormData) => {
    const newUser: AdminUser = {
      id: `AD${Date.now()}`,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      city: formData.get("city") as string,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "-",
    }
    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (formData: FormData) => {
    if (!selectedUser) return

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            city: formData.get("city") as string,
            status: formData.get("status") as "active" | "inactive" | "suspended",
          }
        : user,
    )
    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Tidak Aktif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Ditangguhkan</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
          <p className="text-gray-600">User &gt; Admin</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manajemen Akun Admin</CardTitle>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-titipsini-green hover:bg-titipsini-green-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Akun Admin Baru</DialogTitle>
                </DialogHeader>
                <form action={handleCreateUser} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">No Telepon</Label>
                    <Input id="phone" name="phone" required />
                  </div>
                  <div>
                    <Label htmlFor="city">Kota</Label>
                    <Select name="city" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                        <SelectItem value="Bandung">Bandung</SelectItem>
                        <SelectItem value="Surabaya">Surabaya</SelectItem>
                        <SelectItem value="Jakarta">Jakarta</SelectItem>
                        <SelectItem value="Solo">Solo</SelectItem>
                        <SelectItem value="Medan">Medan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-titipsini-green hover:bg-titipsini-green-dark">
                    Tambah Admin
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="suspended">Ditangguhkan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-titipsini-green text-white">
              <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  ID
                </div>
                <div>Nama</div>
                <div>No Telepon</div>
                <div>Email</div>
                <div>Wilayah</div>
                <div>Status</div>
                <div>Aksi</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    {user.id}
                  </div>
                  <div>{user.name}</div>
                  <div>{user.phone}</div>
                  <div>{user.email}</div>
                  <div>{user.city}</div>
                  <div>{getStatusBadge(user.status)}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-sm text-gray-600">...</span>
            </div>
            <div className="text-sm text-gray-600">Total pesanan: {filteredUsers.length} • Total halaman: 1</div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Akun Admin</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <form action={handleEditUser} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nama Lengkap</Label>
                <Input id="edit-name" name="name" defaultValue={selectedUser.name} required />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" name="email" type="email" defaultValue={selectedUser.email} required />
              </div>
              <div>
                <Label htmlFor="edit-phone">No Telepon</Label>
                <Input id="edit-phone" name="phone" defaultValue={selectedUser.phone} required />
              </div>
              <div>
                <Label htmlFor="edit-city">Kota</Label>
                <Select name="city" defaultValue={selectedUser.city}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Medan">Medan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select name="status" defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    <SelectItem value="suspended">Ditangguhkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-titipsini-green hover:bg-titipsini-green-dark">
                Update Admin
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
