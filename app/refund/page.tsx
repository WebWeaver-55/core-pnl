import Link from "next/link"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Refund Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 2025</p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">30-Day Money Back Guarantee</h2>
            <p className="text-gray-600 mb-6">
              We offer a 30-day money-back guarantee on all our courses and e-books. If you're not satisfied with your
              purchase, you can request a full refund within 30 days.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Request a Refund</h2>
            <p className="text-gray-600 mb-6">
              To request a refund, please contact our support team at support@corepnl.com with your order details and
              reason for the refund request.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Processing Time</h2>
            <p className="text-gray-600 mb-6">
              Refunds are typically processed within 5-7 business days after approval. The refund will be credited back
              to your original payment method.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our refund policy, please contact us at support@corepnl.com
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="text-sky-600 hover:text-sky-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
