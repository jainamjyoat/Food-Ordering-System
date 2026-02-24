"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

type UserProfile = {
  name?: string;
  email?: string;
  phone?: string;
  picture?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Client-side auth + user profile (based on local/session storage)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<UserProfile | null>(null);

  const readAuthFromStorage = React.useCallback(() => {
    try {
      const flag = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      const userJson = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (userJson) {
        try {
          const parsed: UserProfile = JSON.parse(userJson);
          setUser(parsed);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthenticated(!!flag || !!userJson);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const fetchProfile = React.useCallback(async () => {
    try {
      const res = await fetch("/api/user/profile", { cache: "no-store" });
      const ct = res.headers.get("content-type") || "";
      if (res.ok && ct.includes("application/json")) {
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          try {
            localStorage.setItem("user", JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone,
              picture: data.user.picture,
            }));
            localStorage.setItem("authToken", "1");
          } catch {}
        }
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      } else {
        // Non-JSON or error response, do not attempt to parse
      }
    } catch {
      // ignore network errors for navbar refresh
    }
  }, []);

  React.useEffect(() => {
    readAuthFromStorage();
    fetchProfile();
    const onFocus = () => {
      readAuthFromStorage();
      fetchProfile();
    };
    const onStorage = () => {
      readAuthFromStorage();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [readAuthFromStorage, fetchProfile]);

  React.useEffect(() => {
    // Re-evaluate auth whenever the route changes (e.g., after login redirect)
    readAuthFromStorage();
    fetchProfile();
  }, [pathname, readAuthFromStorage, fetchProfile]);

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
  const nameForInitials = (user?.name || "").trim();
  const parts = nameForInitials ? nameForInitials.split(/\s+/) : [];
  const initials = ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();

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
          <Link className={getLinkClass("/offers")} href="/offer">Offers</Link>
          <Link className={getLinkClass("/support")} href="/support">Support</Link>
        </nav>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          <div className="relative">
             <CartButton isHomeTheme={!isMenuPage} />
          </div>

          {isAuthenticated ? (
            <Link href="/profile" aria-label="Open profile">
              {user?.picture ? (
                <div 
                  className="size-9 rounded-full bg-cover bg-center border-2 border-white dark:border-neutral-dark shadow-sm cursor-pointer" 
                  style={{ backgroundImage: `url('${user.picture}')` }}
                  title={user?.name || user?.email || "Profile"}
                ></div>
              ) : (
                <div
                  className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-white dark:border-neutral-dark shadow-sm cursor-pointer font-bold"
                  title={user?.name || user?.email || "Profile"}
                >
                  <span className="text-xs">{initials || "U"}</span>
                </div>
              )}
            </Link>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary-hover transition-colors">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}