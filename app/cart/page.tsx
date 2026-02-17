"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, updateQuantity, totalPrice } = useCart();

  // Calculations
  const DELIVERY_FEE = 4.99;
  const TAX_RATE = 0.08;
  const taxes = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + taxes + (totalPrice > 0 ? DELIVERY_FEE : 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center font-sans bg-background-light dark:bg-background-dark text-text-main dark:text-white">
        <div className="size-24 bg-gray-100 dark:bg-[#33181c] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-gray-400">shopping_cart_off</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/menu" className="bg-primary hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181112] dark:text-white min-h-screen flex flex-col font-sans">
      
      {/* Header (Simplified for Checkout flow) */}
      {/* <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors hover:bg-primary/20">
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hidden sm:flex">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <h2 className="text-[#181112] dark:text-white text-xl md:text-2xl font-extrabold tracking-tight">Checkout</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">Step 2 of 3</div>
            <div className="flex gap-1">
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </header> */}

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery Address Section */}
            <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#452026] overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-[#452026] flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </span>
                  Delivery Address
                </h3>
                <button className="text-primary text-sm font-semibold hover:underline">Edit</button>
              </div>
              <div className="p-6">
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6 relative overflow-hidden group">
                  {/* Static Map Image Placeholder */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      [Map Placeholder]
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                    <input className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white outline-none" readOnly type="text" value="123 Delicious Ave, Foodie City"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Apartment / Suite</label>
                    <input className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md outline-none" placeholder="Apt 4B" type="text"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Delivery Instructions</label>
                    <input className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md outline-none" placeholder="Leave at door, ring bell..." type="text"/>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method Section */}
            <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#452026] overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-[#452026]">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">payments</span>
                  </span>
                  Payment Method
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4 p-1 bg-gray-100 dark:bg-[#221013] rounded-xl overflow-x-auto hide-scrollbar">
                  <button className="flex-1 min-w-[120px] py-2.5 px-4 rounded-lg bg-white dark:bg-[#33181c] text-primary shadow-sm font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 dark:border-[#452026] transition-all">
                    <span className="material-symbols-outlined">credit_card</span> Credit Card
                  </button>
                  <button className="flex-1 min-w-[120px] py-2.5 px-4 rounded-lg text-gray-500 dark:text-gray-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/50 dark:hover:bg-[#33181c]/50 transition-all">
                    <span className="material-symbols-outlined">account_balance_wallet</span> PayPal
                  </button>
                  <button className="flex-1 min-w-[120px] py-2.5 px-4 rounded-lg text-gray-500 dark:text-gray-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/50 dark:hover:bg-[#33181c]/50 transition-all">
                    <span className="material-symbols-outlined">attach_money</span> Cash
                  </button>
                </div>
                
                {/* Credit Card Form */}
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                    <div className="relative">
                      <input className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md font-mono outline-none" placeholder="0000 0000 0000 0000" type="text"/>
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">credit_card</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                      <input className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md font-mono text-center outline-none" placeholder="MM/YY" type="text"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">CVC</label>
                      <div className="relative">
                        <input className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md font-mono text-center outline-none" placeholder="123" type="text"/>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg cursor-help">help</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                    <input className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white transition-shadow focus:shadow-md outline-none" placeholder="John Doe" type="text"/>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" id="save-card" type="checkbox"/>
                    <label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer" htmlFor="save-card">Save this card for future orders</label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-xl border border-gray-100 dark:border-[#452026] overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-gray-100 dark:border-[#452026]">
                  <h3 className="text-xl font-extrabold text-[#181112] dark:text-white">Order Summary</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">from <span className="font-bold text-gray-800 dark:text-gray-200">FoodOrder</span></p>
                </div>
                
                {/* DYNAMIC CART ITEMS */}
                <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="size-16 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0">
                        <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[#181112] dark:text-white text-sm">{item.name}</h4>
                          <span className="font-bold text-[#181112] dark:text-white text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2 truncate max-w-[150px]">Quantity: {item.quantity}</p>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg h-7">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 rounded-l-lg transition-colors">-</button>
                            <span className="px-2 text-xs font-bold text-[#181112] dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 rounded-r-lg transition-colors">+</button>
                          </div>
                          {/* We could add a remove function here, currently handled by quantity 0 */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6">
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                </div>

                <div className="p-6 space-y-3 bg-gray-50/50 dark:bg-[#2a1418]">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${taxes.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-2 pb-2">
                    <div className="flex gap-2">
                      <input className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#221013] border-gray-200 dark:border-[#452026] focus:border-primary focus:ring-primary dark:text-white outline-none" placeholder="Promo code" type="text"/>
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white text-sm font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Apply</button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
                    <span className="text-base font-bold text-[#181112] dark:text-white">Total</span>
                    <span className="text-2xl font-extrabold text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-6 pt-0 bg-gray-50/50 dark:bg-[#2a1418]">
                  <button className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group">
                    <span>Place Order</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </section>

              <div className="flex items-center justify-center gap-4 text-gray-400 grayscale opacity-70">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-2xl">lock</span>
                  <span className="text-[10px] font-bold mt-1">SECURE</span>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                  <span className="text-[10px] font-bold mt-1">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}