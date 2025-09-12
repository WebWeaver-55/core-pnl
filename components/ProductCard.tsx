"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  type: "course" | "ebook"
  video?: string
  preview?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.type === "course" && product.video) {
      // Open video preview
      window.open(product.video, "_blank")
    } else if (product.type === "ebook" && product.preview) {
      // Open PDF preview
      window.open(product.preview, "_blank")
    } else {
      // Fallback notification
      const notification = document.createElement("div")
      notification.className =
        "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium transition-all duration-300"
      notification.textContent = `Preview: ${product.title} - ${product.description}`
      notification.onclick = () => notification.remove()

      document.body.appendChild(notification)

      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 4000)
    }
  }

  return (
    <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative group">
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-6 relative z-20">
        <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          {product.type}
        </span>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
        <div className="text-2xl font-bold text-sky-600 mb-4">${product.price}</div>
        <div className="flex gap-2">
          <button
            onClick={handlePreview}
            className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200 hover:bg-gray-200 hover:border-gray-400"
          >
            Preview
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-1 border-none px-3 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden ${
              isAdded ? "bg-green-500 text-white" : "bg-sky-600 text-white hover:bg-sky-700 hover:-translate-y-0.5"
            }`}
          >
            {isAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}
