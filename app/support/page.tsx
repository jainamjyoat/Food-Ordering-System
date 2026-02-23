"use client";
import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100">
      
      {/* Hero Search Section */}
      <section className="relative py-20 overflow-hidden bg-white dark:bg-surface-dark border-b border-neutral-light dark:border-neutral-dark">
        {/* Glow Effects (Hidden in Light Mode for cleaner look, visible in Dark Mode) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none hidden dark:block">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-10">
            Search for articles, orders, or delivery issues...
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-50 dark:bg-background-dark border border-neutral-light dark:border-neutral-dark rounded-xl p-2 shadow-xl focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <span className="material-symbols-outlined text-gray-400 px-4">search</span>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 text-lg py-3 outline-none" 
                placeholder="Describe your issue (e.g., 'where is my order?')" 
                type="text"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-all cursor-pointer shadow-lg shadow-primary/20">
                Search
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <span>Popular:</span>
            <Link href="#" className="hover:text-primary transition-colors">Refund policy</Link>,
            <Link href="#" className="hover:text-primary transition-colors">Late delivery</Link>,
            <Link href="#" className="hover:text-primary transition-colors">Update address</Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Order Tracking */}
          <Link href="#" className="group bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark p-6 rounded-xl hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">map</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Order Tracking</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time delivery status and updates for your current orders.</p>
          </Link>
          
          {/* Payments */}
          <Link href="#" className="group bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark p-6 rounded-xl hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">credit_card</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payments</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Billing, invoices, and managing your saved payment methods.</p>
          </Link>
          
          {/* Account Settings */}
          <Link href="#" className="group bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark p-6 rounded-xl hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">manage_accounts</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Account Settings</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Security, privacy, and personal profile information updates.</p>
          </Link>
          
          {/* Refunds */}
          <Link href="#" className="group bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark p-6 rounded-xl hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              <span className="material-symbols-outlined">currency_exchange</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Refunds</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Check refund status or request money back for issue orders.</p>
          </Link>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-surface-dark/30 border-y border-neutral-light dark:border-neutral-dark">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-neutral-light dark:border-neutral-dark overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                <span className="font-semibold text-gray-900 dark:text-white">What happens if my order is late?</span>
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-neutral-light dark:border-neutral-dark pt-4 mt-2">
                If your order exceeds the estimated delivery time by more than 15 minutes, you are eligible for a 20% discount on your next order. You can track the live location of your rider via the Tracking page.
              </div>
            </details>
            
            {/* FAQ 2 */}
            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-neutral-light dark:border-neutral-dark overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                <span className="font-semibold text-gray-900 dark:text-white">How do I change my delivery address?</span>
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-neutral-light dark:border-neutral-dark pt-4 mt-2">
                You can change your delivery address within 2 minutes of placing the order. Simply go to 'My Orders', select the active order, and click 'Edit Address'. After 2 minutes, please contact live support.
              </div>
            </details>
            
            {/* FAQ 3 */}
            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-neutral-light dark:border-neutral-dark overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                <span className="font-semibold text-gray-900 dark:text-white">Can I cancel my order after it's been placed?</span>
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-neutral-light dark:border-neutral-dark pt-4 mt-2">
                Cancellations are free if the restaurant hasn't started preparing your food. If the kitchen has already begun cooking, a partial cancellation fee may apply to cover the ingredient costs.
              </div>
            </details>
            
            {/* FAQ 4 */}
            <details className="group bg-white dark:bg-surface-dark rounded-xl border border-neutral-light dark:border-neutral-dark overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                <span className="font-semibold text-gray-900 dark:text-white">How do I use a promo code?</span>
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-neutral-light dark:border-neutral-dark pt-4 mt-2">
                You can apply promo codes at the checkout screen. Look for the "Add Promo Code" field right above the payment summary. Note that only one promo code can be used per order.
              </div>
            </details>

          </div>
          <div className="mt-8 text-center">
            <button className="text-primary font-bold hover:text-primary-hover hover:underline flex items-center justify-center gap-2 mx-auto cursor-pointer">
              View all FAQs <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Support Options */}
      <section className="py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Still need help?</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Our support team is available 24/7 to assist you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Live Chat */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark text-center flex flex-col items-center shadow-sm">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">chat</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Live Chat</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm flex-1">Typical response time: <span className="text-primary font-bold">2 minutes</span></p>
            <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer">
              Start Live Chat
            </button>
          </div>
          
          {/* Email Support */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark text-center flex flex-col items-center shadow-sm">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">mail</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Email Support</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm flex-1">Typical response time: <span className="text-primary font-bold">2-4 hours</span></p>
            <button className="w-full bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-dark font-bold py-3 rounded-xl border border-transparent dark:border-neutral-dark transition-all cursor-pointer">
              Send an Email
            </button>
          </div>
          
          {/* Phone Support */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark text-center flex flex-col items-center shadow-sm">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">call</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Phone Support</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm flex-1">Available Mon-Sun, <span className="text-primary font-bold">9am - 11pm</span></p>
            <button className="w-full bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-dark font-bold py-3 rounded-xl border border-transparent dark:border-neutral-dark transition-all cursor-pointer">
              Call Support
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}