'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { ArrowRight, Lock, User, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isAdminMode || email.includes('admin')) {
      login(email, 'ADMIN');
      router.push('/admin');
    } else {
      login(email, 'USER');
      router.push('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <Logo size="md" />
        <h1 className="font-serif-luxury text-2xl uppercase tracking-wider text-luxury-black pt-2">
          {isAdminMode ? 'Admin Portal Access' : 'Sign In To Your Account'}
        </h1>
        <p className="text-xs text-charcoal/70 font-light">
          Welcome back to PREEBHA Lifestyle. Access your orders, addresses, and wishlist.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-sand/30 p-8 rounded border border-sand space-y-4 shadow-xs">
        <div>
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="ananya@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">
              Password
            </label>
            <a href="#" className="text-[11px] text-plum hover:underline">Forgot Password?</a>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        {/* Demo Mode Role Switcher */}
        <div className="pt-2">
          <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
            <input
              type="checkbox"
              checked={isAdminMode}
              onChange={(e) => setIsAdminMode(e.target.checked)}
              className="text-plum focus:ring-plum"
            />
            <span>Log in as Store Admin</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-4 border-t border-sand text-xs text-charcoal">
          <span>New to PREEBHA? </span>
          <Link href="/register" className="text-plum font-semibold hover:underline">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
}
