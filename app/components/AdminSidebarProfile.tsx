"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Profile = {
  name?: string;
  role?: string;
  picture?: string;
  email?: string;
};

export default function AdminSidebarProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/user/profile', { cache: 'no-store' });
        if (!res.ok) {
          // Not logged in or error; fall back to placeholders
          if (!cancelled) setProfile(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) setProfile(data.user || null);
      } catch {
        if (!cancelled) setProfile(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const displayName = profile?.name || profile?.email || 'Admin User';
  const displayRole = profile?.role || 'Administrator';
  const picture = profile?.picture ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFPt0gz9P0xGnuEJe8Y8admJEdO6aXkR8XzpE_KMtiRg9DV-6t3GEP_p63OlV3pXPkiqG60ObwObaHJ62IbGnW4sGS1jXeZ5ITVHyaYGqfi0IXFMaKEhMTrmv3iDrLOqnXqbg2niCeJCHkrQHYbgV6XHE5cEuFQo7msisYZZyt8pxFkqlFUDpQBC1r7Sq2Clao689-JGGwIVOXpoNtEnhoxv0FbbG4452hFGAevsdrmR1o7xVS_HjGwz7yBEFPH8B7BDw_Gkdddtp';

  return (
    <div className="bg-gray-50 hover:bg-gray-100 dark:bg-[#252525] dark:hover:bg-[#2A2A2A] rounded-xl p-3 flex items-center gap-3 transition-colors border border-transparent dark:border-gray-800">
      <div 
        className="size-9 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-gray-800 shadow-sm" 
        style={{ backgroundImage: `url('${picture}')` }}
      ></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{loading ? 'Loading…' : displayName}</p>
        {!loading && (
          <p className="text-xs font-medium text-gray-500 truncate">{displayRole}</p>
        )}
      </div>
      <Link href="/login" className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
        <span className="material-symbols-outlined text-xl">logout</span>
      </Link>
    </div>
  );
}
