"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function OrderManagementPage() {
  const [activeFilter, setActiveFilter] = useState('All Orders');

  // Dummy data with upgraded status pill colors matching the premium theme
  const orders = [
    { id: "#ORD-9921", initials: "AJ", name: "Alex Johnson", items: "2x Smokey Cheeseburger, 1x Truffle Fries", total: "$42.50", status: "Pending", statusColor: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30" },
    { id: "#ORD-9920", initials: "MG", name: "Maria Garcia", items: "1x Garden Fresh Pizza, 2x Italian Soda", total: "$31.90", status: "Preparing", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30" },
    { id: "#ORD-9919", initials: "JW", name: "James Wilson", items: "3x Spicy Chicken Tacos, 1x Large Guacamole", total: "$22.15", status: "On Delivery", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" },
    { id: "#ORD-9918", initials: "SM", name: "Sarah Miller", items: "1x Teriyaki Tofu Bowl, 1x Miso Soup", total: "$18.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
    { id: "#ORD-9917", initials: "RC", name: "Robert Chen", items: "2x Salmon Sushi Platter", total: "$54.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
  ];

  const filters = ["All Orders", "Pending", "Preparing", "On Delivery", "Delivered"];

  return (
    // Changed to min-h-screen and w-full for native scrolling and full width
    <div className="flex min-h-screen w-full bg-[#F8FAFC] dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Sidebar (Synced) */}
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
          {/* Active State for Orders */}
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold transition-all relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/admin/food-items" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
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
          <div className="bg-gray-50 hover:bg-gray-100 dark:bg-[#252525] dark:hover:bg-[#2A2A2A] rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer border border-transparent dark:border-gray-800">
            <div 
              className="size-9 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-gray-800 shadow-sm" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHFPt0gz9P0xGnuEJe8Y8admJEdO6aXkR8XzpE_KMtiRg9DV-6t3GEP_p63OlV3pXPkiqG60ObwObaHJ62IbGnW4sGS1jXeZ5ITVHyaYGqfi0IXFMaKEhMTrmv3iDrLOqnXqbg2niCeJCHkrQHYbgV6XHE5cEuFQo7msisYZZyt8pxFkqlFUDpQBC1r7Sq2Clao689-JGGwIVOXpoNtEnhoxv0FbbG4452hFGAevsdrmR1o7xVS_HjGwz7yBEFPH8B7BDw_Gkdddtp')" }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Alex Chen</p>
              <p className="text-xs font-medium text-gray-500 truncate">Super Admin</p>
            </div>
            <Link href="/login" className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
              <span className="material-symbols-outlined text-xl">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* Top Header (Synced) */}
        <header className="h-20 w-full flex items-center justify-between px-6 md:px-8 bg-[#F8FAFC]/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1E1E]">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Orders</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:text-primary bg-white dark:bg-[#1E1E1E] hover:bg-primary/5 border border-gray-200 dark:border-gray-800 rounded-xl relative transition-all cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1E1E1E]"></span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-6 w-full flex-1">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Order Management</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">Monitor and process incoming customer requests</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525] transition-all cursor-pointer shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 active:scale-[0.98] cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Order
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col xl:flex-row gap-4 pt-2">
            <div className="relative w-full xl:max-w-md group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-xl">search</span>
              <input 
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-gray-400 text-sm text-gray-900 dark:text-white shadow-sm" 
                placeholder="Search by Order ID, Customer name or Items..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar flex-1">
              {filters.map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === filter 
                      ? 'bg-primary text-white shadow-md shadow-primary/20 border border-primary' 
                      : 'bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm flex flex-col w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Items</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Total</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer w-full">
                      <td className="px-6 py-5 font-bold text-sm text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {order.initials}
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors whitespace-nowrap">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate pr-4">{order.items}</p>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-sm text-gray-900 dark:text-white">{order.total}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border ${order.statusColor} whitespace-nowrap`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-2 text-gray-400 hover:text-primary rounded-xl hover:bg-primary/10 transition-colors cursor-pointer" title="View Details">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] w-full">
              <p className="text-sm font-medium text-gray-500">Showing <span className="font-bold text-gray-900 dark:text-white">5</span> of <span className="font-bold text-gray-900 dark:text-white">124</span> orders</p>
              <div className="flex items-center gap-1.5">
                <button disabled className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 disabled:opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#252525]">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded-xl bg-primary shadow-md shadow-primary/20 text-white text-sm font-bold cursor-pointer">1</button>
                <button className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors cursor-pointer border border-transparent dark:border-gray-800">2</button>
                <button className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors cursor-pointer border border-transparent dark:border-gray-800">3</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:text-primary text-gray-600 dark:text-gray-300 bg-white dark:bg-[#252525] transition-colors cursor-pointer shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}