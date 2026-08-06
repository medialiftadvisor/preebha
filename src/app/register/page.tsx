'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const { loginUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to register account.');
        setIsLoading(false);
        return;
      }

      setSuccessMsg('Account created and saved to database! Logging you in...');

      // Save user session
      loginUser(data.user);

      setTimeout(() => {
        router.push('/account');
      }, 1000);
    } catch (err: any) {
      setErrorMsg('Network error registering account. Please try again.');
      setIsLoading(false);
    }
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
        {errorMsg && (
          <div className="p-3 bg-rose-100 border border-rose-300 text-rose-900 rounded text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Priya Sharma"
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
            placeholder="priya@example.com"
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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
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
