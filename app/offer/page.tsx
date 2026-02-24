"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';

type Offer = {
  id: number;
  title: string;
  desc: string;
  code: string;
  badge: string;
  badgeColor: string;
  image: string;
  tags: string[]; // for filtering categories
};

const FILTERS = [
  { key: 'All', label: 'All Offers', icon: null },
  { key: 'Trending', label: 'Trending', icon: 'local_fire_department' },
  { key: 'Near You', label: 'Near You', icon: 'restaurant' },
  { key: 'Pizza', label: 'Pizza', icon: 'local_pizza' },
  { key: 'Sushi', label: 'Sushi', icon: 'set_meal' },
] as const;

type FilterKey = typeof FILTERS[number]['key'];

export default function OffersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Dummy data for the offers to make the code cleaner
  const offers: Offer[] = [
    {
      id: 1,
      title: "Buy One Get One Free",
      desc: "Available on all signature Italian pizzas and pasta dishes at Bella Italia.",
      code: "BOGO24",
      badge: "Active Now",
      badgeColor: "bg-green-500/10 text-green-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO7OROWXPumV-rSDDmOUf1grKkj0hFSDAPRIWp8iAQpWmCly9UOIlP5YzVwYrrOwenoMSJfF14CCOGeTdJcYIMKXOd-kkYrM79Q46gEpHA24_wMhy6KtOHIvNFu-X7KfKUn5QYGv8wnr-LRpYQ1LoAQS-SQmsd9wCPC6zzcIeqfMrflYVoayXSf9ZdLuyKT6mZhfT4-e3UaA4WU9LbFhB0GwZtoMhzHXkwMpPxmTWnnjVewn60NVoDUxYxg3pXsBDPqsKTtKc4dpJA",
      tags: ['Trending', 'Pizza']
    },
    {
      id: 2,
      title: "Free Delivery",
      desc: "Zero delivery fees on all orders over $25 from our top-rated local partners.",
      code: "FREESHIP",
      badge: "Popular",
      badgeColor: "bg-blue-500/10 text-blue-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvJUSA1jpMHYjpwovNqm2pvn9uEq0gc8imTf4xuMI6CTb5FwapRY6bnB92Qsil5hxSa1cofALEQ7e4U481IRxc8eAD3S35cXxTU9sLFKqw5UTKW5J2EcVPWwghmiu_VGFPISLY97YzBYjRcZFF-5vOx3yBk9pSpOrX6aVCsCsXQylBzzhbD2kllmkUVZ2W0JaUxPAa5aTC21mN615ZCRcmtHvcj0SKET7HS9qE-ZeXwTfn1z761McOeGqTF6d_GKT4HDRg_EgWEap1",
      tags: ['Trending', 'Near You']
    },
    {
      id: 3,
      title: "20% Off Sushi",
      desc: "Save on all sushi platters, rolls, and sashimi for your weekend dinner plans.",
      code: "SUSHI20",
      badge: "Exclusive",
      badgeColor: "bg-primary/10 text-primary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwnXTpjsc2NApIatT-iu93nwqfcLZqV_W85tLfJK4rom0unttr_c0jNaqSfOOSg6eiCsdSCJ8neF2YFt1KbENawVdEYRIfwSzJhjFjWdD0GJeQsSZxnu7mdJndQeeVFvdTI0SoeqzA6b1awlPaOb84SvWO9CDsB2E6u6SeyuT1Uk-LsFgcGqLUIbasuwSdZGyNsVKAGzeomJBKgj44IU12XiwaVdbYKTcveMs0h0fTwfRZoxwBi8TrvKaJ5ZsLoWAFy3Ba5Tp68iSB",
      tags: ['Sushi', 'Near You']
    },
    {
      id: 4,
      title: "Midnight Munchies",
      desc: "Special 15% discount for all orders placed between 10 PM and 4 AM.",
      code: "NIGHTOWL",
      badge: "Night Owl",
      badgeColor: "bg-gray-500/10 text-gray-500", // Adjusted for better visibility in dark mode
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4tdUc1NkIsMjWNPbqqU88vUm5_JbHCclvxFJ6x9zfhdgx-Y3CYXCnzlNl-_yNmV9ymmGyNcliOIa3fvKb9WXtz59OV7UODqHvVDZwS4kqP49nt3BmUEZ3gtBf_5oTpLptbMACfT5-Wrqg3KG5BAAC1RCZg6IqZgFVKyFtwxKX7mrtRNHvJFLMw5zwCD3NbSPB3G8IPL7Myf_iJ6OomVJRmGzYYD3fVqAo5FBoS4mvVOY3HPp6SKNkDFR0QVxgP8IMKnkx5uGoN2p",
      tags: ['Trending']
    },
    {
      id: 5,
      title: "$10 Off Healthy Bowls",
      desc: "Get $10 off when you spend $30 or more at 'The Green Bowl'.",
      code: "GREEN10",
      badge: "Flash Sale",
      badgeColor: "bg-primary/10 text-primary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfwLUDqxyJ1HvW4L0ypncx6Q6zLIwbPakrQA5DvtMRCenu6QqmBd4vkUGi9Qjx4ttt4UXm0N-c-IlCoACQ2IMPc_WKmLl19ato_tWM3__HWYamxxrFt_O8uWH_aX7NVz_jPvCCMpIhg8tCRL4bEbLSsRbe6el4rfVCUF-0cNdYElyoHL3N40tw24UiH6kqtBLO5BLMNxlATZGA7gPcsd-vhzTXkNSpICNp-hCHQ_3Gvqr_sM99le_RNqeRV7QiWCDKk6QRJG1VefLK",
      tags: ['Near You']
    },
    {
      id: 6,
      title: "Free Dessert",
      desc: "Add a complimentary dessert to any main course order today.",
      code: "SWEETX",
      badge: "Sweet Deal",
      badgeColor: "bg-pink-500/10 text-pink-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7s2Kq3g6yNVtvAg6wQL8gn4va5OgHi9tTs_x1Fa79C_029XkEFrFkdsVoevT64NSSS4W4SbtPStnse8eR6IxdjjUkfWhiabnfb2aw0xPc6YncQZ2lrEcYJG63XFKG_0MFNgPHCzKIviNk_UjYkD4K4VEBOyIcigK_FilMky8fGJdedTlr1i3cAdk_FABKVJQOCQukCC36gDItu6NPh9RcWZmyn3R5wk9lC7s41TRZHBrxbpCHTbbqV165ZQHRVemdEeWkaDseUl7",
      tags: []
    }
  ];

  const filteredOffers = useMemo(() => {
    if (activeFilter === 'All') return offers;
    return offers.filter((o) => o.tags.includes(activeFilter));
  }, [activeFilter, offers]);

  const handleCopy = async (id: number, text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch (_) {
      // Silent fail; could add toast later
    }
  };

  return (
    <div className="flex-1 w-full bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      <main className="max-w-[1440px] mx-auto w-full px-4 lg:px-10 py-8">
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gray-900">
            <div 
              className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-8 lg:px-16 py-12" 
              style={{ backgroundImage: 'linear-gradient(90deg, rgba(18,18,18,0.9) 0%, rgba(18,18,18,0.5) 60%, rgba(18,18,18,0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRYJeHSElFqI9YCSaf-lLdy5GPPSqgjdvB6imMEF8w7V-NeyDSZovyyiTm7VBBLWBPhPBJQ0e4esIMIVQpjdIKDz_jA6QB1nj_r2AVAUL_Zq47phfmjKQAP05NFTkwWxty7tCOaJCgWr_m9XBEbMOXIRd6FEhJYylShVgKpQ3DzenxJCb_xSgu3PHqS_OHO_qpedjcezFtKJ1THH3SWtdBwVtt1cpdxH-mmMQSio1DN7f1Em81kHVNtekNBgA7S7h6cLn7vW-a_efK")' }}
            >
              <div className="flex flex-col gap-4 max-w-xl">
                <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded w-fit shadow-lg shadow-primary/20">
                  Limited Time Offer
                </span>
                <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                  Big Cravings, <br/><span className="text-primary">Small Prices</span>
                </h1>
                <p className="text-gray-300 text-lg lg:text-xl font-medium leading-relaxed">
                  Enjoy 50% Off your first order with us. Treat yourself to the best local flavors delivered to your door.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl flex items-center gap-3">
                    <span className="text-gray-300 text-sm font-semibold">CODE:</span>
                    <span className="text-white text-xl font-bold tracking-widest">FIRST50</span>
                  </div>
                  <Link href="/menu" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-[52px] px-8 bg-primary hover:bg-primary-hover text-white text-base font-bold transition-all shadow-lg shadow-primary/30 active:scale-95">
                    Claim Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories/Filters */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Offers</h3>
            
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {FILTERS.map(({ key, label, icon }) => {
                const isActive = activeFilter === key;
                const base = 'flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm transition-colors cursor-pointer';
                const active = 'bg-primary text-white font-bold shadow-md shadow-primary/20';
                const inactive = 'bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-neutral-dark';
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    aria-pressed={isActive}
                    className={`${base} ${isActive ? active : inactive}`}
                  >
                    {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>} {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="group bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-2xl p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300">
                
                <div className="flex items-start justify-between mb-5">
                  <div 
                    className="size-16 rounded-xl bg-cover bg-center border border-neutral-light dark:border-neutral-dark bg-gray-100 dark:bg-background-dark" 
                    style={{ backgroundImage: `url("${offer.image}")` }}
                  ></div>
                  <span className={`${offer.badgeColor} text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider`}>
                    {offer.badge}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{offer.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed min-h-[40px]">
                  {offer.desc}
                </p>
                
                <div className="flex items-center justify-between gap-3 pt-5 border-t border-neutral-light dark:border-neutral-dark">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Coupon Code</span>
                    <span className="text-lg font-black text-primary tracking-widest">{offer.code}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy(offer.id, offer.code);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${copiedId === offer.id ? 'bg-primary text-white' : 'bg-primary/10 hover:bg-primary text-primary hover:text-white'}`}
                    aria-live="polite"
                  >
                    <span className="material-symbols-outlined text-[18px]">{copiedId === offer.id ? 'check' : 'content_copy'}</span> {copiedId === offer.id ? 'Copied' : 'Copy'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}