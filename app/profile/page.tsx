"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Address = {
  label?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

type User = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  picture?: string;
  addresses?: Address[];
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Simple state for toggles
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [locationAccess, setLocationAccess] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/user/profile", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load profile");
      } else {
        setUser(data.user || {});
      }
    } catch (e) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (key: keyof User, value: any) => {
    setUser(prev => ({ ...(prev || {}), [key]: value }));
  };

  const updateAddress = (idx: number, field: keyof Address, value: string) => {
    setUser(prev => {
      const addresses = [...(prev?.addresses || [])];
      addresses[idx] = { ...(addresses[idx] || {}), [field]: value };
      return { ...(prev || {}), addresses } as User;
    });
  };

  const addAddress = () => {
    setUser(prev => ({ ...(prev || {}), addresses: [...(prev?.addresses || []), {}] }));
  };

  const removeAddress = (idx: number) => {
    setUser(prev => {
      const addresses = [...(prev?.addresses || [])];
      addresses.splice(idx, 1);
      return { ...(prev || {}), addresses } as User;
    });
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
          picture: user.picture,
          addresses: user.addresses,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save profile");
      } else {
        setUser(data.user);
        setSuccess("Profile updated successfully");
        try {
          localStorage.setItem("user", JSON.stringify({
            name: data.user?.name,
            email: data.user?.email,
            phone: data.user?.phone,
            picture: data.user?.picture,
          }));
        } catch {}
      }
    } catch (e) {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch {}
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700">
          {error}
        </div>
        <div className="mt-4">
          <button onClick={fetchProfile} className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white dark:bg-surface-dark border-r border-neutral-light dark:border-neutral-dark flex flex-col justify-between py-8 px-6 hidden md:flex shrink-0 h-screen overflow-y-auto">
        <div className="space-y-8">
          
          {/* Profile Brief */}
          <div className="flex items-center gap-4 px-2 py-4 border-b border-neutral-light dark:border-neutral-dark">
            <div className="relative">
              {user?.picture ? (
                <img 
                  alt="User Profile Image" 
                  className="size-12 rounded-full object-cover border-2 border-primary" 
                  src={user.picture}
                />
              ) : (
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-primary font-bold">
                  {(user?.name || 'U').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate text-gray-900 dark:text-white">{user?.name || 'User'}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Member</p>
            </div>
          </div>
          
          {/* Nav Links */}
          <nav className="space-y-1">
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold transition-all">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </Link>
            <Link href="/order-tracking" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/5 hover:text-primary transition-all">
              <span className="material-symbols-outlined">receipt_long</span>
              <span>Orders</span>
            </Link>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/5 hover:text-primary transition-all">
              <span className="material-symbols-outlined">map</span>
              <span>Addresses</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/5 hover:text-primary transition-all">
              <span className="material-symbols-outlined">credit_card</span>
              <span>Payments</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/5 hover:text-primary transition-all">
              <span className="material-symbols-outlined">security</span>
              <span>Security</span>
            </a>
          </nav>
        </div>
        
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-neutral-light dark:border-neutral-dark text-gray-600 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all font-medium cursor-pointer">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-8 lg:p-12">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-neutral-light dark:border-neutral-dark">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-white text-xl">restaurant_menu</span>
                </div>
            </Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 cursor-pointer">
                <span className="material-symbols-outlined">logout</span>
            </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 pb-20">
          
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">Personal Information</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your account details and preferences.</p>
            </div>
            <div className="flex gap-3">
              <button disabled={saving} onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </section>

          {success && (
            <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Personal Info Form */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">badge</span>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-900 dark:text-white" 
                  type="text" 
                  value={user?.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-900 dark:text-white" 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">call</span>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-900 dark:text-white" 
                  type="tel" 
                  value={user?.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Profile Picture URL</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">image</span>
                <input 
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-gray-900 dark:text-white" 
                  type="text" 
                  value={user?.picture || ''}
                  onChange={(e) => updateField('picture', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>

          {/* Saved Addresses Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
              <button onClick={addAddress} className="text-primary font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-lg">add_location_alt</span>
                <span className="hidden sm:inline">Add New Address</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {(user?.addresses || []).map((addr, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-2xl group hover:border-primary/50 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                      <span className="material-symbols-outlined">{addr.label === 'Work' ? 'work' : 'home'}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => removeAddress(idx)} className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"><span className="material-symbols-outlined text-xl">delete</span></button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input value={addr.label || ''} onChange={(e) => updateAddress(idx, 'label', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="Label (Home, Work)" />
                    <input value={addr.line1 || ''} onChange={(e) => updateAddress(idx, 'line1', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="Address line 1" />
                    <input value={addr.line2 || ''} onChange={(e) => updateAddress(idx, 'line2', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="Address line 2" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={addr.city || ''} onChange={(e) => updateAddress(idx, 'city', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="City" />
                      <input value={addr.state || ''} onChange={(e) => updateAddress(idx, 'state', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="State" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input value={addr.zip || ''} onChange={(e) => updateAddress(idx, 'zip', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="ZIP" />
                      <input value={addr.country || ''} onChange={(e) => updateAddress(idx, 'country', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-sm" placeholder="Country" />
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Account Settings Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
            <div className="bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-2xl divide-y divide-neutral-light dark:divide-neutral-dark overflow-hidden shadow-sm">
              
              {/* Setting Item 1 */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-background-dark rounded-lg">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">notifications</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Push Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts for order status and promos.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-transparent dark:border-neutral-dark"></div>
                </label>
              </div>
              
              {/* Setting Item 2 */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-background-dark rounded-lg">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">mail_outline</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Newsletter</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get the best culinary news in your inbox.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-transparent dark:border-neutral-dark"></div>
                </label>
              </div>
              
              {/* Setting Item 3 */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-background-dark rounded-lg">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Location Access</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Help us find restaurants near you.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={locationAccess} onChange={() => setLocationAccess(!locationAccess)} />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-transparent dark:border-neutral-dark"></div>
                </label>
              </div>

            </div>
          </section>

          <div className="pt-8 border-t border-neutral-light dark:border-neutral-dark flex justify-end gap-3">
            <button disabled={saving} onClick={fetchProfile} className="px-8 py-3 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-dark transition-all cursor-pointer disabled:opacity-50">
              Reset
            </button>
            <button disabled={saving} onClick={handleSave} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer disabled:opacity-50">
              {saving ? 'Saving...' : 'Update All Settings'}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
