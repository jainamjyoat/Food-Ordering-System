"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, totalPrice } = useCart();

  const DELIVERY_FEE = 4.99;
  const TAX_RATE = 0.08;
  const taxes = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + taxes + (totalPrice > 0 ? DELIVERY_FEE : 0);

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center font-sans">
        <div className="size-24 bg-gray-100 dark:bg-[#33181c] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-gray-400">shopping_cart_off</span>
        </div>
        <h2 className="text-2xl font-bold text-[#181112] dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/menu" className="bg-primary hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <h1 className="text-3xl font-black text-[#181112] dark:text-white mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] rounded-xl shadow-sm">
              <div className="size-20 shrink-0 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#181112] dark:text-white truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg h-9 bg-gray-50 dark:bg-[#221013]">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 h-full hover:bg-gray-200 dark:hover:bg-[#452026] text-gray-500 dark:text-gray-300 transition-colors rounded-l-lg"
                >
                  <span className="material-symbols-outlined text-xs">remove</span>
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#181112] dark:text-white">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 h-full hover:bg-gray-200 dark:hover:bg-[#452026] text-gray-500 dark:text-gray-300 transition-colors rounded-r-lg"
                >
                  <span className="material-symbols-outlined text-xs">add</span>
                </button>
              </div>
              <div className="text-right min-w-[70px]">
                <p className="font-bold text-[#181112] dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white dark:bg-[#33181c] p-6 rounded-xl border border-gray-100 dark:border-[#452026] shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-[#181112] dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Delivery Fee</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Taxes (8%)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#181112] dark:text-white">Total</span>
                <span className="font-black text-xl text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-red-600 text-white font-bold h-12 rounded-lg shadow-lg shadow-primary/20 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}