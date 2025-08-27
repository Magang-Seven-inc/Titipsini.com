import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-titipsini-green rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-titipsini-green font-bold text-sm">S</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-titipsini-green">Titipsini.Com</h3>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bingung Mau Nitip Barang Dimana?
Titipsini aja! Menyediakan solusi penyimpanan terpercaya di seluruh
              Indonesia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-titipsini-green cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-titipsini-green cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-titipsini-green cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Penyimpanan Barang
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Penyimpanan Dokumen
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Penyimpanan Kendaraan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Storage Bisnis
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Mitra
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-titipsini-green transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-titipsini-green" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-titipsini-green" />
                <span className="text-gray-400">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-titipsini-green" />
                <span className="text-gray-400">info@titipsini.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Titipsini.Com. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
