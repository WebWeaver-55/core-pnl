"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const showNotification = (message: string, type: "success" | "error") => {
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    } text-white font-medium`
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 4000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check if user exists and get user data - using 'password' column name
      const { data: user, error } = await supabase
        .from('users')
        .select('email, password')
        .eq('email', email)
        .single()

      if (error || !user) {
        showNotification("Invalid email or password", "error")
        setIsLoading(false)
        return
      }

      // Check if password matches (plain text comparison)
      if (user.password !== password) {
        showNotification("Invalid email or password", "error")
        setIsLoading(false)
        return
      }

      // Login successful
      showNotification("Login successful!", "success")
      
      // Store user session data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email
      }))

      // Redirect to user page (since no role checking)
      setTimeout(() => {
        router.push('login/user')
      }, 1000)

    } catch (error) {
      console.error('Login error:', error)
      showNotification("An error occurred during login", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-5">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          alt="Trading Background"
          className="w-full h-full object-cover brightness-60 saturate-120"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/70 to-sky-900/85" />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 max-w-md w-full shadow-2xl text-white animate-[fadeIn_0.8s_ease]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Corepnl</h1>
          <h2 className="text-xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm text-blue-100">Sign in to access your courses</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-blue-50">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/15 text-white text-sm transition-all duration-300 focus:border-sky-300 focus:bg-white/25 focus:outline-none placeholder-white/70"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-blue-50">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/15 text-white text-sm transition-all duration-300 focus:border-sky-300 focus:bg-white/25 focus:outline-none placeholder-white/70"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-900 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-300">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
