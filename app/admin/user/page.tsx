"use client";
import React from 'react';
import Link from 'next/link';
import AdminSidebarProfile from '@/app/components/AdminSidebarProfile';

export default function UserManagementPage() {
  
  // Dummy data with upgraded color classes for premium light/dark mode support
  const users = [
    { id: 1, initials: "JD", name: "John Doe", email: "john.doe@example.com", role: "Admin", roleColor: "bg-primary/10 text-primary dark:bg-primary/20", date: "Oct 12, 2023", status: "Active", statusColor: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
    { id: 2, initials: "SM", name: "Sarah Miller", email: "sarah.m@delivery.co", role: "Customer", roleColor: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300", date: "Nov 05, 2023", status: "Active", statusColor: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
    { id: 3, initials: "RB", name: "Robert Brown", email: "robert.b@provider.net", role: "Customer", roleColor: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300", date: "Dec 12, 2023", status: "Suspended", statusColor: "text-amber-600 dark:text-amber-400", dotColor: "bg-amber-500" },
    { id: 4, initials: "EW", name: "Emily White", email: "emily.w@fooddash.com", role: "Admin", roleColor: "bg-primary/10 text-primary dark:bg-primary/20", date: "Jan 15, 2024", status: "Active", statusColor: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
    { id: 5, initials: "MS", name: "Michael Scott", email: "dunder@mifflin.com", role: "Customer", roleColor: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300", date: "Feb 02, 2024", status: "Inactive", statusColor: "text-gray-500 dark:text-gray-400", dotColor: "bg-gray-400" },
  ];

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
          <Link href="/admin/oders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/admin/food-items" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">Menu</span>
          </Link>
          {/* Active State for Users */}
          <Link href="/admin/user" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold transition-all relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
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
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Users</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:text-primary bg-white dark:bg-[#1E1E1E] hover:bg-primary/5 border border-gray-200 dark:border-gray-800 rounded-xl relative transition-all cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-6 w-full flex-1">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">User Management</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">Monitor, manage and update system users and roles.</p>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 active:scale-[0.98] cursor-pointer w-full md:w-auto">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              New User
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col xl:flex-row gap-4 pt-2">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-xl">search</span>
              <input 
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-gray-400 text-sm text-gray-900 dark:text-white shadow-sm" 
                placeholder="Search by name, email or role..." 
                type="text"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525] transition-all cursor-pointer shadow-sm whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm flex flex-col w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">User Details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Join Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer w-full">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${user.role === 'Admin' ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-300'}`}>
                            {user.initials}
                          </div>
                          <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-primary transition-colors">{user.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">{user.email}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${user.roleColor}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">{user.date}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${user.statusColor}`}>
                          <span className={`size-1.5 rounded-full ${user.dotColor}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-primary rounded-xl hover:bg-primary/10 transition-colors cursor-pointer" title="Edit User">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition-colors cursor-pointer" title="Delete User">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
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
              <p className="text-sm font-medium text-gray-500">Showing <span className="font-bold text-gray-900 dark:text-white">5</span> of <span className="font-bold text-gray-900 dark:text-white">248</span> users</p>
              <div className="flex items-center gap-1.5">
                <button disabled className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 disabled:opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#252525]">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded-xl bg-primary shadow-md shadow-primary/20 text-white text-sm font-bold cursor-pointer">1</button>
                <button className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors cursor-pointer border border-transparent dark:border-gray-800">2</button>
                <button className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors cursor-pointer border border-transparent dark:border-gray-800">3</button>
                <span className="px-1 text-gray-400 dark:text-gray-600">...</span>
                <button className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm font-bold transition-colors cursor-pointer border border-transparent dark:border-gray-800">12</button>
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