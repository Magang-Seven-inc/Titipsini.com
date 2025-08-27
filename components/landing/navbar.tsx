"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="bg-titipsini-green text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>info@titipsini.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Jam Operasional: 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-titipsini-green rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-titipsini-green font-bold text-sm">S</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-titipsini-green">Titipsini.Com</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Bingung Mau Nitip Barang Dimana?
Titipsini aja!</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-titipsini-green transition-colors font-medium">
                Layanan
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-titipsini-green transition-colors font-medium"
              >
                Cara Kerja
              </Link>
              <Link href="#partners" className="text-gray-700 hover:text-titipsini-green transition-colors font-medium">
                Mitra
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-titipsini-green transition-colors font-medium"
              >
                Testimoni
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-titipsini-green transition-colors font-medium">
                Harga
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-titipsini-green transition-colors font-medium">
                Kontak
              </Link>
              <Link href="/login">
                <Button className="bg-titipsini-green hover:bg-titipsini-green-dark text-white shadow-md hover:shadow-lg transition-all">
                  Login Admin
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link
                  href="#features"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Layanan
                </Link>
                <Link
                  href="#how-it-works"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Cara Kerja
                </Link>
                <Link
                  href="#partners"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Mitra
                </Link>
                <Link
                  href="#testimonials"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Testimoni
                </Link>
                <Link
                  href="#pricing"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Harga
                </Link>
                <Link
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-titipsini-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Kontak
                </Link>
                <div className="px-3 py-2">
                  <Link href="/login">
                    <Button className="w-full bg-titipsini-green hover:bg-titipsini-green-dark text-white">
                      Login Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
