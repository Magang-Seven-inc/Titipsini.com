import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Package, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-12 w-12 text-white" />,
    title: "Cari Lokasi",
    description: "Temukan mitra penyimpanan terdekat dengan lokasi yang strategis dan aman.",
    color: "bg-blue-500",
  },
  {
    icon: <Calendar className="h-12 w-12 text-white" />,
    title: "Booking Online",
    description: "Pilih ukuran ruang dan lakukan booking secara online dengan mudah dan cepat.",
    color: "bg-titipsini-green",
  },
  {
    icon: <Package className="h-12 w-12 text-white" />,
    title: "Simpan Barang",
    description: "Datang ke lokasi dan simpan barang Anda dengan bantuan tim profesional kami.",
    color: "bg-purple-500",
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-white" />,
    title: "Akses Kapan Saja",
    description: "Akses barang Anda kapan saja dengan sistem keamanan yang terjamin 24/7.",
    color: "bg-orange-500",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja <span className="text-titipsini-green">Titipsini</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proses yang sederhana dan mudah untuk menyimpan barang berharga Anda dengan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                </CardContent>
              </Card>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
