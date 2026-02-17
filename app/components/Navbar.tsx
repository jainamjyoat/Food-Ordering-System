"use client"; // Required to get the current path
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Using Link for client-side navigation

export default function Navbar() {
  const pathname = usePathname();
  
  // Check if we are on the menu page (Change '/menu' if your route is different)
  const isMenuPage = pathname === "/menu";

  // --- RENDER MENU NAVBAR (The code you provided) ---
  if (isMenuPage) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-[#f4f0f1] dark:border-white/10 px-6 py-3 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4 text-text-main dark:text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">FoodOrder</h2>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-text-main dark:text-white text-sm font-semibold hover:text-primary transition-colors" href="/">Home</Link>
            <Link className="text-text-main dark:text-white text-sm font-semibold hover:text-primary transition-colors" href="/menu">Menu</Link>
            <a className="text-text-secondary dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Orders</a>
            <a className="text-text-secondary dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Restaurants</a>
          </nav>

          {/* Actions: Notifications, Cart, Profile */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-2 size-2 bg-primary rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors shadow-sm shadow-primary/30 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              <span className="text-sm font-bold">Cart (2)</span>
            </button>
            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-white shadow-sm cursor-pointer" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvQn9vyCe_MOlfQ0RbZTXFrxt9StE6kDuGp9BpMUsyFQ_YmCDCEz-Gy5puDjfZIofW77RZNduz-vtX_HOsEkNRtDiw6tuG7vWURODfv_MoDW9WaP2T2VkmvvKu41MxUBMCSvPiP7VgPFYIDKeEEwwJB-y4WKAbEFHfhWM97XmiwEQYUN6URJTq0_WmE2GceN5auD8woB1MeMESyZ1xNLbdASxRzjY5DgUEoeTBMq6o7fNa9JInYAaf83Ah87gwrc7_be-QTqRIMYm')" }}
            ></div>
          </div>
        </div>
      </header>
    );
  }

  // --- RENDER HOME NAVBAR (The default one) ---
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">lunch_dining</span>
          </div>
          <h2 className="text-[#181112] dark:text-white text-2xl font-extrabold tracking-tight">
            FoodDelivery
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#181112] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/menu" className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">
            Menu
          </Link>
          <a href="#" className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">
            Deals
          </a>
          <a href="#" className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors">
            Partner with us
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 h-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">search</span>
            <span className="text-sm font-semibold text-[#181112] dark:text-white hidden lg:inline">Search</span>
          </button>
          <button className="relative flex items-center justify-center size-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">shopping_cart</span>
            <span className="absolute top-1 right-1 size-2.5 bg-primary rounded-full border-2 border-white dark:border-[#221013]"></span>
          </button>
          <button className="flex items-center justify-center size-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">person</span>
          </button>
          <button className="hidden lg:flex px-6 h-10 bg-primary text-white text-sm font-bold rounded-lg items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-primary/20 cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}