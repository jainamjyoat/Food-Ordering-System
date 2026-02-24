"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AddMenuItemPage() {
  const [imagePreview, setImagePreview] = useState<string | null>("https://lh3.googleusercontent.com/aida-public/AB6AXuAhOdNDhweIyTGeYb21-aoOegyf2o49h0rHJAnF9m27WQMkaJtjQTqMvpwOUgne9xXlqIK_qwtMVCpYpbcnNkfth5zov9y3ze4BeQTa-9EcV_1m3nUghs9D38VGCh2FycRu7vdeRUmfBYX50pgsBdIjZWOliPeC55ZY79CoNFUFlJBc5Ac7W-c003DCwidMmuzpwLwvEpZ12fVzeOrnAbC3JrC6FmLq8s7In-PVUMxZ7Vh_IiLqbRT6_-YMnWFMkFqDkcla4YA2OZdY");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the new item
    console.log("Saving new menu item...");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* SideNavBar (Same as Admin Dashboard) */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-surface-dark border-r border-neutral-light dark:border-neutral-dark hidden md:flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-none tracking-tight">FoodAdmin</h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Management Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/add-item" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-semibold transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
            <span className="text-sm font-semibold">Menu Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-medium text-sm">Orders</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium text-sm">Customers</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 mt-auto border-t border-neutral-light dark:border-neutral-dark">
          <div className="bg-gray-50 dark:bg-background-dark rounded-xl p-4 flex items-center gap-3 border border-transparent dark:border-neutral-dark">
            <div 
              className="size-10 rounded-full bg-cover bg-center border border-neutral-light dark:border-neutral-dark" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHFPt0gz9P0xGnuEJe8Y8admJEdO6aXkR8XzpE_KMtiRg9DV-6t3GEP_p63OlV3pXPkiqG60ObwObaHJ62IbGnW4sGS1jXeZ5ITVHyaYGqfi0IXFMaKEhMTrmv3iDrLOqnXqbg2niCeJCHkrQHYbgV6XHE5cEuFQo7msisYZZyt8pxFkqlFUDpQBC1r7Sq2Clao689-JGGwIVOXpoNtEnhoxv0FbbG4452hFGAevsdrmR1o7xVS_HjGwz7yBEFPH8B7BDw_Gkdddtp')" }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">Alex Chen</p>
              <p className="text-xs text-gray-500 truncate">Super Admin</p>
            </div>
            <Link href="/login" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative">
        
        {/* Mobile Header */}
        <header className="h-16 flex items-center px-6 md:hidden bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-light dark:border-neutral-dark sticky top-0 z-10">
          <button className="text-gray-500">
              <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="p-6 md:p-8 lg:p-12 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary text-sm font-bold mb-3 uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              <Link href="/admin" className="hover:underline">Back to Dashboard</Link>
            </div>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">Add New Menu Item</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Create a new culinary masterpiece for your digital storefront.</p>
          </div>

          {/* Form Content */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* General Information Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">info</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">General Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Item Name</label>
                  <input className="bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="e.g. Signature Truffle Burger" type="text" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Description</label>
                  <textarea className="bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none" placeholder="What makes this dish special? Mention key ingredients and flavor profiles..." rows={4} required></textarea>
                </div>
              </div>
            </section>

            {/* Pricing & Availability Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Pricing & Availability</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Base Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input className="w-full bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl pl-8 pr-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="0.00" step="0.01" type="number" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Discount (%)</label>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                    <input className="w-full bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="0" type="number" min="0" max="100" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Stock Status</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer">
                        <option>In Stock</option>
                        <option>Limited Availability</option>
                        <option>Out of Stock</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Categorization Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">category</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Categorization</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Primary Category</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer">
                        <option>Main Course</option>
                        <option>Appetizers</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                        <option>Specials</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Tags</label>
                  <input className="bg-gray-50 dark:bg-background-dark border border-transparent dark:border-neutral-dark rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="Spicy, Vegan, Gluten-free (comma separated)" type="text" />
                </div>
              </div>
            </section>

            {/* Image Upload Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">image</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Image Upload</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm">
                
                {/* Upload Target */}
                <label className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 dark:border-neutral-dark rounded-xl p-8 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer group h-full min-h-[200px]">
                  <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 group-hover:text-primary mb-4 transition-colors">cloud_upload</span>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Click to upload image</p>
                  <p className="text-gray-500 text-xs mt-2 text-center">PNG, JPG or JPEG (Max 5MB)</p>
                  <input className="hidden" type="file" accept="image/*" />
                </label>
                
                {/* Image Preview */}
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">Preview</label>
                  <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-background-dark rounded-xl overflow-hidden border border-neutral-light dark:border-neutral-dark flex items-center justify-center group">
                    {imagePreview ? (
                      <>
                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={imagePreview} alt="Preview" />
                        <button 
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full cursor-pointer shadow-lg transition-colors z-10"
                        >
                          <span className="material-symbols-outlined text-sm block">close</span>
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-5xl mb-2">hide_image</span>
                        <span className="text-sm font-medium">No image selected</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-8 border-t border-neutral-light dark:border-neutral-dark">
              <Link href="/admin">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-neutral-light dark:border-neutral-dark text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors cursor-pointer" type="button">
                  Cancel
                </button>
              </Link>
              <button className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-95 cursor-pointer" type="submit">
                Save Item
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}