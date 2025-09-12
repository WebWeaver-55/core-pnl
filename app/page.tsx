"use client"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import CoursesSection from "@/components/CoursesSection"
import EbooksSection from "@/components/EbooksSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import Footer from "@/components/Footer"
import CartSidebar from "@/components/CartSidebar"
import { CartProvider } from "@/contexts/CartContext"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Hero />
        <CoursesSection />
        <EbooksSection />
        <TestimonialsSection />
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  )
}
