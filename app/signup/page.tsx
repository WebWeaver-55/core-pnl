"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error")
      return
    }

    if (!name.trim()) {
      showNotification("Name is required", "error")
      return
    }

    if (!address.trim()) {
      showNotification("Address is required", "error")
      return
    }

    setIsLoading(true)

    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single()

      if (existingUser) {
        showNotification("User with this email already exists", "error")
        setIsLoading(false)
        return
      }

      // Insert user data into your existing users table (password stored as plain text)
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            fullname: name,
            email: email,
            address: address,
            password: password, // Storing password as plain text
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        console.error('Signup error:', error)
        showNotification(error.message || "Failed to create account", "error")
      } else {
        showNotification("Account created successfully!", "success")
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      }
    } catch (error) {
      console.error('Signup error:', error)
      showNotification("An error occurred during signup", "error")
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
          <h2 className="text-xl font-semibold mb-1">Create Account</h2>
          <p className="text-sm text-blue-100">Join us to start your trading journey</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-blue-50">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/15 text-white text-sm transition-all duration-300 focus:border-sky-300 focus:bg-white/25 focus:outline-none placeholder-white/70"
              placeholder="Enter your full name"
            />
          </div>
          
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
            <label htmlFor="address" className="block mb-2 text-sm text-blue-50">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/15 text-white text-sm transition-all duration-300 focus:border-sky-300 focus:bg-white/25 focus:outline-none placeholder-white/70 resize-none"
              placeholder="Enter your address"
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
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm text-blue-50">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/15 text-white text-sm transition-all duration-300 focus:border-sky-300 focus:bg-white/25 focus:outline-none placeholder-white/70"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-900 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-300">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
              Sign in
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