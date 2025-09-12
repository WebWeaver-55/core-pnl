export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "The options trading course completely changed my approach.",
      author: "Sarah M.",
      stars: 5,
    },
    {
      id: 2,
      text: "Clear explanations and practical strategies.",
      author: "Mike R.",
      stars: 5,
    },
    {
      id: 3,
      text: "Professional content that actually works in real markets.",
      author: "Lisa K.",
      stars: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-200"
            >
              <div className="text-amber-500 text-xl mb-4">{"★".repeat(testimonial.stars)}</div>
              <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-600">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
