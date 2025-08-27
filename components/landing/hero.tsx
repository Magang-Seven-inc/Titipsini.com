import { Button } from "@/components/ui/button"
import { Shield, Clock, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-titipsini-green-light to-white py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-titipsini-green rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-titipsini-green rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-titipsini-green rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Tempat Yang <span className="text-titipsini-green">Aman</span> Untuk Barang Berharga Anda
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                Titipsini menghubungkan Anda dengan mitra penyimpanan terpercaya di seluruh Indonesia. Simpan barang
                berharga Anda dengan aman, mudah, dan terjangkau kapan saja.
              </p>
            </div>

            {/* Features highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-titipsini-green" />
                <span className="text-sm font-medium text-gray-700">100% Aman</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-titipsini-green" />
                <span className="text-sm font-medium text-gray-700">24/7 Akses</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-titipsini-green" />
                <span className="text-sm font-medium text-gray-700">Lokasi Strategis</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-titipsini-green hover:bg-titipsini-green-dark text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all"
              >
                Mulai Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-titipsini-green text-titipsini-green px-8 py-3 bg-transparent hover:bg-titipsini-green hover:text-white transition-all"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-titipsini-green">1000+</div>
                <div className="text-sm text-gray-600">Mitra Terpercaya</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-titipsini-green">50+</div>
                <div className="text-sm text-gray-600">Kota di Indonesia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-titipsini-green">24/7</div>
                <div className="text-sm text-gray-600">Layanan Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/professional-delivery-person-with-motorcycle-and-p.png"
                alt="Titipsini Storage Service - Professional delivery and storage"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-titipsini-green rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-titipsini-green rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
