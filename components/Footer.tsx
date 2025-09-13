import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false)

  const TermsAndConditions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Terms & Conditions</h2>
          <button 
            onClick={() => setShowTerms(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 mb-4"><strong>Last Updated:</strong> January 1, 2025</p>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1. Acceptance of Terms</h3>
          <p className="text-gray-700 mb-4">
            By accessing and using Corepnl's services, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">2. Services Description</h3>
          <p className="text-gray-700 mb-4">
            Corepnl provides digital services including but not limited to web development, software solutions, consulting, 
            and technical support. We reserve the right to modify, suspend, or discontinue any service at any time without notice.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3. User Responsibilities</h3>
          <ul className="text-gray-700 mb-4 ml-4">
            <li>• Provide accurate and complete information when required</li>
            <li>• Use our services in compliance with applicable laws and regulations</li>
            <li>• Not engage in any activity that could harm or disrupt our services</li>
            <li>• Maintain the confidentiality of any account credentials</li>
            <li>• Notify us immediately of any unauthorized use of your account</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">4. Payment Terms</h3>
          <p className="text-gray-700 mb-4">
            Payment terms will be specified in individual service agreements. Unless otherwise stated, payments are due within 
            30 days of invoice date. Late payments may incur additional fees. We reserve the right to suspend services for 
            non-payment.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">5. Intellectual Property</h3>
          <p className="text-gray-700 mb-4">
            All content, trademarks, and intellectual property on our platform remain the property of Corepnl or our licensors. 
            Custom work created for clients will be governed by separate agreements. Users may not reproduce, distribute, or 
            create derivative works without explicit permission.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">6. Privacy and Data Protection</h3>
          <p className="text-gray-700 mb-4">
            We are committed to protecting your privacy. Personal information collected will be used solely for providing our 
            services and will not be shared with third parties except as required by law or with your explicit consent. 
            Please refer to our Privacy Policy for detailed information.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">7. Limitation of Liability</h3>
          <p className="text-gray-700 mb-4">
            Corepnl shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss 
            of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
            intangible losses resulting from your use of our services.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">8. Service Availability</h3>
          <p className="text-gray-700 mb-4">
            While we strive to maintain high availability, we do not guarantee uninterrupted service. Maintenance, updates, 
            or unforeseen circumstances may cause temporary service interruptions. We will make reasonable efforts to notify 
            users of planned maintenance.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">9. Termination</h3>
          <p className="text-gray-700 mb-4">
            Either party may terminate services with appropriate notice as specified in individual agreements. Upon termination, 
            your right to use our services will cease immediately. Provisions that should survive termination will remain in effect.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">10. Dispute Resolution</h3>
          <p className="text-gray-700 mb-4">
            Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of 
            the American Arbitration Association. The arbitration will be conducted in English and the decision will be final 
            and binding.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">11. Force Majeure</h3>
          <p className="text-gray-700 mb-4">
            Corepnl will not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, 
            including but not limited to acts of God, natural disasters, war, terrorism, strikes, or government actions.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">12. Modifications</h3>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our 
            website. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">13. Governing Law</h3>
          <p className="text-gray-700 mb-4">
            These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any legal action 
            must be brought within one year after the claim arose.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">14. Contact Information</h3>
          <p className="text-gray-700 mb-4">
            For questions about these Terms & Conditions, please contact us at:
          </p>
          <div className="text-gray-700 mb-4">
            <p><strong>Email:</strong> Atullakra9100@gmail.com</p>
            <p><strong>Phone:</strong> +1 (787) 303-9920</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">15. Severability</h3>
          <p className="text-gray-700 mb-4">
            If any provision of these terms is found to be unenforceable or invalid, the remaining provisions will continue 
            to be valid and enforceable to the fullest extent permitted by law.
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <button 
            onClick={() => setShowTerms(false)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Contact Information Section */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-sky-400 mb-4">Contact Us</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+17873039920" className="hover:text-sky-400 transition-colors">
                  +1 (782) 303-9920
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:Atullakra9100@gmail.com" className="hover:text-sky-400 transition-colors">
                  Atullakra9100@gmail.com
                </a>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-700 mb-6"></div>
          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              &copy; 2025 Corepnl. All rights reserved.
            </p>
            
            {/* Policy Links */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-500">•</span>
              <Link 
                href="/refund" 
                className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
              >
                Refund Policy
              </Link>
              <span className="text-gray-500">•</span>
              <button 
                onClick={() => setShowTerms(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors hover:underline cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Terms & Conditions Modal */}
      {showTerms && <TermsAndConditions />}
    </>
  )
}
