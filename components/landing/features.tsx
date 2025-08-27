import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, MapPin, Users, Package, CreditCard } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-8 w-8 text-titipsini-green" />,
    title: "Keamanan Terjamin",
    description: "Sistem keamanan berlapis dengan CCTV 24/7 dan akses terkontrol untuk melindungi barang Anda.",
  },
  {
    icon: <Clock className="h-8 w-8 text-titipsini-green" />,
    title: "Akses Fleksibel",
    description: "Akses barang Anda kapan saja dengan sistem booking online yang mudah dan praktis.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-titipsini-green" />,
    title: "Lokasi Strategis",
    description: "Mitra penyimpanan tersebar di lokasi strategis untuk kemudahan akses dari berbagai area.",
  },
  {
    icon: <Users className="h-8 w-8 text-titipsini-green" />,
    title: "Mitra Terpercaya",
    description: "Bekerja sama dengan mitra penyimpanan yang telah terverifikasi dan berpengalaman.",
  },
  {
    icon: <Package className="h-8 w-8 text-titipsini-green" />,
    title: "Berbagai Ukuran",
    description: "Tersedia berbagai ukuran ruang penyimpanan sesuai kebutuhan barang Anda.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-titipsini-green" />,
    title: "Pembayaran Mudah",
    description: "Sistem pembayaran digital yang aman dan mendukung berbagai metode pembayaran.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih <span className="text-titipsini-green">Titipsini</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan solusi penyimpanan yang aman, mudah, dan terpercaya untuk semua kebutuhan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
