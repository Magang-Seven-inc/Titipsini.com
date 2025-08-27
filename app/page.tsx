import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Partners } from "@/components/landing/partners"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { Contact } from "@/components/landing/contact"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Partners />
      <Testimonials />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </div>
  )
}
