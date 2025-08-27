import { Card, CardContent } from "@/components/ui/card"

const partners = [
  { name: "Jakarta Storage", location: "Jakarta Selatan", capacity: "500+ Unit" },
  { name: "Bandung Secure", location: "Bandung Utara", capacity: "300+ Unit" },
  { name: "Surabaya Safe", location: "Surabaya Timur", capacity: "400+ Unit" },
  { name: "Medan Storage", location: "Medan Barat", capacity: "250+ Unit" },
  { name: "Yogya Secure", location: "Yogyakarta", capacity: "200+ Unit" },
  { name: "Bali Storage", location: "Denpasar", capacity: "150+ Unit" },
]

export function Partners() {
  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Mitra <span className="text-titipsini-green">Terpercaya</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bekerja sama dengan mitra penyimpanan terbaik di berbagai kota untuk memberikan layanan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-titipsini-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{partner.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                    <p className="text-sm text-gray-600">{partner.location}</p>
                  </div>
                </div>
                <div className="bg-titipsini-green-light rounded-lg p-4">
                  <p className="text-sm text-titipsini-green font-medium">Kapasitas: {partner.capacity}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
