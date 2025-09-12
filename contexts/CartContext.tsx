"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  isCartOpen: boolean
  toggleCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      showNotification("Item already in cart!", "warning")
      return
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }])
    showNotification("Added to cart!", "success")
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    showNotification("Item removed from cart", "info")
  }

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const cartCount = cart.length
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const showNotification = (message: string, type: "success" | "warning" | "info" | "error" = "info") => {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
      type === "success"
        ? "bg-green-500"
        : type === "warning"
          ? "bg-yellow-500"
          : type === "error"
            ? "bg-red-500"
            : "bg-blue-500"
    }`
    notification.textContent = message
    notification.onclick = () => notification.remove()

    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 4000)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isCartOpen,
        toggleCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
