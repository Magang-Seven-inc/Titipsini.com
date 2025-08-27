import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 bg-titipsini-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Siap Menyimpan Barang Berharga Anda dengan Aman?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayakan barang berharga mereka kepada Titipsini.
            Dapatkan keamanan dan kemudahan yang Anda butuhkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-titipsini-green hover:bg-gray-100 px-8 py-3">
              Mulai Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-titipsini-green px-8 py-3 bg-transparent"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
