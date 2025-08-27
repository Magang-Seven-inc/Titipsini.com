import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">Hubungi Kami</h2>
          <p className="text-xl text-gray-600 text-pretty">
            Tim kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-titipsini-green" />
                  <div>
                    <p className="font-medium text-gray-900">Alamat Kantor Pusat</p>
                    <p className="text-gray-600">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-titipsini-green" />
                  <div>
                    <p className="font-medium text-gray-900">Telepon</p>
                    <p className="text-gray-600">+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-titipsini-green" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@titipsini.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-titipsini-green" />
                  <div>
                    <p className="font-medium text-gray-900">Jam Operasional</p>
                    <p className="text-gray-600">24 Jam / 7 Hari</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Peta Lokasi Kantor</p>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>Isi form di bawah ini dan kami akan segera menghubungi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Depan</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Belakang</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Nomor Telepon</label>
                <Input placeholder="+62 812-3456-7890" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subjek</label>
                <Input placeholder="Pertanyaan tentang layanan" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Pesan</label>
                <Textarea placeholder="Tulis pesan Anda di sini..." rows={4} />
              </div>
              <Button className="w-full bg-titipsini-green hover:bg-titipsini-green-dark text-white">
                Kirim Pesan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
