"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Define Page States
  const isLoginPage = pathname === "/login"; // Check for login page
  const isCheckoutPage = pathname === "/cart";
  const isTrackingPage = pathname === "/order-tracking";
  const isMenuPage = pathname === "/menu";

  // IF ON LOGIN PAGE, HIDE THE NAVBAR COMPLETELY
  if (isLoginPage) {
    return null;
  }

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive 
      ? "text-primary font-bold transition-colors" 
      : "text-gray-800 dark:text-gray-300 font-semibold hover:text-primary transition-colors";
  };

  const CartButton = ({ isHomeTheme = false }) => (
    <Link href="/cart">
      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-lg cursor-pointer ${
        isHomeTheme 
          ? "bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark hover:bg-gray-100 dark:hover:bg-neutral-dark text-gray-900 dark:text-white" 
          : "bg-primary hover:bg-primary-hover text-white shadow-primary/20"
      }`}>
        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
        {isHomeTheme ? (
           <>
             {totalItems > 0 && (
               <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-primary text-white text-xs font-bold rounded-full border-2 border-white dark:border-surface-dark">
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

  // --- CHECKOUT / TRACKING NAV ---
  if (isCheckoutPage || isTrackingPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-light dark:border-neutral-dark">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={isTrackingPage ? "/" : "/menu"} className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors hover:bg-primary/20">
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hidden sm:flex">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <h2 className="text-gray-900 dark:text-white text-xl md:text-2xl font-extrabold tracking-tight">
                {isTrackingPage ? "Order Status" : "Checkout"}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">
                {isTrackingPage ? "Step 3 of 3" : "Step 2 of 3"}
            </div>
            <div className="flex gap-1">
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className="h-1.5 w-8 bg-primary rounded-full"></div>
              <div className={`h-1.5 w-8 rounded-full ${isTrackingPage ? "bg-primary" : "bg-gray-200 dark:bg-neutral-dark"}`}></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // --- MAIN NAVBAR ---
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-light dark:border-neutral-dark">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Foodie<span className="text-primary">Dark</span>
          </h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link className={getLinkClass("/")} href="/">Home</Link>
          <Link className={getLinkClass("/menu")} href="/menu">Menu</Link>
          <a className={getLinkClass("/offers")} href="#">Offers</a>
          <a className={getLinkClass("/support")} href="#">Support</a>
        </nav>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          <div className="relative">
             <CartButton isHomeTheme={!isMenuPage} />
          </div>

          <Link href="/login">
            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-white dark:border-neutral-dark shadow-sm cursor-pointer" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvQn9vyCe_MOlfQ0RbZTXFrxt9StE6kDuGp9BpMUsyFQ_YmCDCEz-Gy5puDjfZIofW77RZNduz-vtX_HOsEkNRtDiw6tuG7vWURODfv_MoDW9WaP2T2VkmvvKu41MxUBMCSvPiP7VgPFYIDKeEEwwJB-y4WKAbEFHfhWM97XmiwEQYUN6URJTq0_WmE2GceN5auD8woB1MeMESyZ1xNLbdASxRzjY5DgUEoeTBMq6o7fNa9JInYAaf83Ah87gwrc7_be-QTqRIMYm')" }}
            ></div>
          </Link>
        </div>
      </div>
    </header>
  );
}