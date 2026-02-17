"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { foodItems } from '../../data/foodItems'; // Ensure path is correct
import { useCart } from '../../context/CartContext';

export default function ItemDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();
  
  // 1. Find the item matching the ID in the URL
  const item = foodItems.find(i => i.id === Number(params.id));

  // 2. Local state for form options
  const [quantity, setQuantity] = useState(1);
  const [selectedSide, setSelectedSide] = useState("French Fries");
  const [extras, setExtras] = useState<string[]>([]);

  // Handle Loading/Error state
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-main dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <Link href="/menu" className="text-primary hover:underline">Back to Menu</Link>
      </div>
    );
  }

  // 3. Handlers
  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));
  
  const toggleExtra = (extra: string) => {
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };

  const handleAddToCart = () => {
    // Add the item X times based on quantity selected
    for(let i = 0; i < quantity; i++) {
        addToCart(item);
    }
    // Optional: Navigate to cart or give feedback
    // router.push('/cart'); 
  };

  // Get current images (fallback to main image if array doesn't exist)
  const gallery = item.images || [item.image, item.image, item.image];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 font-sans text-[#181112] dark:text-white">
      
      {/* Breadcrumbs */}
      <nav className="flex text-sm font-medium text-gray-500 dark:text-gray-400">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
          <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
          <li className="font-semibold text-[#181112] dark:text-white">{item.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Images */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] relative group">
            <img alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src={item.image} />
            <button className="absolute top-4 right-4 size-10 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:text-primary transition-all shadow-sm">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {gallery.slice(0, 4).map((img, idx) => (
                <div key={idx} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border ${idx === 0 ? 'border-2 border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'} transition-colors`}>
                    <img alt={`View ${idx+1}`} className="w-full h-full object-cover" src={img} />
                </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Form */}
        <div className="flex flex-col">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{item.name}</h1>
              <span className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                 {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-[20px] ${i < Math.round(item.rating) ? "fill-current" : "text-gray-300"}`} style={{ fontVariationSettings: i < Math.round(item.rating) ? "'FILL' 1" : undefined }}>
                        star
                      </span>
                  ))}
                <span className="text-sm font-bold text-[#181112] dark:text-white ml-1">{item.rating}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.reviews || 0} reviews</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.prepTime || "15-25 min"}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {item.desc}
            </p>
          </div>

          <div className="space-y-8 flex-grow">
            
            {/* Extras Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Extra Toppings</h3>
              <div className="space-y-3">
                {[
                    { name: "Extra Cheese", price: 1.50 }, 
                    { name: "Crispy Bacon", price: 2.00 }, 
                    { name: "Jalapenos", price: 1.00 }
                ].map((extra, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-[#33181c] transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-3">
                        <input 
                            onChange={() => toggleExtra(extra.name)}
                            checked={extras.includes(extra.name)}
                            className="size-5 text-primary border-gray-300 rounded focus:ring-primary bg-transparent" 
                            type="checkbox"
                        />
                        <span className="font-medium">{extra.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">+${extra.price.toFixed(2)}</span>
                    </label>
                ))}
              </div>
            </div>

            {/* Sides Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Choose a Side <span className="text-sm font-normal text-gray-500 ml-2">(Required)</span></h3>
              <div className="space-y-3">
                {[
                    { name: "French Fries", price: 0 },
                    { name: "Garden Salad", price: 1.50 },
                    { name: "Onion Rings", price: 2.50 }
                ].map((side, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-[#33181c] transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <div className="flex items-center gap-3">
                            <input 
                                checked={selectedSide === side.name}
                                onChange={() => setSelectedSide(side.name)}
                                className="size-5 text-primary border-gray-300 focus:ring-primary bg-transparent" 
                                name="side" 
                                type="radio"
                            />
                            <span className="font-medium">{side.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{side.price === 0 ? 'Free' : `+$${side.price.toFixed(2)}`}</span>
                    </label>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pt-4 mt-auto">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg h-14 bg-white dark:bg-[#33181c]">
                <button onClick={handleDecrement} className="px-4 h-full hover:bg-gray-50 dark:hover:bg-[#452026] text-gray-500 dark:text-gray-300 transition-colors rounded-l-lg cursor-pointer">
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button onClick={handleIncrement} className="px-4 h-full hover:bg-gray-50 dark:hover:bg-[#452026] text-gray-500 dark:text-gray-300 transition-colors rounded-r-lg cursor-pointer">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-white font-bold text-lg rounded-lg shadow-lg shadow-primary/30 hover:bg-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                Add to Cart - ${(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}