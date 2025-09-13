"use client"

import { useEffect } from "react"
import ProductCard from "./ProductCard"

const courses = [
  {
    id: 1,
    title: "Options Trading Mastery",
    description: "Learn advanced options strategies and risk management techniques",
    price: 99,
    image: "https://bwllkodhqrfuijhtucsf.supabase.co/storage/v1/object/public/AllPdf/img3.jpg",
    type: "course" as const,
    video: "https://example.com/course1-preview.mp4",
  },
  {
    id: 2,
    title: "Forex Trading Fundamentals",
    description: "Master currency trading with proven strategies and analysis",
    price: 149,
    image: "https://bwllkodhqrfuijhtucsf.supabase.co/storage/v1/object/public/AllPdf/img2.jpg",
    type: "course" as const,
    video: "https://example.com/course2-preview.mp4",
  },
  {
    id: 3,
    title: "Technical Analysis Complete",
    description: "Comprehensive guide to chart patterns and indicators",
    price: 99,
    image: "https://bwllkodhqrfuijhtucsf.supabase.co/storage/v1/object/public/AllPdf/img1.jpg",
    type: "course" as const,
    video: "https://example.com/course3-preview.mp4",
  },
]

export default function CoursesSection() {
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
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Trading Courses</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comprehensive video courses with step-by-step strategies
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {courses.map((course) => (
            <ProductCard key={course.id} product={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
