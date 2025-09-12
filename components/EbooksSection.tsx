"use client"

import { useEffect } from "react"
import ProductCard from "./ProductCard"

const ebooks = [
  {
    id: 4,
    title: "Day Trading Psychology",
    description: "Mental strategies for consistent profitable trading",
    price: 49,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook1-preview.pdf",
  },
  {
    id: 5,
    title: "Risk Management Guide",
    description: "Essential risk management principles for traders",
    price: 39,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook2-preview.pdf",
  },
  {
    id: 6,
    title: "Market Analysis Handbook",
    description: "Complete guide to fundamental and technical analysis",
    price: 59,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook3-preview.pdf",
  },
  {
    id: 7,
    title: "Crypto Trading Strategies",
    description: "Modern approaches to cryptocurrency trading",
    price: 79,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook4-preview.pdf",
  },
  {
    id: 8,
    title: "Advanced Trading Techniques",
    description: "Professional-level strategies for experienced traders",
    price: 89,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook5-preview.pdf",
  },
  {
    id: 9,
    title: "Market Psychology",
    description: "Understanding market sentiment and behavioral patterns",
    price: 69,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    type: "ebook" as const,
    preview: "https://example.com/ebook6-preview.pdf",
  },
]

export default function EbooksSection() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="ebooks" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Trading E-books</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          In-depth guides and reference materials for traders
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {ebooks.map((ebook) => (
            <ProductCard key={ebook.id} product={ebook} />
          ))}
        </div>
      </div>
    </section>
  )
}
