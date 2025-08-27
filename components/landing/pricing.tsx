import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "50.000",
      period: "/bulan",
      description: "Cocok untuk kebutuhan penyimpanan pribadi",
      features: ["Penyimpanan hingga 10 item", "Akses 24/7", "Asuransi dasar", "Support email", "Lokasi dalam kota"],
    },
    {
      name: "Premium",
      price: "150.000",
      period: "/bulan",
      description: "Ideal untuk bisnis kecil dan menengah",
      features: [
        "Penyimpanan hingga 50 item",
        "Akses 24/7",
        "Asuransi premium",
        "Support prioritas",
        "Multi lokasi",
        "Pickup & delivery",
        "Laporan bulanan",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Solusi lengkap untuk perusahaan besar",
      features: [
        "Penyimpanan unlimited",
        "Akses 24/7",
        "Asuransi komprehensif",
        "Dedicated support",
        "Semua lokasi",
        "Pickup & delivery prioritas",
        "Dashboard analytics",
        "API integration",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Pilih Paket Yang Sesuai Kebutuhan Anda
          </h2>
          <p className="text-xl text-gray-600 text-pretty">
            Dapatkan solusi penyimpanan terbaik dengan harga yang kompetitif
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-titipsini-green shadow-lg scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-titipsini-green text-white px-4 py-1 rounded-full text-sm font-medium">
                    Paling Populer
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-titipsini-green">
                    {plan.price === "Custom" ? "Custom" : `Rp ${plan.price}`}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-titipsini-green" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-titipsini-green hover:bg-titipsini-green-dark" : "bg-gray-900 hover:bg-gray-800"} text-white`}
                >
                  {plan.price === "Custom" ? "Hubungi Kami" : "Pilih Paket"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
