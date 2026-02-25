"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AdminSidebarProfile from '@/app/components/AdminSidebarProfile';

export default function OrderManagementPage() {
  const [activeFilter, setActiveFilter] = useState('All Orders');

  // Live data state
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders from API
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/orders/get', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load orders');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Filters displayed in UI
  const filters = ["All Orders", "Pending", "Preparing", "On Delivery", "Delivered"];

  // Helpers to normalize data coming from DB
  function formatCurrency(amount: any) {
    const num = typeof amount === 'number' ? amount : Number(amount || 0);
    return num.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  }

  function getStatus(order: any) {
    // Normalize possible status values from DB
    const raw = (order?.status || '').toString();
    const normalized = raw.toLowerCase();
    if (normalized === 'pending') return 'Pending';
    if (normalized === 'preparing' || normalized === 'processing') return 'Preparing';
    if (normalized === 'on_delivery' || normalized === 'delivering' || normalized === 'shipped') return 'On Delivery';
    if (normalized === 'delivered' || normalized === 'completed') return 'Delivered';
    return raw ? raw[0].toUpperCase() + raw.slice(1) : 'Pending';
  }

  function statusColorClass(status: string) {
    switch (status) {
      case 'Pending':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
      case 'Preparing':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
      case 'On Delivery':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
    }
  }

  function getCustomerName(order: any) {
    return order?.customerName || order?.name || order?.userName || order?.email || 'Guest';
  }

  function getInitials(name: string) {
    try {
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } catch {
      return 'CU';
    }
  }

  function getItemsSummary(order: any) {
    const items = order?.items || order?.orderItems || [];
    if (Array.isArray(items) && items.length) {
      return items
        .map((it: any) => `${it.quantity || 1}x ${it.name || it.title || it.itemName || 'Item'}`)
        .join(', ');
    }
    return order?.itemsDescription || '—';
  }

  function getTotal(order: any) {
    const total = order?.total ?? order?.totalAmount ?? order?.amount;
    if (typeof total !== 'undefined') return formatCurrency(total);
    const items = order?.items || order?.orderItems || [];
    if (Array.isArray(items) && items.length) {
      const sum = items.reduce((acc: number, it: any) => acc + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
      return formatCurrency(sum);
    }
    return formatCurrency(0);
  }

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const byFilter = orders.filter((o: any) => {
      if (activeFilter === 'All Orders') return true;
      const st = getStatus(o);
      return st === activeFilter;
    });
    if (!q) return byFilter;
    return byFilter.filter((o: any) => {
      const id = (o._id?.toString?.() || o.id || '').toString().toLowerCase();
      const name = getCustomerName(o).toLowerCase();
      const items = getItemsSummary(o).toLowerCase();
      return id.includes(q) || name.includes(q) || items.includes(q);
    });
  }, [orders, activeFilter, searchQuery]);

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
          <Link href="/admin/oders" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold transition-all relative overflow-hidden group">
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
          <AdminSidebarProfile />
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  {loading && (
                    <tr>
                      <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>Loading orders...</td>
                    </tr>
                  )}
                  {error && !loading && (
                    <tr>
                      <td className="px-6 py-5 text-sm text-red-600" colSpan={6}>{error}</td>
                    </tr>
                  )}
                  {!loading && !error && filteredOrders.length === 0 && (
                    <tr>
                      <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>No orders found.</td>
                    </tr>
                  )}
                  {!loading && !error && filteredOrders.map((order: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer w-full">
                      <td className="px-6 py-5 font-bold text-sm text-gray-900 dark:text-white">{order._id || order.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {getInitials(getCustomerName(order))}
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors whitespace-nowrap">{getCustomerName(order)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate pr-4">{getItemsSummary(order)}</p>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-sm text-gray-900 dark:text-white">{getTotal(order)}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border ${statusColorClass(getStatus(order))} whitespace-nowrap`}>
                          {getStatus(order)}
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
              <p className="text-sm font-medium text-gray-500">Showing <span className="font-bold text-gray-900 dark:text-white">{!loading && !error ? filteredOrders.length : 0}</span> of <span className="font-bold text-gray-900 dark:text-white">{!loading && !error ? orders.length : 0}</span> orders</p>
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