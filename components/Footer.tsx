import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="max-w-6xl mx-auto px-4">
        <p>
          &copy; 2025 Corepnl. All rights reserved. |{" "}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/refund" className="text-gray-400 hover:text-gray-300 transition-colors">
            Refund Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}
