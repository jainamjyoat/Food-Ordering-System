"use client";
import React from 'react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181112] dark:text-white min-h-screen flex flex-col font-sans">
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Success Message */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center size-20 bg-green-100 text-green-600 rounded-full mb-6">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#181112] dark:text-white mb-2">Order Successfully Placed!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Order ID: <span className="font-mono font-bold text-[#181112] dark:text-white">#FD-8293-XP</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Tracking & Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Live Tracking Map */}
            <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#452026] overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-[#452026] flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">near_me</span>
                  </span>
                  Live Tracking
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  On the way
                </span>
              </div>
              <div className="relative h-[400px] bg-gray-100 dark:bg-gray-800 w-full">
                {/* Map Placeholder Image */}
                <img alt="Map Preview" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbpG7q7Ip1siyv0t83hoVmTMSXpybFxHOJN11R_WXFYjg2_KXb6-5daj1EC1Nn96RhzNCktfZjf6mnuDiEv7XDcgWBEU9ylQDyfgB02gSu-xg3f14l-joupdsbdVK0jk2GKkHvBXZ-4L0Cu_VoyeQ7pFJgUKOCyk_xA-Xx_8J6zTD6b226tAwbrSMjG5QBijp1xIugBEGCBlfIcLYSVvwRgsVQ6dgx9TLJl8pyt1wUiD7PFVGCaX2MduCLS2aCWQGSAOAJd4Q-7GvM"/>
                
                {/* Driver Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-16">
                  <div className="relative flex flex-col items-center">
                    <div className="bg-white dark:bg-[#1a0b0d] px-3 py-1.5 rounded-lg shadow-lg mb-2 text-xs font-bold whitespace-nowrap flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-sm">moped</span>
                      Driver (Mike)
                    </div>
                    <div className="size-8 bg-primary border-4 border-white dark:border-[#1a0b0d] shadow-xl rounded-full flex items-center justify-center text-white z-10">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                    </div>
                  </div>
                </div>

                {/* You Pin */}
                <div className="absolute top-1/3 right-1/4">
                  <div className="relative flex flex-col items-center">
                    <div className="bg-white dark:bg-[#1a0b0d] px-3 py-1.5 rounded-lg shadow-lg mb-2 text-xs font-bold whitespace-nowrap">
                      You
                    </div>
                    <div className="size-4 bg-black dark:bg-white border-2 border-white dark:border-[#1a0b0d] shadow-xl rounded-full"></div>
                  </div>
                </div>

                {/* Driver Info Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-[#221013] p-4 rounded-xl shadow-lg border border-gray-100 dark:border-[#452026] flex items-center gap-4">
                  <div className="size-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <img alt="Driver" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC30ebkOaJ4OdRPFbU05aVFn7lQrtMNscelCQ7HF_-fP4fou096WzrSaz0Nj72IbpPSWDtP0WttKiIMZ2bDqxZvXF1G8gy_1nNWDfdXaCkRxasm6y7TpjD9u9e-S5MQD9qduMe5kKYUFhk8pBG5pNtUYF--qmiGbWkMENN6QaajTpHRR_-FpRJfX67vbpSUr61OekrRhxcuDZAkp_7vAk-l9TX8Vftq-FEZrVg49NEoS57cgxudrjl6Z_2lBgT7M7b90_FzXuP9wzhm"/>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-[#181112] dark:text-white">Mike is on the way</h4>
                    <p className="text-xs text-gray-500">Volvo XC40 • PL 829-XJ</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined">chat</span>
                    </button>
                    <button className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline Status */}
            <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#452026] overflow-hidden p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </span>
                Estimated Arrival: <span className="text-primary ml-1">10-15 mins</span>
              </h3>
              <div className="space-y-8 relative pl-2">
                <div className="absolute left-[27px] top-3 bottom-6 w-0.5 bg-gray-100 dark:bg-gray-800"></div>
                
                {/* Step 1 */}
                <div className="relative flex gap-6">
                  <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center z-10 ring-4 ring-white dark:ring-[#33181c] flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">check</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-[#181112] dark:text-white">Order Confirmed</h4>
                    <p className="text-sm text-gray-500">We have received your order.</p>
                    <p className="text-xs text-gray-400 mt-1">12:30 PM</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-6">
                  <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center z-10 ring-4 ring-white dark:ring-[#33181c] flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">skillet</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-[#181112] dark:text-white">Food being prepared</h4>
                    <p className="text-sm text-gray-500">Your meal is cooking right now.</p>
                    <p className="text-xs text-gray-400 mt-1">12:35 PM</p>
                  </div>
                </div>

                {/* Step 3 (Current) */}
                <div className="relative flex gap-6">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center z-10 ring-4 ring-white dark:ring-[#33181c] shadow-lg shadow-primary/30 flex-shrink-0 animate-bounce">
                    <span className="material-symbols-outlined text-xl">two_wheeler</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-primary">Out for delivery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Mike picked up your order.</p>
                    <p className="text-xs text-gray-400 mt-1">12:55 PM</p>
                  </div>
                </div>

                {/* Step 4 (Future) */}
                <div className="relative flex gap-6 opacity-50">
                  <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center z-10 ring-4 ring-white dark:ring-[#33181c] flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">home</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-500 dark:text-gray-400">Arriving</h4>
                    <p className="text-sm text-gray-500">Estimated 1:10 PM</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Receipt / Summary */}
              <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-xl border border-gray-100 dark:border-[#452026] overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-gray-100 dark:border-[#452026]">
                  <h3 className="text-xl font-extrabold text-[#181112] dark:text-white">Order Summary</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">from <span className="font-bold text-gray-800 dark:text-gray-200">Burger King</span></p>
                </div>
                
                <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                  <div className="flex gap-4 group">
                    <div className="size-14 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0">
                      <img alt="Burger" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBkdKA7ChxhbIxIHpAvFihWyNbBNLa9qeBUQgq4dYHYikFDLVAQ0TbUrenO_RJj-DcT_1Ji1iiiJFTHMnvs5B_2BY9QsHl_B0k9LjLO2AJG_23l-62LYPOkEHkVR13mnOPYkfAWM1Zr3dj6PnaQwtLdMq4ZzaLcStW6zNgpReURjYY8UFzKjXs0b2zhbz_z6_-wKj3U5t7nGvXfW2hr7i_QjSAnWN8QY7_SmhbF-LLFCit3DunB0PkOcT9ORPRyI6n-utDQrS4dTg"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#181112] dark:text-white text-sm">Signature Beef Burger <span className="text-gray-400 font-normal">x1</span></h4>
                        <span className="font-bold text-[#181112] dark:text-white text-sm">$12.99</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Extra Cheese, No Onion</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="size-14 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0">
                      <img alt="Fries" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb5_uX6QjW0-5D5zVMk_HJeVc12kUpi5ixAJTymEnEibcr3Q6sVx2RP1YaaGODDXswSDejX4nDdDVFod0q0a9awtvzZNHHm0jdl6P2e7FSP0ck7oLPdD944xCRyoqw8ukhV8cGL05JvPdyxbDuNN50d6pei384h8byWdELX0attfUjgSDIRBby8Ah01GSaUZ6eRBTpajJerHlfh_Dh0jLT4OCtLOUxKA2TuEwtRRlZ-FfTQqp4gy9H1od7Na_S_XY7wfbRF5445evr"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#181112] dark:text-white text-sm">Large French Fries <span className="text-gray-400 font-normal">x1</span></h4>
                        <span className="font-bold text-[#181112] dark:text-white text-sm">$4.50</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Light Salt</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="size-14 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0">
                      <img alt="Drink" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBphGw_Fi_Kvpd7CNp8b6BZJ--cr34_aOZvY0ax6nfB171-hAbAcz6xCBaiGnXUa2ar0whNfbvWu1skIrGrPsTf2UfyIU5N3Wxnf-hLZhRXmtMUYkI3AltwfRWN6nKwCcCEbn1kzZGHDd7e_FobL_JhqZVaS3J9jBRe5BM2hRbD5YH5UBPRAIuus82yhrvqeWztgsKd6zzUXI9M9UGhGzHnLVbzZdSGgmHmTiRrU7ASq6qu_Xxeli2VYQrQVaWHRKXD38_EVFgE2xYk"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#181112] dark:text-white text-sm">Coca Cola (Can) <span className="text-gray-400 font-normal">x2</span></h4>
                        <span className="font-bold text-[#181112] dark:text-white text-sm">$4.00</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Cold</p>
                    </div>
                  </div>
                </div>

                <div className="px-6">
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                </div>
                
                <div className="p-6 space-y-3 bg-gray-50/50 dark:bg-[#2a1418]">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">$21.49</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">$2.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">$1.72</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
                    <span className="text-base font-bold text-[#181112] dark:text-white">Paid Total</span>
                    <span className="text-2xl font-extrabold text-primary">$25.21</span>
                  </div>
                </div>
              </section>

              {/* Address Info */}
              <section className="bg-white dark:bg-[#33181c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#452026] overflow-hidden p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </span>
                  Delivery Address
                </h3>
                <p className="font-semibold text-[#181112] dark:text-white">Home</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">123 Delicious Ave, Foodie City<br/>Apt 4B</p>
                <p className="text-xs text-gray-400 mt-2 bg-gray-50 dark:bg-[#221013] p-2 rounded border border-gray-100 dark:border-[#452026]">Note: Leave at door, ring bell...</p>
              </section>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="w-full bg-white dark:bg-[#33181c] border border-gray-200 dark:border-[#452026] hover:bg-gray-50 dark:hover:bg-[#221013] text-[#181112] dark:text-white font-bold py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">support_agent</span>
                  Support
                </button>
                <Link href="/" className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">home</span>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}