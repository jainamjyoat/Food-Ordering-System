"use client";
import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  // --- Dummy Data ---
  const stats = [
    { title: "Total Revenue", value: "$24,500.00", trend: "12.5%", isUp: true, icon: "payments", progress: "w-3/4" },
    { title: "Active Orders", value: "42", trend: "5.2%", isUp: true, icon: "local_mall", progress: "w-1/2" },
    { title: "Total Users", value: "1,280", trend: "8.1%", isUp: true, icon: "group", progress: "w-2/3" },
    { title: "New Signups", value: "15", trend: "2.4%", isUp: false, icon: "person_add", progress: "w-1/4" },
  ];

  const recentOrders = [
    { id: "#ORD-7721", initials: "JD", name: "John Doe", items: "2x Burger, 1x Fries", total: "$32.50", status: "Preparing", statusClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    { id: "#ORD-7720", initials: "JS", name: "Jane Smith", items: "1x Pizza Margherita", total: "$18.00", status: "Pending", statusClass: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
    { id: "#ORD-7719", initials: "RB", name: "Robert Brown", items: "3x Tacos, 1x Soda", total: "$22.00", status: "Out for Delivery", statusClass: "bg-primary/10 text-primary border-primary/20" },
    { id: "#ORD-7718", initials: "ED", name: "Emily Davis", items: "1x Pasta Carbonara", total: "$15.50", status: "Preparing", statusClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    { id: "#ORD-7717", initials: "MW", name: "Michael Wilson", items: "2x Sushi Set", total: "$45.00", status: "Pending", statusClass: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  ];

  const inventory = [
    { name: "Signature Cheese Burger", sold: "84 units sold today", price: "$12.99", stock: "In Stock", stockClass: "text-emerald-500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmqs_lz5w6HBcUMc0ruFuGdihEu5gACGGdu6Fk1rDNY2RQcQ5QDOTScEr_NJDsam95LQ0TMSFLpk-iyvNXRdLZhaNPi7i2q4KwRXk9f0r_h98IO557IbOVYNr_leeTkDRQiBgkA4QYFyVGWVWUzUHOKoGiyOnkylrZ3o9ZPxddilTktIP4aKN2F6miTMb2GPByAW_5N-mL5hVeAcPuqrvhF7CnJwt4MKWwJuGzsknsxIavBIf5b21QISmC3H4m-apGWIrDpX8RU4MP" },
    { name: "Pepperoni Feast Pizza", sold: "62 units sold today", price: "$18.50", stock: "In Stock", stockClass: "text-emerald-500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTzejVoz4HaL2sBo2QtOWO3qqgj6XRgS4rDq3cqGEq6w5S8SwbuW0FPhcu9ZUjAh0NeajHIg9Vd4m9qY6KWyv4g1foTSs4KilYtHDLRbL6ov_4wd0mnnMBM4EutuGAryozApTTWJrkpZlL2KS9wa-vTJvsLq0pB0LH4ql9Jd5FU3mB_y5Ws2SEbMHo0hxiwTUm8QnSS2V2omZzaL0q-fs49sx_Bp3gxdHy68tsOH-lw_F3uB4tFy7_RZVw-HgW4iOarnkb066dDqeL" },
    { name: "Garden Fresh Salad", sold: "45 units sold today", price: "$9.25", stock: "Low Stock (12)", stockClass: "text-amber-500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlRv4frFCPE9bG6yhWhfZ2pHMgQKSWhcUfD2DaiGmetSBT-geP1SwVZBDmaPD8ybpbx9vFH4AYpO1o7eRKUiX6Y3YfQFdU_MMF3hEOEcd7Ywu81Xxe3jmus3WplA1vMdQPiZD27YEMUAjbQpiPokYwpbeXqL4qeXDOYCQIr-qLj0HL5uiq5G2WdosIL9uZny5XN0WgortM5MOulLBB0gHnVQQZOJKPIsQRELb2oqKdRzyNmdkBoQmBN-B2nnbPPaxDvv3Sj7DDwe43" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Sidebar */}
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
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-semibold transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-medium text-sm">Orders</span>
          </Link>
          <Link href="/admin/food-items" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-medium text-sm">Menu Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-background-dark hover:text-primary dark:hover:text-gray-100 transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium text-sm">Users</span>
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
              <span className="material-symbols-outlined">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto hide-scrollbar relative">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 md:px-8 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-light dark:border-neutral-dark sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
              <input 
                className="bg-gray-100 dark:bg-surface-dark border border-transparent dark:border-neutral-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 w-64 text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none transition-all" 
                placeholder="Search analytics..." 
                type="text"
              />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-dark rounded-lg relative transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-dark rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-neutral-light dark:border-neutral-dark hover:border-primary/30 dark:hover:border-primary/50 transition-all group shadow-sm hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <span className={`${stat.isUp ? 'text-emerald-500' : 'text-gray-500'} text-xs font-bold flex items-center gap-1 bg-gray-50 dark:bg-background-dark px-2 py-1 rounded-md border border-transparent dark:border-neutral-dark`}>
                    <span className="material-symbols-outlined text-[14px]">{stat.isUp ? 'trending_up' : 'remove'}</span> 
                    {stat.trend}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">{stat.value}</h3>
                <div className="mt-4 h-1.5 bg-gray-100 dark:bg-background-dark rounded-full overflow-hidden border border-transparent dark:border-neutral-dark">
                  <div className={`h-full bg-primary ${stat.progress} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-neutral-light dark:border-neutral-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-light dark:border-neutral-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Orders</h2>
                <p className="text-sm text-gray-500">Managing 482 total orders this month</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-neutral-dark border border-transparent dark:border-neutral-dark rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer flex">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                </button>
                <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover rounded-xl text-sm font-bold text-white transition-colors cursor-pointer shadow-lg shadow-primary/20 flex">
                  <span className="material-symbols-outlined text-[18px]">add</span> New Order
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-background-dark/50 border-b border-neutral-light dark:border-neutral-dark">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-light dark:divide-neutral-dark">
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-background-dark/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 text-sm font-bold text-primary">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-gray-100 dark:bg-background-dark border border-neutral-light dark:border-neutral-dark flex items-center justify-center text-xs font-bold text-gray-500">
                            {order.initials}
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{order.items}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-gray-100 text-right">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${order.statusClass}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-neutral-light dark:border-neutral-dark flex items-center justify-between bg-gray-50 dark:bg-transparent">
              <p className="text-sm font-medium text-gray-500">Showing 5 of 42 active orders</p>
              <div className="flex gap-2">
                <button disabled className="px-4 py-2 bg-white dark:bg-background-dark border border-neutral-light dark:border-neutral-dark rounded-lg text-sm font-bold text-gray-400 disabled:opacity-50 cursor-not-allowed">Previous</button>
                <button className="px-4 py-2 bg-white dark:bg-background-dark border border-neutral-light dark:border-neutral-dark hover:border-primary/50 hover:text-primary rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer">Next</button>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Revenue & Inventory */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
            
            {/* Revenue Chart Placeholder */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-neutral-light dark:border-neutral-dark p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Revenue Breakdown</h3>
              <div className="flex-1 w-full bg-gray-50 dark:bg-background-dark border border-neutral-light dark:border-neutral-dark rounded-xl flex items-center justify-center text-gray-400 min-h-[250px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-white dark:bg-surface-dark rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-primary">bar_chart</span>
                  </div>
                  <p className="text-sm font-medium">Revenue analytics chart visualization</p>
                </div>
              </div>
            </div>
            
            {/* Popular Inventory */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-neutral-light dark:border-neutral-dark p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Inventory Items</h3>
                <button className="text-primary text-sm font-bold hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {inventory.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-background-dark rounded-xl transition-colors border border-transparent dark:hover:border-neutral-dark cursor-pointer">
                    <div 
                      className="size-14 rounded-xl bg-cover bg-center border border-neutral-light dark:border-neutral-dark shadow-sm" 
                      style={{ backgroundImage: `url('${item.img}')` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.name}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{item.sold}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-primary">{item.price}</p>
                      <p className={`text-xs font-bold mt-0.5 ${item.stockClass}`}>{item.stock}</p>
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