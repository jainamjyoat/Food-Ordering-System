import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1a0b0d] border-t border-[#f4f0f1] dark:border-[#3a1d21] mt-12 py-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#181112] dark:text-white">
                FoodDelivery
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              The best local restaurants delivered to your doorstep. Fresh, fast, and delicious.
            </p>
            <div className="flex gap-4">
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#181112] dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#181112] dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Community Guidelines</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Partner with Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#181112] dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          © 2024 FoodDelivery Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}