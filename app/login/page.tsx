"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [signupRole, setSignupRole] = useState<'customer' | 'admin'>('customer');

  const toggleView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...signupData, role: signupRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      setSuccess('Account created successfully! Switching to login...');
      setTimeout(() => {
        setIsLogin(true);
        setSignupData({ name: '', email: '', phone: '', password: '' });
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isLogin) {
      handleLoginSubmit(e);
    } else {
      handleSignupSubmit(e);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100">
      
      {/* Left Panel: Visual Hook (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent z-10"></div>
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover transform transition-transform duration-1000 hover:scale-105" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDalsV2nuxWkiw97R2oLMsClLvhsCErL4xWsdY2ftN4PFa1UhCXI85xYtnVM72GJERxq4mha2Xz3T6r5wS_ZHU4oHhRu7fY-0jmd_3Tjbnc8XdYCSJMMElzk-Vxn7-bBRk4hYGWRZH4HQy2SrJ6UXN3sZZaVA7oTl6vHk67XaMPsOzSVyowzVqMJeTvkkI8QXOqYHKFZpif-lvDPH88pYFX0u7fjrzvU24MN-ZCNR25gXqIqF_Zt5Vj2tRb-H-bxZTeqAoC1RwTJNkZ")' }}
        ></div>
        
        {/* Dynamic Text based on state */}
        <div className="absolute bottom-12 left-12 z-20 max-w-md transition-all duration-500">
          <h1 className="text-white text-5xl font-extrabold leading-tight tracking-tight mb-4">
            {isLogin ? "Welcome back to culinary excellence." : "Discover the best food in your city."}
          </h1>
          <p className="text-white/80 text-lg">
            {isLogin 
              ? "Sign in to access your favorite restaurants and track your active orders." 
              : "Join over 1 million foodies and get access to exclusive deals and lightning fast delivery."}
          </p>
        </div>
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 z-20">
          <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white drop-shadow-md">
            Foodie<span className="text-primary">Dark</span>
          </h2>
        </Link>
      </div>

      {/* Right Panel: Forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 relative overflow-hidden">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 text-primary mb-8">
          <span className="material-symbols-outlined text-4xl">restaurant_menu</span>
          <span className="text-2xl font-extrabold tracking-tighter text-gray-900 dark:text-white">FOODIE<span className="text-primary">DARK</span></span>
        </div>

        <div className="w-full max-w-[460px] relative">
          
          {/* Header */}
          <div className="space-y-2 mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight transition-all duration-300">
              {isLogin ? "Welcome Back" : "Join the Community"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {isLogin ? "Please enter your details to sign in." : "Get started with your first order in minutes."}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* DYNAMIC FORM CONTAINER 
            Height automatically animates based on state and role to prevent clipping
          */}
          <div 
            className="relative w-full transition-[height] duration-500 ease-in-out"
            style={{ height: isLogin ? '260px' : signupRole === 'admin' ? '540px' : '460px' }}
          >
            
            {/* SIGN UP FORM */}
            <form 
              onSubmit={handleSubmit}
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                isLogin ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0 pointer-events-auto'
              }`}
            >
              <div className="space-y-4">
                
                {/* 2-Column Grid for Name and Phone to save vertical space */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">person</span>
                      <input 
                        name="name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                        placeholder="John Doe" 
                        type="text" 
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">call</span>
                      <input 
                        name="phone"
                        value={signupData.phone}
                        onChange={handleSignupChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                        placeholder="+91" 
                        type="tel" 
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                    <input 
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                      placeholder="email@example.com" 
                      type="email" 
                      required
                    />
                  </div>
                </div>

                {/* Role Selection (two-button) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Choose your role</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-[#1E1E1E] rounded-xl border border-slate-200 dark:border-primary/20">
                    <button
                      type="button"
                      onClick={() => setSignupRole('customer')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${signupRole === 'customer' ? 'bg-primary text-white font-bold shadow-md' : 'text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-200 dark:hover:bg-white/10'}`}
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      <span className="text-sm">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole('admin')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${signupRole === 'admin' ? 'bg-primary text-white font-bold shadow-md' : 'text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-200 dark:hover:bg-white/10'}`}
                    >
                      <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                      <span className="text-sm">Admin</span>
                    </button>
                  </div>
                </div>

                {/* Smooth appearance for Admin access code */}
                <div className={`transition-all duration-300 overflow-hidden ${signupRole === 'admin' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Admin Access Code</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">verified_user</span>
                      <input 
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono tracking-widest uppercase" 
                        placeholder="ADMIN-CODE" 
                        type="text" 
                        required={signupRole === 'admin'}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                    <input 
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                      placeholder="••••••••" 
                      type="password" 
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 ml-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    At least 8 characters with letters & numbers
                  </p>
                </div>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-6 cursor-pointer">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* LOGIN FORM */}
            <form 
              onSubmit={handleSubmit}
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                isLogin ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'
              }`}
            >
              <div className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                    <input 
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-[#1E1E1E] border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="name@example.com" 
                      type="email" 
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                    <input 
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-[#1E1E1E] border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="••••••••" 
                      type="password" 
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-8 cursor-pointer flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">login</span>
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-6 mt-2">
            <div className="flex-grow border-t border-neutral-light dark:border-neutral-dark"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-neutral-light dark:border-neutral-dark"></div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative w-full flex justify-center">
              <a
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 bg-white dark:bg-[#1E1E1E] border border-neutral-light dark:border-neutral-dark rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-dark transition-colors cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-200"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>                
                </svg>
                Google
              </a>
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    setError('');
                    setSuccess('');
                    setLoading(true);
                    try {
                      const response = await fetch('/api/auth/google', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          credential: credentialResponse.credential
                        }),
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        setError(data.error || 'Google login failed');
                        setLoading(false);
                        return;
                      }

                      setSuccess('Google login successful! Redirecting...');
                      setTimeout(() => {
                        router.push('/');
                      }, 1500);
                    } catch (err) {
                      setError('An error occurred. Please try again.');
                      setLoading(false);
                    }
                  }}
                  onError={() => {
                    setError('Google login failed. Please try again.');
                  }}
                />
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-[#1E1E1E] border border-neutral-light dark:border-neutral-dark rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-dark transition-colors cursor-pointer">
              <svg className="w-5 h-5 dark:fill-white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05 1.78-3.19 1.76-1.12-.02-1.48-.68-2.76-.68-1.28 0-1.69.66-2.75.7-1.11.04-2.14-.8-3.14-1.78C3.18 18.25 1.5 14.43 1.5 10.74c0-3.66 2.4-5.59 4.74-5.59 1.23 0 2.39.82 3.15.82.75 0 2.15-.99 3.63-.84 1.57.16 2.76.71 3.53 1.83-3.08 1.81-2.58 5.86.53 7.31-.69 1.71-1.61 3.42-3.03 5.01zm-3.05-15.15c-.65.78-1.71 1.34-2.72 1.26-.14-.99.34-2.08 1.05-2.84.72-.77 1.83-1.38 2.81-1.3 0 1.07-.48 2.11-1.14 2.88z"></path>
              </svg>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Apple</span>
            </button>
          </div>

          {/* Toggle Button */}
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleView}
              className="text-primary font-bold hover:underline ml-1 cursor-pointer focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}