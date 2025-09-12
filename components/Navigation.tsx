"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleCart, cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Mobile Sign In/Sign Up */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg text-sky-600 border-2 border-sky-600 bg-white font-medium transition-all duration-300 hover:bg-sky-600 hover:text-white text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg bg-sky-600 text-white border-2 border-sky-600 font-medium transition-all duration-300 hover:bg-sky-700 text-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Brand */}
        <div className="nav-brand">
          <h1 className="text-sky-600 text-2xl font-bold animate-[fadeInLeft_0.6s_ease-out]">
            Corepnl
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 animate-[fadeInRight_0.6s_ease-out]">
          <a
            href="#courses"
            className="text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Courses
          </a>
          <a
            href="#ebooks"
            className="text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            E-books
          </a>
          <a
            href="#testimonials"
            className="text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Reviews
          </a>
          <Link
            href="/privacy"
            className="text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund"
            className="text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Refund Policy
          </Link>

          {/* Cart */}
          <div className="relative">
            <button
              onClick={toggleCart}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 text-gray-700"
              aria-label="Shopping cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Sign In/Up */}
          <Link
            href="/login"
            className="px-6 py-2 rounded-lg text-sky-600 border-2 border-sky-600 bg-white font-medium transition-all duration-300 hover:bg-sky-600 hover:text-white hover:-translate-y-0.5"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 rounded-lg bg-sky-600 text-white border-2 border-sky-600 font-medium transition-all duration-300 hover:bg-sky-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-600/30"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
