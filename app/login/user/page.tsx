"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// Type definitions
interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  preview_url?: string;
  file_url?: string;
}

interface Ebook {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  preview_url?: string;
  file_url?: string;
}

interface CartItem extends Course {
  type: 'course' | 'ebook';
}

interface Purchase {
  id?: number;
  user_id: string;
  course_id?: number | null;
  product_id?: number | null;
  purchase_date: string;
  price_paid: number;
}

interface User {
  id: string;
  email?: string;
}

const TradingPlatform: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<Purchase[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses'>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    fetchContent();
  }, []);

  const checkUser = async (): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user as User);
        await fetchPurchases(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const TermsAndConditions = (): JSX.Element => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
  );

  const fetchContent = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Fetch courses from courses table - Fixed to include image_url
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('id, title, description, price, image_url, preview_url, file_url');
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        setCourses([]);
      } else {
        console.log('Courses fetched:', coursesData);
        setCourses(coursesData as Course[] || []);
      }
      
      // Fetch ebooks from products table - Fixed to include image_url
      const { data: ebooksData, error: ebooksError } = await supabase
        .from('products')
        .select('id, title, description, price, image_url, preview_url, file_url');
      
      if (ebooksError) {
        console.error('Error fetching ebooks:', ebooksError);
        setEbooks([]);
      } else {
        console.log('Ebooks fetched:', ebooksData);
        setEbooks(ebooksData as Ebook[] || []);
      }
      
    } catch (error) {
      console.error('Error in fetchContent:', error);
      setCourses([]);
      setEbooks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async (userId: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching purchases:', error);
        setPurchasedItems([]);
      } else {
        console.log('Purchases fetched:', data);
        setPurchasedItems(data as Purchase[] || []);
      }
    } catch (error) {
      console.error('Error in fetchPurchases:', error);
      setPurchasedItems([]);
    }
  };

  const addToCart = (item: Course | Ebook, itemType: 'course' | 'ebook'): void => {
    const cartItem: CartItem = { ...item, type: itemType } as CartItem;
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.type === itemType);
    
    if (!existingItem && !isPurchased(item.id, itemType)) {
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeFromCart = (itemId: number, itemType: 'course' | 'ebook'): void => {
    setCartItems(cartItems.filter(item => !(item.id === itemId && item.type === itemType)));
  };

  const isPurchased = (itemId: number, itemType: 'course' | 'ebook'): boolean => {
    return purchasedItems.some((purchase: Purchase) => {
      if (itemType === 'course') {
        return purchase.course_id === itemId;
      } else {
        return purchase.product_id === itemId;
      }
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price || 0);
  };

  const openPreview = (url: string): void => {
    if (url) {
      setPreviewUrl(url);
    } else {
      alert('Preview not available for this item');
    }
  };

  const closePreview = (): void => {
    setPreviewUrl(null);
  };

  const checkout = async (): Promise<void> => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      // For demo purposes, we'll simulate a purchase
      const purchases: Omit<Purchase, 'id'>[] = cartItems.map((item: CartItem) => ({
        user_id: user?.id || 'demo-user-' + Date.now(),
        course_id: item.type === 'course' ? item.id : null,
        product_id: item.type === 'ebook' ? item.id : null,
        purchase_date: new Date().toISOString(),
        price_paid: item.price || 0
      }));

      // If user exists, insert to database, otherwise simulate purchase
      if (user) {
        const { error } = await supabase
          .from('user_purchases')
          .insert(purchases);

        if (error) {
          console.error('Purchase error:', error);
          alert('Purchase failed: ' + error.message);
          return;
        }
        await fetchPurchases(user.id);
      } else {
        // Simulate purchase for demo
        setPurchasedItems([...purchasedItems, ...purchases as Purchase[]]);
      }

      setCartItems([]);
      setCartOpen(false);
      alert('Purchase successful! Check "My Courses" to access your content.');
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Purchase failed: ' + (error as Error).message);
    }
  };

  const getPurchasedCourses = (): Course[] => {
    const purchasedCourseIds = purchasedItems
      .filter((item: Purchase) => item.course_id)
      .map((item: Purchase) => item.course_id as number);
    
    return courses.filter((course: Course) => purchasedCourseIds.includes(course.id));
  };

  const getPurchasedEbooks = (): Ebook[] => {
    const purchasedEbookIds = purchasedItems
      .filter((item: Purchase) => item.product_id)
      .map((item: Purchase) => item.product_id as number);
    
    return ebooks.filter((ebook: Ebook) => purchasedEbookIds.includes(ebook.id));
  };

  const cartTotal = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price || 0), 0);

  const renderCourseCard = (course: Course, isPurchasedItem: boolean = false): JSX.Element => (
    <div key={`${course.id}-${isPurchasedItem ? 'purchased' : 'available'}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={course.image_url || '/api/placeholder/400/250'} 
          alt={course.title} 
          className="w-full h-48 object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80';
          }}
        />
        <div className="absolute top-4 right-4 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}>
          COURSE
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold" style={{ color: 'rgba(30, 58, 138, 0.95)' }}>{formatPrice(course.price)}</span>
          <div className="text-sm text-gray-500">
            Video Course
          </div>
        </div>
        
        {/* Preview Button - Always visible */}
        <div className="mb-3">
          <button
            onClick={() => openPreview(course.preview_url || '')}
            disabled={!course.preview_url}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>👁️</span>
            <span>{course.preview_url ? 'Preview Course' : 'Preview Not Available'}</span>
          </button>
        </div>

        {isPurchasedItem ? (
          <button 
            onClick={() => course.file_url && window.open(course.file_url, '_blank')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            disabled={!course.file_url}
          >
            <span>▶️</span>
            <span>{course.file_url ? 'Access Course' : 'Course Unavailable'}</span>
          </button>
        ) : isPurchased(course.id, 'course') ? (
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>✓</span>
            <span>Purchased</span>
          </button>
        ) : (
          <button
            onClick={() => addToCart(course, 'course')}
            className="w-full text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            style={{ background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' }}
          >
            <span>🛒</span>
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );

  const renderEbookCard = (ebook: Ebook, isPurchasedItem: boolean = false): JSX.Element => (
    <div key={`${ebook.id}-${isPurchasedItem ? 'purchased' : 'available'}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={ebook.image_url || '/api/placeholder/300/400'} 
          alt={ebook.title} 
          className="w-full h-48 object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80';
          }}
        />
        <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
          E-BOOK
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{ebook.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{ebook.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-purple-600">{formatPrice(ebook.price)}</span>
          <div className="text-sm text-gray-500">
            PDF Guide
          </div>
        </div>
        
        {/* Preview Button - Always visible */}
        <div className="mb-3">
          <button
            onClick={() => openPreview(ebook.preview_url || '')}
            disabled={!ebook.preview_url}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>👁️</span>
            <span>{ebook.preview_url ? 'Preview E-book' : 'Preview Not Available'}</span>
          </button>
        </div>

        {isPurchasedItem ? (
          <button 
            onClick={() => ebook.file_url && window.open(ebook.file_url, '_blank')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            disabled={!ebook.file_url}
          >
            <span>📥</span>
            <span>{ebook.file_url ? 'Download PDF' : 'File Unavailable'}</span>
          </button>
        ) : isPurchased(ebook.id, 'ebook') ? (
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>✓</span>
            <span>Purchased</span>
          </button>
        ) : (
          <button
            onClick={() => addToCart(ebook, 'ebook')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>🛒</span>
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`w-full h-0.5 bg-gray-700 block transition-all ${mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-700 block transition-all ${mobileNavOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-700 block transition-all ${mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>

            {/* Brand */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Corepnl
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                style={activeTab === 'all' ? { background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' } : { color: 'rgba(30, 58, 138, 0.95)' }}
              >
                All Content
              </button>
              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'my-courses' 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                style={activeTab === 'my-courses' ? { background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' } : { color: 'rgba(30, 58, 138, 0.95)' }}
              >
                My Courses
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              style={{ color: 'rgba(30, 58, 138, 0.95)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V7a2 2 0 012-2h4a2 2 0 012 2v12" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileNavOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => { setActiveTab('all'); setMobileNavOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 transition-colors"
                  style={{ color: 'rgba(30, 58, 138, 0.95)' }}
                >
                  All Content
                </button>
                <button
                  onClick={() => { setActiveTab('my-courses'); setMobileNavOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 transition-colors"
                  style={{ color: 'rgba(30, 58, 138, 0.95)' }}
                >
                  My Courses
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-white py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Master Trading with Corepnl
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Professional courses and e-books to elevate your trading skills to the next level
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">📈</span>
              <span>Expert Strategies</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">🎯</span>
              <span>Risk Management</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">💡</span>
              <span>Real-World Examples</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('all')}
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg transform hover:scale-105 shadow-lg"
            style={{ color: 'rgba(30, 58, 138, 0.95)' }}
          >
            Start Learning →
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* All Content Tab */}
        {activeTab === 'all' && (
          <>
            {/* Courses Section */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trading Courses
              </h2>
              <p className="text-gray-600 text-center mb-12 text-lg max-w-2xl mx-auto">
                Comprehensive video courses with step-by-step strategies from industry experts
              </p>
              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No courses available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course: Course) => renderCourseCard(course))}
                </div>
              )}
            </section>

            {/* E-books Section */}
            <section>
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Trading E-books
              </h2>
              <p className="text-gray-600 text-center mb-12 text-lg max-w-2xl mx-auto">
                In-depth guides and reference materials for serious traders
              </p>
              {ebooks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No e-books available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ebooks.map((ebook: Ebook) => renderEbookCard(ebook))}
                </div>
              )}
            </section>
          </>
        )}

        {/* My Courses Tab */}
        {activeTab === 'my-courses' && (
          <section>
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Learning Dashboard
            </h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              Access your purchased courses and e-books
            </p>

            {/* My Courses */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">My Courses</h3>
              {getPurchasedCourses().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-500 text-lg mb-4">You haven't purchased any courses yet.</p>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    style={{ background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' }}
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getPurchasedCourses().map((course: Course) => renderCourseCard(course, true))}
                </div>
              )}
            </div>

            {/* My E-books */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-800">My E-books</h3>
              {getPurchasedEbooks().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="text-gray-500 text-lg mb-4">You haven't purchased any e-books yet.</p>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Browse E-books
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getPurchasedEbooks().map((ebook: Ebook) => renderEbookCard(ebook, true))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', text: 'The options trading course completely changed my approach to the markets.', rating: 5 },
              { name: 'Mike R.', text: 'Clear explanations and practical strategies that actually work.', rating: 5 },
              { name: 'Lisa K.', text: 'Professional content that delivers real results in live trading.', rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-yellow-400 mb-4 text-lg">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">- {testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 Corepnl. All rights reserved. |{' '}
            <a href="/privacy" className="text-blue-400 hover:underline transition-colors">Privacy Policy</a> |{' '}
            <a href="/refund" className="text-gray-400 hover:text-gray-300 transition-colors">Refund Policy</a> |{' '}
            <button 
              onClick={() => setShowTerms(true)}
              className="text-blue-400 hover:text-blue-300 transition-colors hover:underline cursor-pointer"
            >
              Terms & Conditions
            </button>
          </p>
        </div>
      </footer>

      {/* Terms Modal */}
      {showTerms && <TermsAndConditions />}

      {/* Preview Modal - Updated for better PDF handling */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] w-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">Document Preview</h3>
              <button 
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold px-2"
              >
                ×
              </button>
            </div>
            <div className="relative" style={{ height: 'calc(95vh - 80px)' }}>
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                title="Document Preview"
                onError={() => {
                  console.error('Failed to load preview');
                  alert('Preview could not be loaded. The file might be corrupted or inaccessible.');
                  closePreview();
                }}
                onLoad={() => {
                  console.log('Preview loaded successfully');
                }}
              />
              {/* Fallback message */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 pointer-events-none">
                <p>Loading preview...</p>
                <p className="text-sm mt-2">If preview doesn't load, <button onClick={() => window.open(previewUrl, '_blank')} className="text-blue-500 underline pointer-events-auto">click here to open in new tab</button></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Cart Sidebar - Fixed transparent/blur background */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50" onClick={() => setCartOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex justify-between items-center p-6 border-b bg-white/90 backdrop-blur-sm text-white" style={{ background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' }}>
                <h3 className="text-xl font-bold">Shopping Cart</h3>
                <button 
                  onClick={() => setCartOpen(false)} 
                  className="text-white hover:text-gray-200 text-2xl p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 bg-white/90 backdrop-blur-sm">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">Add some courses or e-books to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item: CartItem) => (
                      <div key={`${item.id}-${item.type}`} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            <div className="flex items-center mt-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                item.type === 'course' ? 'text-white' : 'bg-purple-100 text-purple-800'
                              }`}
                              style={item.type === 'course' ? { backgroundColor: 'rgba(30, 58, 138, 0.95)' } : {}}
                              >
                                {item.type === 'course' ? '🎥 Course' : '📚 E-book'}
                              </span>
                              <span className="ml-2 font-bold text-lg text-gray-900">{formatPrice(item.price)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.type)}
                            className="text-red-500 hover:text-red-700 ml-4 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t bg-white/90 backdrop-blur-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={checkout}
                      className="w-full text-white py-4 px-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      style={{ background: 'linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.8))' }}
                    >
                      🚀 Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingPlatform;
