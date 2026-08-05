'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    login(email, 'USER');
    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <Logo size="md" />
        <h1 className="font-serif-luxury text-2xl uppercase tracking-wider text-luxury-black pt-2">
          JOIN THE WORLD OF PREEBHA
        </h1>
        <p className="text-xs text-charcoal/70 font-light">
          Register to enjoy personal wishlist tracking, faster checkout, and exclusive drop invitations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-sand/30 p-8 rounded border border-sand space-y-4 shadow-xs">
        <div>
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ananya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Email Address *
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
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Mobile Number (Optional)
          </label>
          <input
            type="tel"
            placeholder="+91 9898989898"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Password *
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-4 border-t border-sand text-xs text-charcoal">
          <span>Already have an account? </span>
          <Link href="/login" className="text-plum font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </form>
    </div>
  );
}
