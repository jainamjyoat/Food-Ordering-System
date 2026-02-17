"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext"; // 1. Import the hook

export default function Navbar() {
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu";
  
  // 2. Get the real count from the global Cart Context
  const { totalItems } = useCart();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive 
      ? "text-primary font-bold transition-colors" 
      : "text-[#181112] dark:text-gray-200 font-semibold hover:text-primary transition-colors";
  };

  // 3. Reusable Cart Button Component (Updates automatically)
  const CartButton = ({ isHomeTheme = false }) => (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-lg cursor-pointer ${
      isHomeTheme 
        ? "bg-background-light dark:bg-[#33181c] hover:bg-gray-100 dark:hover:bg-[#452026] text-[#181112] dark:text-white" // Home style
        : "bg-primary hover:bg-red-600 text-white shadow-primary/20" // Menu style (Red)
    }`}>
      <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
      
      {/* Logic for Home Theme (Icon only + Badge) vs Menu Theme (Text "Cart (0)") */}
      {isHomeTheme ? (
         // Badge style for Home
         <>
           {totalItems > 0 && (
             <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-primary text-white text-xs font-bold rounded-full border-2 border-white dark:border-[#221013]">
               {totalItems}
             </span>
           )}
         </>
      ) : (
         // Text style for Menu
         <span className="text-sm font-bold">Cart ({totalItems})</span>
      )}
    </button>
  );

  // --- MENU PAGE NAVBAR ---
  if (isMenuPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 text-[#181112] dark:text-white">
            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">FoodOrder</h2>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link className={getLinkClass("/")} href="/">Home</Link>
            <Link className={getLinkClass("/menu")} href="/menu">Menu</Link>
            <a className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Orders</a>
            <a className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Restaurants</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#181112] dark:text-white hover:bg-gray-100 dark:hover:bg-[#33181c] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            
            {/* The Dynamic Cart Button (Menu Style) */}
            <CartButton isHomeTheme={false} />

            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-white shadow-sm cursor-pointer" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvQn9vyCe_MOlfQ0RbZTXFrxt9StE6kDuGp9BpMUsyFQ_YmCDCEz-Gy5puDjfZIofW77RZNduz-vtX_HOsEkNRtDiw6tuG7vWURODfv_MoDW9WaP2T2VkmvvKu41MxUBMCSvPiP7VgPFYIDKeEEwwJB-y4WKAbEFHfhWM97XmiwEQYUN6URJTq0_WmE2GceN5auD8woB1MeMESyZ1xNLbdASxRzjY5DgUEoeTBMq6o7fNa9JInYAaf83Ah87gwrc7_be-QTqRIMYm')" }}
            ></div>
          </div>
        </div>
      </header>
    );
  }

  // --- HOME PAGE NAVBAR ---
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">lunch_dining</span>
          </div>
          <h2 className="text-[#181112] dark:text-white text-2xl font-extrabold tracking-tight">
            FoodDelivery
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link className={getLinkClass("/") + " text-sm"} href="/">Home</Link>
          <Link className={getLinkClass("/menu") + " text-sm"} href="/menu">Menu</Link>
          <a className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Deals</a>
          <a className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Partner with us</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 h-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">search</span>
            <span className="text-sm font-semibold text-[#181112] dark:text-white hidden lg:inline">Search</span>
          </button>
          
          {/* The Dynamic Cart Button (Home Style - Relative needed for badge positioning) */}
          <div className="relative">
             <CartButton isHomeTheme={true} />
          </div>

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