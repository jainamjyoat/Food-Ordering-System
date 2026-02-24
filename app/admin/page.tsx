"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    // Fetch logged-in admin info from localStorage
    try {
      const userJson = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setAdminName(user.name || 'Admin');
        setAdminEmail(user.email || '');
      }
    } catch (e) {
      console.error('Error reading admin info:', e);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch all orders
        const ordersRes = await fetch('/api/orders/get', { cache: 'no-store' });
        const ordersText = await ordersRes.text();
        let ordersData: any = {};
        try { ordersData = JSON.parse(ordersText); } catch (e) {
          console.error('Non-JSON from /api/orders:', ordersText);
        }
        const allOrders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];

        // Fetch all food items
        const itemsRes = await fetch('/api/food-items', { cache: 'no-store' });
        const itemsText = await itemsRes.text();
        let itemsData: any = {};
        try { itemsData = JSON.parse(itemsText); } catch (e) {
          console.error('Non-JSON from /api/food-items:', itemsText);
        }
        const allItems = Array.isArray(itemsData?.items) ? itemsData.items : [];

        // Calculate stats
        const totalRevenue = allOrders.reduce((sum: number, order: any) => sum + (Number(order.total) || 0), 0);
        const activeOrders = allOrders.filter((o: any) => o.status === 'pending' || o.status === 'preparing').length;
        const calculatedStats = [
          { title: "Total Revenue", value: `${totalRevenue.toFixed(2)}`, trend: "12.5%", isUp: true, icon: "payments", progress: "w-3/4", color: "text-blue-500", bg: "bg-blue-500" },
          { title: "Active Orders", value: String(activeOrders), trend: "5.2%", isUp: true, icon: "local_mall", progress: "w-1/2", color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Total Items", value: String(allItems.length), trend: "8.1%", isUp: true, icon: "inventory_2", progress: "w-2/3", color: "text-purple-500", bg: "bg-purple-500" },
          { title: "Total Orders", value: String(allOrders.length), trend: "2.4%", isUp: true, icon: "shopping_bag", progress: "w-1/4", color: "text-amber-500", bg: "bg-amber-500" },
        ];
        setStats(calculatedStats);

        // Format recent orders (last 5)
        const formatted = allOrders.slice(-5).reverse().map((order: any) => {
          const name = order.customerName || 'Unknown';
          const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
          const itemsStr = order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ') || 'N/A';
          const statusClass = order.status === 'pending' ? 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/30'
            : order.status === 'preparing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
            : order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
          return {
            id: order.orderId || '#ORD-0000',
            initials,
            name,
            items: itemsStr,
            total: `${Number(order.total || 0).toFixed(2)}`,
            status: order.status || 'pending',
            statusClass,
          };
        });
        setRecentOrders(formatted);

        // Format inventory (top 3 items)
        const topItems = allItems.slice(0, 3).map((item: any) => ({
          name: item.name,
          sold: "0 units today",
          price: `${Number(item.price || 0).toFixed(2)}`,
          stock: "In Stock",
          stockClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/10",
          img: item.imageUrl || item.image || '/next.svg',
        }));
        setInventory(topItems);
      } catch (e) {
        console.error('Error fetching dashboard data:', e);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    // Added w-full to the absolute root to force full width
    <div className="flex min-h-screen w-full bg-[#F8FAFC] dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Sidebar */}
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
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold transition-all relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/oders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
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
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{adminName}</p>
              <p className="text-xs font-medium text-gray-500 truncate">{adminEmail || 'Admin'}</p>
            </div>
            <Link href="/login" className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
              <span className="material-symbols-outlined text-xl">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Added w-full */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* Top Header: Added w-full */}
        <header className="h-20 w-full flex items-center justify-between px-6 md:px-8 bg-[#F8FAFC]/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1E1E]">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group hidden sm:block">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
              <input 
                className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 lg:w-80 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all shadow-sm" 
                placeholder="Search analytics or orders..." 
                type="text"
              />
            </div>
            <button className="p-2.5 text-gray-500 hover:text-primary bg-white dark:bg-[#1E1E1E] hover:bg-primary/5 border border-gray-200 dark:border-gray-800 rounded-xl relative transition-all cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1E1E1E]"></span>
            </button>
          </div>
        </header>

        {/* Content Container: Assured 100% width */}
        <div className="p-6 md:p-8 space-y-8 w-full flex-1">
          
          {/* Stats Grid: Added 2xl breakpoint for huge monitors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6 w-full">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1E1E1E] w-full p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all group shadow-sm hover:shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl ${stat.color} bg-gray-50 dark:bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <span className={`${stat.isUp ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' : 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400'} text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-full`}>
                    <span className="material-symbols-outlined text-[14px]">{stat.isUp ? 'trending_up' : 'trending_down'}</span> 
                    {stat.trend}
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <div className="mt-5 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative z-10">
                  <div className={`h-full ${stat.bg} ${stat.progress} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white">Recent Orders</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Managing 482 total orders this month</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#252525] hover:bg-gray-50 dark:hover:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 transition-all cursor-pointer shadow-sm flex">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                </button>
                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover rounded-xl text-sm font-bold text-white transition-all cursor-pointer shadow-md shadow-primary/20 flex">
                  <span className="material-symbols-outlined text-[18px]">add</span> New Order
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer w-full">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {order.initials}
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors whitespace-nowrap">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{order.items}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white text-right">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border ${order.statusClass} whitespace-nowrap`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/10">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#1E1E1E] rounded-b-2xl w-full">
              <p className="text-sm font-medium text-gray-500">Showing <span className="font-bold text-gray-900 dark:text-white">5</span> of <span className="font-bold text-gray-900 dark:text-white">42</span> orders</p>
              <div className="flex gap-2">
                <button disabled className="px-4 py-2 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-400 disabled:opacity-50 cursor-not-allowed">Prev</button>
                <button className="px-4 py-2 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:text-primary rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer shadow-sm">Next</button>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Revenue & Inventory */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-6 pb-10 w-full">
            
            {/* Revenue Chart Placeholder */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Revenue Analytics</h3>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 w-full bg-gray-50/50 dark:bg-[#1A1A1A] border border-gray-200 border-dashed dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 min-h-[300px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-white dark:bg-[#252525] rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
                    <span className="material-symbols-outlined text-4xl text-primary">monitoring</span>
                  </div>
                  <p className="text-sm font-semibold">Chart Visualization Component</p>
                </div>
              </div>
            </div>
            
            {/* Popular Inventory */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Top Sellers</h3>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">Most popular items today</p>
                </div>
                <button className="text-primary text-sm font-bold hover:underline cursor-pointer bg-primary/10 px-3 py-1.5 rounded-lg">View All</button>
              </div>
              
              <div className="space-y-3 w-full">
                {inventory.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border border-gray-100 dark:border-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer group w-full">
                    <div 
                      className="size-16 rounded-xl bg-cover bg-center border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0" 
                      style={{ backgroundImage: `url('${item.img}')`, backgroundColor: '#e5e7eb' }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs font-medium text-gray-500 mt-1">{item.sold}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                      <p className="text-sm font-black text-gray-900 dark:text-white">{item.price}</p>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.stockClass}`}>
                        {item.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}