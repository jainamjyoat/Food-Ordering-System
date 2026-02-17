"use client";
import React, { useState, useMemo } from 'react';

// --- DATA ---
const initialFoodItems = [
  {
    id: 1,
    name: "Double Smash Burger",
    desc: "Two beef patties, cheddar, pickles, house sauce on a toasted bun.",
    price: 14.50,
    rating: 4.8,
    category: "Burgers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPex4IkP_iZvS5pAV0T0fuRa261ebqgS271BbsmS6gBqb3ZDAELaa9yvpzdNGYijMEY-hPbLYRTpZyPvWansgCkWWrYodaqHFQep1zhy2GdRm7frJD6qfSTD-kQWalFfGDoPJlnvvP7-jrxdAHSqsZm1teVpjajIb56HysULjFN2Op5G70mgyDxEkkxBnZs28UQ7BalpXIG3QqAK-e-64dFWCoXO1csz_aGWO4AsPJ6UgMpdoAfAqh7tV1Qnz-M4DPyu-8sM3BOu_Y",
    dietary: [],
    badge: null,
    badgeColor: null
  },
  {
    id: 2,
    name: "Pepperoni Feast",
    desc: "Classic pepperoni pizza with mozzarella and tomato sauce.",
    price: 18.00,
    rating: 4.5,
    category: "Pizza",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcdWGlgMyyanplnyz2bUcxFLHl96T0nVeETFPy8wzbXoZ6orp5np5uHFHVDHzFgUyYd_Ccmrp1qrCpzai_SEIS2IU_wu4RfAi14bi8AWn_CIjnauE8F281dREOzNHjlgqXRXHWLq6C1uHMKbBjOe3LKjV4d8teDtW9qzOjYQr_Yg6DgYG2IDHML6q4NF3jln-WY3m5VHQtU8pOlQoMKxsydMZS20ThLYP7SrHvzR_H3h-6oFmx5Zv58eAivc-o7IGIFIds5DugSXeN",
    dietary: [],
    badge: null,
    badgeColor: null,
    hasCounter: true
  },
  {
    id: 3,
    name: "Salmon Roll Set",
    desc: "Fresh salmon rolls with avocado, cucumber, and spicy mayo.",
    price: 22.00,
    rating: 4.9,
    category: "Sushi",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3rOy5cSJv_O84wVucAVCF2eSMBOBXvipcNN_T97s_amI6uXvdk7cNGrhdPKvaxS9BzYtJMdo6ccwusuAk9g0n2QMJbWxYTwwLgr8p1m0Eeuh5J2sYV2JHDznSl1vVP74Xm3SgWd_S6IRmXIHwVYrhEryyN_lGy5NzVkKW9A32ehEDOxdymqKt7Bh03-RJEzsPU7JuKX6xCYksJ4R00njD4Jz87Sgu60WhL_TVctsfXQnVXOU3pO2izJD_Y-kcta4koP0VRQkPGHhh",
    dietary: ["Gluten Free"],
    badge: "GF",
    badgeColor: "bg-green-500"
  },
  {
    id: 4,
    name: "Garden Fresh Salad",
    desc: "Mixed greens, cherry tomatoes, cucumber, vinaigrette.",
    price: 11.50,
    rating: 4.2,
    category: "Salads",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg0VS0NnqHBUIvYFe6MF4nFIVv-CCnGW4fznnEYNLpecx7ank9QaZ0AX4PugVcIHR9YuKD9soPF9nY8oQ135qP7iuf-9ouWiwxhhtLFDQmQ2lXqEMisG1wlxeWfikr2TIiGrnqa6gHAQkvAOuC6L0clYOIBmWVRJ8DxHDpjG2g2tPoh1FlJx0Aqy4GtfJG6sICXSyfDJzXSYNAozKuUMpbWhELJbT8OUW3c4a9qdx2W-pxbf55RE4JkqAxxBHNp4GlPkyQ8UoO5IO0",
    dietary: ["Vegan", "Gluten Free"],
    badge: "Vegan",
    badgeColor: "bg-green-600"
  },
  {
    id: 5,
    name: "Berry Blast Smoothie",
    desc: "Strawberries, blueberries, banana, almond milk.",
    price: 8.00,
    rating: 4.7,
    category: "Drinks", // Added a category for logic
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNpFq_x13OblWuUXPaD4Og5OH3zW5_ZrZlpdsFcYUx4o56GqxBeRQ2LEhvwfM1-bvswltajAyLccIDDjuy6sS0F0e-lqDajPCLU9ifOtqTaKy47IKKXkdu2wlO9TszPA_kw76GIUDgurI9EQ7vsiZMlaPCyuzRcE2JpKM84IFY6y_Q4GFLvLwk6Xb_NDkdUjNuKTYSTvchKDKd-ikIEsCBtzTOFP3C9lJaxirIZDueyjvafQXxPWPiIBiI7rJof1jQ8zg63dYBmYx",
    dietary: ["Vegan"],
    badge: "Vegan",
    badgeColor: "bg-green-600"
  },
  {
    id: 6,
    name: "Decadent Chocolate Cake",
    desc: "Rich dark chocolate sponge with ganache.",
    price: 9.50,
    rating: 4.9,
    category: "Desserts",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUYRqvymWglW2ZdzaP-nCEt_4qj8YUnA_R_D9zGta_kc4XJY8xAMKd25cOxxREzU3MctiJ8u52v3RhRkMp5ewstyYW8vEswl6GGnkqUCKgBvIDaXGgWA2qX2CtfbaZSMkSXijqdUs9TTs6Whj4m2x6ueqmKa35H-hxH6_akW--XpqVF_n2q2lQc0t9Ewz-vA4eK1Evr5OjztGGVh0MlEb-2OaHKrlimmBw2coe0VcnbcXxPS1N0yLLYPgVWxCVzSjYZhhuIlwm6468",
    dietary: [],
    badge: null,
    badgeColor: null
  }
];

const CATEGORIES = ["Burgers", "Pizza", "Sushi", "Salads", "Desserts", "Drinks"];
const DIETARY_OPTIONS = ["Vegan", "Gluten Free", "Halal"];

export default function FoodMenu() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50); // Max price filter
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("Recommended");

  // --- HANDLERS ---
  
  // Toggle Category Checkbox
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Toggle Dietary Checkbox
  const handleDietaryChange = (diet: string) => {
    setSelectedDietary(prev => 
      prev.includes(diet) 
        ? prev.filter(d => d !== diet) 
        : [...prev, diet]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange(100);
    setSelectedDietary([]);
    setMinRating(0);
    setSortOption("Recommended");
  };

  // --- FILTERING LOGIC ---
  const filteredItems = useMemo(() => {
    return initialFoodItems.filter(item => {
      // 1. Search Query
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // 2. Categories (if any selected)
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) return false;
      
      // 3. Price Range (show items UNDER the selected price)
      if (item.price > priceRange) return false;

      // 4. Dietary (must match ALL selected)
      if (selectedDietary.length > 0) {
        const hasAllDietary = selectedDietary.every(d => item.dietary.includes(d));
        if (!hasAllDietary) return false;
      }

      // 5. Rating
      if (item.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      // 6. Sorting
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      if (sortOption === "Top Rated") return b.rating - a.rating;
      return 0; // Default (Recommended/ID order)
    });
  }, [searchQuery, selectedCategories, priceRange, selectedDietary, minRating, sortOption]);

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
              filteredItems.map((item) => (
                <div key={item.id} className="group bg-white dark:bg-[#33181c] rounded-xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-[#452026] hover:border-primary/10 flex flex-col h-full cursor-pointer">
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
                    
                    <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-[#1a0b0d] rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer">
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
                      
                      {item.hasCounter ? (
                        <div className="flex items-center bg-gray-100 dark:bg-[#221013] rounded-lg border border-transparent dark:border-[#452026]">
                          <button className="size-8 flex items-center justify-center text-[#181112] dark:text-white hover:text-primary transition-colors cursor-pointer">-</button>
                          <span className="text-sm font-bold text-[#181112] dark:text-white px-1">1</span>
                          <button className="size-8 flex items-center justify-center text-[#181112] dark:text-white hover:text-primary transition-colors cursor-pointer">+</button>
                        </div>
                      ) : (
                        <button className="bg-primary hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20">
                          Add <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <p className="text-xl font-bold text-gray-500">No items found.</p>
                <p className="text-gray-400">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </section>
    </div>
  );
}