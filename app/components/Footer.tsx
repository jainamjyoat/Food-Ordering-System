"use client"; // Added so we can use hooks
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // IF ON LOGIN PAGE, HIDE THE FOOTER COMPLETELY
  if (pathname === "/login") {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-neutral-light dark:border-neutral-dark mt-auto py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary p-1 rounded-lg">
                <span className="material-symbols-outlined text-white text-xl">restaurant</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Foodie<span className="text-primary">Dark</span>
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">
              The premium way to satisfy your cravings. We connect you with the most exclusive culinary experiences.
            </p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-gray-600 dark:text-white" href="#">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a className="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-gray-600 dark:text-white" href="#">
                <span className="material-symbols-outlined">brand_awareness</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">Restaurants</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-light dark:border-neutral-dark flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-gray-400 font-medium">© 2024 FoodieDark. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400">
            <span className="material-symbols-outlined text-2xl">payments</span>
            <span className="material-symbols-outlined text-2xl">credit_card</span>
          </div>
        </div>
      </div>
    </footer>
  );
}