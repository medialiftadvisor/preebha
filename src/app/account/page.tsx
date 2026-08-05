'use client';

import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Truck,
  RotateCcw,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function CustomerAccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { wishlistCount } = useWishlist();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-luxury text-3xl uppercase">Account Sign In Required</h1>
        <p className="text-xs text-charcoal/70">Please log in to view your PREEBHA profile and order history.</p>
        <Link href="/login" className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest inline-block">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Account Banner */}
      <div className="bg-blush/20 p-8 rounded border border-blush flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Customer Dashboard</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Welcome Back, {user?.name}
          </h1>
          <p className="text-xs text-charcoal/70 mt-1">{user?.email} • Member since 2026</p>
        </div>

        <button
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="px-4 py-2 bg-luxury-black text-ivory text-xs uppercase tracking-wider hover:bg-plum transition-colors flex items-center space-x-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="p-6 bg-sand/30 border border-sand rounded hover:border-plum transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-plum/10 text-plum flex items-center justify-center group-hover:bg-plum group-hover:text-ivory transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-luxury-black uppercase">My Orders</h3>
          <p className="text-xs text-charcoal/70">View past orders, download invoices, and request returns.</p>
          <span className="text-xs font-semibold text-plum flex items-center space-x-1 group-hover:underline">
            <span>View Orders</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/track-order"
          className="p-6 bg-sand/30 border border-sand rounded hover:border-plum transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-plum/10 text-plum flex items-center justify-center group-hover:bg-plum group-hover:text-ivory transition-colors">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-luxury-black uppercase">Track Orders</h3>
          <p className="text-xs text-charcoal/70">Real-time status tracking for active shipments across India.</p>
          <span className="text-xs font-semibold text-plum flex items-center space-x-1 group-hover:underline">
            <span>Track Status</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-6 bg-sand/30 border border-sand rounded hover:border-plum transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-plum/10 text-plum flex items-center justify-center group-hover:bg-plum group-hover:text-ivory transition-colors">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-luxury-black uppercase">Wishlist ({wishlistCount})</h3>
          <p className="text-xs text-charcoal/70">Your saved luxury ethnic wear and boutique favorites.</p>
          <span className="text-xs font-semibold text-plum flex items-center space-x-1 group-hover:underline">
            <span>View Wishlist</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Account Info Details Card */}
      <div className="bg-ivory border border-sand p-6 rounded space-y-4">
        <h3 className="font-serif-luxury text-xl text-luxury-black uppercase border-b border-sand pb-3">
          Saved Profile Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal">
          <div>
            <span className="text-neutral-500 uppercase block text-[10px]">Full Name</span>
            <strong className="text-luxury-black text-sm">{user?.name}</strong>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[10px]">Email Address</span>
            <strong className="text-luxury-black text-sm">{user?.email}</strong>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[10px]">Primary Mobile</span>
            <strong className="text-luxury-black text-sm">{user?.phone || '+91 9898989898'}</strong>
          </div>
          <div>
            <span className="text-neutral-500 uppercase block text-[10px]">Default Country</span>
            <strong className="text-luxury-black text-sm">India</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
