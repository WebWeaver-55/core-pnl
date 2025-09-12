"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggleCart, cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ""
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
    document.body.style.overflow = "hidden"
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Mobile hamburger menu */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-sky-600/10 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 z-[2001]"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-[18px] relative flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-sky-600 rounded-sm transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-sky-600 rounded-sm transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-sky-600 rounded-sm transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>

          <div className="nav-brand">
            <h1 className="text-sky-600 text-2xl font-bold animate-[fadeInLeft_0.6s_ease-out]">Corepnl</h1>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-8 animate-[fadeInRight_0.6s_ease-out]">
              <a
                href="#courses"
                className="nav-link text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Courses
              </a>
              <a
                href="#ebooks"
                className="nav-link text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                E-books
              </a>
              <a
                href="#testimonials"
                className="nav-link text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Reviews
              </a>
              <Link
                href="/privacy"
                className="nav-link text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Privacy Policy
              </Link>
              <Link
                href="/refund"
                className="nav-link text-gray-800 font-medium transition-all duration-300 relative hover:text-sky-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Refund Policy
              </Link>

              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 relative z-[1001] text-gray-700"
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

              <div className="flex items-center gap-4">
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
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-[1999] transition-all duration-400 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto ${
            isMobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col py-4 max-w-6xl mx-auto">
            <a
              href="#courses"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 text-gray-800 font-medium text-lg transition-all duration-300 relative overflow-hidden border-l-4 border-transparent hover:text-sky-600 hover:bg-sky-600/5 hover:border-sky-600 hover:translate-x-2"
            >
              Courses
            </a>
            <a
              href="#ebooks"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 text-gray-800 font-medium text-lg transition-all duration-300 relative overflow-hidden border-l-4 border-transparent hover:text-sky-600 hover:bg-sky-600/5 hover:border-sky-600 hover:translate-x-2"
            >
              E-books
            </a>
            <a
              href="#testimonials"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 text-gray-800 font-medium text-lg transition-all duration-300 relative overflow-hidden border-l-4 border-transparent hover:text-sky-600 hover:bg-sky-600/5 hover:border-sky-600 hover:translate-x-2"
            >
              Reviews
            </a>
            <Link
              href="/privacy"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 text-gray-800 font-medium text-lg transition-all duration-300 relative overflow-hidden border-l-4 border-transparent hover:text-sky-600 hover:bg-sky-600/5 hover:border-sky-600 hover:translate-x-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 text-gray-800 font-medium text-lg transition-all duration-300 relative overflow-hidden border-l-4 border-transparent hover:text-sky-600 hover:bg-sky-600/5 hover:border-sky-600 hover:translate-x-2"
            >
              Refund Policy
            </Link>
          </div>
          <div className="flex flex-col gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="py-3.5 px-6 rounded-xl text-sky-600 border-2 border-sky-600 bg-white font-semibold text-center transition-all duration-300 hover:bg-sky-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-600/30"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={closeMobileMenu}
              className="py-3.5 px-6 rounded-xl bg-sky-600 text-white border-2 border-sky-600 font-semibold text-center transition-all duration-300 hover:bg-sky-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-600/40"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 z-[1998] transition-all duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
