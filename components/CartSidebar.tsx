"use client"

import { useCart } from "@/contexts/CartContext"

export default function CartSidebar() {
  const { cart, removeFromCart, isCartOpen, toggleCart, cartTotal } = useCart()

  const handleCheckout = () => {
    if (cart.length === 0) {
      const notification = document.createElement("div")
      notification.className = "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium"
      notification.textContent = "Your cart is empty!"
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 4000)
      return
    }

    const notification = document.createElement("div")
    notification.className = "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium"
    notification.textContent = `Checkout - Total: $${cartTotal}. Redirecting to payment...`
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
      // Simulate successful checkout
      cart.forEach((item) => removeFromCart(item.id))
      toggleCart()

      const successNotification = document.createElement("div")
      successNotification.className =
        "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-green-500 text-white font-medium"
      successNotification.textContent = "Order placed successfully!"
      document.body.appendChild(successNotification)
      setTimeout(() => successNotification.remove(), 4000)
    }, 2000)
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-[2000] transition-transform duration-400 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Shopping Cart</h3>
          <button onClick={toggleCart} className="text-2xl hover:bg-gray-100 p-2 rounded-lg transition-colors">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center mb-6 gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-gray-800">{item.title}</h4>
                  <div className="font-bold text-sky-600">${item.price}</div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl transition-colors"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between mb-4 font-semibold text-lg">
            <span>Total:</span>
            <span>${cartTotal}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-sky-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-sky-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-600/30"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isCartOpen && <div className="fixed inset-0 bg-black/20 z-[1999]" onClick={toggleCart} />}
    </>
  )
}
