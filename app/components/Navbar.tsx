"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Define Page States
  const isCheckoutPage = pathname === "/cart";
  const isTrackingPage = pathname === "/order-tracking";
  const isMenuPage = pathname === "/menu";

  // Helper for active link styling
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive 
      ? "text-primary font-bold transition-colors" 
      : "text-[#181112] dark:text-gray-200 font-semibold hover:text-primary transition-colors";
  };

  // Reusable Cart Button
  const CartButton = ({ isHomeTheme = false }) => (
    <Link href="/cart">
      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-lg cursor-pointer ${
        isHomeTheme 
          ? "bg-background-light dark:bg-[#33181c] hover:bg-gray-100 dark:hover:bg-[#452026] text-[#181112] dark:text-white" 
          : "bg-primary hover:bg-red-600 text-white shadow-primary/20"
      }`}>
        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
        {isHomeTheme ? (
           <>
             {totalItems > 0 && (
               <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-primary text-white text-xs font-bold rounded-full border-2 border-white dark:border-[#221013]">
                 {totalItems}
               </span>
             )}
           </>
        ) : (
           <span className="text-sm font-bold">Cart ({totalItems})</span>
        )}
      </button>
    </Link>
  );

  // ---------------------------------------------------------
  // 1. ORDER TRACKING NAVBAR (Step 3/3)
  // ---------------------------------------------------------
  if (isTrackingPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors hover:bg-primary/20">
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hidden sm:flex">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <h2 className="text-[#181112] dark:text-white text-xl md:text-2xl font-extrabold tracking-tight">Order Status</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">Step 3 of 3</div>
            <div className="flex gap-1">
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ---------------------------------------------------------
  // 2. CHECKOUT NAVBAR (Step 2/3)
  // ---------------------------------------------------------
  if (isCheckoutPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors hover:bg-primary/20">
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hidden sm:flex">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <h2 className="text-[#181112] dark:text-white text-xl md:text-2xl font-extrabold tracking-tight">Checkout</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">Step 2 of 3</div>
            <div className="flex gap-1">
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ---------------------------------------------------------
  // 3. STANDARD NAVBAR (Home, Menu, etc.)
  // ---------------------------------------------------------
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
          
          <div className="relative">
             <CartButton isHomeTheme={!isMenuPage} />
          </div>

          <div 
            className="size-9 rounded-full bg-cover bg-center border-2 border-white shadow-sm cursor-pointer" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvQn9vyCe_MOlfQ0RbZTXFrxt9StE6kDuGp9BpMUsyFQ_YmCDCEz-Gy5puDjfZIofW77RZNduz-vtX_HOsEkNRtDiw6tuG7vWURODfv_MoDW9WaP2T2VkmvvKu41MxUBMCSvPiP7VgPFYIDKeEEwwJB-y4WKAbEFHfhWM97XmiwEQYUN6URJTq0_WmE2GceN5auD8woB1MeMESyZ1xNLbdASxRzjY5DgUEoeTBMq6o7fNa9JInYAaf83Ah87gwrc7_be-QTqRIMYm')" }}
          ></div>
        </div>
      </div>
    </header>
  );
}