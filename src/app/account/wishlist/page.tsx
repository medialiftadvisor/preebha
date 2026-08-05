'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2 border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">Saved Favorites</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          My Saved Wishlist ({wishlist.length})
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-sand/20 rounded border border-sand space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-sand text-plum flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-luxury-black uppercase">Your Wishlist Is Empty</h3>
          <p className="text-xs text-charcoal/70">
            Save your favorite ethnic kurtis, silk sets, and dresses here while exploring PREEBHA Lifestyle.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors inline-block"
            >
              Explore Boutique Shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
