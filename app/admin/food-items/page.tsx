"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import AdminSidebarProfile from '@/app/components/AdminSidebarProfile';
import { useRouter } from 'next/navigation';

export default function AddMenuItemPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>("https://lh3.googleusercontent.com/aida-public/AB6AXuAhOdNDhweIyTGeYb21-aoOegyf2o49h0rHJAnF9m27WQMkaJtjQTqMvpwOUgne9xXlqIK_qwtMVCpYpbcnNkfth5zov9y3ze4BeQTa-9EcV_1m3nUghs9D38VGCh2FycRu7vdeRUmfBYX50pgsBdIjZWOliPeC55ZY79CoNFUFlJBc5Ac7W-c003DCwidMmuzpwLwvEpZ12fVzeOrnAbC3JrC6FmLq8s7In-PVUMxZ7Vh_IiLqbRT6_-YMnWFMkFqDkcla4YA2OZdY");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', desc: '', price: '', category: 'Main Course', tags: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.desc || !form.price || !form.category) return;
    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/admin/uploads', { method: 'POST', body: fd });
        const upJson = await up.json();
        if (!up.ok) throw new Error(upJson.error || 'Upload failed');
        imageUrl = upJson.url;
      } else if (imagePreview) {
        imageUrl = imagePreview;
      }
      if (!imageUrl) throw new Error('Image is required');

      const dietary = form.tags.split(',').map(t => t.trim()).filter(Boolean);

      const payload = {
        name: form.name,
        desc: form.desc,
        category: form.category,
        price: parseFloat(form.price),
        dietary,
        imageUrl,
        rating: 4.5,
      };

      const resp = await fetch('/api/admin/food-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Failed to create item');

      router.push('/menu');
    } catch (err) {
      console.error(err);
      alert((err as Error).message || 'Failed to save item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Changed to min-h-screen and w-full for native scrolling and full width
    <div className="flex min-h-screen w-full bg-[#F8FAFC] dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Sidebar (Synced with Admin Dashboard) */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col z-20 shadow-sm sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary size-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-900 dark:text-white text-xl font-black leading-none tracking-tight">FoodAdmin</h1>
              <p className="text-gray-500 dark:text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-1">Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/oders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          {/* Active State for Menu Management */}
          <Link href="/admin/food-item" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold transition-all relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
            <span className="text-sm">Menu</span>
          </Link>
          <Link href="/admin/user" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm">Users</span>
          </Link>
          {/* <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </Link> */}
        </nav>
        
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
          <AdminSidebarProfile />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* Top Header (Synced with Admin Dashboard) */}
        <header className="h-20 w-full flex items-center justify-between px-6 md:px-8 bg-[#F8FAFC]/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1E1E]">
                <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Breadcrumb style title */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Link href="/admin" className="hover:text-primary transition-colors">Menu</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-gray-900 dark:text-white font-bold">Add Item</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:text-primary bg-white dark:bg-[#1E1E1E] hover:bg-primary/5 border border-gray-200 dark:border-gray-800 rounded-xl relative transition-all cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>
        </header>

        {/* Content Container - Constrained width for forms so they don't look awkwardly stretched on ultrawide */}
        <div className="p-6 md:p-8 lg:p-10 max-w-5xl mx-auto w-full flex-1">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary text-sm font-bold mb-3 uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              <Link href="/admin" className="hover:underline">Back to Menu</Link>
            </div>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Add New Menu Item</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Create a new culinary masterpiece for your digital storefront.</p>
          </div>

          {/* Form Content */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* General Information Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">General Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 bg-white dark:bg-[#1E1E1E] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Item Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm placeholder-gray-400" placeholder="e.g. Signature Truffle Burger" type="text" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Description</label>
                  <textarea name="desc" value={form.desc} onChange={handleChange} className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm resize-none placeholder-gray-400" placeholder="What makes this dish special? Mention key ingredients and flavor profiles..." rows={4} required></textarea>
                </div>
              </div>
            </section>

            {/* Pricing & Availability Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Pricing & Availability</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-[#1E1E1E] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Base Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm placeholder-gray-400" placeholder="0.00" step="0.01" type="number" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Discount (%)</label>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">%</span>
                    <input className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm placeholder-gray-400" placeholder="0" type="number" min="0" max="100" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Stock Status</label>
                  <div className="relative">
                    <select className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm appearance-none cursor-pointer">
                        <option>In Stock</option>
                        <option>Limited Availability</option>
                        <option>Out of Stock</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Categorization Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">category</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Categorization</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#1E1E1E] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Primary Category</label>
                  <div className="relative">
                    <select name="category" value={form.category} onChange={handleChange} className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm appearance-none cursor-pointer">
                        <option>Main Course</option>
                        <option>Appetizers</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                        <option>Specials</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold">Tags</label>
                  <input name="tags" value={form.tags} onChange={handleChange} className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm placeholder-gray-400" placeholder="Spicy, Vegan, Gluten-free (comma separated)" type="text" />
                </div>
              </div>
            </section>

            {/* Image Upload Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">image</span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Image Upload</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-[#1E1E1E] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                
                {/* Upload Target */}
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Upload Photo</label>
                  <label className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-[#1A1A1A] rounded-xl p-8 hover:bg-gray-50 dark:hover:bg-[#252525] hover:border-primary dark:hover:border-primary transition-all cursor-pointer group min-h-[220px]">
                    <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary mb-3 transition-colors">cloud_upload</span>
                    <p className="text-gray-700 dark:text-gray-300 font-bold">Click to browse or drag & drop</p>
                    <p className="text-gray-500 font-medium text-xs mt-2 text-center">PNG, JPG or JPEG (Max 5MB)</p>
                    <input className="hidden" type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedFile(file);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImagePreview(url);
                      }
                    }} />
                  </label>
                </div>
                
                {/* Image Preview */}
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Preview</label>
                  <div className="relative w-full h-full min-h-[220px] bg-gray-50 dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center group shadow-inner">
                    {imagePreview ? (
                      <>
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={imagePreview} alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"></div>
                        <button 
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg cursor-pointer shadow-lg transition-colors z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span className="text-xs font-bold pr-1">Remove</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-5xl mb-2 opacity-50">hide_image</span>
                        <span className="text-sm font-medium">No image selected</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 pb-10">
              <Link href="/admin" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors cursor-pointer" type="button">
                  Cancel
                </button>
              </Link>
              <button disabled={submitting} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
                <span className="material-symbols-outlined text-[18px]">save</span>
                {submitting ? 'Saving...' : 'Save Item'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}