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
        body: JSON.stringify(signupData),
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

        <div className="w-full max-w-[440px] relative">
          
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
            Height automatically animates: 260px for Login, 440px for Sign Up
          */}
          <div className={`relative w-full transition-[height] duration-500 ease-in-out ${isLogin ? 'h-[260px]' : 'h-[440px]'}`}>
            
            {/* SIGN UP FORM */}
            <form 
              onSubmit={handleSubmit}
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                isLogin ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0 pointer-events-auto'
              }`}
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">person</span>
                    <input 
                      name="name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="John Doe" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                    <input 
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="email@example.com" 
                      type="email" 
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">call</span>
                    <input 
                      name="phone"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="+1 (555) 000-0000" 
                      type="tel" 
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                    <input 
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="••••••••" 
                      type="password" 
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-6 cursor-pointer">
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
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">mail</span>
                    <input 
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
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
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">lock</span>
                    <input 
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" 
                      placeholder="••••••••" 
                      type="password" 
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-8 cursor-pointer flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">login</span>
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-6 mt-4">
            <div className="flex-grow border-t border-neutral-light dark:border-neutral-dark"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-neutral-light dark:border-neutral-dark"></div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center">
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
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-dark transition-colors cursor-pointer">
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
