export default function Hero() {
  return (
    <section className="hero-section relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-16 px-4 text-center bg-slate-800">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl animate-[fadeInUp_0.8s_ease-out]">
          Master Trading with Corepnl
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white font-normal drop-shadow-lg animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          Professional courses and e-books to elevate your trading skills
        </p>
        <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
          <div className="flex items-center gap-2 text-white font-medium bg-slate-900 px-4 md:px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <span className="text-lg">📈</span>
            <span>Expert Strategies</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium bg-slate-900 px-4 md:px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <span className="text-lg">🎯</span>
            <span>Risk Management</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium bg-slate-900 px-4 md:px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <span className="text-lg">💡</span>
            <span>Real-World Examples</span>
          </div>
        </div>
        <a
          href="#courses"
          className="inline-flex items-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-full text-lg font-semibold cursor-pointer transition-all duration-400 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 animate-[fadeInUp_1s_ease-out_0.6s_both]"
        >
          Start Learning →
        </a>
      </div>
    </section>
  )
}
