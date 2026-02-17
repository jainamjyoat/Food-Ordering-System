import React from 'react';

// Data for the food cards to keep the JSX clean
const foodItems = [
  {
    id: 1,
    name: "Double Smash Burger",
    desc: "Two beef patties, cheddar, pickles, house sauce on a toasted bun.",
    price: 14.50,
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPex4IkP_iZvS5pAV0T0fuRa261ebqgS271BbsmS6gBqb3ZDAELaa9yvpzdNGYijMEY-hPbLYRTpZyPvWansgCkWWrYodaqHFQep1zhy2GdRm7frJD6qfSTD-kQWalFfGDoPJlnvvP7-jrxdAHSqsZm1teVpjajIb56HysULjFN2Op5G70mgyDxEkkxBnZs28UQ7BalpXIG3QqAK-e-64dFWCoXO1csz_aGWO4AsPJ6UgMpdoAfAqh7tV1Qnz-M4DPyu-8sM3BOu_Y",
    badge: null,
    badgeColor: null
  },
  {
    id: 2,
    name: "Pepperoni Feast",
    desc: "Classic pepperoni pizza with mozzarella and tomato sauce.",
    price: 18.00,
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcdWGlgMyyanplnyz2bUcxFLHl96T0nVeETFPy8wzbXoZ6orp5np5uHFHVDHzFgUyYd_Ccmrp1qrCpzai_SEIS2IU_wu4RfAi14bi8AWn_CIjnauE8F281dREOzNHjlgqXRXHWLq6C1uHMKbBjOe3LKjV4d8teDtW9qzOjYQr_Yg6DgYG2IDHML6q4NF3jln-WY3m5VHQtU8pOlQoMKxsydMZS20ThLYP7SrHvzR_H3h-6oFmx5Zv58eAivc-o7IGIFIds5DugSXeN",
    badge: null,
    badgeColor: null,
    hasCounter: true // Example of conditional rendering logic
  },
  {
    id: 3,
    name: "Salmon Roll Set",
    desc: "Fresh salmon rolls with avocado, cucumber, and spicy mayo.",
    price: 22.00,
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3rOy5cSJv_O84wVucAVCF2eSMBOBXvipcNN_T97s_amI6uXvdk7cNGrhdPKvaxS9BzYtJMdo6ccwusuAk9g0n2QMJbWxYTwwLgr8p1m0Eeuh5J2sYV2JHDznSl1vVP74Xm3SgWd_S6IRmXIHwVYrhEryyN_lGy5NzVkKW9A32ehEDOxdymqKt7Bh03-RJEzsPU7JuKX6xCYksJ4R00njD4Jz87Sgu60WhL_TVctsfXQnVXOU3pO2izJD_Y-kcta4koP0VRQkPGHhh",
    badge: "GF",
    badgeColor: "bg-green-500"
  },
  {
    id: 4,
    name: "Garden Fresh Salad",
    desc: "Mixed greens, cherry tomatoes, cucumber, vinaigrette.",
    price: 11.50,
    rating: 4.2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg0VS0NnqHBUIvYFe6MF4nFIVv-CCnGW4fznnEYNLpecx7ank9QaZ0AX4PugVcIHR9YuKD9soPF9nY8oQ135qP7iuf-9ouWiwxhhtLFDQmQ2lXqEMisG1wlxeWfikr2TIiGrnqa6gHAQkvAOuC6L0clYOIBmWVRJ8DxHDpjG2g2tPoh1FlJx0Aqy4GtfJG6sICXSyfDJzXSYNAozKuUMpbWhELJbT8OUW3c4a9qdx2W-pxbf55RE4JkqAxxBHNp4GlPkyQ8UoO5IO0",
    badge: "Vegan",
    badgeColor: "bg-green-600"
  },
  {
    id: 5,
    name: "Berry Blast Smoothie",
    desc: "Strawberries, blueberries, banana, almond milk.",
    price: 8.00,
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNpFq_x13OblWuUXPaD4Og5OH3zW5_ZrZlpdsFcYUx4o56GqxBeRQ2LEhvwfM1-bvswltajAyLccIDDjuy6sS0F0e-lqDajPCLU9ifOtqTaKy47IKKXkdu2wlO9TszPA_kw76GIUDgurI9EQ7vsiZMlaPCyuzRcE2JpKM84IFY6y_Q4GFLvLwk6Xb_NDkdUjNuKTYSTvchKDKd-ikIEsCBtzTOFP3C9lJaxirIZDueyjvafQXxPWPiIBiI7rJof1jQ8zg63dYBmYx",
    badge: "Vegan",
    badgeColor: "bg-green-600"
  },
  {
    id: 6,
    name: "Decadent Chocolate Cake",
    desc: "Rich dark chocolate sponge with ganache.",
    price: 9.50,
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUYRqvymWglW2ZdzaP-nCEt_4qj8YUnA_R_D9zGta_kc4XJY8xAMKd25cOxxREzU3MctiJ8u52v3RhRkMp5ewstyYW8vEswl6GGnkqUCKgBvIDaXGgWA2qX2CtfbaZSMkSXijqdUs9TTs6Whj4m2x6ueqmKa35H-hxH6_akW--XpqVF_n2q2lQc0t9Ewz-vA4eK1Evr5OjztGGVh0MlEb-2OaHKrlimmBw2coe0VcnbcXxPS1N0yLLYPgVWxCVzSjYZhhuIlwm6468",
    badge: null,
    badgeColor: null
  }
];

export default function FoodMenu() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased min-h-screen flex flex-col">
      {/* Navbar */}
      {/* <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-[#f4f0f1] dark:border-white/10 px-6 py-3 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-text-main dark:text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">FoodOrder</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-text-main dark:text-white text-sm font-semibold hover:text-primary transition-colors" href="#">Menu</a>
            <a className="text-text-secondary dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Orders</a>
            <a className="text-text-secondary dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Restaurants</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-2 size-2 bg-primary rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors shadow-sm shadow-primary/30">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              <span className="text-sm font-bold">Cart (2)</span>
            </button>
            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-white shadow-sm cursor-pointer" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvQn9vyCe_MOlfQ0RbZTXFrxt9StE6kDuGp9BpMUsyFQ_YmCDCEz-Gy5puDjfZIofW77RZNduz-vtX_HOsEkNRtDiw6tuG7vWURODfv_MoDW9WaP2T2VkmvvKu41MxUBMCSvPiP7VgPFYIDKeEEwwJB-y4WKAbEFHfhWM97XmiwEQYUN6URJTq0_WmE2GceN5auD8woB1MeMESyZ1xNLbdASxRzjY5DgUEoeTBMq6o7fNa9JInYAaf83Ah87gwrc7_be-QTqRIMYm')" }}
            ></div>
          </div>
        </div>
      </header> */}

      {/* Main Layout */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8 flex gap-8">
        
        {/* Sidebar Filters (Sticky) */}
        <aside className="w-64 shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Filters</h3>
            <button className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors">Reset All</button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">category</span>
              Categories
            </h4>
            <div className="space-y-2">
              {[
                { label: "Burgers", count: 12, checked: true },
                { label: "Pizza", count: 8 },
                { label: "Sushi", count: 15 },
                { label: "Salads", count: 5 },
                { label: "Desserts", count: 9 },
              ].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked={cat.checked} className="form-checkbox size-4 rounded text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-white/20" type="checkbox"/>
                  <span className="text-sm text-text-secondary dark:text-gray-300 group-hover:text-primary transition-colors">{cat.label}</span>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-white/10 mb-6"></div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">attach_money</span>
              Price Range
            </h4>
            <div className="flex items-center justify-between text-sm text-text-main dark:text-white font-medium mb-2">
              <span>$0</span>
              <span className="text-primary">$250</span>
            </div>
            <input className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-thumb" max="250" min="0" type="range" defaultValue="80"/>
            <div className="flex gap-2 mt-4">
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-3 py-1.5 text-sm text-center flex-1 dark:text-white">$10</div>
              <span className="text-gray-400 flex items-center">-</span>
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-3 py-1.5 text-sm text-center flex-1 dark:text-white">$80</div>
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-white/10 mb-6"></div>

          {/* Dietary */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">eco</span>
              Dietary
            </h4>
            <div className="space-y-2">
              {["Vegan", "Gluten Free", "Halal"].map((diet, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input className="form-checkbox size-4 rounded text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-white/20" type="checkbox"/>
                  <span className="text-sm text-text-secondary dark:text-gray-300 group-hover:text-primary transition-colors">{diet}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-white/10 mb-6"></div>

          {/* Ratings */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">star</span>
              Ratings
            </h4>
            <div className="space-y-2">
              {[4, 3].map((stars, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked={idx === 0} className="form-radio size-4 text-primary border-gray-300 focus:ring-primary/50 dark:bg-white/5 dark:border-white/20" name="rating" type="radio"/>
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
                  <span className="text-sm text-text-secondary dark:text-gray-400">& up</span>
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
                <span className="material-symbols-outlined text-primary group-focus-within:text-primary-hover">search</span>
              </div>
              <input className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border-none rounded-lg text-text-main dark:text-white placeholder-text-secondary dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Search for burgers, pizza, or drinks..." type="text"/>
            </div>
            <div className="relative w-full md:w-56">
              <select className="block w-full pl-4 pr-10 py-3.5 bg-white dark:bg-surface-dark border-none rounded-lg text-text-main dark:text-white shadow-sm focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Categories Quick Pills (Mobile/Tablet Friendly) */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
            <button className="flex-shrink-0 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-sm">All</button>
            {["Burgers", "Pizza", "Vegan"].map((cat) => (
              <button key={cat} className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-text-main dark:text-white rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all">{cat}</button>
            ))}
          </div>

          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-text-main dark:text-white">Popular Items</h1>
            <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Showing 42 results</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-surface-dark rounded-lg p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/10 flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-white/5">
                  <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} />
                  
                  {item.badge && (
                    <div className={`absolute top-2 left-2 ${item.badgeColor} text-white px-2 py-1 rounded text-xs font-bold shadow-sm`}>
                      {item.badge}
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-text-main dark:text-white shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-sm filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {item.rating}
                  </div>
                  
                  <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight">{item.name}</h3>
                  </div>
                  <p className="text-text-secondary dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{item.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
                    <span className="text-lg font-bold text-text-main dark:text-white">${item.price.toFixed(2)}</span>
                    
                    {item.hasCounter ? (
                      <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-lg">
                        <button className="size-8 flex items-center justify-center text-text-main dark:text-white hover:text-primary transition-colors">-</button>
                        <span className="text-sm font-bold text-text-main dark:text-white px-1">1</span>
                        <button className="size-8 flex items-center justify-center text-text-main dark:text-white hover:text-primary transition-colors">+</button>
                      </div>
                    ) : (
                      <button className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        Add <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark text-text-secondary dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark text-text-secondary dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors font-medium">2</button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark text-text-secondary dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors font-medium">3</button>
            <span className="text-text-secondary dark:text-gray-400">...</span>
            <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark text-text-secondary dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}