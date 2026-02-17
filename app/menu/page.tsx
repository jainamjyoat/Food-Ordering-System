"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // 1. Import Link
import { useCart } from '../context/CartContext';
import { foodItems } from '../data/foodItems'; // 2. Import centralized data

const CATEGORIES = ["Burgers", "Pizza", "Sushi", "Salads", "Desserts", "Drinks"];
const DIETARY_OPTIONS = ["Vegan", "Gluten Free", "Halal"];

export default function FoodMenu() {
  const { cart, addToCart, updateQuantity } = useCart();
  
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("Recommended");

  // --- HANDLERS ---
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const handleDietaryChange = (diet: string) => {
    setSelectedDietary(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
  };

  const resetFilters = () => {
    setSearchQuery(""); setSelectedCategories([]); setPriceRange(100); setSelectedDietary([]); setMinRating(0); setSortOption("Recommended");
  };

  // --- FILTERING LOGIC ---
  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) return false;
      if (item.price > priceRange) return false;
      if (selectedDietary.length > 0 && !selectedDietary.every(d => item.dietary.includes(d))) return false;
      if (item.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      if (sortOption === "Top Rated") return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategories, priceRange, selectedDietary, minRating, sortOption]);

  // Helper to check if item is in cart
  const getCartQuantity = (id: number) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 font-sans">
        
        {/* Sidebar Filters (Sticky) */}
        <aside className="w-64 shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-10 hide-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#181112] dark:text-white">Filters</h3>
            <button 
              onClick={resetFilters}
              className="text-xs font-bold text-primary hover:text-red-600 transition-colors cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#181112] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">category</span>
              Categories
            </h4>
            <div className="space-y-2">
              {CATEGORIES.map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="form-checkbox size-4 rounded text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-[#452026]" 
                    type="checkbox"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-[#3a1d21] mb-6"></div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#181112] dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">attach_money</span>
              Max Price: <span className="text-primary">${priceRange}</span>
            </h4>
            <input 
              className="w-full h-1 bg-gray-200 dark:bg-[#33181c] rounded-lg appearance-none cursor-pointer" 
              max="100" 
              min="0" 
              step="5"
              type="range" 
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <div className="flex gap-2 mt-4">
              <div className="text-xs text-gray-400">0</div>
              <div className="ml-auto text-xs text-gray-400">100+</div>
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-[#3a1d21] mb-6"></div>

          {/* Dietary */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#181112] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">eco</span>
              Dietary
            </h4>
            <div className="space-y-2">
              {DIETARY_OPTIONS.map((diet, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    checked={selectedDietary.includes(diet)}
                    onChange={() => handleDietaryChange(diet)}
                    className="form-checkbox size-4 rounded text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-[#452026]" 
                    type="checkbox"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors font-medium">{diet}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-[#3a1d21] mb-6"></div>

          {/* Ratings */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#181112] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">star</span>
              Ratings
            </h4>
            <div className="space-y-2">
              {[4, 3, 2].map((stars, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    checked={minRating === stars}
                    onChange={() => setMinRating(stars)}
                    className="form-radio size-4 text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-[#452026]" 
                    name="rating" 
                    type="radio"
                  />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`material-symbols-outlined text-sm ${i < stars ? "filled" : "text-gray-300 dark:text-gray-600"}`}
                        style={{ fontVariationSettings: i < stars ? "'FILL' 1" : undefined }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">& up</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 min-w-0">
          
          {/* Search & Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-primary group-focus-within:text-red-600">search</span>
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] rounded-xl text-[#181112] dark:text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium" 
                placeholder="Search for burgers, pizza, or drinks..." 
                type="text"
              />
            </div>
            <div className="relative w-full md:w-56">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full pl-4 pr-10 py-3.5 bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] rounded-xl text-[#181112] dark:text-white shadow-sm focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none font-medium"
              >
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Categories Quick Pills (Mobile/Tablet Friendly) */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2 hide-scrollbar lg:hidden">
            <button 
              onClick={() => setSelectedCategories([])}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all ${selectedCategories.length === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-[#33181c] text-[#181112] dark:text-white border border-gray-200 dark:border-[#452026]'}`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer ${selectedCategories.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-[#33181c] border-gray-200 dark:border-[#452026] text-[#181112] dark:text-white hover:border-primary hover:text-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#181112] dark:text-white">Popular Items</h1>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Showing {filteredItems.length} results</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const qty = getCartQuantity(item.id);
                return (
                  // 3. WRAPPER LINK
                  <Link 
                    href={`/menu/${item.id}`} 
                    key={item.id} 
                    className="group bg-white dark:bg-[#33181c] rounded-xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-[#452026] hover:border-primary/10 flex flex-col h-full cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-black/20">
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} />
                      
                      {item.badge && (
                        <div className={`absolute top-2 left-2 ${item.badgeColor} text-white px-2 py-1 rounded text-xs font-bold shadow-sm`}>
                          {item.badge}
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#181112] dark:text-white shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {item.rating}
                      </div>
                      
                      {/* Favorite Button (Prevents navigation on click) */}
                      <button 
                        onClick={(e) => { e.preventDefault(); /* Add favorite logic here */ }}
                        className="absolute bottom-2 right-2 size-8 bg-white dark:bg-[#1a0b0d] rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer z-10"
                      >
                        <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </button>
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-[#181112] dark:text-white leading-tight">{item.name}</h3>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{item.desc}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-[#452026]">
                        <span className="text-lg font-bold text-[#181112] dark:text-white">${item.price.toFixed(2)}</span>
                        
                        {/* DYNAMIC CART BUTTON LOGIC (Prevent Navigation) */}
                        {qty > 0 ? (
                          <div 
                            onClick={(e) => e.preventDefault()} // Prevent Link click
                            className="flex items-center bg-gray-100 dark:bg-[#221013] rounded-lg border border-transparent dark:border-[#452026] z-10"
                          >
                            <button 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(item.id, -1); }}
                              className="size-8 flex items-center justify-center text-[#181112] dark:text-white hover:text-primary transition-colors cursor-pointer"
                            >-</button>
                            <span className="text-sm font-bold text-[#181112] dark:text-white px-1">{qty}</span>
                            <button 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(item.id, 1); }}
                              className="size-8 flex items-center justify-center text-[#181112] dark:text-white hover:text-primary transition-colors cursor-pointer"
                            >+</button>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(item); }}
                            className="bg-primary hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20 z-10"
                          >
                            Add <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <p className="text-xl font-bold text-gray-500">No items found.</p>
                <p className="text-gray-400">Try adjusting your filters.</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold cursor-pointer shadow-lg shadow-primary/20">1</button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors font-medium cursor-pointer">2</button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors font-medium cursor-pointer">3</button>
            <span className="text-gray-400 px-2">...</span>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
    </div>
  );
}