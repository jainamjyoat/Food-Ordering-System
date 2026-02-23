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
      // Clear server-side cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      // Clear client-side state
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

  if (error) {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
        <div className="flex items-center gap-3">
          <Link href="/order-tracking" className="px-4 py-2 rounded-lg bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-dark cursor-pointer">Order history</Link>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer">Logout</button>
        </div>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="p-4 rounded-xl border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark">
            <div className="flex flex-col items-center gap-3">
              {user?.picture ? (
                <div className="size-20 rounded-full bg-cover bg-center border-2 border-white dark:border-neutral-dark shadow-sm" style={{ backgroundImage: `url('${user.picture}')` }} />
              ) : (
                <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-white dark:border-neutral-dark shadow-sm font-bold">
                  <span className="text-lg">{(user?.name || 'U').slice(0,2).toUpperCase()}</span>
                </div>
              )}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name || 'Unnamed'}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="p-4 rounded-xl border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark">
            <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Full Name</label>
                <input value={user?.name || ''} onChange={(e) => updateField('name', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Phone</label>
                <input value={user?.phone || ''} onChange={(e) => updateField('phone', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="+1 555 000 0000" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600 dark:text-gray-300">Profile Picture URL</label>
                <input value={user?.picture || ''} onChange={(e) => updateField('picture', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="https://..." />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark">
            <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Addresses</h2>
            <div className="space-y-4">
              {(user?.addresses || []).map((addr, idx) => (
                <div key={idx} className="grid sm:grid-cols-2 gap-3 p-3 rounded-lg border border-neutral-light dark:border-neutral-dark">
                  <input value={addr.label || ''} onChange={(e) => updateAddress(idx, 'label', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="Label (Home, Work)" />
                  <input value={addr.line1 || ''} onChange={(e) => updateAddress(idx, 'line1', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="Address line 1" />
                  <input value={addr.line2 || ''} onChange={(e) => updateAddress(idx, 'line2', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="Address line 2" />
                  <input value={addr.city || ''} onChange={(e) => updateAddress(idx, 'city', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="City" />
                  <input value={addr.state || ''} onChange={(e) => updateAddress(idx, 'state', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="State" />
                  <input value={addr.zip || ''} onChange={(e) => updateAddress(idx, 'zip', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="ZIP" />
                  <input value={addr.country || ''} onChange={(e) => updateAddress(idx, 'country', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" placeholder="Country" />
                  <div className="sm:col-span-2 flex justify-end">
                    <button onClick={() => removeAddress(idx)} className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={addAddress} className="px-4 py-2 rounded-lg bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark hover:bg-gray-50 dark:hover:bg-neutral-dark cursor-pointer">Add address</button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark">
            <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">Security</h2>
            <p className="text-sm text-gray-500 mb-3">Change password (demo only, not hashed).</p>
            <input id="new-password" type="password" placeholder="New password" className="w-full px-3 py-2 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white" />
            <button onClick={async () => {
              const el = document.getElementById('new-password') as HTMLInputElement | null;
              const newPass = el?.value || '';
              if (!newPass.trim()) return;
              setSaving(true);
              setError('');
              setSuccess('');
              try {
                const res = await fetch('/api/user/profile', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ password: newPass.trim() })
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error || 'Failed to update password');
                } else {
                  setSuccess('Password updated');
                  if (el) el.value = '';
                }
              } catch {
                setError('Failed to update password');
              } finally {
                setSaving(false);
              }
            }} className="mt-3 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover cursor-pointer">Update password</button>
          </div>

          <div className="flex justify-end gap-3">
            <button disabled={saving} onClick={fetchProfile} className="px-4 py-2 rounded-lg bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark hover:bg-gray-50 dark:hover:bg-neutral-dark cursor-pointer disabled:opacity-50">Reset</button>
            <button disabled={saving} onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : 'Save changes'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}